import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dedication",
  description: "A dedication.",
};

export default function DedicationPage() {
  return (
    <main className="max-w-article mx-auto px-4 sm:px-6 py-24">
      <div className="text-center">
        <p className="font-serif text-muted text-lg">
          Dedication page content to be written by Evan.
        </p>
      </div>
    </main>
  );
}
