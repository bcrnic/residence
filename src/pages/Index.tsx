import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ApartmentsGallery from "@/components/ApartmentsGallery";
import InvestmentBenefits from "@/components/InvestmentBenefits";
import MortgageCalculator from "@/components/MortgageCalculator";
import ConstructionProgress from "@/components/ConstructionProgress";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import StickyContact from "@/components/StickyContact";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/i18n/LanguageContext";

const Index = () => {
  const { lang } = useLanguage();

  const seo = {
    sr: {
      title: "Residences - Premium stanovi u Novom Sadu | Novogradnja od 66.500€",
      description: "Premium stanovi u novogradnji po realnim cenama. 20 stanova od 48m² do 150m², 2-5 soba. Investitor sa 10+ godina iskustva. Novi Sad, Srbija.",
      keywords: "stanovi Novi Sad, novogradnja, investicija nekretnine, kupovina stana, premium stanovi, stanovi na prodaju",
      ogTitle: "Residences - Premium stanovi u Novom Sadu",
      ogDescription: "Sigurna investicija u budućnost. Premium stanovi po realnim cenama - od 52m² do 130m².",
      locale: "sr_RS",
    },
    en: {
      title: "Residences - Premium Apartments in Novi Sad | New Construction from €66,500",
      description: "Premium new construction apartments at real prices. 20 apartments from 48m² to 150m², 2-5 rooms. Developer with 10+ years of experience. Novi Sad, Serbia.",
      keywords: "apartments Novi Sad, new construction, real estate investment, buy apartment, premium apartments, apartments for sale Serbia",
      ogTitle: "Residences - Premium Apartments in Novi Sad",
      ogDescription: "A safe investment in the future. Premium apartments at real prices - from 52m² to 130m².",
      locale: "en_US",
    },
  };

  const s = seo[lang];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: lang === "sr" ? "Residences - Premium stanovi" : "Residences - Premium Apartments",
    description: s.description,
    url: window.location.href,
    numberOfRooms: "2-5",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: 66500,
      highPrice: 215000,
      priceCurrency: "EUR",
      offerCount: 20,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Novi Sad",
      addressCountry: "RS",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: lang === "sr" ? "Koji su načini plaćanja?" : "What are the payment options?",
        acceptedAnswer: {
          "@type": "Answer",
          text: lang === "sr"
            ? "Nudimo fleksibilne modele plaćanja: gotovinski popust do 5%, plaćanje na rate tokom gradnje (30/40/30), kao i mogućnost stambenog kredita."
            : "We offer flexible payment models: cash discount up to 5%, installment payments during construction (30/40/30), and mortgage options.",
        },
      },
      {
        "@type": "Question",
        name: lang === "sr" ? "Koji je rok useljenja?" : "What is the move-in date?",
        acceptedAnswer: {
          "@type": "Answer",
          text: lang === "sr"
            ? "Planirani rok završetka gradnje je Q4 2026."
            : "The planned construction completion is Q4 2026.",
        },
      },
      {
        "@type": "Question",
        name: lang === "sr" ? "Da li postoji garancija kvaliteta?" : "Is there a quality guarantee?",
        acceptedAnswer: {
          "@type": "Answer",
          text: lang === "sr"
            ? "Da, pružamo zakonsku garanciju od 2 godine na završne radove i 10 godina na konstruktivne elemente."
            : "Yes, we provide a legal guarantee of 2 years on finishing works and 10 years on structural elements.",
        },
      },
    ],
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Residences",
    url: window.location.origin,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+381601234567",
      contactType: "sales",
      availableLanguage: ["Serbian", "English"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Novi Sad",
      addressCountry: "RS",
    },
  };

  return (
    <>
      <Helmet>
        <html lang={lang === "sr" ? "sr" : "en"} />
        <title>{s.title}</title>
        <meta name="description" content={s.description} />
        <meta name="keywords" content={s.keywords} />
        <link rel="canonical" href={window.location.origin} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={s.ogTitle} />
        <meta property="og:description" content={s.ogDescription} />
        <meta property="og:locale" content={s.locale} />
        <meta property="og:site_name" content="Residences" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={s.ogTitle} />
        <meta name="twitter:description" content={s.ogDescription} />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
      </Helmet>

      <main>
        <Navbar />
        <Hero />
        <Features />
        <ApartmentsGallery />
        <ConstructionProgress />
        <BeforeAfterSlider />
        <MortgageCalculator />
        <InvestmentBenefits />
        <FAQSection />
        <ContactSection />
        <Footer />
        <StickyContact />
      </main>
    </>
  );
};

export default Index;
