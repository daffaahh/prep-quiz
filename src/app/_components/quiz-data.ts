import { methods, type MethodId } from "./methods";

export const ANSWERS_KEY = "prep-quiz-jawaban";

type QuizOption = {
  label: string;
  scores?: Partial<Record<MethodId, number>>;
  exclude?: MethodId[];
};

export type QuizQuestion = {
  emoji: string;
  question: string;
  options: QuizOption[];
};

export const questions: QuizQuestion[] = [
  {
    emoji: "💊",
    question: "Bisakah kamu berkomitmen minum pil setiap hari?",
    options: [
      { label: "Ya, aku bisa minum pil setiap hari", scores: { pil: 3 } },
      { label: "Tidak, aku lebih memilih tidak", exclude: ["pil"] },
    ],
  },
  {
    emoji: "💉",
    question: "Bagaimana perasaanmu tentang suntikan?",
    options: [
      {
        label: "Tidak masalah, aku nyaman disuntik",
        scores: { "cab-la": 2, len: 2 },
      },
      {
        label: "Aku lebih suka menghindari suntikan",
        exclude: ["cab-la", "len"],
      },
    ],
  },
  {
    emoji: "🏥",
    question: "Seberapa sering kamu bisa datang ke klinik?",
    options: [
      {
        label: "Setiap bulan pun tidak masalah",
        scores: { cincin: 2, pil: 1, "cab-la": 1, len: 1 },
      },
      {
        label: "Sekitar setiap 2–3 bulan",
        scores: { "cab-la": 2, pil: 2 },
        exclude: ["cincin"],
      },
      {
        label: "Sejarang mungkin, sekitar 6 bulan sekali",
        scores: { len: 3 },
        exclude: ["cincin", "cab-la"],
      },
    ],
  },
  {
    emoji: "❤️",
    question: "Jenis hubungan seks apa yang kamu lakukan?",
    options: [
      { label: "Hanya seks vaginal", scores: { cincin: 1 } },
      {
        label: "Seks anal, atau lebih dari satu jenis",
        exclude: ["cincin"],
      },
    ],
  },
  {
    emoji: "⭕",
    question: "Apakah kamu nyaman memasukkan cincin ke dalam vagina?",
    options: [
      { label: "Ya, aku nyaman", scores: { cincin: 2 } },
      { label: "Tidak, atau tidak berlaku untukku", exclude: ["cincin"] },
    ],
  },
  {
    emoji: "🤫",
    question: "Seberapa penting bagimu agar orang lain tidak tahu kamu memakai PrEP?",
    options: [
      {
        label: "Sangat penting",
        scores: { len: 2, "cab-la": 2, cincin: 1 },
      },
      { label: "Tidak terlalu penting", scores: { pil: 1 } },
    ],
  },
  {
    emoji: "🗓️",
    question: "Apakah kamu sering lupa minum obat atau sering bepergian?",
    options: [
      {
        label: "Ya, cukup sering",
        scores: { pil: -2, len: 2, "cab-la": 1, cincin: 1 },
      },
      { label: "Tidak, rutinitasku teratur", scores: { pil: 2 } },
    ],
  },
  {
    emoji: "⭐",
    question: "Apa yang paling penting bagimu dari sebuah metode PrEP?",
    options: [
      {
        label: "Perlindungan setinggi mungkin",
        scores: { len: 3, "cab-la": 2, pil: 1 },
      },
      {
        label: "Bisa berhenti kapan saja dengan mudah",
        scores: { pil: 2, cincin: 2 },
      },
      {
        label: "Sesedikit mungkin kunjungan ke klinik",
        scores: { len: 3 },
      },
    ],
  },
];

/** Methods not excluded by any answer, best score first; ties go to the more effective method. */
export function recommend(answers: number[]) {
  const tieOrder: MethodId[] = ["len", "cab-la", "pil", "cincin"];
  const score = new Map<MethodId, number>(methods.map((m) => [m.id, 0]));
  const excluded = new Set<MethodId>();

  answers.forEach((choice, i) => {
    const option = questions[i]?.options[choice];
    if (!option) return;
    for (const [id, points] of Object.entries(option.scores ?? {})) {
      score.set(id as MethodId, score.get(id as MethodId)! + points);
    }
    option.exclude?.forEach((id) => excluded.add(id));
  });

  return methods
    .filter((m) => !excluded.has(m.id))
    .sort(
      (a, b) =>
        score.get(b.id)! - score.get(a.id)! ||
        tieOrder.indexOf(a.id) - tieOrder.indexOf(b.id),
    );
}
