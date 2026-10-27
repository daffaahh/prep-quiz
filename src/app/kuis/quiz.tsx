"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ANSWERS_KEY, questions } from "../_components/quiz-data";
import { BottomBar, buttonClass } from "../_components/ui";

export function Quiz() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "back">("next");
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    questions.map(() => null),
  );

  const question = questions[index];
  const selected = answers[index];
  const isLast = index === questions.length - 1;
  const answered = answers.filter((a) => a !== null).length;
  const percent = Math.round((answered / questions.length) * 100);

  function choose(option: number) {
    setAnswers((prev) => prev.map((a, i) => (i === index ? option : a)));
  }

  function back() {
    if (index === 0) return router.push("/");
    setDirection("back");
    setIndex(index - 1);
  }

  function next() {
    if (selected === null) return;
    if (isLast) {
      try {
        sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
      } catch {}
      return router.push("/hasil");
    }
    setDirection("next");
    setIndex(index + 1);
  }

  return (
    <>
      <div
        key={index}
        className={`mt-8 flex flex-col items-center sm:mt-14 ${
          direction === "next" ? "animate-slide-from-right" : "animate-slide-from-left"
        }`}
      >
        <span className="animate-float text-5xl sm:text-6xl" aria-hidden>
          {question.emoji}
        </span>
        <fieldset className="mt-6 w-full max-w-[692px] sm:mt-8">
          <legend className="mb-6 w-full text-center font-display text-xl font-bold text-white sm:mb-9 sm:text-[32px]">
            {question.question}
          </legend>
          <div className="flex flex-col gap-3 sm:gap-4">
            {question.options.map((option, i) => {
              const checked = selected === i;
              return (
                <label
                  key={option.label}
                  style={{ animationDelay: `${120 + i * 70}ms` }}
                  className={`animate-fade-up flex cursor-pointer items-center gap-4 rounded-2xl bg-white px-5 py-4 font-display font-bold leading-snug tracking-[0.03em] text-neutral-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:gap-5 sm:px-8 sm:py-7 sm:text-[21px] sm:tracking-[0.1em] ${
                    checked ? "ring-3 ring-brand" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={`q${index}`}
                    checked={checked}
                    onChange={() => choose(i)}
                    className="sr-only"
                  />
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border-[3px] border-brand sm:size-9">
                    {checked && <span className="animate-pop size-3 rounded-full bg-brand sm:size-4" />}
                  </span>
                  {option.label}
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      <div className="mx-auto mt-8 max-w-[692px] rounded-2xl border-2 border-white/50 bg-white/15 px-5 py-4 font-display font-bold text-white sm:mt-20 sm:px-6 sm:py-5">
        <div className="flex justify-between text-sm sm:text-lg">
          <span>
            Pertanyaan {index + 1} dari {questions.length}
          </span>
          <span>{percent}% selesai</span>
        </div>
        <div
          className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/40"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-white transition-[width] duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <BottomBar className="justify-between">
        <button type="button" onClick={back} className={buttonClass()}>
          Kembali
        </button>
        <button
          type="button"
          onClick={next}
          disabled={selected === null}
          className={buttonClass()}
        >
          {isLast ? "Lihat hasil" : "Lanjut"}
        </button>
      </BottomBar>
    </>
  );
}
