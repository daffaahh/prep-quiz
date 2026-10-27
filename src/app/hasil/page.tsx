import type { Metadata } from "next";
import Link from "next/link";
import { BottomBar, buttonClass, PageTitle } from "../_components/ui";
import { Results } from "./results";

export const metadata: Metadata = {
  title: "Hasil Kuis PrEP",
};

function ChatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z" />
    </svg>
  );
}

export default function ResultsPage() {
  return (
    <main className="px-4 pb-40 pt-12">
      <PageTitle
        title="HASILMU"
        subtitle="Berdasarkan jawabanmu, metode berikut mungkin cocok untukmu:"
      />
      <Results />

      <BottomBar className="justify-between">
        <Link href="/kuis" className={buttonClass()}>
          Kembali
        </Link>
        <button type="button" className={buttonClass("soft")}>
          Cari klinik
        </button>
        <button type="button" className={buttonClass("green")}>
          <ChatIcon />
          Chat
        </button>
      </BottomBar>
    </main>
  );
}
