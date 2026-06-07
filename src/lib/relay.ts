// The Relay: Ripper's hand-curated linkblog, distinct from the auto RSS wire
// at /news. Entries live in content/relay.json and are appended over time.

import relayData from "../../content/relay.json";

export type Vertical = "signals" | "frequencies" | "static";

export interface RelayEntry {
  id: string; // permalink anchor, also the React key
  date: string; // "YYYY-MM-DD"
  title: string; // the headline, links out to url
  url: string; // external link
  note: string; // a line or two on why it matters
  vertical?: Vertical; // optional tag
  via?: string; // optional credit for where it was found
}

// Newest first. YYYY-MM-DD sorts correctly as a plain string compare.
export function getRelayEntries(): RelayEntry[] {
  return (relayData as unknown as RelayEntry[])
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}
