#!/usr/bin/env python3
"""Record SignalFlow's live local synthetic-case agent and public static fallback.

Preconditions: run the loopback Node server with SIGNALFLOW_ENABLE_LLM=true,
OPENAI_MODEL set to a tool-calling/JSON-schema model, and provider credentials
in the process environment. This script never reads or displays the key.
"""
from __future__ import annotations

import json
import os
import shutil
import tempfile
import time
import urllib.request
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
SUBMISSION = ROOT / "submission"
LOCAL_URL = os.environ.get("SIGNALFLOW_DEMO_URL", "http://127.0.0.1:4177")
PUBLIC_URL = "https://vjoycelyn.github.io/signalflow/"
EXPECTED_MODEL = os.environ.get("OPENAI_MODEL", "gpt-6.1-sol")
CASE_ID = "ALT-24081"
WIDTH, HEIGHT = 1600, 900


def get_status() -> dict:
    with urllib.request.urlopen(f"{LOCAL_URL}/api/status", timeout=10) as response:
        return json.load(response)


def wait_until(page, start: float, target_seconds: float) -> None:
    remaining = target_seconds - (time.monotonic() - start)
    if remaining > 0:
        page.wait_for_timeout(round(remaining * 1000))


def install_cursor(page) -> None:
    page.evaluate("""() => {
      const cursor = document.createElement('div');
      cursor.id = 'recording-cursor';
      cursor.style.cssText = 'position:fixed;z-index:2147483647;left:-30px;top:-30px;width:18px;height:18px;border:3px solid #f2c95c;border-radius:50%;background:#f2c95c44;pointer-events:none;box-shadow:0 0 0 5px #f2c95c22;transition:left .12s ease,top .12s ease';
      document.body.appendChild(cursor);
    }""")


def guide_click(page, locator) -> None:
    locator.wait_for(state="visible", timeout=12000)
    box = locator.bounding_box()
    if not box:
        raise RuntimeError("The requested demo control is not visible")
    x, y = box["x"] + box["width"] / 2, box["y"] + box["height"] / 2
    page.evaluate("([x,y]) => { const c=document.querySelector('#recording-cursor'); if(c){c.style.left=(x-9)+'px';c.style.top=(y-9)+'px';} }", [x, y])
    page.mouse.move(x, y)
    page.wait_for_timeout(450)
    page.mouse.click(x, y)


def add_end_card(page) -> None:
    page.evaluate("""() => {
      const card = document.createElement('section');
      card.id = 'signalflow-end-card';
      card.style.cssText = 'position:fixed;inset:0;z-index:2147483646;background:linear-gradient(135deg,#071322 0%,#10243c 60%,#071322 100%);display:flex;align-items:center;justify-content:center;color:#f0f6ff;font-family:Arial,sans-serif;text-align:left;padding:64px;box-sizing:border-box';
      card.innerHTML = `<div style="max-width:1080px;width:100%;border:1px solid #23445a;border-radius:24px;padding:58px;background:linear-gradient(145deg,#10233b,#0b192b);box-shadow:0 24px 80px #0008">
        <div style="color:#62d4c8;letter-spacing:.18em;font-size:18px;font-weight:700">GLOBAL AI HACKATHON · AI AGENTS & INTELLIGENT SYSTEMS</div>
        <h1 style="font-size:72px;line-height:1;margin:26px 0 12px">SignalFlow</h1>
        <p style="font-size:30px;color:#cad8e8;margin:0 0 36px">Synthetic AML investigation agent</p>
        <p style="font-size:22px;line-height:1.5;color:#e4edf7">The interface originated in the separate Azentio AI Build Labs project. The bounded tool-using agent is the Global AI Hackathon adaptation. Full history and implementation details are disclosed in the repository.</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:38px">
          <div style="padding:18px 22px;border-radius:12px;background:#0a1524;border:1px solid #26445c"><div style="font-size:15px;color:#87a0b6;letter-spacing:.12em">SOURCE REPOSITORY</div><div style="font-size:23px;color:#70dbd0;margin-top:8px">github.com/VJoycelyn/signalflow</div></div>
          <div style="padding:18px 22px;border-radius:12px;background:#0a1524;border:1px solid #26445c"><div style="font-size:15px;color:#87a0b6;letter-spacing:.12em">PUBLIC DEMO · DETERMINISTIC</div><div style="font-size:23px;color:#70dbd0;margin-top:8px">vjoycelyn.github.io/signalflow</div></div>
        </div>
        <p style="font-size:17px;color:#91a7bc;margin:30px 0 0">The recorded model run used GPT-6.1 Sol through the current Manus-provided model gateway. No credentials are included in the project.</p>
      </div>`;
      document.body.appendChild(card);
    }""")


def main() -> None:
    SUBMISSION.mkdir(parents=True, exist_ok=True)
    status = get_status()
    if status.get("mode") != "local-tool-agent-enabled" or status.get("model") != EXPECTED_MODEL:
        raise SystemExit(f"Live model mode is not ready for the expected model: {status}")

    raw_dir = Path(tempfile.mkdtemp(prefix="signalflow-live-video-", dir="/tmp"))
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True, executable_path="/usr/bin/chromium")
        context = browser.new_context(
            viewport={"width": WIDTH, "height": HEIGHT},
            device_scale_factor=1,
            record_video_dir=str(raw_dir),
            record_video_size={"width": WIDTH, "height": HEIGHT},
        )
        page = context.new_page()
        page.goto(LOCAL_URL, wait_until="domcontentloaded", timeout=30000)
        page.locator("#case-list [data-case-id='ALT-24081']").wait_for(state="visible", timeout=15000)
        install_cursor(page)
        start = time.monotonic()

        # Establish the queue and synthetic-only context.
        wait_until(page, start, 14.3)
        guide_click(page, page.locator("#case-list [data-case-id='ALT-24081']"))
        page.locator("#runtime-mode").wait_for(state="visible", timeout=10000)
        if page.locator("#runtime-mode").inner_text().strip() != "LOCAL MODEL MODE ENABLED":
            raise RuntimeError("The local model mode disclosure is not visible")

        # Trigger one real provider run on the fixed server-owned fictional case.
        wait_until(page, start, 18.0)
        guide_click(page, page.locator("#run-investigation"))
        page.locator(".analysis-result .engine-badge").wait_for(state="visible", timeout=60000)
        badge = page.locator(".analysis-result .engine-badge").inner_text()
        traces = page.locator(".agent-trace .trace-item")
        traces.first.wait_for(state="visible", timeout=10000)
        trace_rows = page.locator(".trace-tool").all_inner_texts()
        if "TOOL-USING AI AGENT" not in badge or len(trace_rows) < 3:
            raise RuntimeError(f"Live model did not return the required actual tool trace; badge={badge!r}, tools={trace_rows!r}")

        result = page.locator(".analysis-result .recommendation").inner_text()
        if "Draft suggestion only" not in result or "analyst decision required" not in result.lower():
            raise RuntimeError("The live model result did not display the human decision gate")
        # Capture a sanitized evidence record; no prompt, key, raw headers, or account data.
        evidence = {
            "verification_date": "2026-11-02",
            "model": status["model"],
            "provider_scope": "Manus-provided OpenAI-compatible model gateway in the current sandbox",
            "case_id": CASE_ID,
            "synthetic_data_only": True,
            "engine": "model-agent",
            "tool_trace_labels": trace_rows,
            "tool_count": len(trace_rows),
            "human_decision_required": True,
            "result_label": badge,
            "participant_owned_provider_verified": False,
        }
        (SUBMISSION / "LIVE_MODEL_RUN_EVIDENCE.json").write_text(json.dumps(evidence, indent=2) + "\n")

        # Reveal the real server-returned trace and analyst-owned draft.
        wait_until(page, start, 31.9)
        page.locator(".agent-trace").scroll_into_view_if_needed()
        wait_until(page, start, 34.7)
        page.locator(".analysis-result .recommendation").last.scroll_into_view_if_needed()
        wait_until(page, start, 48.2)

        # Show that the separately published public site is static and rules-only.
        page.goto(PUBLIC_URL, wait_until="domcontentloaded", timeout=30000)
        page.locator("#case-list [data-case-id='ALT-24081']").wait_for(state="visible", timeout=15000)
        install_cursor(page)
        guide_click(page, page.locator("#case-list [data-case-id='ALT-24081']"))
        page.locator("#runtime-mode").wait_for(state="visible", timeout=10000)
        if "PUBLIC STATIC" not in page.locator("#runtime-mode").inner_text():
            raise RuntimeError("The public static-mode disclosure did not appear")
        wait_until(page, start, 52.5)

        # Re-show the explicit local-only agent configuration before the provenance end card.
        page.goto(LOCAL_URL, wait_until="domcontentloaded", timeout=30000)
        page.locator("#case-list [data-case-id='ALT-24081']").wait_for(state="visible", timeout=15000)
        install_cursor(page)
        guide_click(page, page.locator("#case-list [data-case-id='ALT-24081']"))
        page.locator("#runtime-mode").wait_for(state="visible", timeout=10000)
        wait_until(page, start, 56.4)
        add_end_card(page)
        wait_until(page, start, 67.0)

        video = page.video
        context.close()
        browser.close()
        source = Path(video.path())
        destination = SUBMISSION / "SignalFlow-Demo-Video-source.webm"
        shutil.copy2(source, destination)
        print(json.dumps({"source_video": str(destination), "duration_target_seconds": 67.0, "model": status["model"], "tools": trace_rows}))


if __name__ == "__main__":
    main()
