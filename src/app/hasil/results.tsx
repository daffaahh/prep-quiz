"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import type { MethodId } from "../_components/methods";
import { ANSWERS_KEY, recommend } from "../_components/quiz-data";

const descriptions: Record<MethodId, { title: string; text: string }> = {
  len: {
    title: "Suntikan Lenacapavir (LEN)",
    text: "Suntikan PrEP ini melindungi seluruh tubuhmu dari HIV, dari semua jenis paparan. Lebih dari 96% efektif, dan cukup dua suntikan setiap 6 bulan. Efek sampingnya ringan dan biasanya hilang dalam beberapa hari.",
  },
  "cab-la": {
    title: "Suntikan CAB-LA",
    text: "Suntikan PrEP ini melindungi seluruh tubuhmu dari HIV, dari semua jenis paparan. Lebih dari 90% efektif, bahkan lebih baik daripada PrEP oral, dengan satu suntikan setiap 2 bulan. Efek sampingnya ringan dan biasanya hilang dalam beberapa hari.",
  },
  pil: {
    title: "PrEP Oral",
    text: "PrEP oral adalah pil harian yang melindungi seluruh tubuhmu dari HIV, dari semua jenis paparan. Lebih dari 90% efektif jika digunakan dengan benar. Efek sampingnya ringan dan biasanya hilang dalam beberapa hari.",
  },
  cincin: {
    title: "Cincin PrEP",
    text: "Cincin vagina melepaskan obat secara perlahan dan menurunkan risiko tertular HIV saat seks vaginal sekitar 30%, hingga 50% jika digunakan secara konsisten. Cincin diganti setiap 28 hari.",
  },
};

// The first tone is reserved for the top match.
const tones = [
  { card: "border-[#e4d415]", title: "text-[#c9b800]", tile: "bg-[#fbf6dc]" },
  { card: "border-[#b9378f]", title: "text-[#b9378f]", tile: "bg-[#f6e3f1]" },
  { card: "border-[#0f9f86]", title: "text-[#0f9f86]", tile: "bg-[#ddf5ef]" },
  { card: "border-[#e0761b]", title: "text-[#d26a12]", tile: "bg-[#fcebdc]" },
];

const noSubscription = () => () => {};

function readAnswers() {
  try {
    return sessionStorage.getItem(ANSWERS_KEY);
  } catch {
    return null;
  }
}

export function Results() {
  // undefined while rendering on the server, null when no quiz was taken.
  const raw = useSyncExternalStore(noSubscription, readAnswers, () => undefined);
  if (raw === undefined) return null;

  let answers: number[] = [];
  try {
    answers = raw ? JSON.parse(raw) : [];
  } catch {}

  if (answers.length === 0) {
    return (
      <EmptyState
        text="Kamu belum mengikuti kuis. Jawab 8 pertanyaan singkat untuk melihat metode PrEP yang mungkin cocok untukmu."
        cta="Mulai kuis"
      />
    );
  }

  const matches = recommend(answers);
  if (matches.length === 0) {
    return (
      <EmptyState
        text="Berdasarkan jawabanmu, belum ada metode yang jelas paling cocok. Bicarakan pilihanmu dengan tenaga kesehatan, mereka bisa membantu menemukan cara yang pas untukmu."
        cta="Ulangi kuis"
      />
    );
  }

  return (
    <div className="mx-auto mt-10 flex max-w-[980px] flex-col gap-5 sm:mt-14 sm:gap-7">
      {matches.map(({ id, Icon }, rank) => {
        const tone = tones[rank % tones.length];
        const { title, text } = descriptions[id];
        return (
          <article
            key={id}
            style={{ animationDelay: `${150 + rank * 120}ms` }}
            className={`animate-fade-up rounded-3xl border-4 bg-white p-5 font-display transition hover:-translate-y-1 hover:shadow-lg sm:p-7 ${tone.card}`}
          >
            <div className="flex items-center gap-4 sm:gap-5">
              <span
                className={`flex size-14 shrink-0 items-center justify-center rounded-2xl text-[#8b5cf6] sm:size-20 ${tone.tile}`}
              >
                <Icon className="size-8 sm:size-11" />
              </span>
              <div>
                {rank === 0 && (
                  <span className="inline-block rounded-full bg-[#f0a500] px-3 py-0.5 text-sm font-black uppercase tracking-[0.12em] text-white">
                    Paling cocok
                  </span>
                )}
                <h2 className={`mt-1 text-xl font-bold leading-tight sm:text-[27px] ${tone.title}`}>
                  {title}
                </h2>
              </div>
            </div>
            <p className="mt-5 leading-relaxed text-neutral-700 sm:mt-6 sm:text-[19px]">{text}</p>
            <Link
              href={`/#metode-${id}`}
              className={`group mt-5 inline-flex items-center gap-2 font-bold uppercase tracking-[0.05em] sm:text-lg ${tone.title}`}
            >
              Pelajari lebih lanjut
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </article>
        );
      })}

      <Disclaimer delay={150 + matches.length * 120} />

      <Link
        href="/kuis"
        className="animate-fade-up mx-auto rounded-full border-2 border-white px-10 py-3 font-display text-xl font-bold text-white transition hover:bg-white/15"
        style={{ animationDelay: `${250 + matches.length * 120}ms` }}
      >
        Ulangi Kuis
      </Link>
    </div>
  );
}

function Disclaimer({ delay }: { delay: number }) {
  return (
    <p
      style={{ animationDelay: `${delay}ms` }}
      className="animate-fade-up mt-8 rounded-2xl bg-white/45 px-6 py-5 text-center font-display text-neutral-600 sm:text-[19px]"
    >
      <span aria-hidden>⚠️ </span>
      Kuis ini hanya untuk informasi dan tidak menggantikan saran medis. Bicarakan dengan
      tenaga kesehatan sebelum memulai metode pencegahan HIV apa pun.
    </p>
  );
}

function EmptyState({ text, cta }: { text: string; cta: string }) {
  return (
    <div className="mx-auto mt-14 flex max-w-[760px] flex-col items-center gap-8">
      <p className="animate-fade-up rounded-3xl bg-white p-8 text-center font-display text-lg text-neutral-700 [animation-delay:150ms]">
        {text}
      </p>
      <Disclaimer delay={250} />
      <Link
        href="/kuis"
        className="animate-fade-up rounded-full border-2 border-white px-10 py-3 font-display text-xl font-bold text-white transition hover:bg-white/15 [animation-delay:350ms]"
      >
        {cta}
      </Link>
    </div>
  );
}
