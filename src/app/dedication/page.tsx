import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dedication",
  description: "A dedication.",
  alternates: {
    canonical: "https://phreak.fm/dedication",
  },
};

export default function DedicationPage() {
  return (
    <main
      className="min-h-[70vh] flex items-center justify-center px-4"
      style={{ backgroundColor: "#0f1923" }}
    >
      <div className="text-center">
        <p
          className="font-hand text-xl"
          style={{ color: "#7a8fa0" }}
        >
          Dedication page content to be written by Ripper.
        </p>
      </div>
    </main>
  );
}
