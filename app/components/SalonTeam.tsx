import Image from "next/image";
import Link from "next/link";
import { staff } from "../lib/team";
import { business } from "../lib/business";
const team = Object.values(staff);

export default function SalonTeam() {
  return (
    <section aria-labelledby="salon-team-title" className="px-6 pb-20 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <h2 id="salon-team-title" className="text-3xl font-light sm:text-4xl">Poznaj nasz zespół</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {team.map(person => (
            <article id={`stylistka-${person.id}`} key={person.name} className="flex min-w-0 scroll-mt-28 flex-col gap-5 rounded-[1.5rem] border border-[#E8DED2] bg-white/70 p-6 sm:flex-row sm:items-start">
              <Image
                src={person.image}
                alt={`Portret ${person.id === "natalia" ? "Natalii" : "Julii"} z zespołu ${business.name}`}
                width={144}
                height={144}
                sizes="(min-width: 640px) 144px, 112px"
                className="h-28 w-28 shrink-0 rounded-full object-cover sm:h-36 sm:w-36"
              />
              <div className="min-w-0">
                <h3 className="text-2xl font-medium">{person.name}</h3>
                {person.role && <p className="mt-2 font-medium text-[#7C6238]">{person.role}</p>}
                {person.description.map(paragraph => (
                  <p key={paragraph} className="mt-3 leading-relaxed text-[#5F5B56]">{paragraph}</p>
                ))}
                {person.id === "julia" && <p className="mt-3 leading-relaxed text-[#5F5B56]">Stylistka junior. Zaplanuj dłuższy czas wizyty zgodnie z wybranym wariantem w cenniku.</p>}
                <Link href="/#realizacje-salonu" className="mt-3 inline-flex min-h-11 items-center font-medium text-[#7C6238] underline underline-offset-4">Zobacz realizacje salonu</Link>
                {person.id === "natalia" && <Link href="/#opinie-klientek" className="mt-2 block py-2 font-medium text-[#7C6238] underline underline-offset-4">Przeczytaj opinie o pracy Natalii</Link>}
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 leading-relaxed text-[#5F5B56]">
          Przy umawianiu wizyty wybierz wariant usługi i stylistkę.
          {" "}<Link href="/cennik" className="font-medium text-[#876536] underline underline-offset-4">Porównaj ceny i czasy wizyt</Link>.
        </p>
      </div>
    </section>
  );
}
