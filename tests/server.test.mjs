import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import http from 'node:http';
import net from 'node:net';
import { setTimeout as sleep } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
let defaultApp;
let mockApi;
let mockApiPort;
let mockCalls = [];
let mockResponses = [];
let mockStatus = 200;

async function reservePort() {
  const probe = net.createServer();
  await new Promise((resolve, reject) => probe.once('error', reject).listen(0, '127.0.0.1', resolve));
  const port = probe.address().port;
  await new Promise((resolve, reject) => probe.close((error) => error ? reject(error) : resolve()));
  return port;
}

async function stopProcess(child) {
  if (!child || child.exitCode !== null) return;
  child.kill('SIGTERM');
  await Promise.race([new Promise((resolve) => child.once('exit', resolve)), sleep(2000)]);
}

async function launchApp(extraEnv = {}) {
  const port = await reservePort();
  const child = spawn(process.execPath, [join(ROOT, 'server.mjs')], {
    cwd: ROOT,
    env: {
      ...process.env,
      PORT: String(port),
      SIGNALFLOW_ENABLE_LLM: 'false',
      OPENAI_API_KEY: '',
      OPENAI_API_BASE: 'https://api.openai.com/v1',
      ...extraEnv,
    },
    stdio: 'ignore',
  });
  const baseUrl = `http://127.0.0.1:${port}`;
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (child.exitCode !== null) throw new Error(`SignalFlow server exited with ${child.exitCode}`);
    try {
      const response = await fetch(`${baseUrl}/`, { signal: AbortSignal.timeout(300) });
      if (response.ok) return { child, baseUrl };
    } catch {
      await sleep(100);
    }
  }
  await stopProcess(child);
  throw new Error('SignalFlow server did not become ready');
}

function completion(message) {
  return { choices: [{ message }] };
}

function toolCall(id, name, caseId = 'ALT-24081') {
  return {
    id,
    type: 'function',
    function: { name, arguments: JSON.stringify({ case_id: caseId }) },
  };
}

function finalAnswer() {
  return completion({
    role: 'assistant',
    content: JSON.stringify({
      recommendation: 'Request supporting context before disposition',
      rationale: 'The fictional case has several indicators, but the source-of-funds explanation and beneficiary relationship are missing. Request those details and retain the final disposition for an analyst.',
      confidence: 0.78,
    }),
  });
}

function validAgentScript() {
  return [
    completion({ role: 'assistant', content: null, tool_calls: [toolCall('call-signals', 'read_case_signals'), toolCall('call-missing', 'check_missing_context')] }),
    completion({ role: 'assistant', content: null, tool_calls: [toolCall('call-checklist', 'get_review_checklist')] }),
    finalAnswer(),
  ];
}

before(async () => {
  mockApi = http.createServer((request, response) => {
    const chunks = [];
    request.on('data', (chunk) => chunks.push(chunk));
    request.on('end', () => {
      try { mockCalls.push(JSON.parse(Buffer.concat(chunks).toString('utf8'))); } catch { mockCalls.push(null); }
      response.writeHead(mockStatus, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(mockResponses.shift() || completion({ role: 'assistant', content: '{"invalid":true}' })));
    });
  });
  await new Promise((resolve, reject) => mockApi.once('error', reject).listen(0, '127.0.0.1', resolve));
  mockApiPort = mockApi.address().port;
  defaultApp = await launchApp();
});

after(async () => {
  await stopProcess(defaultApp?.child);
  if (mockApi?.listening) await new Promise((resolve) => mockApi.close(resolve));
});

async function postJson(baseUrl, path, body) {
  return fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function launchAgentApp() {
  mockCalls = [];
  mockStatus = 200;
  mockResponses = validAgentScript();
  return launchApp({
    SIGNALFLOW_ENABLE_LLM: 'true',
    OPENAI_API_KEY: 'test-only-not-a-real-secret',
    OPENAI_API_BASE: `http://127.0.0.1:${mockApiPort}/v1`,
    OPENAI_MODEL: 'gpt-4o-mini',
  });
}

test('serves the app with security headers and only the public asset allowlist', async () => {
  const response = await fetch(`${defaultApp.baseUrl}/`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-security-policy') || '', /default-src 'self'/);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.match(await response.text(), /SignalFlow/);
  for (const asset of ['app.js', 'style.css', 'manus-routes.json']) {
    assert.equal((await fetch(`${defaultApp.baseUrl}/${asset}`)).status, 200, asset);
  }
  for (const path of ['/server.mjs', '/agent-engine.mjs', '/README.md', '/.env.example', '/%2e%2e/server.mjs']) {
    assert.equal((await fetch(`${defaultApp.baseUrl}${path}`)).status, 404, path);
  }
});

test('reports deterministic mode by default without exposing secrets', async () => {
  const response = await fetch(`${defaultApp.baseUrl}/api/status`);
  assert.equal(response.status, 200);
  const status = await response.json();
  assert.deepEqual(status, { mode: 'deterministic-local-fallback', modelEnabled: false, model: null, demoOnly: true });
  assert.doesNotMatch(JSON.stringify(status), /key|secret/i);
});

test('a key alone never enables an implicit model call', async () => {
  mockCalls = [];
  const app = await launchApp({ OPENAI_API_KEY: 'must-not-run-implicitly' });
  try {
    const result = await (await postJson(app.baseUrl, '/api/investigate', { case: { id: 'ALT-24081' } })).json();
    assert.equal(result.engine, 'demo-rules');
    assert.equal(result.recommendation, 'Escalate for enhanced due diligence');
    assert.match(result.rationale, /fictional/i);
    assert.equal(mockCalls.length, 0);
  } finally {
    await stopProcess(app.child);
  }
});

test('enabled agent uses multiple allowlisted tools and returns a validated human-gated draft', async () => {
  const app = await launchAgentApp();
  try {
    const status = await (await fetch(`${app.baseUrl}/api/status`)).json();
    assert.equal(status.mode, 'local-tool-agent-enabled');
    assert.equal(status.modelEnabled, true);
    assert.equal(status.model, 'gpt-4o-mini');

    const response = await postJson(app.baseUrl, '/api/investigate', { case: { id: 'ALT-24081' } });
    assert.equal(response.status, 200);
    const result = await response.json();
    assert.equal(result.engine, 'model-agent');
    assert.equal(result.id, 'ALT-24081');
    assert.equal(result.humanDecisionRequired, true);
    assert.equal(result.recommendation, 'Request supporting context before disposition');
    assert.equal(result.toolTrace.length, 3);
    assert.deepEqual(result.toolTrace.map((entry) => entry.tool), ['read_case_signals', 'check_missing_context', 'get_review_checklist']);
    assert.equal(mockCalls.length, 3);
    assert.equal(mockCalls[0].tools.length, 4);
    assert.equal(mockCalls[0].max_completion_tokens, 500);
    assert.equal(mockCalls[0].max_tokens, undefined);
    assert.ok(mockCalls[0].tools.every((entry) => entry.function.strict === true));
    assert.match(JSON.stringify(mockCalls[1].messages), /Velocity spike/);
    assert.match(JSON.stringify(mockCalls[2].messages), /DEMO-VELOCITY-V1/);
    assert.doesNotMatch(JSON.stringify(mockCalls), /Nadia Rahman|184,200|Sensitive name/);
  } finally {
    await stopProcess(app.child);
  }
});

test('falls back when the model skips required tool use', async () => {
  mockCalls = [];
  mockResponses = [finalAnswer()];
  const app = await launchApp({ SIGNALFLOW_ENABLE_LLM: 'true', OPENAI_API_KEY: 'test-key', OPENAI_API_BASE: `http://127.0.0.1:${mockApiPort}/v1` });
  try {
    const result = await (await postJson(app.baseUrl, '/api/investigate', { case: { id: 'ALT-24081' } })).json();
    assert.equal(result.engine, 'demo-rules');
    assert.equal(result.fallbackReason, 'required_tools_missing');
    assert.equal(result.toolTrace.length, 0);
  } finally {
    await stopProcess(app.child);
  }
});

test('rejects model-requested tools outside the local allowlist', async () => {
  mockCalls = [];
  mockResponses = [completion({ role: 'assistant', content: null, tool_calls: [toolCall('call-bad', 'fetch_external_account_data')] })];
  const app = await launchApp({ SIGNALFLOW_ENABLE_LLM: 'true', OPENAI_API_KEY: 'test-key', OPENAI_API_BASE: `http://127.0.0.1:${mockApiPort}/v1` });
  try {
    const result = await (await postJson(app.baseUrl, '/api/investigate', { case: { id: 'ALT-24081' } })).json();
    assert.equal(result.engine, 'demo-rules');
    assert.equal(result.fallbackReason, 'tool_request_rejected');
    assert.equal(mockCalls.length, 1);
  } finally {
    await stopProcess(app.child);
  }
});

test('rejects tool arguments that attempt to switch to another case ID', async () => {
  mockResponses = [completion({ role: 'assistant', content: null, tool_calls: [toolCall('call-other-case', 'read_case_signals', 'ALT-24074')] })];
  const app = await launchApp({ SIGNALFLOW_ENABLE_LLM: 'true', OPENAI_API_KEY: 'test-key', OPENAI_API_BASE: `http://127.0.0.1:${mockApiPort}/v1` });
  try {
    const result = await (await postJson(app.baseUrl, '/api/investigate', { case: { id: 'ALT-24081' } })).json();
    assert.equal(result.engine, 'demo-rules');
    assert.equal(result.fallbackReason, 'tool_request_rejected');
  } finally {
    await stopProcess(app.child);
  }
});

test('rejects a malformed or disallowed model recommendation after tool use', async () => {
  mockResponses = [
    completion({ role: 'assistant', content: null, tool_calls: [toolCall('call-signals', 'read_case_signals'), toolCall('call-missing', 'check_missing_context'), toolCall('call-checklist', 'get_review_checklist')] }),
    completion({ role: 'assistant', content: JSON.stringify({ recommendation: '<script>alert(1)</script>', rationale: 'Invalid unsafe output that must be rejected by the server.', confidence: 10 }) }),
  ];
  const app = await launchApp({ SIGNALFLOW_ENABLE_LLM: 'true', OPENAI_API_KEY: 'test-key', OPENAI_API_BASE: `http://127.0.0.1:${mockApiPort}/v1` });
  try {
    const result = await (await postJson(app.baseUrl, '/api/investigate', { case: { id: 'ALT-24081' } })).json();
    assert.equal(result.engine, 'demo-rules');
    assert.equal(result.fallbackReason, 'invalid_final_response');
    assert.doesNotMatch(result.recommendation, /<script/i);
  } finally {
    await stopProcess(app.child);
  }
});

test('provider failure returns a safe diagnostic and deterministic fallback', async () => {
  mockCalls = [];
  mockResponses = [];
  mockStatus = 503;
  const app = await launchApp({ SIGNALFLOW_ENABLE_LLM: 'true', OPENAI_API_KEY: 'test-key', OPENAI_API_BASE: `http://127.0.0.1:${mockApiPort}/v1` });
  try {
    const result = await (await postJson(app.baseUrl, '/api/investigate', { case: { id: 'ALT-24081' } })).json();
    assert.equal(result.engine, 'demo-rules');
    assert.equal(result.fallbackReason, 'provider_unavailable');
    assert.equal(mockCalls.length, 1);
  } finally {
    mockStatus = 200;
    await stopProcess(app.child);
  }
});

test('rejects unknown cases and caller-supplied case details', async () => {
  const unknown = await postJson(defaultApp.baseUrl, '/api/investigate', { case: { id: 'NOT-A-DEMO-CASE' } });
  assert.equal(unknown.status, 404);
  const extraCaseFields = await postJson(defaultApp.baseUrl, '/api/investigate', { case: { id: 'ALT-24081', customer: 'Sensitive name' } });
  assert.equal(extraCaseFields.status, 400);
  const extraBodyFields = await postJson(defaultApp.baseUrl, '/api/investigate', { case: { id: 'ALT-24081' }, prompt: 'untrusted' });
  assert.equal(extraBodyFields.status, 400);
});

test('rejects wrong content types, malformed JSON, and oversized request bodies', async () => {
  const wrongType = await fetch(`${defaultApp.baseUrl}/api/investigate`, { method: 'POST', body: '{"case":{"id":"ALT-24081"}}' });
  assert.equal(wrongType.status, 415);
  const malformed = await fetch(`${defaultApp.baseUrl}/api/investigate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' });
  assert.equal(malformed.status, 400);
  const oversized = await fetch(`${defaultApp.baseUrl}/api/investigate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ case: { id: 'ALT-24081' }, padding: 'x'.repeat(4096) }) });
  assert.equal(oversized.status, 413);
});

test('rejects write verbs on static routes and makes no API CORS grant', async () => {
  const put = await fetch(`${defaultApp.baseUrl}/`, { method: 'PUT' });
  assert.equal(put.status, 405);
  assert.equal(put.headers.get('access-control-allow-origin'), null);
});

test('enforces the six-call agent budget across model turns', async () => {
  mockCalls = [];
  const excessiveCalls = Array.from({ length: 6 }, (_, index) => toolCall(`call-${index + 1}`, 'read_case_signals'));
  mockResponses = [
    completion({ role: 'assistant', content: null, tool_calls: excessiveCalls }),
    completion({ role: 'assistant', content: null, tool_calls: [toolCall('call-over-budget', 'get_review_checklist')] }),
  ];
  const app = await launchApp({ SIGNALFLOW_ENABLE_LLM: 'true', OPENAI_API_KEY: 'test-key', OPENAI_API_BASE: `http://127.0.0.1:${mockApiPort}/v1` });
  try {
    const result = await (await postJson(app.baseUrl, '/api/investigate', { case: { id: 'ALT-24081' } })).json();
    assert.equal(result.engine, 'demo-rules');
    assert.equal(result.fallbackReason, 'tool_call_limit');
    assert.equal(mockCalls.length, 2);
  } finally {
    await stopProcess(app.child);
  }
});
