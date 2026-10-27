import type { Metadata } from "next";
import { PageTitle } from "../_components/ui";
import { Quiz } from "./quiz";

export const metadata: Metadata = {
  title: "Kuis Metode PrEP",
};

export default function QuizPage() {
  return (
    <main className="px-4 pb-40 pt-12">
      <PageTitle
        title="KUIS METODE PREP"
        subtitle="Untuk mengetahui metode PrEP yang mungkin cocok untukmu, pilih jawaban yang paling sesuai dengan dirimu."
      />
      <Quiz />
    </main>
  );
}
