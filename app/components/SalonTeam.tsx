import Image from "next/image";
import Link from "next/link";

const team = [
  {
    name: "Natalia",
    image: "/team/natalia-noblu.jpg",
  },
  {
    name: "Julia",
    image: "/team/julia-noblu.jpg",
  },
];

export default function SalonTeam() {
  return (
    <section aria-labelledby="salon-team-title" className="px-6 pb-20 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <h2 id="salon-team-title" className="text-3xl font-light sm:text-4xl">Poznaj nasz zespół</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {team.map(person => (
            <article key={person.name} className="flex min-w-0 flex-col gap-5 rounded-[1.5rem] border border-[#E8DED2] bg-white/70 p-6 sm:flex-row sm:items-start">
              <Image
                src={person.image}
                alt={`Portret ${person.name === "Natalia" ? "Natalii" : "Julii"} z zespołu Noblu Beauty Room`}
                width={144}
                height={144}
                sizes="(min-width: 640px) 144px, 112px"
                className="h-28 w-28 shrink-0 rounded-full object-cover sm:h-36 sm:w-36"
              />
              <div className="min-w-0">
                <h3 className="text-2xl font-medium">{person.name}</h3>
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
