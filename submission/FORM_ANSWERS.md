# HackCulture form — copy-paste answers

Use this only after the organizer answers the prior-work question in the official Discord. Do not describe the whole project as created from scratch for this challenge.

## Fields

**Project title**
```
SignalFlow — Evidence-Grounded AML Investigation Copilot
```

**Theme / primary problem statement**
```
AI Agents & Intelligent Systems → Innovative Solution for AI Agents & Intelligent Systems
```

**GitHub repository (public)**
```
https://github.com/VJoycelyn/signalflow
```

**Live demo**
```
https://vjoycelyn.github.io/signalflow/
```

**Demo video (optional per the instructions; welcome if offered)**
```
https://github.com/VJoycelyn/signalflow/blob/main/submission/SignalFlow-Demo-Video.mp4
```

**Pitch deck (upload this file)**
```
submission/SignalFlow-Pitch-Deck.pptx
```
Repository copy: https://github.com/VJoycelyn/signalflow/blob/main/submission/SignalFlow-Pitch-Deck.pptx

**Bifrost / Tavily integration**
```
Not used. This entry is submitted under the broad AI Agents & Intelligent Systems challenge only.
```

## Short description

```
SignalFlow is a synthetic-data AML investigation workbench. In explicitly enabled local model
mode, a bounded tool-using agent examines one fixed fictional case through four allowlisted
local tools — read synthetic signals, compare an illustrative baseline, check missing context,
and retrieve a sample review checklist — then drafts one of three permitted next steps. The
orchestrator caps the run at four model turns and six tool calls, requires an evidence path,
validates strict structured output, and displays the real server-returned tool trace. The agent
cannot close a case, file a report, freeze funds, search the web, or write to any case system.
A human analyst owns every disposition. The public GitHub Pages site is a separate deterministic
demo with browser-local fictional sample data and no model backend.
```

## AI and technology disclosure

```
Stack: HTML, CSS, vanilla JavaScript; Node.js built-in HTTP/fs modules for the loopback demo
server and agent orchestrator; GitHub Pages for the static public demo; OpenAI-compatible
chat-completions API with tool calling and strict final JSON-schema output for local model mode.

Verified model run: on 2 November 2026, one live run on fixed fictional case ALT-24081 completed
with GPT-6.1 Sol through the current Manus-provided OpenAI-compatible gateway. The server
executed three real local tool calls and returned a draft requiring analyst review. Sanitized
evidence: submission/LIVE_MODEL_RUN_EVIDENCE.json. This verifies that one gateway/model path, not
a participant-owned provider or every compatible endpoint.

Other AI/tools used: Manus AI assisted with coding and testing; Manus Speech generated the
narration in the demo video. No third-party npm runtime dependencies. Manrope and DM Mono are
loaded via Google Fonts under SIL Open Font License 1.1 (see THIRD_PARTY_NOTICES.md).

Automated tests (13) use a local mock provider and require no key.
```

## Prior-work disclosure

```
The SignalFlow interface and core prototype originated for the separate Azentio.ai Build Labs
event; its first public source commit is dated 13 October 2026. The Global AI Hackathon began on
9 October and its challenge prompts opened on 1 November. The bounded tool-using agent, its
tests, and the challenge-specific materials were developed after the Global prompt opened. This
adaptation is disclosed in the README, submission draft, deck, and demo video. The project does
not claim the overall AML alert-to-investigation workflow is unique or that the whole product was
created from scratch for this challenge.
```

## Data-safety note (include if the form has a limitations field)

```
All cases, scores, evidence items, and checklists are fictional. The risk score is a demo
prioritization signal, not a finding of misconduct. Browser-created samples stay in
localStorage and are never sent to the model. The local server accepts only five fixed synthetic
case IDs and binds to loopback. No measured AML outcomes are claimed; this is not a production
AML system, a bank integration, or legal/compliance advice.
```