import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function PillIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden {...props}>
      <g transform="rotate(30 24 24)">
        <rect x="15" y="4" width="18" height="7" rx="1.5" />
        <rect x="11" y="12" width="26" height="32" rx="6" />
      </g>
    </svg>
  );
}

export function RingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden {...props}>
      <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="6" />
    </svg>
  );
}

function Syringe({ transform }: { transform?: string }) {
  return (
    <g transform={transform}>
      <rect x="-1" y="-22" width="2" height="9" rx="1" />
      <rect x="-5" y="-14" width="10" height="24" rx="3" />
      <rect x="-1.5" y="10" width="3" height="7" />
      <rect x="-6" y="16" width="12" height="3" rx="1.5" />
    </g>
  );
}

export function InjectionIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden {...props}>
      <Syringe transform="translate(24 24) rotate(30)" />
    </svg>
  );
}

export function DoubleInjectionIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden {...props}>
      <Syringe transform="translate(17 22) rotate(30) scale(0.85)" />
      <Syringe transform="translate(31 28) rotate(30) scale(0.75)" />
    </svg>
  );
}
