# Global AI Hackathon — SignalFlow Submission Draft

- **Project title:** SignalFlow — Bounded AML Investigation Agent
- **Selected challenge:** **Innovative Solution for AI Agents & Intelligent Systems**
- **Repository:** https://github.com/VJoycelyn/signalflow
- **Working public demo:** https://vjoycelyn.github.io/signalflow/
- **Local tool-using agent:** Available from the repository's loopback Node server when an operator explicitly enables a compatible model key. The GitHub Pages demo remains deterministic.

## Problem

An AML alert is a starting signal, not a conclusion. An investigator often needs to check the alert's indicators, compare them with available context, identify missing information, and decide what should happen next. A score alone does not explain what evidence supports a review, which questions remain unanswered, or where human judgment is needed.

For the broad AI Agents and Intelligent Systems challenge, the project asks: **How might a constrained agent gather review-relevant evidence through safe tools, show its work, and prepare a useful next step without taking a high-stakes decision away from a person?**

## Solution

SignalFlow is a synthetic-data AML investigation workbench. In local model mode, a language model can select from four fixed local functions: read the synthetic case signals, compare an illustrative synthetic baseline, identify missing context, and retrieve a sample analyst checklist. A bounded orchestrator limits the run to four model turns and six tool calls, requires the evidence and checklist tools plus at least one other distinct tool, and validates the model's final recommendation and rationale. The interface displays the actual local tool trace with the resulting draft.

The permitted draft actions are to escalate for enhanced due diligence, request supporting context, or continue standard analyst review. The model has no tool to close an alert, file a suspicious-activity report, freeze funds, search the web, access a bank system, or alter a case. A person owns every disposition.

The public GitHub Pages demo cannot safely hold a provider secret and has no model backend. It runs deterministic fictional-case rules and labels itself accordingly. The optional local runtime shows the tool-using agent only when the explicit enable flag and key are configured. If model calls fail or return invalid output, the app falls back to clearly labelled deterministic rules.

## What is new in the Global AI adaptation

This version was adapted to the selected AI Agents challenge after the challenge prompts opened. The new work adds an actual model-selected, allowlisted local tool loop, per-tool server execution, a required minimum evidence path, strict limits on turns and calls, structured output validation, a visible trace of real tool results, and fallback tests. Browser-entered examples remain browser-only and are not sent to the agent.

The project does **not** claim that the underlying AML alert-to-investigation idea is novel or unique. Existing AML platforms document comparable queues, evidence gathering, investigation support, recommendations, and human review. SignalFlow demonstrates a small, transparent, synthetic-data agent implementation rather than production capabilities or an exclusive market invention.

## Technologies and tools

The interface uses HTML, CSS, and vanilla JavaScript. The local server and agent orchestrator use Node.js built-ins. The agent uses an OpenAI-compatible chat-completions endpoint with function/tool calling; `gpt-4o-mini` remains the environment-template default, but teams must set a compatible model actually offered by their provider. The public site is hosted on GitHub Pages. The page loads Manrope and DM Mono using Google Fonts under their respective SIL Open Font License 1.1 terms, recorded in `THIRD_PARTY_NOTICES.md`. The project currently has no third-party npm runtime packages and no project-level software `LICENSE`.

Manus AI assisted with coding and testing. The submitting participant and every team member must add any other models, agents, APIs, datasets, or developer tools they personally used. Testing is performed with synthetic fixtures; the automated model-agent tests use a local mock provider and do not require an API key or make paid model calls. A real-provider smoke attempt in the current sandbox returned the deterministic fallback because the sandbox model catalog did not include the template's `gpt-4o-mini` setting. The model-backed path must be verified with the actual provider/model used in the final presentation.

## Demonstration and impact

The demo shows the case queue, synthetic record editing, a bounded local agent run with its actual tool trace, and the analyst-controlled review gate. Public/static mode is shown separately and uses deterministic rules only. We have not measured reductions in investigation time, false positives, or compliance risk. Potential impact is a hypothesis for a future user study, not a demonstrated result.

## Prior-work and build-timing disclosure

The underlying SignalFlow interface and initial prototype originated for the separate Azentio.ai Build Labs event. Its first public source commit is dated 13 October 2026. HackCulture's Global AI Hackathon event began on 9 October, and its challenge prompts opened on 1 November. The tool-using agent and the challenge-specific submission materials were developed after selection of this Global AI challenge.

This history is disclosed rather than rewritten. The published HackCulture rule says the core project should be substantially developed during the official hackathon period, and the pre-prompt work falls within the overall event dates but was made for a separate event. The team should ask the organizer in the required Discord whether this existing core plus the new adaptation meets the rule before submission. No claim is made that the earlier prototype was first created after the Global prompt was released.

## Submission checks still required

Before final submission, confirm the organizer's answer about the disclosed prior work; verify the registered team has one to four people, each participant belongs to only one team, the team joined the official Discord, and only one final entry will be submitted. Recheck the logged-in HackCulture form for current required fields. The existing demo video was recorded before the tool-using agent was implemented, so it demonstrates only the older deterministic workflow and must be replaced or clearly limited if a video is required.
