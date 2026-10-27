import Link from "next/link";
import { MethodGuide } from "./_components/method-guide";
import { BottomBar, buttonClass, PageTitle } from "./_components/ui";

export default function Home() {
  return (
    <>
      <main className="px-4 pb-40 pt-12">
        <PageTitle
          title="Metode PrEP Mana yang Tepat untukmu?"
          subtitle="Sebelum mengikuti kuis, pelajari lebih lanjut tentang berbagai metodenya:"
        />
        <MethodGuide />
      </main>

      <BottomBar>
        <Link href="/kuis" className={buttonClass()}>
          Ikuti kuis
        </Link>
      </BottomBar>
    </>
  );
}
