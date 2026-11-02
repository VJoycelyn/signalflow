# Global AI Hackathon — SignalFlow Readiness

- **Review date:** 2 November 2026
- **Selected challenge:** Innovative Solution for AI Agents & Intelligent Systems
- **Source:** https://github.com/VJoycelyn/signalflow
- **Public demo:** https://vjoycelyn.github.io/signalflow/

## Current status

SignalFlow now has a substantive, challenge-specific agent implementation in its local Node runtime. A model chooses and calls allowlisted functions over fixed synthetic cases, and the UI can show the real returned tool trace. The public GitHub Pages deployment is static and deterministic; it has no model endpoint. This distinction is disclosed in the app and the submission documents.

The project is not ready for final submission until the organizer clarifies the disclosed prior-work history and the team verifies its own rules/registration actions. The current demo video predates the tool-agent feature and does not demonstrate it.

## Rule-by-rule check

### Build during the hackathon

**PARTIAL — organizer clarification recommended.** HackCulture's page lists the overall event period as 9 October–29 November 2026 and the challenge/prototype window as 1–15 November. The first public SignalFlow source commit is dated 13 October, within the overall event dates but before prompt release. Project materials disclose that the underlying prototype originated for the separate Azentio.ai Build Labs event. The selected prompt-specific tool-agent work was added after the prompts opened. This history is not being relabelled. Ask the organizer in the required Discord whether reuse of that core plus the new adaptation meets the rule that the core project should be substantially developed during the event.

### Original work and third-party terms

**PARTIAL.** The six-vendor review found common AML alert-investigation functionality but no evidence of code copying; it was not a comprehensive plagiarism or provenance scan and cannot certify legal originality. `THIRD_PARTY_NOTICES.md` identifies Manrope and DM Mono and their SIL Open Font License 1.1 references. There are no third-party npm runtime dependencies. The repository has no project-level `LICENSE` for SignalFlow source; the owner should choose one only if they intend to grant reuse rights. Maintain the Azentio-origin and AI-assistance disclosures.

### AI use and responsible development

**IMPLEMENTED, WITH DEMO LIMITATION.** The local model agent can use four fixed functions: read synthetic case signals, compare an illustrative baseline, check missing context, and retrieve a sample review checklist. The orchestrator allows at most four model turns and six calls. It requires the evidence and checklist tools plus at least one other distinct tool and validates the final recommendation. It has no search or case-write tool, and the analyst retains the decision.

The model path is opt-in with `SIGNALFLOW_ENABLE_LLM=true` and a local operator-supplied key. The server binds to loopback and accepts only five server-owned synthetic case IDs. Browser-created examples remain local and never reach a model. Without explicit opt-in, on the public static site, or on model/tool/validation failure, the app uses deterministic rules and labels that result as non-AI. Never enter real customer data or include the API key in the repository or a recording.

### Submission deliverables

- **Working project and repository — PASS.** The public demo is live, and the source repository has setup instructions, tests, and the local agent code.
- **Selected problem and description — PASS.** The draft records the exact broad prompt and maps its agent/tool behavior to the investigator workflow. It does not claim that AML workflows are unique.
- **Technologies, tools, and AI-use explanation — PASS, subject to team edits.** README and submission draft describe Node.js, HTML/CSS/JavaScript, the optional OpenAI-compatible tool-calling model, deterministic public fallback, Manus AI coding assistance, and the four safe local tools. Each teammate must add any additional tools/models they used.
- **Demo video — NOT CURRENT FOR THE NEW FEATURE.** The repository's current 68.5-second video was recorded before the tool-using agent existed and shows only deterministic UI/data behavior. If the form or organizer requires a video, record a new one that visibly demonstrates the local tool agent and labels the public/static behavior accurately. Do not enter the website link in a video field.
- **Slides/PPT — optional unless the live form requires it.** The old deck is not in the new repository and retains Island-Tales paths. Update it before uploading; otherwise omit it.

### Participant and team duties

- **Account eligibility — PASS in the supplied HackCulture screenshot.** The logged-in profile displayed “You're eligible.”
- **Team size (1–4) — PARTICIPANT ACTION.** Confirm the registered roster.
- **One team per participant — PARTICIPANT ACTION.** Confirm with every member.
- **Official Discord — PARTICIPANT ACTION.** Join and monitor the required event Discord and seek organizer clarification there.
- **One submission per team — PARTICIPANT ACTION.** Coordinate one final entry with the registered team.
- **Current submission form — VERIFY AT SUBMISSION.** Recheck required fields because the form may change.

## Test evidence

The expanded automated suite currently passes **13 of 13** dependency-free tests. It covers the HTTP/static-file allowlist, explicit AI opt-in, a multi-turn tool-call sequence through a local mock model, required tool use, the allowed tool set, fixed synthetic IDs, structured-output validation, the six-call budget, safe fallback, request size/content types, and absence of API CORS access. These tests do not make a real provider call.

One real-provider smoke attempt in this sandbox returned the deterministic fallback with the safe reason `provider_unavailable`. The configured default `gpt-4o-mini` was absent from this sandbox's model catalog. That does not establish whether the participant's own compatible provider supports the model. The real model-backed path is therefore **not yet verified end-to-end**. Before presenting it, configure an available tool-calling model on the intended provider and confirm that a fixed synthetic case returns a real multi-tool trace.

The public Pages site and browser-local data workflows were previously smoke-tested at phone size. After the new UI ships, repeat a public-browser check for the runtime disclosure, case open, deterministic fallback, data input, safe fallback message, and responsive layout. Do not describe a deterministic result as a model-agent run.

## Before final submission

1. Ask HackCulture organizers in the required Discord how the October 13 Azentio-originated core and the post–1 November agent adaptation are treated under the build rule. Keep the answer.
2. Verify the final GitHub Pages page and local model mode after the final published build. Demonstrate actual tool calls only in the explicitly configured local environment.
3. Record a new demo video if the form requires one; the old video does not show the AI-agent addition. Update or omit the outdated deck.
4. Confirm the team roster, one-team-per-person rule, Discord participation, and single final submission.
5. Have the project owner decide whether to publish a software license; do not imply the public repository grants license rights.
6. Recheck the live form, links, AI disclosure, synthetic-data warning, and exact selected prompt. Submit only after the organizer/participant-dependent items are resolved.

## Official source

[1]: https://hackculture.io/hackathons/ai-global-hackathon "Global AI Hackathon by Geek Room on HackCulture"
