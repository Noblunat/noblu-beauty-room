import Image from "next/image";
import SalonTeam from "./components/SalonTeam";
import SalonHygiene from "./components/SalonHygiene";
import FirstVisitDetails from "./components/FirstVisitDetails";
import HomeHero from "./components/home/HomeHero";
import HomeServices from "./components/home/HomeServices";
import HomePricePreview from "./components/home/HomePricePreview";
import HomeWhyNoblu from "./components/home/HomeWhyNoblu";
import HomeAbout from "./components/home/HomeAbout";
import HomeGallery from "./components/home/HomeGallery";
import HomeReviews from "./components/home/HomeReviews";
import HomeLocation from "./components/home/HomeLocation";
import HomeInstagram from "./components/home/HomeInstagram";
import HomeFaq, { faqJsonLd } from "./components/home/HomeFaq";
import HomeContact from "./components/home/HomeContact";
import HomeHeader from "./components/home/HomeHeader";
import StickyBooking from "./components/home/StickyBooking";

export default function NobluBeautyRoomWebsite() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#FFFDFB_0%,#F8F5F2_18%,#EFE7DD_46%,#F8F5F2_72%,#FFFDFB_100%)] text-[#1D1D1B] overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div
        aria-hidden="true"
        className="noblu-brand-intro pointer-events-none fixed inset-0 z-[100001] flex items-center justify-center bg-[#FFFDFB]"
      >
        <Image
          src="/logo-footer.webp"
          alt=""
          width={226}
          height={226}
          loading="eager"
          unoptimized
          className="h-[226px] w-[226px] max-w-[70vw] object-contain"
        />
      </div>

      <div className="fixed left-0 right-0 top-0 z-[99999] h-[3px] origin-left bg-[#D4B483]" />

      {/* NAVBAR */}
      <HomeHeader />

      {/* HERO */}
      <main id="tresc-glowna" tabIndex={-1}>
        <HomeHero />
        <FirstVisitDetails />
        {/* SERVICES */}
        <HomeServices />

        {/* PRICE PREVIEW */}
        <HomePricePreview />

        {/* WHY NOBLU */}
        <HomeWhyNoblu />

        {/* SEO CONTENT */}
        <HomeAbout />

        {/* GALLERY */}
        <HomeGallery />
        <SalonTeam />
        <SalonHygiene />
        {/* REVIEWS */}
        <HomeReviews />
        {/* LOCAL SEO */}
        <HomeLocation />

        {/* INSTAGRAM */}
        <HomeInstagram />

        {/* FAQ */}
        <HomeFaq />

        {/* CONTACT */}
        <HomeContact />
      </main>
      <StickyBooking />
    </div>
  );
}
