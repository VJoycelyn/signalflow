# Global AI Hackathon — SignalFlow Readiness

- **Review date:** 2 November 2026
- **Selected challenge:** Innovative Solution for AI Agents & Intelligent Systems
- **Repository:** https://github.com/VJoycelyn/signalflow
- **Public demo:** https://vjoycelyn.github.io/signalflow/
- **Presenter deck:** [`submission/SignalFlow-Pitch-Deck.pptx`](./submission/SignalFlow-Pitch-Deck.pptx)
- **Demo video:** [`submission/SignalFlow-Demo-Video.mp4`](./submission/SignalFlow-Demo-Video.mp4)

## Decision

**Technical package: ready against the requirements currently visible in the authenticated HackCulture submission instructions. Eligibility: hold for organizer clarification about disclosed prior work.** The repository is public and has installation/implementation/technology documentation; the seven-slide presenter deck covers the problem, solution, architecture, and working prototype; the live demo works; and a current captioned video is available. One genuine GPT-6.1 Sol run returned three real tool calls and a human-gated draft.

Do **not** describe the whole product as created from scratch for the Global AI Hackathon. The SignalFlow interface/core originated for the separate Azentio.ai Build Labs event and was publicly committed on 13 October. The Global challenge prompts opened on 1 November; the bounded model-agent implementation and Global-specific materials were added after that. Ask the organizer whether the disclosed adaptation meets the build rule before pressing the final submit control. If the organizer says no, or does not clarify, do not imply eligibility.

## Requirements confirmed in the authenticated submission panel

| Requirement shown in HackCulture | SignalFlow status | Evidence / action |
|---|---|---|
| Select a primary problem statement from the Theme dropdown | **Selected** | Innovative Solution for AI Agents & Intelligent Systems |
| Public GitHub repository | **Ready** | https://github.com/VJoycelyn/signalflow |
| Detailed README covering project, installation, implementation, and technologies | **Ready** | `README.md` documents all four, plus boundaries and AI use |
| Pitch deck explains problem, solution, technical architecture, and working prototype | **Ready** | Seven-slide `submission/SignalFlow-Pitch-Deck.pptx`; updated to include architecture and the genuine agent-workspace screenshot |
| Deployed app | **Not required** | HackCulture says deployment is not mandatory; a public static demo is available |
| Live demo or demonstration video | **Optional/welcome** | Live URL and current captioned MP4 are available; attach video if the actual form provides a useful optional field |
| Bifrost by Maxim AI, Tavily, or both | **Optional per wording** | Instructions say teams “can” use these technologies and describe how to report a combined project. SignalFlow does not claim either integration; do not mark one as used unless implemented and verified. |

The submission instructions were visible in the authenticated program dashboard at the “Problem Statements & Prototype Submission” phase. Official public event page: [HackCulture — Global AI Hackathon](https://hackculture.io/hackathons/ai-global-hackathon).

## Build window and prior-work eligibility — **organizer clarification required**

The overall event runs 9 October–29 November 2026; the prototype/challenge window runs 1–15 November. The first public SignalFlow source commit is dated **13 October 2026**, within the overall event dates but before the Global prompt release. The existing interface/core was created for the separate Azentio.ai Build Labs event. The bounded tool-using agent, its tests, and Global-specific materials were added after the Global prompts opened on 1 November.

This provenance is disclosed in the README, submission draft, deck/repository materials, and current demo video. The event rule says the core project should be substantially developed during the hackathon. The available public rule text does not resolve how a pre-prompt project from another event may be adapted. Ask the organizer in the official Discord and keep the answer. This is an eligibility question, not a technical defect.

## Working AI agent and responsible scope — **verified within limits**

The optional local agent can choose among four fixed functions over server-owned fictional cases: read synthetic signals, compare an illustrative baseline, check missing context, and retrieve a sample analyst checklist. The server bounds execution to four model turns and six tool calls, requires an evidence path, validates structured output, and exposes no web search, bank-system, disposition, or case-write tool. The analyst retains the decision. Custom browser-entered examples never reach the agent; only five fixed synthetic case IDs are accepted. The server binds to loopback; do not expose provider credentials or use real customer data.

Automated tests: **13/13 passing**, using a local mock provider. Separately, on 2 November 2026, a live run on synthetic case `ALT-24081` used **GPT-6.1 Sol through the current Manus-provided OpenAI-compatible gateway**, executed three real local tools, and returned a draft with `humanDecisionRequired: true`. See [`submission/LIVE_MODEL_RUN_EVIDENCE.json`](./submission/LIVE_MODEL_RUN_EVIDENCE.json) and the updated MP4. This verifies that one gateway/model setup only—not a participant-owned key, all providers, AML accuracy, or production readiness. If the team presents on a different model/provider, verify that exact configuration first.

The public GitHub Pages site is a separate deterministic static experience; it makes no model call and labels its fallback honestly. The local model-backed agent is not hosted on that public page.

## Other submission and participant checks

- The account profile previously displayed “You're eligible”; confirm it remains current.
- Confirm the registered team has **1–4 members**, each participant is on only one team, and all participants joined the required Discord.
- Coordinate the team's single final project submission and gather each teammate's personal AI/tool disclosures.
- The current public event page welcomes a demo video but does not make deployment mandatory. The authenticated instructions say video/live demo are welcome; neither is a technical blocker.
- Keep fictional-data and non-production caveats. Do not claim measured impact, AML accuracy, production integrations, or unique invention.
- The public repository currently has no project-level license; access does not grant a reuse license.

## When to submit

The prototype window closes **15 November 2026 at 11:59 PM India Standard Time** (1:29 PM Eastern Standard Time that day). Aim for **14 November** to leave a buffer.

**Recommended sequence:** ask the organizer now about prior-work eligibility; preserve their reply; confirm team and personal disclosures; make any required edits to the Pending HackCulture draft; attach this deck and optionally the current demo video if the form has upload fields; re-open every URL; then submit for evaluation only after eligibility is clear and all fields are accurate. Do not claim the entire project was newly created for this hackathon.

## Sources

- [Global AI Hackathon event page](https://hackculture.io/hackathons/ai-global-hackathon)
- Authenticated program dashboard: “Problem Statements & Prototype Submission” instructions (reviewed 2 November 2026).