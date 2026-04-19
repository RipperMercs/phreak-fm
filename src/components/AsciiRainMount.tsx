import AsciiRain from "./AsciiRain";

// Same treatment everywhere: full-intensity rain across the viewport, with a
// fixed horizontal spotlight mask sitting between the canvas (z-0) and content
// (z-10). The mask is solid bg across the central content column and feathers
// to transparent at the edges, so the reading area is dead-quiet but the
// gutters keep the live atmosphere. Apparitions still spawn anywhere on the
// canvas; the ones that land in the masked center are hidden, the ones in the
// gutters surface as easter eggs.
// Mask outer edge sits at 39rem from center (see ContentMask). Constrain
// apparitions to spawn beyond that distance so they appear in the visible
// gutters rather than getting swallowed by the mask.
const MASK_EDGE_REM = 39;

export default function AsciiRainMount() {
  return (
    <>
      <AsciiRain apparitionEdgeRem={MASK_EDGE_REM} />
      <ContentMask />
    </>
  );
}

// Mask geometry (rem units so it tracks font scaling):
// - 34rem solid bg either side of center => 68rem total solid (matches max-w-content)
// - 5rem feather either side fading bg -> transparent
// - Beyond 39rem from center: full transparent, rain fully visible
function ContentMask() {
  const stops = [
    "transparent 0",
    "transparent calc(50% - 39rem)",
    "var(--bg) calc(50% - 34rem)",
    "var(--bg) calc(50% + 34rem)",
    "transparent calc(50% + 39rem)",
    "transparent 100%",
  ].join(", ");
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        background: `linear-gradient(to right, ${stops})`,
      }}
    />
  );
}
