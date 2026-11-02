# SignalFlow — Global AI Hackathon demo script

**Selected challenge:** Innovative Solution for AI Agents & Intelligent Systems.

**Important:** The actual tool-using model path is local-only. One real run on fictional case `ALT-24081` was verified on 2 November 2026 with GPT-6.1 Sol via the current Manus-provided OpenAI-compatible gateway; the new captioned video records its three actual local tool calls. A different provider/key still needs its own live run. For a live demonstration, start the Node server with `SIGNALFLOW_ENABLE_LLM=true` and an approved key, verify the **LOCAL MODEL MODE ENABLED** badge, and confirm an actual tool trace appears. The badge alone confirms configuration, not connectivity. Never put the key on screen or in a recorded terminal. The public GitHub Pages site is a separate deterministic demo. Use only built-in fictional cases.

## 0:00–0:25 — Frame the challenge and honest project history

“SignalFlow is our AML-focused answer to the Global AI Hackathon’s broad AI Agents and Intelligent Systems challenge. It demonstrates a constrained agent that can gather relevant synthetic evidence through a small set of tools, show the work it did, and prepare a human-reviewed next step. The earlier SignalFlow UI originated in the Azentio.ai Build Labs project; this Global version adds the tool-using agent after this challenge’s prompts opened. We have disclosed that history and will follow the organizer’s guidance on eligibility.”

Point out that every record in the demo is fictional. Do not describe the event-specific agent work as the origin of the whole project.

## 0:25–0:55 — Open the case and explain the boundary

Open `ALT-24081`. Say: “The model does not receive user-entered data or a live bank record. The local server only accepts a fixed synthetic case ID. A score is a prioritization example, not evidence of misconduct.”

Point to the mode badge. It should read **LOCAL MODEL MODE ENABLED**. Then run the built-in case and confirm that a real tool trace appears before claiming the model is active. If the result is deterministic fallback, explain the displayed reason and do not represent fallback behavior as AI.

## 0:55–1:50 — Show the actual agent trace

Click **Run explainable investigation**. Wait for the recommendation. Point out the actual trace from the local server, for example:

1. Read synthetic case signals.
2. Check missing context.
3. Retrieve the sample review checklist.
4. The model returns a constrained draft recommendation.

Say: “The model chooses among four local functions; the server validates every call and allows no more than four model turns or six tool calls. The model must inspect evidence, retrieve the checklist, and use at least one other distinct tool before it can return an answer. These are real tool calls returned by the configured local agent—not a pre-rendered multi-agent animation. The functions read fixed fictional data; they cannot search the web or write to a case system.”

Show the evidence beside the recommendation. Say: “The recommendation is a draft. It cannot disposition or close the case.”

## 1:50–2:15 — Demonstrate the human gate

Choose **Escalate case** or **Mark reviewed**. Show the session event. Explain: “That action changes only this browser demo state. It does not update an AML platform or create a durable audit record. The analyst—not the model—owns the decision.”

## 2:15–2:40 — Show editable synthetic inputs

Open **Demo data**. Add a fictional alias such as `Sample Merchant 07`. Show that the queue count and risk insights update and that the entry remains browser-local. Say: “This record is not sent to the agent. Only fixed built-in examples can reach the local tools.” Restore the initial sample before handing the browser to a reviewer.

## 2:40–3:00 — Close and separate modes

“The repository contains the local bounded agent, a deterministic fallback, browser-local sample data, and mock-provider tests. The public website is static and deterministic. The AI-enabled run requires a locally configured compatible model. SignalFlow is a prototype, not an operational AML system, and we do not claim measured time savings or a unique AML workflow.”

## Questions to anticipate

**Is the public URL using a model?** No. The GitHub Pages build is static and deterministic. The tool-using model is available only from the loopback Node server when the operator explicitly enables it with an approved key.

**What makes it an agent?** In local model mode the LLM selects from a fixed set of local functions, can request multiple tool calls over bounded turns, receives the synthetic tool results, and then returns a validated draft. The interface displays actual server-returned tool calls. It is one constrained tool-using agent, not a set of agents.

**Can it make or record a financial-crime decision?** No. The model has no disposition or external-system write tool. The analyst controls the demo escalate/review action; it only changes browser-session state.

**Are custom examples sent to the model?** No. Custom entries stay in browser localStorage. The endpoint accepts only one of five server-owned fictional case IDs.

**Was the project built from scratch for this Global prompt?** No. The prior SignalFlow UI originated for the separate Azentio.ai Build Labs project and was first publicly committed on 13 October 2026. This Global challenge adaptation adds the bounded tool-using agent after the prompts opened. That history is disclosed; the team is asking the organizer to clarify how the rule applies.

**Where is the current recorded demo?** [`submission/SignalFlow-Demo-Video.mp4`](./submission/SignalFlow-Demo-Video.mp4). It demonstrates one verified model/gateway configuration and the separate deterministic public site.
