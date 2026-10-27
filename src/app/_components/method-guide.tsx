"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { methods } from "./methods";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`size-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m7 10 5 5 5-5" />
    </svg>
  );
}

function scrollToMethod(id: string) {
  document
    .getElementById(`metode-${id}`)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

/** Method linked from the URL hash, e.g. `/#metode-len` from the results page. */
function useLinkedMethod() {
  const hash = useSyncExternalStore(subscribeToHash, () => location.hash, () => "");
  return methods.find((m) => hash === `#metode-${m.id}`)?.id ?? null;
}

export function MethodGuide() {
  const linkedId = useLinkedMethod();
  // undefined until the visitor picks a section; until then the URL hash decides.
  const [pickedId, setOpenId] = useState<string | null>();
  const openId = pickedId === undefined ? linkedId : pickedId;

  useEffect(() => {
    if (linkedId) scrollToMethod(linkedId);
  }, [linkedId]);

  function openFromTile(id: string) {
    setOpenId(id);
    scrollToMethod(id);
  }

  return (
    <>
      <ul className="mx-auto mt-6 grid max-w-[360px] grid-cols-4 gap-2 sm:flex sm:max-w-none sm:justify-center sm:gap-10">
        {methods.map(({ id, name, Icon }, i) => (
          <li
            key={id}
            className="animate-fade-up sm:w-[144px]"
            style={{ animationDelay: `${150 + i * 80}ms` }}
          >
            <button
              type="button"
              onClick={() => openFromTile(id)}
              className="group flex w-full flex-col items-center gap-3 text-center"
            >
              <span className="flex aspect-square w-full items-center justify-center rounded-[20px] border-2 sm:rounded-[28px] border-white/40 bg-white/25 text-brand transition duration-300 group-hover:-translate-y-1 group-hover:bg-white/40 group-hover:shadow-lg">
                <Icon className="size-3/5 transition-transform duration-300 group-hover:scale-110" />
              </span>
              <span className="font-display text-[11px] font-bold leading-tight text-white sm:text-[19px]">
                {name}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-12 flex max-w-[1086px] flex-col gap-4 sm:mt-24 sm:gap-7">
        {methods.map(({ id, name, Icon, highlight, schedule, steps, note }, i) => {
          const open = openId === id;
          return (
            <section
              key={id}
              id={`metode-${id}`}
              style={{ animationDelay: `${450 + i * 80}ms` }}
              className={`animate-fade-up scroll-mt-6 overflow-hidden rounded-2xl bg-white shadow-sm ring-brand transition-shadow ${
                open ? "shadow-lg" : "ring-2"
              }`}
            >
              <h2>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`isi-${id}`}
                  onClick={() => setOpenId(open ? null : id)}
                  className={`flex w-full items-center gap-4 px-5 py-5 text-left font-display text-lg font-bold leading-tight tracking-[0.05em] transition-colors duration-300 sm:gap-6 sm:px-10 sm:py-6 sm:text-[26px] sm:tracking-[0.12em] ${
                    open ? "bg-brand text-white" : "text-brand hover:bg-brand-soft"
                  }`}
                >
                  <Icon
                    className={`size-7 shrink-0 transition-opacity sm:size-8 duration-300 ${open ? "opacity-0" : ""}`}
                  />
                  <span className="flex-1">{name}</span>
                  <Chevron open={open} />
                </button>
              </h2>

              <div
                id={`isi-${id}`}
                inert={!open}
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div
                    className={`px-4 pb-6 pt-5 transition-opacity sm:pb-8 sm:pt-7 duration-300 sm:px-7 ${
                      open ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <p className="font-bold text-brand sm:text-lg">{highlight}</p>
                    <p className="mt-3 italic text-neutral-600">{schedule}</p>
                    <p className="mt-6 text-lg font-bold">Prosesnya:</p>
                    <dl className="mt-3 flex flex-col gap-3">
                      {steps.map(({ when, what }) => (
                        <div
                          key={when}
                          className="flex flex-col gap-1 rounded-lg bg-brand-soft px-4 py-3 sm:flex-row sm:gap-4"
                        >
                          <dt className="shrink-0 font-bold text-brand sm:w-[150px]">
                            {when}
                          </dt>
                          <dd>{what}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-6 border-l-[3px] border-brand pl-4 text-neutral-600">
                      {note}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
