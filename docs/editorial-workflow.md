# phreak.fm Editorial Workflow

Internal document. Not published on the site.

## Intake

Submissions arrive via two channels:
- **Web forms**: POST to /api/submit, stored in PHREAK_CONTENT_KV under `submission:{timestamp}:{uuid}`
- **Email**: tips@phreak.fm routes to Ripper's Google Workspace inbox

## Triage

- Initial read within 2 weeks of receipt
- Flag for follow-up or archive
- Tag with triage status in KV metadata

## Verification Pass

For hacker history and breach narrative pieces:
- Check court records (PACER for federal cases)
- Cross-reference archived news coverage
- Check scene documentation (2600 back issues, Phrack archives, TextFiles.com)
- Cross-reference with known public accounts and published interviews
- For technical claims, verify against CVE databases, vendor advisories, published research

## Source Contact

- If contact info was provided, reach out with clarifying questions
- Respect stated communication preferences
- Never pressure a source for more information than they are comfortable sharing

## Publication Standard

- If a story can be anchored to at least one verifiable public source, it runs with standard attribution
- If a story cannot be independently verified but the source is credible, it runs as "as told by" with clear framing about what could and could not be confirmed
- If a story cannot be verified and the source cannot be assessed, it does not run
- Err on the side of not publishing rather than publishing something that cannot be stood behind

## Credit

- Follow the submitter's stated preference exactly (real name, handle, or anonymous)
- Never reveal a source who asked for protection
- If no preference stated, default to anonymous

## Archive

- Keep all submissions in KV indefinitely, even rejected ones
- Tag with triage status and outcome
- Rejected submissions may become relevant later as new information surfaces

## Pirate Signal

- Lower verification bar since these are music features, not investigative pieces
- Verify the embed link works
- Confirm the artist exists (even if obscure) and the track is real
- Write-up should be generous, curious, and celebratory

## Audio / Podcast Future Path

phreak.fm will NOT adopt AI-narrated podcast content until voice quality meets the threshold for long-form emotional narrative, scene jargon, and dialogue-heavy content. Current AI narration (ElevenLabs, etc.) is strong for generic read-alouds but fails on exactly the content phreak.fm publishes.

Expected 12-24 month window before quality is acceptable (as of April 2026).

Alternative: Ripper records his own voice. Given the music producer background and existing recording gear, a single-mic desk read is viable immediately. The audio pipeline (R2 storage, audioUrl frontmatter, sticky player component) is ready. No rework needed. Just record, upload to R2, add the audioUrl line to frontmatter.
