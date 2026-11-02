# SignalFlow — evidence-grounded AML investigation copilot

**Selected Global AI Hackathon challenge:** Innovative Solution for AI Agents & Intelligent Systems

- **Public demo:** https://vjoycelyn.github.io/signalflow/
- **Public source repository:** https://github.com/VJoycelyn/signalflow
- **Presenter deck:** [`submission/SignalFlow-Pitch-Deck.pptx`](./submission/SignalFlow-Pitch-Deck.pptx)
- **Current demo video:** [`submission/SignalFlow-Demo-Video.mp4`](./submission/SignalFlow-Demo-Video.mp4) — a captioned recording of one real local agent run, its three returned tool calls, the analyst gate, and the separate public static demo.

SignalFlow is a synthetic-data AML investigation workbench. In explicitly enabled local model mode, a bounded tool-using agent examines fixed fictional case evidence and drafts a review step. The analyst owns every disposition. The public demo remains deterministic and has no model backend.

## Challenge and project history

The selected challenge is **Innovative Solution for AI Agents & Intelligent Systems**. The prototype demonstrates one bounded agent with a fixed server-side tool set, visible tool trace, structured output validation, and a human decision gate. It does not claim that the overall AML alert-to-investigation workflow is unique or that this is a production AML system.

The existing SignalFlow interface and core prototype originated for the separate **Azentio.ai Build Labs** event and were first publicly committed on **13 October 2026**. The Global AI Hackathon began on 9 October; its challenge prompts and prototype window opened on 1 November. The tool-using agent and the Global-specific materials were added after that prompt opened. This is an adaptation of earlier work, not a claim that every part was created from scratch for the Global prompt. The organizer should confirm how this disclosed history is treated under the build rule; see [`HACKATHON_READINESS.md`](./HACKATHON_READINESS.md).

## What runs where

The public GitHub Pages site is static. It uses deterministic rules, has no deployed model backend, and never sends a case to an AI service. Its Demo Data view supports adding, editing, removing, and restoring fictional examples. Browser-created records persist in that browser's `localStorage` and are never sent to the local agent endpoint.

The actual model-backed agent runs only when the Node server is started locally with an explicit opt-in and an approved OpenAI-compatible API key. The server accepts only one of five fixed, server-owned synthetic case IDs; it rejects caller-supplied case facts and free text. The model may call only local fixture tools—no web search, source-system access, disposition action, or general-purpose external tool is exposed. Execution is bounded to four model turns and six tool calls; the final structured response is validated before display. If the key is absent, a call fails, required tools are skipped, or output is invalid, the local app shows a clearly labelled deterministic fallback.

The investigation panel identifies the runtime mode. It shows an actual server-returned trace only when a valid local model-agent run occurs. In the public static demo or on fallback, it says that no model or agent tools ran. The agent cannot decide, close, escalate, file a report, freeze funds, or update a case system.

## Run locally

Requires Node.js 18 or newer. There are no installed npm runtime dependencies.

```bash
npm run dev
# open http://127.0.0.1:4173
```

This starts deterministic mode. To opt in to local model mode, provide a key and model supported by your chosen OpenAI-compatible provider:

```bash
SIGNALFLOW_ENABLE_LLM=true OPENAI_API_KEY=your_approved_key OPENAI_MODEL=your_tool_calling_model npm run dev
```

The model must support tool calling and strict JSON-schema output. Set `OPENAI_API_BASE` only for a compatible endpoint other than `https://api.openai.com/v1`. Do not put keys in `.env.example`, browser code, screenshots, shell history, or Git. The local server binds to `127.0.0.1`; do not expose it to a public network. Never enter real customer data.

Run `npm test` for dependency-free HTTP, security, agent-tool-loop, validation, and fallback tests. The suite uses a local mock provider and does not call a paid model service. On 2 November 2026, one genuine run on fixed fictional case `ALT-24081` completed with **GPT-6.1 Sol** through the current Manus-provided OpenAI-compatible gateway. The server returned three actual local tool calls and a draft that retained the human decision gate; see [`submission/LIVE_MODEL_RUN_EVIDENCE.json`](./submission/LIVE_MODEL_RUN_EVIDENCE.json). This verifies that specific gateway/model path, not a participant-owned provider or every compatible endpoint. Re-test any different provider/model you plan to present.

## Hackathon requirements and materials

The authenticated HackCulture submission instructions ask for a **public GitHub repository with a detailed README** covering the project, installation, implementation, and technologies used. They say the **pitch deck should explain the problem, solution, technical architecture, and working prototype**. The current seven-slide deck covers those elements and links to this standalone repository and demo. A deployed application is not mandatory; the instructions welcome a live demo or demonstration video. Both are available here.

The same instructions say a team can use Bifrost by Maxim AI, Tavily, or both, and explain how to mark a combined entry. SignalFlow does not claim to integrate either partner technology; it is submitted under the broad AI Agents & Intelligent Systems challenge. Do not select or describe a Bifrost/Tavily integration unless the team actually adds and verifies it.

The hackathon’s submission window closes **15 November 2026 at 11:59 PM IST**. Before final submission, the team must confirm roster and participation requirements and ask the organizer whether the disclosed Azentio-originated core plus the post-prompt agent adaptation satisfies the event's build rule. See [`HACKATHON_READINESS.md`](./HACKATHON_READINESS.md) for the source-linked readiness checklist and submit/hold recommendation.

## AI use, technology, and third-party assets

- **Agent runtime:** optional OpenAI-compatible chat-completions model with tool calling and strict final JSON-schema output.
- **Agent tools:** four local functions over fixed synthetic server data; no external data-fetching or write tools.
- **Application:** HTML, CSS, vanilla JavaScript, Node.js built-in HTTP and filesystem modules; GitHub Pages hosts the static public demo.
- **AI/development disclosure:** Manus AI assisted with coding and testing; Manus Speech generated the narration in the demo video. The verified live run used GPT-6.1 Sol through the current Manus-provided gateway. Each participant must disclose any additional models, agents, APIs, datasets, and developer tools they personally used.
- **Fonts:** Manrope and DM Mono are loaded through Google Fonts. Their SIL Open Font License 1.1 notices are in [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md). There are no third-party npm runtime dependencies.

The repository currently has no project-level `LICENSE` file. Public repository access alone does not grant a software license. The project owner should choose whether and how to license the source; no license has been added on the owner's behalf.

## Data safety and limitations

Every built-in case, metric, evidence item, and playbook step is fictional. The risk score is a demo prioritization signal, not a finding of misconduct. Custom examples stay in browser storage and never reach the model. The agent sees only fixed server-owned sample cases and has no disposition or external-search tool.

The event trace exists only in the current browser session; it is not durable, immutable, or connected to an AML platform. The prototype lacks production identity, tenant isolation, retention, an enterprise audit ledger, monitoring integrations, AML-owner validation, and production deployment controls. Its recommendation is a draft for human review, not legal, regulatory, or compliance advice.

## Project files

- `index.html`, `style.css`, `app.js` — responsive case queue, accessible workspace, synthetic-data editor, runtime disclosure, and validated trace rendering.
- `server.mjs` — loopback-only API server, synthetic fixture allowlist, and static-asset allowlist.
- `agent-engine.mjs` — four fixed tool definitions, bounded model loop, response validation, and deterministic fallback.
- `tests/server.test.mjs` — mock-provider tests for the server, AI opt-in, tool loop, unsafe/invalid output, and fallback.
- `submission/SignalFlow-Pitch-Deck.pptx` — current presenter deck.
- `submission/SignalFlow-Demo-Video.mp4` — current captioned demo recording.
- `GLOBAL_AI_HACKATHON_SUBMISSION.md` — selected challenge, solution, tools, prior-work disclosure, and proposed form text.
- `HACKATHON_READINESS.md` — source-linked requirement mapping and remaining organizer/participant actions.
- `SIGNALFLOW_ORIGINALITY_AND_SUBMISSION_REVIEW.md` — conservative market-overlap and submission review.
- `proposal/AML_Architecture_Tech_Stack_Proposal.md` — broader production architecture proposal, not a description of the current runtime.
