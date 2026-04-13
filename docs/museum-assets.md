# DOS Virus Museum :: Visual Asset Workflow

## File naming convention

All specimen visual assets live in `/public/museum/[slug]/` where 
`[slug]` matches the specimen's frontmatter slug exactly.

Per specimen, the standard files are:

- `execution.gif` :: primary animated capture of the virus executing 
  (hero visual, auto-loops on the specimen page)
- `execution.mp4` :: optional MP4 alternative if the GIF would exceed 
  3MB. If present, the specimen page prefers the MP4 for performance.
- `still-01.png`, `still-02.png`, etc. :: additional static screenshots
- `text-payload.png` :: screenshot of any text message the virus displays
- `hex-01.png` :: optional, screenshot of hex dump if visually notable

Examples:
- `/public/museum/brain/execution.gif`
- `/public/museum/brain/text-payload.png`
- `/public/museum/spanska/execution.gif`
- `/public/museum/spanska/still-01.png`

## Size targets

- GIF: under 2MB, 5-15 second loop, 256-color palette is fine
- MP4: H.264, muted, under 1MB, same duration as the GIF it replaces
- PNG: under 200kb after optimization

If a GIF exceeds 3MB, capture it as MP4 instead and let the build 
step handle it.

## Capture sources (in priority order)

1. Internet Archive Malware Museum (archive.org/details/malwaremuseum)
2. Virus Bulletin historical archive (virusbulletin.com)
3. F-Secure Hyppönen presentations and archived talks
4. 40Hex and Phalcon/Skism zine archives (textfiles.com)

Credit the source in the specimen page's `sources` frontmatter array 
for every visual used.

## Credit convention

Every specimen page automatically shows a "Visual sources" line below 
the hero image. Populate it via the `sources` frontmatter field. 
Example:

```yaml
sources:
  - title: "Malware Museum: Brain"
    url: "https://archive.org/details/malware_Brain"
    citation: "Internet Archive Malware Museum, curated by Mikko Hyppönen and Jason Scott"
```

## Workflow

1. Ripper captures the visual asset
2. Ripper saves it to `/public/museum/[slug]/` with the naming convention above
3. Ripper updates the specimen MDX file's frontmatter:
   - `heroMedia: "/museum/[slug]/execution.gif"`
   - `heroMediaType: "gif"` (or "mp4")
   - `heroMediaAlt: "brief description of what's visible in the animation"`
   - Add a Source entry to the `sources` array
4. Commit with message: "Add visuals for [specimen-name] specimen"
5. Deploy fires automatically via Cloudflare Pages

## Capture tool recommendations

- **Windows:** ScreenToGif (free, lightweight, good GIF compression)
- **Mac:** Kap (free), or LICEcap (older but reliable)
- **Cross-platform:** OBS Studio + ffmpeg for MP4 output

## Special cases

Some viruses only show their payload under specific conditions:

- **Michelangelo:** triggers only on March 6. Use DOSBox's date command 
  to set the system date before capturing.
- **Jerusalem:** triggers on Friday the 13th. Same approach.
- **Yankee Doodle:** plays its tune at 5pm local system time.
- **Casino:** triggers after a certain number of boots.

Note the trigger in the specimen frontmatter's `trigger` field and 
make sure the GIF captures the active payload, not a dormant state.

## What NOT to capture

- Do NOT download or host any actual virus binaries (.exe, .com, .sys)
- Do NOT link to sites distributing live malware
- If an image shows a file browser or directory listing with actual 
  executable filenames, that is fine (educational context), but the 
  binaries themselves stay in the emulator and never enter this repo
