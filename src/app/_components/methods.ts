import type { ComponentType, SVGProps } from "react";
import {
  DoubleInjectionIcon,
  InjectionIcon,
  PillIcon,
  RingIcon,
} from "./method-icons";

export type MethodId = "pil" | "cincin" | "cab-la" | "len";

export type PrepMethod = {
  id: MethodId;
  name: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  highlight: string;
  schedule: string;
  steps: { when: string; what: string }[];
  note: string;
};

export const methods: PrepMethod[] = [
  {
    id: "pil",
    name: "Pil",
    Icon: PillIcon,
    highlight: "Sangat efektif mencegah HIV dari semua jenis paparan.",
    schedule: "Satu pil setiap hari selama kamu membutuhkannya",
    steps: [
      {
        when: "Hari 1:",
        what: "Tes HIV, dan jika negatif, terima persediaan PrEP oral untuk satu bulan",
      },
      {
        when: "Setelah 1 bulan:",
        what: "Kunjungan lanjutan ke klinik, terima persediaan untuk 3 bulan",
      },
      {
        when: "Setiap 3 bulan:",
        what: "Kunjungan lanjutan, tes HIV, dan persediaan untuk 3 bulan",
      },
    ],
    note: "Paling efektif jika pil diminum setiap hari.",
  },
  {
    id: "cincin",
    name: "Cincin",
    Icon: RingIcon,
    highlight:
      "Menurunkan risiko tertular HIV saat seks vaginal sekitar 30%, hingga 50% jika digunakan secara konsisten.",
    schedule: "Masukkan cincin ke dalam vagina, ganti setiap 28 hari",
    steps: [
      {
        when: "Hari 1:",
        what: "Tes HIV, dan jika negatif, terima cincin pertama lalu masukkan ke dalam vagina",
      },
      {
        when: "Setiap 28 hari:",
        what: "Ganti dengan cincin baru saat kunjungan ke klinik",
      },
      {
        when: "Setiap 3 bulan:",
        what: "Tes HIV lanjutan dan persediaan cincin baru",
      },
    ],
    note: "Tidak mencegah IMS atau kehamilan. Hanya untuk seks vaginal.",
  },
  {
    id: "cab-la",
    name: "Suntikan CAB-LA",
    Icon: InjectionIcon,
    highlight: "Lebih dari 90% efektif mencegah HIV.",
    schedule: "Satu suntikan setiap 2 bulan",
    steps: [
      {
        when: "Hari 1:",
        what: "Tes HIV, dan jika negatif, terima suntikan pertama",
      },
      {
        when: "Setelah 1 bulan:",
        what: "Suntikan kedua untuk membangun efektivitas",
      },
      {
        when: "Setiap 2 bulan:",
        what: "Suntikan rutin saat kunjungan ke klinik",
      },
    ],
    note: "Tidak mencegah IMS atau kehamilan.",
  },
  {
    id: "len",
    name: "Suntikan Lenacapavir (LEN)",
    Icon: DoubleInjectionIcon,
    highlight: "Lebih dari 96% efektif, pilihan PrEP paling efektif.",
    schedule: "Dua suntikan setiap 6 bulan",
    steps: [
      { when: "Hari 1:", what: "Dua tablet dan dua suntikan di klinik" },
      { when: "Hari 2:", what: "Dua tablet diminum di rumah" },
      { when: "Setiap 6 bulan:", what: "Dua suntikan saat kunjungan ke klinik" },
    ],
    note: "Tidak mencegah IMS atau kehamilan.",
  },
];
