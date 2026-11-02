# SignalFlow originality and Global AI Hackathon readiness review

- **Review date:** 2 November 2026
- **Selected challenge:** Innovative Solution for AI Agents & Intelligent Systems
- **Repository:** https://github.com/VJoycelyn/signalflow

## Bottom line

The selected challenge now has a substantive implementation: a bounded local model agent can choose among four allowlisted synthetic-data tools, must inspect required evidence/checklist sources, returns a constrained draft, and displays its actual tool trace. The public GitHub Pages demo is deliberately static and deterministic. The 13 automated server tests pass with a local mock provider, but a live-provider smoke attempt in this development environment fell back because its model catalog did not include the configured `gpt-4o-mini`. The actual provider/model for the final demonstration still needs an end-to-end tool-trace test.

SignalFlow may be described as an independently scoped prototype, but not as a unique AML workflow or a legally certified original. The existing UI originated for the separate Azentio.ai Build Labs event. The new agent adaptation followed the Global challenge release; the organizer should confirm whether reusing the existing core satisfies the event's build rule before the team submits.

## Originality assessment

The general AML alert-to-investigation pattern is established. NICE Actimize, SAS, Feedzai, ComplyAdvantage, Unit21, and HAWK AI each publicly describe combinations of transaction alerts, investigation or case views, evidence/context, explanations or recommendations, and analyst review.[2] [3] [4] [5] [6] [7] Some also market AI or agent functionality. That overlap is evidence of a common product category, not evidence that SignalFlow copied their code, wording, or assets.

The defensible project claim is narrower: SignalFlow is a synthetic-data workbench with browser-local sample editing, a deterministic public demo, and an optional loopback-only agent implementation with fixed local tools and a visible tool trace. The six-vendor comparison and supplied project materials did not reveal evidence of copying, but they were not a source-code similarity scan, legal review, or guarantee of originality. Do not call the concept “first,” “unique,” or “patentable.”

## Challenge-specific implementation

The chosen broad challenge is **Innovative Solution for AI Agents & Intelligent Systems**.[1] The added local tool loop allows the model to select from four server-side functions over fixed synthetic records: read case signals, compare an illustrative demo baseline, check missing context, and retrieve a sample analyst checklist. The orchestrator limits execution to four model turns and six calls. It requires the evidence and checklist functions plus at least one other distinct tool, validates requested function names and case IDs, and accepts only an allowlisted structured recommendation. The model cannot call external search or write to a financial institution's case system. It cannot disposition or close a case. The analyst owns the decision.

Editable browser records remain in that browser and are never sent to the model endpoint. The server accepts only five server-owned fixture IDs. It binds to loopback and exposes only allowlisted public assets. When a model or protocol step fails, the result is deterministic and the UI identifies that no AI tools ran. These controls make the prototype's agent behavior inspectable; they do not make it a production AML service.

## Requirement check

- **Working project and source — prepared.** The repository contains the static website, data-entry workflow, local Node server, agent engine, tests, setup instructions, and submission materials. The public website has previously been smoke-tested with browser-local data updates. Repeat browser QA after the final deployment.
- **Challenge and project description — prepared.** The selected broad prompt, problem, solution, AI tools, and project limits are described in the submission draft.
- **Use of AI — implemented, live provider unverified.** The source implements genuine model-selected function calls. The 13 automated tests use a local mock provider. One real-provider attempt in this environment returned `provider_unavailable`; its gateway did not list the configured default model name. Use a compatible model that the submitting team's chosen provider actually supports and verify a real tool trace before presenting this mode as working.
- **Responsible development — prepared.** The app uses fictional cases and a human decision gate; no real customer data, production integration, immutable audit system, validated compliance result, or performance metric is claimed.
- **Third-party rights — documented in part.** Manrope and DM Mono are loaded through Google Fonts and their SIL Open Font License 1.1 notices are listed in `THIRD_PARTY_NOTICES.md`.[8] [9] There are no third-party npm runtime packages. The repository has no project-level software license, so public access should not be described as a reuse license.
- **Demo video — out of date for the agent feature.** The included video predates this tool-agent work and shows the deterministic interface/data workflow only. Replace it if the live form requires a video or if using it to claim an AI demonstration. The user-provided screenshots did not show a required marker beside the video or PPT fields, but the logged-in form should be rechecked before submission.[1]
- **Eligibility — partially confirmed.** The supplied HackCulture screenshot displayed “You're eligible” for the account. The repository cannot verify the registered team size, one-team-per-person status, Discord membership, or coordination of the team's single final entry. The event rule allows a team of one to four and requires participants to join the official Discord.[1]

## Build timing and prior work

The first public SignalFlow source commit is dated 13 October 2026. The project materials state that the original UI/core prototype was created for the separate Azentio.ai Build Labs event. HackCulture lists the Global event period as 9 October–29 November and the prompt/prototype window as 1–15 November; its rules say the core project should be substantially developed during the event.[1] The new tool-using agent and Global-specific materials were developed after the prompts opened on 1 November.

This timeline is disclosed. It does not justify saying that the entire project was created for the Global challenge. Because the earlier prototype was made for a different event and predates the selected prompt, obtain the organizer's interpretation in the required Discord and keep the response. Do not submit if the organizer says this reuse is ineligible.

## Before submission

1. Configure a model actually supported by the chosen OpenAI-compatible provider, then run a built-in fictional case and confirm the UI shows a real multi-tool trace rather than the deterministic fallback.
2. Ask the organizer in the official Discord whether the disclosed Azentio-originated core plus this post-prompt agent adaptation meets the build rule.
3. Recheck the logged-in submission form. If video is required, replace the old deterministic-only recording with one that shows the true local agent mode. Do not use the old PowerPoint without updating its Island-Tales links.
4. Confirm the registered team has 1–4 people, each participant is on only one team, all participants joined the Discord, and the team will make one final submission.
5. Keep the AI/tool disclosure complete for every teammate. Preserve the synthetic-data and non-production caveats. Do not enter real customer data or expose a key in a public demo or recording.

## References

[1]: https://hackculture.io/hackathons/ai-global-hackathon "Global AI Hackathon by Geek Room on HackCulture"
[2]: https://www.niceactimize.com/anti-money-laundering/suspicious-activity-monitoring "NICE Actimize Suspicious Activity Monitoring"
[3]: https://www.sas.com/en_us/software/anti-money-laundering.html "SAS Anti-Money Laundering"
[4]: https://www.feedzai.com/solutions/aml-transaction-monitoring/ "Feedzai AML transaction monitoring"
[5]: https://complyadvantage.com/mesh/transaction-monitoring-software/ "ComplyAdvantage transaction monitoring"
[6]: https://www.unit21.ai/products/aml-transaction-monitoring "Unit21 AML transaction monitoring"
[7]: https://hawk.ai/solutions/aml/transaction-monitoring "HAWK AI transaction monitoring"
[8]: https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt "Manrope SIL Open Font License 1.1"
[9]: https://raw.githubusercontent.com/google/fonts/main/ofl/dmmono/OFL.txt "DM Mono SIL Open Font License 1.1"
