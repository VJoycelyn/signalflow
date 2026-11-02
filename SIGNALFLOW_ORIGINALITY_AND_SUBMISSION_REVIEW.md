# SignalFlow originality and Global AI Hackathon readiness review

- **Review date:** 2 November 2026
- **Selected challenge:** Innovative Solution for AI Agents & Intelligent Systems
- **Repository:** https://github.com/VJoycelyn/signalflow
- **Public demo:** https://vjoycelyn.github.io/signalflow/

## Bottom line

SignalFlow has a substantive challenge-specific agent implementation in its local Node runtime. A model selects and calls allowlisted tools over fixed fictional cases; the UI shows the actual returned trace. The 13 automated server tests pass using a local mock provider. Separately, a live run on case `ALT-24081` completed on 2 November using GPT-6.1 Sol through the current Manus-provided OpenAI-compatible gateway. It returned three server-executed tools and a human-gated draft. A captioned video records that run, and a sanitized record is in `submission/LIVE_MODEL_RUN_EVIDENCE.json`.

The authenticated HackCulture submission instructions ask for a public repository with a detailed README and say the pitch deck should cover the problem, solution, technical architecture, and working prototype. A revised seven-slide presenter deck now covers those items and links to the standalone project. Deployment is not mandatory; a live demo or video is welcome. The same instructions say teams can use Bifrost, Tavily, or both; SignalFlow does not claim either integration.

**Technical package: ready to present. Eligibility: do not claim the full project was created from scratch for the Global prompt.** The original interface/core came from the separate Azentio.ai Build Labs project and predates the Global prompts. Ask the organizer whether the new agent adaptation and transparent reuse satisfy the build rule before final submission.

## Originality assessment

The general AML alert-to-investigation pattern is established. NICE Actimize, SAS, Feedzai, ComplyAdvantage, Unit21, and HAWK AI publicly describe combinations of transaction alerts, investigation or case views, evidence/context, explanations or recommendations, and analyst review.[2–7] Some also market AI or agent functionality. That overlap indicates a common product category; it is not evidence that SignalFlow copied their code, wording, or assets.

The defensible project claim is narrower: SignalFlow is a synthetic-data workbench with browser-local sample editing, a deterministic public demo, and an optional loopback-only agent implementation with fixed local tools and a visible trace. The reviewed sources did not reveal evidence of copying, but this was not a source-code similarity scan, legal review, or guarantee of originality. Do not call the concept first, unique, or patentable.

## Requirement and implementation review

- **Public project and README — ready.** The repository contains installation steps, implementation description, technology stack, tests, limitations, and disclosures.
- **Pitch deck — ready.** `submission/SignalFlow-Pitch-Deck.pptx` covers the problem, solution, technical architecture, and working prototype; its links point to the separate public SignalFlow repository and demo.
- **Working prototype — ready within stated scope.** The public site supports browser-local fictional-data CRUD; the loopback server runs the local model-agent mode only with explicit opt-in.
- **Live model path — one configuration verified.** GPT-6.1 Sol through the current Manus-provided gateway returned three tools on `ALT-24081`. This does not verify a participant-owned provider or any other model.
- **AI and human safety — disclosed.** Fixed synthetic-only inputs, bounded calls, strict output validation, transparent tool traces, deterministic fallback, and human-owned decisions; no real-customer data or production integration.
- **Demo video — available, optional per the authenticated instructions.** The current MP4 shows the tool trace and separate static demo.
- **Partner tools — not claimed.** The form says a team can use Bifrost, Tavily, or both; no integration is represented as present.
- **Third-party fonts — documented.** Manrope and DM Mono use SIL Open Font License 1.1; no third-party npm runtime packages. The repository has no project-level software license, so public access should not be described as granting reuse rights.

## Build timing and prior work

The first public SignalFlow source commit is dated **13 October 2026**. The original UI/core was developed for Azentio.ai Build Labs. The Global event started on 9 October, but the challenge prompts opened on 1 November. The tool-using agent and Global-specific materials were developed after those prompts opened.

The history is disclosed. It does not justify saying the entire project was first created for the Global challenge. The event's build rule says the core project should be substantially developed during the hackathon; its public wording does not decide how this earlier other-event project may be adapted. Obtain the organizer's ruling in the required Discord and keep the response. If the organizer says the reuse is ineligible, do not submit it as eligible.

## Before final submission

1. Ask the organizer whether the disclosed Azentio-originated core plus the post-prompt agent adaptation meets the build rule.
2. Confirm the account remains eligible, team size is 1–4, every participant is on only one team, all have joined the required Discord, and the team will make one final submission.
3. Add each teammate's personal AI/tool disclosures.
4. Use the current presenter deck and standalone repository/demo links; attach the optional MP4 if the form offers the field.
5. If using a different provider/model than the recorded GPT-6.1 Sol gateway run, verify that exact configuration before claiming it is active.
6. Preserve synthetic-data and non-production caveats; never expose keys or enter real customer data.

## References

[1]: https://hackculture.io/hackathons/ai-global-hackathon "Global AI Hackathon by Geek Room on HackCulture"
[2]: https://www.niceactimize.com/anti-money-laundering/suspicious-activity-monitoring "NICE Actimize Suspicious Activity Monitoring"
[3]: https://www.sas.com/en_us/software/anti-money-laundering.html "SAS Anti-Money Laundering"
[4]: https://www.feedzai.com/solutions/aml-transaction-monitoring/ "Feedzai AML transaction monitoring"
[5]: https://complyadvantage.com/mesh/transaction-monitoring-software/ "ComplyAdvantage transaction monitoring"
[6]: https://www.unit21.ai/products/aml-transaction-monitoring "Unit21 AML transaction monitoring"
[7]: https://hawk.ai/solutions/aml/transaction-monitoring "HAWK AI transaction monitoring"
