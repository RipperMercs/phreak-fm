import type { Metadata } from "next";
import { Payphone } from "@/components/Payphone";

// Unlisted on purpose: noindex, absent from sitemap, nav, and footer.
// The only way in is to view source and find the entrance in the SourceOde.
export const metadata: Metadata = {
  title: "2600",
  description: "The last payphone.",
  robots: { index: false, follow: false },
};

export default function PayphonePage() {
  return (
    <main className="max-w-content mx-auto px-4 sm:px-6 py-16 relative z-10">
      <Payphone />
    </main>
  );
}
