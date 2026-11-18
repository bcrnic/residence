export type Lang = "sr" | "en";

const translations = {
  // Navbar
  nav: {
    apartments: { sr: "Stanovi", en: "Apartments" },
    advantages: { sr: "Prednosti", en: "Advantages" },
    investment: { sr: "Investicija", en: "Investment" },
    contact: { sr: "Kontakt", en: "Contact" },
    callUs: { sr: "Pozovite nas", en: "Call us" },
  },

  // Hero
  hero: {
    badge: { sr: "Novi Sad · useljenje krajem 2026.", en: "Novi Sad · move-in late 2026" },
    title1: { sr: "Dvadeset stanova", en: "Twenty apartments" },
    title2: { sr: "u Novom Sadu", en: "in Novi Sad" },
    subtitle: {
      sr: "Od dvosobnih do petosobnih, u zgradi koja je trenutno završena oko 75%.",
      en: "From two- to five-room units, in a building that is currently about 75% complete.",
    },
    benefits: {
      smart: { sr: "Pametno isplanirano", en: "Smartly designed" },
      premium: { sr: "Premium materijali", en: "Premium materials" },
      modern: { sr: "Savremena arhitektura", en: "Modern architecture" },
    },
    ctaView: { sr: "Pogledajte stanove", en: "View apartments" },
    ctaContact: { sr: "Kontaktirajte nas", en: "Contact us" },
  },

  // Features
  features: {
    badge: { sr: "Unutra", en: "Inside" },
    title: { sr: "Šta dobijate", en: "What comes" },
    titleHighlight: { sr: "u svakom stanu", en: "with every unit" },
    items: [
      {
        title: { sr: "Raspored", en: "Layout" },
        desc: {
          sr: "Dnevna soba i kuhinja izlaze na terasu, a spavaće sobe su odvojene od dnevne zone. Hodnik je sveden na ulaz.",
          en: "Living room and kitchen open onto the terrace, bedrooms sit apart from the day zone, and the hallway is just the entrance.",
        },
      },
      {
        title: { sr: "Materijali", en: "Materials" },
        desc: {
          sr: "Hrastov parket u sobama, italijanska keramika u kupatilu i kuhinji, Grohe sanitarija, ALU-PVC prozori sa troslojnim staklom.",
          en: "Oak parquet in the rooms, Italian tiles in the bathroom and kitchen, Grohe fittings, ALU-PVC windows with triple glazing.",
        },
      },
      {
        title: { sr: "Grejanje", en: "Heating" },
        desc: {
          sr: "Toplotna pumpa i energetski razred A, što znači niže račune zimi i leti. Između stanova je zvučna izolacija.",
          en: "Heat pump and energy class A, which means lower bills in winter and summer. Units are acoustically separated.",
        },
      },
    ],
  },

  // Apartments
  apartments: {
    badge: { sr: "Ponuda", en: "Offer" },
    title: { sr: "Izaberite svoj", en: "Choose your" },
    titleHighlight: { sr: "novi dom", en: "new home" },
    available: { sr: "dostupno", en: "available" },
    only: { sr: "Samo", en: "Only" },
    apartments: { sr: "stanova", en: "apartments" },
    all: { sr: "Svi", en: "All" },
    rooms: { sr: "sobe", en: "rooms" },
    floor: { sr: "sprat", en: "floor" },
    sold: { sr: "PRODATO", en: "SOLD" },
    photo: { sr: "foto", en: "photos" },
    viewDetails: { sr: "Pogledaj detalje", en: "View details" },
    callUs: { sr: "Pozovite nas", en: "Call us" },
    perks: { sr: "Pogodnosti", en: "Features" },
  },

  // Construction Progress
  construction: {
    badge: { sr: "Gradnja", en: "Construction" },
    title: { sr: "Tok", en: "Construction" },
    titleHighlight: { sr: "gradnje", en: "progress" },
    completed: { sr: "završeno", en: "completed" },
    deadline: { sr: "Očekivani rok završetka: Q4 2026", en: "Expected completion: Q4 2026" },
    phases: [
      { sr: "Temelj i konstrukcija", en: "Foundation & structure" },
      { sr: "Fasada i krov", en: "Facade & roof" },
      { sr: "Instalacije", en: "Installations" },
      { sr: "Završni radovi", en: "Finishing works" },
    ],
  },

  // Before/After
  beforeAfter: {
    badge: { sr: "Transformacija", en: "Transformation" },
    title: { sr: "Pre i", en: "Before and" },
    titleHighlight: { sr: "posle", en: "after" },
    before: { sr: "Gradnja", en: "Construction" },
    after: { sr: "Završeno", en: "Completed" },
  },

  // Mortgage Calculator
  calculator: {
    badge: { sr: "Kalkulator kredita", en: "Mortgage calculator" },
    title: { sr: "Izračunajte mesečnu", en: "Calculate your monthly" },
    titleHighlight: { sr: "ratu", en: "payment" },
    subtitle: {
      sr: "Simulirajte mesečne rate stambenog kredita i planirajte budžet za vaš novi stan.",
      en: "Simulate monthly mortgage payments and plan your budget for your new apartment.",
    },
    loanAmount: { sr: "Iznos kredita", en: "Loan amount" },
    interestRate: { sr: "Kamatna stopa (godišnja)", en: "Interest rate (annual)" },
    repaymentPeriod: { sr: "Period otplate", en: "Repayment period" },
    years: { sr: "god.", en: "yrs" },
    monthlyPayment: { sr: "Mesečna rata", en: "Monthly payment" },
    totalPaid: { sr: "Ukupno plaćeno", en: "Total paid" },
    totalInterest: { sr: "Ukupna kamata", en: "Total interest" },
    disclaimer: {
      sr: "* Informativni proračun. Stvarni uslovi zavise od banke i vaše kreditne sposobnosti.",
      en: "* Informational calculation. Actual terms depend on the bank and your creditworthiness.",
    },
  },

  // Investment Benefits
  investment: {
    badge: { sr: "Kupovina", en: "Buying" },
    title: { sr: "Dobro je", en: "Good to" },
    titleHighlight: { sr: "da znate", en: "know" },
    items: [
      {
        title: { sr: "Lokacija", en: "Location" },
        desc: {
          sr: "Odlična povezanost sa centrom, blizina škola, vrtića, parkova i javnog prevoza.",
          en: "Excellent connection to the center, near schools, kindergartens, parks and public transport.",
        },
      },
      {
        title: { sr: "Kvalitet gradnje", en: "Build quality" },
        desc: {
          sr: "Napredak gradnje objavljujemo ovde, fazu po fazu, sa procentom završenosti za svaku fazu.",
          en: "We post construction progress here, phase by phase, with a completion figure for each.",
        },
      },
      {
        title: { sr: "Ako kupujete za izdavanje", en: "If you are buying to let" },
        desc: {
          sr: "Pokazaćemo vam računicu za konkretan stan: cenu, troškove i realnu kiriju u tom delu grada.",
          en: "We will walk you through the numbers for a specific unit: price, costs and a realistic rent for the area.",
        },
      },
      {
        title: { sr: "Plaćanje i garancija", en: "Payment & guarantee" },
        desc: {
          sr: "Plaćanje po fazama gradnje (30/40/30) ili kreditom. Garancija je 2 godine na završne radove i 10 godina na konstrukciju.",
          en: "Pay in construction stages (30/40/30) or by mortgage. Guarantee: 2 years on finishes, 10 years on the structure.",
        },
      },
    ],
    stats: {
      apartments: { sr: "Stanova u ponudi", en: "Apartments available" },
      experience: { sr: "Godina iskustva", en: "Years of experience" },
      clients: { sr: "Zadovoljnih kupaca", en: "Satisfied clients" },
      energy: { sr: "Energetski razred", en: "Energy class" },
    },
  },

  // FAQ
  faq: {
    badge: { sr: "Pitanja", en: "FAQ" },
    title: { sr: "Najčešća", en: "Frequently asked" },
    titleHighlight: { sr: "pitanja", en: "questions" },
    items: [
      {
        q: { sr: "Koji su načini plaćanja?", en: "What are the payment options?" },
        a: {
          sr: "Nudimo fleksibilne modele plaćanja: gotovinski popust do 5%, plaćanje na rate tokom gradnje (30/40/30), kao i mogućnost stambenog kredita preko partnerskih banaka. Rezervacija stana vrši se uplatom kapare od 10%.",
          en: "We offer flexible payment models: cash discount up to 5%, installment payments during construction (30/40/30), and mortgage options through partner banks. Apartment reservation is made with a 10% deposit.",
        },
      },
      {
        q: { sr: "Koji je rok useljenja?", en: "What is the move-in date?" },
        a: {
          sr: "Planirani rok završetka gradnje je Q4 2026. Primopredaja stanova počinje odmah po dobijanju upotrebne dozvole. Svaki kupac dobija precizne informacije o rokovima u ugovoru.",
          en: "The planned construction completion is Q4 2026. Apartment handover begins immediately after obtaining the occupancy permit. Each buyer receives precise timeline information in the contract.",
        },
      },
      {
        q: { sr: "Da li postoji garancija kvaliteta?", en: "Is there a quality guarantee?" },
        a: {
          sr: "Da, pružamo zakonsku garanciju od 2 godine na završne radove i 10 godina na konstruktivne elemente. Koristimo isključivo sertifikovane materijale sa punom dokumentacijom.",
          en: "Yes, we provide a legal guarantee of 2 years on finishing works and 10 years on structural elements. We use exclusively certified materials with full documentation.",
        },
      },
      {
        q: { sr: "Koji materijali se koriste?", en: "What materials are used?" },
        a: {
          sr: "Premium materijali: italijanska keramika, hrastov parket, ALU PVC stolarija sa trostrukim staklom, Grohe sanitarija, energetski efikasno grejanje sa toplotnom pumpom. Energetski razred A.",
          en: "Premium materials: Italian ceramics, oak parquet, ALU PVC windows with triple glazing, Grohe sanitaryware, energy-efficient heating with heat pump. Energy class A.",
        },
      },
      {
        q: { sr: "Da li mogu da prilagodim raspored stana?", en: "Can I customize the apartment layout?" },
        a: {
          sr: "Da, u ranoj fazi gradnje moguće su izmene unutrašnjeg rasporeda bez dodatnih troškova. Takođe nudimo mogućnost izbora završnih materijala iz našeg premium kataloga.",
          en: "Yes, in the early construction phase, interior layout changes are possible at no extra cost. We also offer the option to choose finishing materials from our premium catalog.",
        },
      },
      {
        q: { sr: "Koja dokumentacija je potrebna za kupovinu?", en: "What documentation is needed to purchase?" },
        a: {
          sr: "Potrebna je samo lična karta i potvrda o zaposlenju (za kredit). Mi obezbeđujemo kompletnu pravnu dokumentaciju: građevinsku dozvolu, list nepokretnosti, ugovor overen kod notara.",
          en: "Only an ID card and employment certificate (for mortgage) are needed. We provide complete legal documentation: building permit, property deed, notarized contract.",
        },
      },
      {
        q: { sr: "Da li ima parking mesto?", en: "Is parking included?" },
        a: {
          sr: "Da, svaki stan dolazi sa obezbeđenim parking mestom u podzemnoj garaži. Veći stanovi (4+ sobe) imaju mogućnost dva parking mesta. Cena parkinga je uključena u cenu stana.",
          en: "Yes, each apartment comes with a secured parking spot in the underground garage. Larger apartments (4+ rooms) have the option of two spots. Parking price is included.",
        },
      },
    ],
  },

  // Contact
  contact: {
    badge: { sr: "Kontakt", en: "Contact" },
    title: { sr: "Rezervišite stan", en: "Reserve your apartment" },
    titleHighlight: { sr: "danas", en: "today" },
    subtitle: {
      sr: "Samo 3 stana dostupna po promotivnim cenama",
      en: "Only 3 apartments available at promotional prices",
    },
    namePlaceholder: { sr: "Vaše ime", en: "Your name" },
    phonePlaceholder: { sr: "Telefon *", en: "Phone *" },
    messagePlaceholder: { sr: "Poruka (opciono)", en: "Message (optional)" },
    submit: { sr: "Želim info", en: "I want info" },
    sending: { sr: "Slanje...", en: "Sending..." },
    phone: { sr: "Telefon", en: "Phone" },
    email: { sr: "Email", en: "Email" },
    location: { sr: "Lokacija", en: "Location" },
    successTitle: { sr: "Hvala na interesovanju!", en: "Thank you for your interest!" },
    successDesc: { sr: "Kontaktiraćemo vas u najkraćem roku.", en: "We will contact you shortly." },
    errorTitle: { sr: "Greška", en: "Error" },
    errorDesc: {
      sr: "Došlo je do greške. Pokušajte ponovo ili nas pozovite.",
      en: "An error occurred. Please try again or call us.",
    },
  },

  // Footer
  footer: {
    rights: { sr: "Sva prava zadržana.", en: "All rights reserved." },
  },

  // Sticky
  sticky: {
    whatsapp: { sr: "WhatsApp", en: "WhatsApp" },
    call: { sr: "Pozovite nas", en: "Call us" },
  },
} as const;

export type Translations = typeof translations;
export default translations;
