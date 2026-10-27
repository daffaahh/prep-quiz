import type { ReactNode } from "react";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-4 font-display text-sm font-bold uppercase tracking-[0.15em] text-white shadow-md transition hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-600 disabled:shadow-none disabled:hover:translate-y-0 sm:px-12 sm:py-5 sm:text-xl";

const buttonTones = {
  pink: "bg-quiz",
  soft: "bg-[#e98fe0]",
  green: "bg-[#10bf8f]",
};

export function buttonClass(tone: keyof typeof buttonTones = "pink") {
  return `${buttonBase} ${buttonTones[tone]}`;
}

export function BottomBar({
  children,
  className = "justify-center",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-10 rounded-t-2xl border-t-4 border-white/50 bg-[#9fd0fa]/95 py-3 backdrop-blur">
      <div className={`mx-auto flex max-w-[1180px] items-center gap-3 px-4 ${className}`}>
        {children}
      </div>
    </div>
  );
}

export function PageTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="animate-fade-up text-center font-display text-white">
      <h1 className="text-3xl font-black [text-shadow:0_2px_6px_rgba(0,0,0,0.15)] sm:text-[46px]">
        {title}
      </h1>
      <p className="mt-4 sm:text-[21px]">{subtitle}</p>
    </header>
  );
}
