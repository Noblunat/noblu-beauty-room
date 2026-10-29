import { business, businessHours } from "../../lib/business";
import ExternalContentConsent from "../ExternalContentConsent";

export default function HomeContact() {
  return (
    <section id="contact" className="py-28 bg-transparent text-[#1D1D1B]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-start">
        <div>
          <div className="text-sm uppercase tracking-[0.3em] text-[#7C6238] mb-4">
            Kontakt
          </div>

          <h2 className="text-4xl lg:text-6xl font-light leading-tight">
            {business.name}
          </h2>

          <div className="mt-10 space-y-8 text-[#6D6B68] text-lg">
            <div>
              <div className="text-[#1D1D1B] mb-2">Adres</div>
              <p>{business.address.street}</p>
              <p>
                {business.address.postalCode} {business.address.city}
              </p>
            </div>

            <div>
              <div className="text-[#1D1D1B] mb-2">Telefon</div>
              <a
                href={`tel:${business.phone.e164}`}
                className="hover:text-[#1D1D1B] transition-colors"
              >
                {business.phone.national}
              </a>
            </div>

            <div>
              <div className="text-[#1D1D1B] mb-2">Godziny otwarcia</div>
              <p>{businessHours}</p>
              <p>{business.hours.closedLabel}</p>
              <p>Zapytanie o termin online: 24/7</p>
            </div>

            <div>
              <div className="text-[#1D1D1B] mb-2">E-mail</div>
              <a
                href={`mailto:${business.email}`}
                className="hover:text-[#7C6238] transition-colors"
              >
                {business.email}
              </a>
            </div>
          </div>
        </div>

        <div className="h-[500px] overflow-hidden rounded-[2rem] border border-[#EFE8E1] shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          <ExternalContentConsent
            title="Mapa dojazdu"
            description="Aby wyświetlić mapę salonu, włącz treści zewnętrzne dostarczane przez Google Maps."
            buttonLabel="Włącz mapę"
            className="h-full"
          >
            <iframe
              title={`Mapa dojazdu ${business.name}`}
              src="https://maps.google.com/maps?q=Noblu%20Beauty%20Room%20Krak%C3%B3w&t=&z=17&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </ExternalContentConsent>
        </div>
      </div>
    </section>
  );
}
