# Global AI Hackathon — SignalFlow Submission Draft

- **Project title:** SignalFlow — Evidence-Grounded AML Investigation Copilot
- **Selected challenge:** **Innovative Solution for AI Agents & Intelligent Systems**
- **Public source repository:** https://github.com/VJoycelyn/signalflow
- **Public interactive demo:** https://vjoycelyn.github.io/signalflow/
- **Pitch deck:** [`submission/SignalFlow-Pitch-Deck.pptx`](./submission/SignalFlow-Pitch-Deck.pptx)
- **Optional demo video:** [`submission/SignalFlow-Demo-Video.mp4`](./submission/SignalFlow-Demo-Video.mp4)

## Problem

An AML alert is a starting signal, not a conclusion. An investigator may need to examine alert indicators, compare them with available context, identify missing information, and decide what should happen next. A score alone does not explain the evidence, the unanswered questions, or where human judgment is required.

For the broad AI Agents and Intelligent Systems challenge, SignalFlow asks: **How might a constrained agent gather review-relevant evidence through safe tools, show its work, and prepare a useful next step without taking a high-stakes decision away from a person?**

## Solution

SignalFlow is a synthetic-data AML investigation workbench. In explicitly enabled local model mode, a language model can select among four fixed local functions: read synthetic case signals, compare an illustrative synthetic baseline, identify missing context, and retrieve a sample analyst checklist. A bounded orchestrator limits the run to four model turns and six tool calls, requires an evidence path and other distinct tool use, and validates a strict structured final response. The interface displays the server-returned tool trace and resulting draft.

The permitted drafts are to escalate for enhanced due diligence, request supporting context, or continue standard analyst review. The model cannot close an alert, file a suspicious-activity report, freeze funds, search the web, access a bank system, or alter a case. A person owns every disposition.

The public GitHub Pages demo has no provider backend and cannot safely hold a provider secret. It uses deterministic fictional-case rules and identifies itself as static. The optional local runtime shows the tool-using agent only when the explicit enable flag and an approved key are configured. If model calls fail or output fails validation, it falls back to clearly labelled deterministic rules.

## Technical architecture and working prototype

The current presenter deck includes a technical architecture diagram and the actual local agent workspace. In short: browser UI → loopback-only Node.js server → bounded agent orchestrator → four fixed local tools over fictional fixtures → configured OpenAI-compatible model → schema-validated draft and visible trace → human disposition. The public GitHub Pages site is separate: static UI, deterministic rules, and browser-local sample data.

The public Demo Data view lets a user add, edit, remove, and restore fictional examples; changes persist in that browser only. The local agent API accepts only five fixed server-owned case IDs and does not accept browser-created records.

## What is new in the Global AI adaptation

After the Global challenge prompts opened, this adaptation added a model-selected, allowlisted local tool loop, per-tool server execution, a required evidence path, strict limits on turns and calls, structured-output validation, a visible trace of real tool results, and fallback tests. Browser-entered examples remain browser-only and are never sent to the agent.

The project does **not** claim that the underlying AML alert-to-investigation workflow is novel or unique. Existing AML platforms document comparable investigation and review functionality. SignalFlow demonstrates a small, transparent, synthetic-data agent implementation—not production capabilities or an exclusive market invention.

## Technologies and AI use

The interface uses HTML, CSS, and vanilla JavaScript. The local server and agent orchestrator use Node.js built-ins. The agent calls an OpenAI-compatible chat-completions endpoint with tool calling and strict final JSON-schema output. The public site is hosted on GitHub Pages. The repository README documents installation, implementation, technology choices, tests, and limitations. Manrope and DM Mono are loaded through Google Fonts under SIL Open Font License 1.1 terms; see [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md).

On **2 November 2026**, one live run on fixed fictional case `ALT-24081` succeeded using **GPT-6.1 Sol** through the current Manus-provided OpenAI-compatible model gateway. The response contained three real server-executed local tool calls—read synthetic signals, retrieve the review checklist, and check missing context—and a draft explicitly requiring analyst review. The updated video records that run. This verifies that specific gateway/model path in the current environment; it does **not** verify a participant-owned provider, every compatible endpoint, AML performance, or production readiness. No provider credential is included in the repository or video. A sanitized run record is in [`submission/LIVE_MODEL_RUN_EVIDENCE.json`](./submission/LIVE_MODEL_RUN_EVIDENCE.json).

Manus AI assisted with coding and testing, and Manus Speech generated the narration in the demo video. The submitting participant and each teammate must add any other models, agents, APIs, datasets, or development tools they personally used. Automated tests use a local mock provider and do not require a key or make paid model calls.

The authenticated HackCulture instructions say a team **can** use Bifrost by Maxim AI, Tavily, or both; the text explains the selection process for combined and Tavily-only entries. SignalFlow does not claim or select a Bifrost/Tavily integration because neither is implemented in this project.

## Prior-work and build-timing disclosure

The underlying SignalFlow interface and initial prototype originated for the separate **Azentio.ai Build Labs** event. Its first public source commit is dated **13 October 2026**. HackCulture's Global AI Hackathon began on 9 October, and its challenge prompts opened on 1 November. The bounded tool-using agent and challenge-specific materials were added after the Global prompt opened.

This history is disclosed rather than rewritten. The event's published build rule says the core project should be substantially developed during the official hackathon period. Although the first public commit falls within the overall event dates, the earlier prototype was made for a separate event and predates the Global prompts. The team should ask the organizer through the required Discord whether the existing core plus the new adaptation satisfies the rule. No claim is made that the entire project was first created for the Global prompt.

## Final checks before submission

The authenticated submission instructions reviewed on 2 November require a public repository with a detailed README and say the pitch deck should cover the problem, solution, technical architecture, and working prototype; the current deck is at the link above. They say deployment is not mandatory and welcome a live demo or demo video. The form's selected broad AI Agents challenge is consistent with the project. Before pressing Submit for Evaluation, confirm the organizer's interpretation of the prior-work/build rule; verify team size (1–4), one team per person, required Discord participation, and one final entry per team; complete each teammate's AI/tool disclosures; ensure the deck and URLs open; and attach the video if the form offers an optional upload. The readiness checklist contains the current evidence and remaining actions: [`HACKATHON_READINESS.md`](./HACKATHON_READINESS.md).

**Official event page:** https://hackculture.io/hackathons/ai-global-hackathon
