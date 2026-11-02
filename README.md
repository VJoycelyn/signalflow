# SignalFlow — synthetic AML investigation agent

**Selected Global AI Hackathon challenge:** Innovative Solution for AI Agents & Intelligent Systems

- **Public demo:** https://vjoycelyn.github.io/signalflow/
- **Source repository:** https://github.com/VJoycelyn/signalflow
- **Current demo video:** [`submission/SignalFlow-Demo-Video.mp4`](./submission/SignalFlow-Demo-Video.mp4) — recorded before the tool-using agent was added; use it only to show the deterministic UI/data workflow, not the new AI-agent behavior.

SignalFlow is an AML investigation prototype built around fictional alerts. The hackathon-specific version adds a bounded, tool-using AI agent: on the local server, a model selects from four allowlisted functions to inspect synthetic signals, compare an illustrative demo baseline, identify missing context, and retrieve an example review checklist. It then drafts one of three permitted next steps. A human must make every disposition.

## What runs where

The public GitHub Pages site is static. It uses deterministic rules, contains no deployed model backend, and never sends a case to an AI service. Its Demo Data view supports adding, editing, removing, and restoring fictional examples; browser-created records persist in that browser's localStorage and are never sent to the local agent endpoint.

The actual model-backed agent runs only when the Node server is started locally with an explicit opt-in and an approved OpenAI-compatible API key. The server accepts only one of five fixed, server-owned synthetic case IDs. It rejects caller-supplied case facts and free text. The model may call only the local fixture tools—no web search, source-system access, disposition action, or general-purpose external tool is exposed to it. The server limits the run to four model turns and six tool calls, requires the evidence and checklist tools plus at least one additional distinct tool, and validates the final structured response against an allowlist. If the key is absent, a call fails, the agent skips tools, or the output is invalid, the local app shows the deterministic fallback instead.

The investigation panel identifies the runtime mode. When the local tool agent returns a valid result, it shows the actual server-returned tool trace. When the public/static demo or fallback is used, the interface says that no model or agent tools ran. The model cannot decide, close, escalate, file a report, freeze funds, or update a case system. The analyst remains responsible for review and disposition.

## Run locally

Requires Node.js 18 or newer. There are no installed npm runtime dependencies.

```bash
npm run dev
# open http://127.0.0.1:4173
```

This starts deterministic mode. To enable the local tool-using agent, explicitly opt in and provide a key in the process environment:

```bash
SIGNALFLOW_ENABLE_LLM=true OPENAI_API_KEY=your_approved_key OPENAI_MODEL=gpt-4o-mini npm run dev
```

`gpt-4o-mini` is the existing environment-template default, not a guaranteed model on every compatible provider. Set `OPENAI_MODEL` to a model your chosen endpoint actually offers and that supports tool calling. Set `OPENAI_API_BASE` only when using a compatible endpoint other than `https://api.openai.com/v1`. Do not put keys in `.env.example`, browser code, screenshots, shell history, or Git. The local server binds to `127.0.0.1`; do not expose it to a public network. Only fixed fictional cases may be sent to the model. The app must not receive real customer data.

Run `npm test` for dependency-free HTTP, security, agent-tool-loop, validation, and fallback tests. The suite uses a local mock provider and does not call a paid model service or require an API key. A live-provider test in the current development environment fell back because its model catalog did not include the template's `gpt-4o-mini` setting. Configure a tool-capable model available from your provider and verify that the UI returns a real tool trace before presenting the agent as active.

## Hackathon problem and project history

The selected challenge is the broad **Innovative Solution for AI Agents & Intelligent Systems** prompt. SignalFlow applies a constrained tool-using agent to a high-stakes investigation workflow: the model can gather only the server's fixed synthetic evidence, baseline, missing-context, and sample-checklist results, then produce a reviewable draft with a visible tool trace. Its scope is intentionally narrower than a general autonomous agent, and its human gate is part of the design.

The existing SignalFlow UI and core prototype originated for the separate Azentio.ai Build Labs event and was first publicly committed on 13 October 2026. HackCulture's event began on 9 October, but its challenge prompts opened on 1 November. The new tool-using agent work is a Global AI Hackathon adaptation developed after the prompt opened. This README preserves the history rather than claiming that the earlier prototype was created for the Global prompt. The rules say the core project should be substantially developed during the event; the organizer should confirm how the earlier, other-event prototype and this new adaptation are treated. See [`HACKATHON_READINESS.md`](./HACKATHON_READINESS.md) for the remaining pre-submission actions.

The high-level AML alert-to-investigation workflow is common in the market; SignalFlow does not claim to be the first, unique, or a production AML system. Its demonstrable scope is a synthetic investigator workbench with a bounded local tool agent, visible tool trace, browser-only data editing, deterministic fallback, and human-owned decisions.

## AI, technologies, and other tools

- **AI runtime:** optional OpenAI-compatible chat-completions model with function/tool calling. The default model label is `gpt-4o-mini`; select a compatible model that supports tool calls.
- **Agent tools:** four local functions over fixed synthetic server data; no external data-fetching or write tools.
- **Application:** HTML, CSS, vanilla JavaScript, Node.js built-in HTTP and filesystem modules; GitHub Pages for the static public demo.
- **Development assistance:** Manus AI assisted with coding and testing. The project owner and every teammate must disclose any additional models, agents, APIs, and developer tools they use.
- **Third-party assets:** Manrope and DM Mono are loaded through Google Fonts. Their SIL Open Font License 1.1 notices are recorded in [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md). There are no third-party npm runtime packages.

The repository currently has no project-level `LICENSE` file. Public repository access alone does not grant a software license. The project owner should choose whether and how to license the project source before inviting reuse; do not add a license without the owner's approval.

## Data safety and limitations

Every built-in case, metric, evidence item, and playbook step is fictional. The risk score is a demo prioritization signal, not a finding of misconduct. Local custom examples remain in browser storage and never reach the model. The agent operates only on fixed server-owned sample cases, receives no real transaction feed or source-system record, and has no disposition or external search function.

The event trace exists only in the current browser session. It is not durable, immutable, or connected to an AML platform. The prototype lacks production identity, tenant isolation, retention, an enterprise audit ledger, monitoring integrations, AML-owner validation, and production deployment controls. The generated recommendation is a draft for human review, not legal, regulatory, or compliance advice.

## Project files

- `index.html`, `style.css`, `app.js` — responsive case queue, accessible workspace, synthetic-data editor, runtime disclosure, and validated agent trace rendering.
- `server.mjs` — loopback-only API server, synthetic fixture allowlist, and static-asset allowlist.
- `agent-engine.mjs` — four fixed tool definitions, bounded model loop, response validation, and deterministic fallback.
- `tests/server.test.mjs` — mock-provider tests for the server, AI opt-in, tool loop, unsafe/invalid output, and fallback.
- `GLOBAL_AI_HACKATHON_SUBMISSION.md` — selected challenge, solution, AI/tool disclosure, and prior-work statement.
- `HACKATHON_READINESS.md` — rule-by-rule readiness and remaining participant/organizer actions.
- `SIGNALFLOW_ORIGINALITY_AND_SUBMISSION_REVIEW.md` — conservative market-overlap assessment and current submission blockers.
- `DEMO_SCRIPT.md` — current script for demonstrating the real local agent and the static fallback accurately.
- `proposal/AML_Architecture_Tech_Stack_Proposal.md` — broader production architecture proposal, not a description of the current runtime.
