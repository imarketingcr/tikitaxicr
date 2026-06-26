"use client";

import { createContext, useContext } from "react";

export type Locale = "en" | "es";

type TribeInfo = {
  name: string;
  sub?: string;
  desc: string;
};

export type Translations = {
  nav: {
    services: string;
    booking: string;
    tribes: string;
    about: string;
    reviews: string;
  };
  hero: {
    eyebrow: string;
    tagline: string;
    desc: string;
    cta: string;
    ctaWhatsapp: string;
    stat1: string;
    stat1Label: string;
    stat2: string;
    stat2Label: string;
    stat3: string;
    stat3Label: string;
  };
  values: {
    eyebrow: string;
    title: string;
    protection: { name: string; desc: string };
    guidance: { name: string; desc: string };
    connection: { name: string; desc: string };
    energy: { name: string; desc: string };
    adventure: { name: string; desc: string };
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    airport: { name: string; desc: string; chips: string[] };
    tours: { name: string; desc: string; chips: string[] };
    hourly: { name: string; desc: string; chips: string[] };
  };
  tribes: {
    eyebrow: string;
    title: string;
    intro: string;
    footer: string;
    list: TribeInfo[];
  };
  culture: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    guide: { name: string; desc: string };
    protector: { name: string; desc: string };
    energy: { name: string; desc: string };
  };
  words: {
    eyebrow: string;
    title: string;
    intro: string;
    footer: string;
    list: Array<{ cab: string; tr: string; desc: string }>;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    list: Array<{ name: string; from: string; text: string }>;
  };
  booking: {
    title: string;
    subtitle: string;
    eyebrow: string;
    point1Title: string;
    point1Desc: string;
    point2Title: string;
    point2Desc: string;
    point3Title: string;
    point3Desc: string;
    chatDirect: string;
    chatWhatsapp: string;
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    phone: string;
    date: string;
    time: string;
    places: string;
    placesPlaceholder: string;
    special: string;
    specialPlaceholder: string;
    language: string;
    languageEn: string;
    languageEs: string;
    contact: string;
    contactEmail: string;
    contactWhatsapp: string;
    submit: string;
    submitting: string;
    success: { title: string; message: string };
    errors: {
      required: string;
      email: string;
      phone: string;
      outsideHours: string;
      slotTaken: string;
      generic: string;
    };
    timeTooltip: string;
  };
  footer: {
    tagline: string;
    rights: string;
  };
};

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      services: "Services",
      booking: "Book Now",
      tribes: "Tribes",
      about: "Culture",
      reviews: "Reviews",
    },
    hero: {
      eyebrow: "THE SPIRIT THAT GUIDES YOU",
      tagline: "More than a taxi. Your guide and protector on every journey across Costa Rica.",
      desc: "Inspired by the rich cultural heritage and artisan traditions of Costa Rica, the Tiki mask represents protection, guidance and good energy on every journey.",
      cta: "Free Consultation",
      ctaWhatsapp: "WhatsApp 24/7",
      stat1: "Bilingual",
      stat1Label: "Local drivers",
      stat2: "24/7",
      stat2Label: "Support",
      stat3: "100%",
      stat3Label: "Insured",
    },
    values: {
      eyebrow: "A SYMBOL OF",
      title: "OUR VALUES",
      protection: {
        name: "Protection",
        desc: "We keep you safe from the moment you board until your destination.",
      },
      guidance: {
        name: "Guidance",
        desc: "We are your local guide, showing you the real Costa Rica.",
      },
      connection: {
        name: "Connection",
        desc: "We connect with nature, culture and the local people.",
      },
      energy: {
        name: "Good Energy",
        desc: "We transmit positive energy, exceptional service and unforgettable experiences.",
      },
      adventure: {
        name: "Adventure",
        desc: "Every journey is the beginning of a new story.",
      },
    },
    services: {
      eyebrow: "WHAT WE DO",
      title: "WHAT WE OFFER",
      subtitle: "Premium transportation and personalized tours across Costa Rica.",
      airport: {
        name: "Private Airport Transfers",
        desc: "Door-to-door comfort from any Costa Rican airport. Modern A/C vehicle, GPS, complimentary WiFi and full insurance, so you travel with total peace of mind.",
        chips: ["A/C & WiFi", "GPS", "Full Insurance", "Door-to-door"],
      },
      tours: {
        name: "Custom Private Tours",
        desc: "Tell us your dream destinations — volcanoes, beaches, rainforests, wildlife. We craft an itinerary tailored to your pace, interests and budget.",
        chips: ["Custom Itinerary", "Any Budget", "Bilingual Guide"],
      },
      hourly: {
        name: "Executive & Hourly",
        desc: "Whether a business trip or a family adventure: spotless vehicle, professional driver, great music and routes that show the real Costa Rica.",
        chips: ["Spotless Vehicle", "Pro Driver", "Always on Time"],
      },
    },
    tribes: {
      eyebrow: "TRIBES",
      title: "ROOTED IN COSTA RICA",
      intro: "Traditional masks are part of the soul of our land. Each design honors the indigenous tribes that have lived in harmony with nature for centuries. We do not just take you to places — we share the spirit of Costa Rica.",
      footer: "Different tribes · One single root · One same spirit · One same journey",
      list: [
        {
          name: "Brunca",
          sub: "(Boruca)",
          desc: "Guardians of the land and its sacred balance. They symbolize strength, resilience and a deep connection with nature.",
        },
        {
          name: "Cabécar",
          desc: "People of the rivers and the sea. They represent wisdom, adaptability and respect for all living beings.",
        },
        {
          name: "Bribrí",
          desc: "Guardians of the forest and the ancestors. They value spiritual connection, family and tradition.",
        },
        {
          name: "Ngäbe",
          desc: "People of the mountains and the sea. Known for their hospitality, crafts and strong community bonds.",
        },
        {
          name: "Guaymí",
          desc: "Warriors and dreamers. They symbolize courage, independence and harmony with the natural world.",
        },
        {
          name: "Maléku",
          desc: "People of the jaguar. They protect the land, their spirituality and ancestral knowledge.",
        },
        {
          name: "Huetar",
          desc: "Original people of the Central Valley. They are the root of our history and national identity.",
        },
        {
          name: "Chorotega",
          desc: "People of the Nicoya Peninsula. Great potters and healers, deeply connected to the earth.",
        },
        {
          name: "Térraba",
          desc: "People of the south. They represent peace, agriculture and the importance of water in life.",
        },
        {
          name: "Boruca",
          desc: "Artists and storytellers. Their masks bring legends to life and celebrate the spirit of their people.",
        },
      ],
    },
    culture: {
      eyebrow: "OUR TIKI MASK",
      title: "THE HEART AND SOUL OF TIKIS TAXI",
      p1: "It represents a spiritual guide and protector of the road. Its mission is to accompany, care for and bring positive energy to all travelers and visitors to Costa Rica.",
      p2: "More than a symbol, it is a guardian that opens paths, drives away negativity and brings good fortune on every adventure.",
      guide: {
        name: "Spiritual Guide",
        desc: "Illuminates the road and accompanies you to every destination.",
      },
      protector: {
        name: "Protector",
        desc: "Takes care of your journey, your well-being and your experience.",
      },
      energy: {
        name: "Positive Energy",
        desc: "Attracts good vibes, joy and meaningful encounters.",
      },
    },
    words: {
      eyebrow: "CABÉCAR LANGUAGE",
      title: "BÄE EBÄ · PURE LIFE",
      intro: "We honor the Cabécar language, one of the native peoples of Costa Rica. Each word carries wisdom and a way of seeing the world in harmony with life.",
      footer: "Pure Vida, Pure Roots.",
      list: [
        {
          cab: "Bäe Ebä",
          tr: "Good Life",
          desc: "A wish for a full life, in harmony and well-being.",
        },
        {
          cab: "Sëne Bulë",
          tr: "Peace",
          desc: "Inner harmony, tranquility and respect on the road.",
        },
        {
          cab: "Ña Skalta",
          tr: "Protection",
          desc: "Spiritual strength that guides and protects on the road.",
        },
        {
          cab: "Amor",
          tr: "Love",
          desc: "Energy that connects, heals and unites us as beings.",
        },
      ],
    },
    testimonials: {
      eyebrow: "REVIEWS",
      title: "WHAT OUR TRAVELERS SAY",
      list: [
        {
          name: "Sarah M.",
          from: "United States",
          text: "From the airport we felt at home. Punctual driver, spotless car and a guide who showed us the real Costa Rica. Pura vida!",
        },
        {
          name: "Lukas B.",
          from: "Germany",
          text: "We booked a private tour to Arenal. Perfect itinerary, great music and so much good energy. We will definitely be back.",
        },
        {
          name: "Camila R.",
          from: "Mexico",
          text: "More than a taxi, a travel companion. Safe, authentic and always smiling. 100% recommended.",
        },
      ],
    },
    booking: {
      eyebrow: "BOOK YOUR TRIP",
      title: "FREE CONSULTATION",
      subtitle: "Tell us where you want to go and we design your experience. No commitment.",
      point1Title: "Fast Reply",
      point1Desc: "We answer within minutes on WhatsApp.",
      point2Title: "No Commitment",
      point2Desc: "The consultation and quote are free.",
      point3Title: "Local and Bilingual",
      point3Desc: "Service from Costa Rican locals, in your language.",
      chatDirect: "Prefer to chat directly?",
      chatWhatsapp: "Message on WhatsApp",
      firstName: "Name",
      lastName: "Last Name",
      email: "Email or WhatsApp",
      country: "Country of Origin",
      phone: "Phone Number",
      date: "Preferred Consultation Date",
      time: "Preferred Time (Costa Rica, GMT-6)",
      places: "Service",
      placesPlaceholder: "Airport transfer / Private tour / Executive / Other",
      special: "Where are we going? Dates, travelers, destinations…",
      specialPlaceholder: "e.g. Arenal Volcano, 2 adults, June 15-20…",
      language: "Preferred Language",
      languageEn: "English",
      languageEs: "Spanish",
      contact: "Preferred Contact Method",
      contactEmail: "Email",
      contactWhatsapp: "WhatsApp",
      submit: "Send Request",
      submitting: "Sending…",
      success: {
        title: "Thank you!",
        message: "We will contact you very soon. Pura vida.",
      },
      errors: {
        required: "This field is required",
        email: "Please enter a valid email address",
        phone: "Please enter a valid phone number",
        outsideHours: "TikiTaxi CR only schedules consultations Monday to Friday, 8:00 AM – 4:00 PM Costa Rica time. Please select a time within that window.",
        slotTaken: "That slot is already taken. We've automatically selected the next available time.",
        generic: "Something went wrong. Please try again or contact us directly.",
      },
      timeTooltip: "Consultations are available Monday–Friday, 8:00 AM – 4:00 PM (Costa Rica time, GMT-6).",
    },
    footer: {
      tagline: "Pure Vida, Pure Energy, Pure Costa Rica",
      rights: "© 2026 Tikis Taxi · TIKITAXICR.com",
    },
  },

  es: {
    nav: {
      services: "Servicios",
      booking: "Reservar",
      tribes: "Tribus",
      about: "Cultura",
      reviews: "Reseñas",
    },
    hero: {
      eyebrow: "EL ESPÍRITU QUE TE GUÍA",
      tagline: "Más que un taxi. Tu guía y protector en cada viaje por Costa Rica.",
      desc: "Inspirados en la rica herencia cultural y las tradiciones artesanales de Costa Rica, la máscara Tiki representa protección, guía y buena energía en cada viaje.",
      cta: "Consulta Gratuita",
      ctaWhatsapp: "WhatsApp 24/7",
      stat1: "Bilingüe",
      stat1Label: "Choferes locales",
      stat2: "24/7",
      stat2Label: "Soporte",
      stat3: "100%",
      stat3Label: "Asegurado",
    },
    values: {
      eyebrow: "UN SÍMBOLO DE",
      title: "NUESTROS VALORES",
      protection: {
        name: "Protección",
        desc: "Te mantenemos seguro desde el momento en que abordas hasta tu destino.",
      },
      guidance: {
        name: "Guía",
        desc: "Somos tu guía local, mostrándote la verdadera Costa Rica.",
      },
      connection: {
        name: "Conexión",
        desc: "Conectamos con la naturaleza, la cultura y la gente local.",
      },
      energy: {
        name: "Buena Energía",
        desc: "Transmitimos energía positiva, servicio excepcional y experiencias inolvidables.",
      },
      adventure: {
        name: "Aventura",
        desc: "Cada viaje es el comienzo de una nueva historia.",
      },
    },
    services: {
      eyebrow: "LO QUE HACEMOS",
      title: "LO QUE OFRECEMOS",
      subtitle: "Transporte premium y tours personalizados por toda Costa Rica.",
      airport: {
        name: "Traslados Privados al Aeropuerto",
        desc: "Comodidad puerta a puerta desde cualquier aeropuerto de Costa Rica. Vehículo con A/C, GPS, WiFi de cortesía y seguro completo, para que viajes con total tranquilidad.",
        chips: ["A/C & WiFi", "GPS", "Seguro Total", "Puerta a Puerta"],
      },
      tours: {
        name: "Tours Privados a Medida",
        desc: "Cuéntanos tus destinos soñados — volcanes, playas, bosques, vida silvestre. Diseñamos un itinerario a tu ritmo, interés y presupuesto.",
        chips: ["Itinerario a Medida", "Cualquier Presupuesto", "Guía Bilingüe"],
      },
      hourly: {
        name: "Ejecutivo & Por Hora",
        desc: "Sea un viaje de negocios o una aventura familiar: vehículo impecable, chofer profesional, buena música y rutas que muestran la verdadera Costa Rica.",
        chips: ["Vehículo Impecable", "Chofer Profesional", "Puntual"],
      },
    },
    tribes: {
      eyebrow: "TRIBUS",
      title: "ARRAIGADOS EN COSTA RICA",
      intro: "Las máscaras tradicionales son parte del alma de nuestra tierra. Cada diseño honra a las tribus indígenas que han vivido en armonía con la naturaleza durante siglos. No solo te llevamos a lugares — compartimos el espíritu de Costa Rica.",
      footer: "Diferentes tribus · Una sola raíz · Un mismo espíritu · Un mismo viaje",
      list: [
        {
          name: "Brunca",
          sub: "(Boruca)",
          desc: "Guardianes de la tierra y su equilibrio sagrado. Simbolizan fuerza, resiliencia y profunda conexión con la naturaleza.",
        },
        {
          name: "Cabécar",
          desc: "Pueblo de los ríos y del mar. Representan sabiduría, adaptabilidad y respeto por todos los seres vivos.",
        },
        {
          name: "Bribrí",
          desc: "Guardianes del bosque y de los ancestros. Valoran la conexión espiritual, la familia y la tradición.",
        },
        {
          name: "Ngäbe",
          desc: "Pueblo de las montañas y del mar. Conocidos por su hospitalidad, artesanías y fuertes lazos comunitarios.",
        },
        {
          name: "Guaymí",
          desc: "Guerreros y soñadores. Simbolizan valentía, independencia y armonía con el mundo natural.",
        },
        {
          name: "Maléku",
          desc: "Pueblo del jaguar. Protegen la tierra, su espiritualidad y el conocimiento ancestral.",
        },
        {
          name: "Huetar",
          desc: "Pueblo original del Valle Central. Son la raíz de nuestra historia y de nuestra identidad nacional.",
        },
        {
          name: "Chorotega",
          desc: "Pueblo de la Península de Nicoya. Grandes alfareros y sanadores, profundamente conectados con la tierra.",
        },
        {
          name: "Térraba",
          desc: "Pueblo del sur. Representan la paz, la agricultura y la importancia del agua en la vida.",
        },
        {
          name: "Boruca",
          desc: "Artistas y narradores. Sus máscaras traen leyendas a la vida y celebran el espíritu de su pueblo.",
        },
      ],
    },
    culture: {
      eyebrow: "NUESTRA MÁSCARA TIKI",
      title: "EL CORAZÓN Y EL ALMA DE TIKIS TAXI",
      p1: "Representa a un guía espiritual y protector del camino. Su misión es acompañar, cuidar y brindar energía positiva a todos los viajeros y visitantes de Costa Rica.",
      p2: "Más que un símbolo, es un guardián que abre caminos, aleja lo negativo y trae buena fortuna en cada aventura.",
      guide: {
        name: "Guía Espiritual",
        desc: "Ilumina el camino y te acompaña en cada destino.",
      },
      protector: {
        name: "Protector",
        desc: "Cuida tu viaje, tu bienestar y tu experiencia.",
      },
      energy: {
        name: "Energía Positiva",
        desc: "Atracción de buenas vibras, alegría y buenos encuentros.",
      },
    },
    words: {
      eyebrow: "IDIOMA CABÉCAR",
      title: "BÄE EBÄ · PURA VIDA",
      intro: "Honramos el idioma cabécar, uno de los pueblos originarios de Costa Rica. Cada palabra guarda sabiduría y un modo de ver el mundo en armonía con la vida.",
      footer: "Pura Vida, Puras Raíces.",
      list: [
        {
          cab: "Bäe Ebä",
          tr: "Buena Vida",
          desc: "Deseo de una vida plena, en armonía y bienestar.",
        },
        {
          cab: "Sëne Bulë",
          tr: "Paz",
          desc: "Armonía interior, tranquilidad y respeto en el camino.",
        },
        {
          cab: "Ña Skalta",
          tr: "Protección",
          desc: "Fuerza espiritual que guía y protege en el camino.",
        },
        {
          cab: "Amor",
          tr: "Amor",
          desc: "Energía que conecta, cura y nos une como seres.",
        },
      ],
    },
    testimonials: {
      eyebrow: "RESEÑAS",
      title: "LO QUE DICEN NUESTROS VIAJEROS",
      list: [
        {
          name: "Sarah M.",
          from: "Estados Unidos",
          text: "Desde el aeropuerto nos sentimos en casa. Conductor puntual, auto impecable y un guía que nos mostró la verdadera Costa Rica. ¡Pura vida!",
        },
        {
          name: "Lukas B.",
          from: "Alemania",
          text: "Reservamos un tour privado a Arenal. Itinerario perfecto, buena música y muchísima buena energía. Volveremos sin duda.",
        },
        {
          name: "Camila R.",
          from: "México",
          text: "Más que un taxi, un compañero de viaje. Seguros, auténticos y siempre con una sonrisa. 100% recomendado.",
        },
      ],
    },
    booking: {
      eyebrow: "RESERVA TU VIAJE",
      title: "CONSULTA GRATUITA",
      subtitle: "Cuéntanos a dónde quieres ir y diseñamos tu experiencia. Sin compromiso.",
      point1Title: "Respuesta Rápida",
      point1Desc: "Te contestamos en minutos por WhatsApp.",
      point2Title: "Sin Compromiso",
      point2Desc: "La consulta y la cotización son gratis.",
      point3Title: "Local y Bilingüe",
      point3Desc: "Atención de gente de Costa Rica, en tu idioma.",
      chatDirect: "¿Prefieres chatear directamente?",
      chatWhatsapp: "Escríbenos por WhatsApp",
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Email o WhatsApp",
      country: "País de Origen",
      phone: "Número de Teléfono",
      date: "Fecha Preferida para la Consulta",
      time: "Hora Preferida (Costa Rica, GMT-6)",
      places: "Servicio",
      placesPlaceholder: "Traslado aeropuerto / Tour privado / Ejecutivo / Otro",
      special: "¿A dónde vamos? Fechas, personas, destinos…",
      specialPlaceholder: "Ej. Volcán Arenal, 2 adultos, 15-20 junio…",
      language: "Idioma Preferido",
      languageEn: "Inglés",
      languageEs: "Español",
      contact: "Método de Contacto Preferido",
      contactEmail: "Correo Electrónico",
      contactWhatsapp: "WhatsApp",
      submit: "Enviar Consulta",
      submitting: "Enviando…",
      success: {
        title: "¡Gracias!",
        message: "Te contactaremos muy pronto. Pura vida.",
      },
      errors: {
        required: "Este campo es obligatorio",
        email: "Por favor ingresa un correo electrónico válido",
        phone: "Por favor ingresa un número de teléfono válido",
        outsideHours: "TikiTaxi CR solo programa consultas de lunes a viernes, de 8:00 AM a 4:00 PM hora de Costa Rica. Por favor selecciona un horario dentro de ese rango.",
        slotTaken: "Ese horario ya está ocupado. Hemos seleccionado automáticamente el próximo disponible.",
        generic: "Algo salió mal. Por favor inténtalo de nuevo o contáctanos directamente.",
      },
      timeTooltip: "Las consultas están disponibles de lunes a viernes, de 8:00 AM a 4:00 PM (hora de Costa Rica, GMT-6).",
    },
    footer: {
      tagline: "Pura Vida, Pura Energía, Pura Costa Rica",
      rights: "© 2026 Tikis Taxi · TIKITAXICR.com",
    },
  },
};

export type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
};

export const I18nContext = createContext<I18nContextType>({
  locale: "en",
  setLocale: () => {},
  t: translations.en,
});

export function useI18n() {
  return useContext(I18nContext);
}
