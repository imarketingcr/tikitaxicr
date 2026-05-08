"use client";

import { createContext, useContext } from "react";

export type Locale = "en" | "es";

export type Translations = {
  nav: {
    services: string;
    booking: string;
    about: string;
    contact: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
    ctaWhatsapp: string;
    slide1Subtitle: string;
    slide2Subtitle: string;
    badge: string;
    trust1: string;
    trust2: string;
    trust3: string;
  };
  services: {
    title: string;
    subtitle: string;
    eyebrow: string;
    vehicleLabel: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
    airport: { title: string; desc: string; features: string[] };
    tours: { title: string; desc: string; features: string[] };
    executive: { title: string; desc: string; features: string[] };
  };
  about: {
    eyebrow: string;
    heading: string;
    headingSub: string;
    bio: string;
    badge: string;
    trust1Label: string; trust1Detail: string;
    trust2Label: string; trust2Detail: string;
    trust3Label: string; trust3Detail: string;
    trust4Label: string; trust4Detail: string;
  };
  booking: {
    title: string;
    subtitle: string;
    eyebrow: string;
    point1Title: string; point1Desc: string;
    point2Title: string; point2Desc: string;
    point3Title: string; point3Desc: string;
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
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
  };
  footer: {
    tagline: string;
    rights: string;
    contactHeading: string;
    servicesHeading: string;
  };
};

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      services: "Services",
      booking: "Book Now",
      about: "About",
      contact: "Contact",
    },
    hero: {
      headline: "Your Private Driver & Tour Expert in Costa Rica",
      subheadline: "Bilingual. Reliable. Unforgettable experiences.",
      cta: "Book a Free Consultation",
      ctaWhatsapp: "Chat on WhatsApp",
      slide1Subtitle: "Volcano adventures, rainforest trails & private transfers.",
      slide2Subtitle: "Guanacaste beaches, sunset tours & executive transport.",
      badge: "Costa Rica",
      trust1: "Bilingual Service",
      trust2: "Licensed & Insured",
      trust3: "Free Consultation",
    },
    services: {
      title: "What We Offer",
      subtitle: "Premium transportation and personalized tours across Costa Rica",
      eyebrow: "What We Do",
      vehicleLabel: "Our Vehicle",
      ctaTitle: "Ready to explore Costa Rica?",
      ctaSubtitle: "Book a free 1-hour consultation with your personal travel expert.",
      ctaButton: "Book Free Consultation",
      airport: {
        title: "Private Airport Transfers",
        desc: "Door-to-door comfort from any Costa Rican airport. Modern A/C vehicle, GPS navigation, complimentary WiFi, and full insurance — so you travel with total peace of mind.",
        features: ["A/C & WiFi", "GPS Navigation", "Full Insurance", "Door-to-door"],
      },
      tours: {
        title: "Custom Tour Design",
        desc: "Tell us your dream destinations — volcanoes, beaches, rainforests, wildlife. We craft a fully personalized itinerary tailored to your budget, pace, and interests.",
        features: ["Custom Itinerary", "Any Budget", "Any Interest", "Bilingual Guide"],
      },
      executive: {
        title: "Executive & Tourist Transport",
        desc: "Whether it's a business trip or a family adventure, enjoy a spotless vehicle, a sober and professional driver, great music, and routes that show the real Costa Rica.",
        features: ["Clean Vehicle", "Sober Driver", "Professional", "Punctual"],
      },
    },
    about: {
      eyebrow: "Your Guide",
      heading: "Meet Luis,",
      headingSub: "Your Personal Driver",
      bio: "Born and raised in Costa Rica, Luis has spent years showing travelers the country's hidden gems — from misty cloud forests to pristine Pacific beaches. With him, every ride is part of the experience.",
      badge: "Costa Rica Local",
      trust1Label: "Bilingual",
      trust1Detail: "Fluent English & Spanish — no communication barriers.",
      trust2Label: "Licensed & Insured",
      trust2Detail: "Fully certified driver with complete vehicle insurance.",
      trust3Label: "Costa Rica Expert",
      trust3Detail: "Local knowledge of every road, beach, and volcano.",
      trust4Label: "5-Star Rated",
      trust4Detail: "Trusted by hundreds of travelers from around the world.",
    },
    booking: {
      eyebrow: "Free Consultation",
      point1Title: "1-Hour Video Call",
      point1Desc: "A dedicated session with your personal Costa Rica expert.",
      point2Title: "Custom Itinerary",
      point2Desc: "We design your perfect trip based on your interests and budget.",
      point3Title: "No Commitment",
      point3Desc: "The consultation is completely free. No obligation.",
      chatDirect: "Prefer to chat directly?",
      chatWhatsapp: "Message on WhatsApp",
      title: "Book Your Free Consultation",
      subtitle: "Schedule a 1-hour video call with your personal Costa Rica travel expert. We'll design your perfect trip together.",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      country: "Country of Origin",
      phone: "Phone Number",
      date: "Preferred Consultation Date",
      time: "Preferred Time (Costa Rica, GMT-6)",
      places: "Places & Experiences You Want to Visit",
      placesPlaceholder: "e.g. Arenal Volcano, Manuel Antonio, white-water rafting, coffee farm tour…",
      special: "Special Requests (optional)",
      specialPlaceholder: "Dietary needs, accessibility requirements, travel dates, group size…",
      language: "Preferred Language",
      languageEn: "English",
      languageEs: "Spanish",
      contact: "Preferred Contact Method",
      contactEmail: "Email",
      contactWhatsapp: "WhatsApp",
      submit: "Schedule My Consultation",
      submitting: "Scheduling…",
      success: {
        title: "You're booked!",
        message: "Your consultation has been confirmed. Check your email and WhatsApp for details. We look forward to meeting you!",
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
    testimonials: {
      badge: "Testimonials",
      title: "What Our Clients Say",
      subtitle: "Real experiences from real travelers across Costa Rica",
    },
    footer: {
      tagline: "Exploring Costa Rica, one journey at a time.",
      rights: "All rights reserved.",
      contactHeading: "Contact",
      servicesHeading: "Services",
    },
  },

  es: {
    nav: {
      services: "Servicios",
      booking: "Reservar",
      about: "Nosotros",
      contact: "Contacto",
    },
    hero: {
      headline: "Tu Conductor Privado y Experto en Tours en Costa Rica",
      subheadline: "Bilingüe. Confiable. Experiencias inolvidables.",
      cta: "Agenda una Consulta Gratuita",
      ctaWhatsapp: "Escríbenos por WhatsApp",
      slide1Subtitle: "Aventuras en volcanes, senderos y traslados privados.",
      slide2Subtitle: "Playas de Guanacaste, tours al atardecer y transporte ejecutivo.",
      badge: "Costa Rica",
      trust1: "Servicio Bilingüe",
      trust2: "Licenciado y Asegurado",
      trust3: "Consulta Gratuita",
    },
    services: {
      title: "Lo Que Ofrecemos",
      subtitle: "Transporte premium y tours personalizados por toda Costa Rica",
      eyebrow: "Lo Que Hacemos",
      vehicleLabel: "Nuestro Vehículo",
      ctaTitle: "¿Listo para explorar Costa Rica?",
      ctaSubtitle: "Agenda una consulta gratuita de 1 hora con tu experto personal en viajes.",
      ctaButton: "Agenda Tu Consulta",
      airport: {
        title: "Traslados Privados al Aeropuerto",
        desc: "Comodidad puerta a puerta desde cualquier aeropuerto de Costa Rica. Vehículo moderno con A/C, navegación GPS, WiFi gratuito y seguro completo — viaja con total tranquilidad.",
        features: ["A/C y WiFi", "Navegación GPS", "Seguro Completo", "Puerta a Puerta"],
      },
      tours: {
        title: "Diseño de Tours a la Medida",
        desc: "Cuéntanos tus destinos soñados — volcanes, playas, selvas, vida silvestre. Creamos un itinerario completamente personalizado según tu presupuesto, ritmo e intereses.",
        features: ["Itinerario Personalizado", "Cualquier Presupuesto", "Cualquier Interés", "Guía Bilingüe"],
      },
      executive: {
        title: "Transporte Ejecutivo y Turístico",
        desc: "Ya sea un viaje de negocios o una aventura familiar, disfruta de un vehículo impecable, un conductor profesional, buena música y rutas que muestran la verdadera Costa Rica.",
        features: ["Vehículo Limpio", "Conductor Profesional", "Puntual", "Confiable"],
      },
    },
    about: {
      eyebrow: "Tu Guía",
      heading: "Conoce a Luis,",
      headingSub: "Tu Conductor Personal",
      bio: "Nacido y criado en Costa Rica, Luis lleva años mostrando a los viajeros las joyas escondidas del país — desde los neblinosos bosques nubosos hasta las prístinas playas del Pacífico. Con él, cada viaje es parte de la experiencia.",
      badge: "Local de Costa Rica",
      trust1Label: "Bilingüe",
      trust1Detail: "Inglés y español fluidos — sin barreras de comunicación.",
      trust2Label: "Licenciado y Asegurado",
      trust2Detail: "Conductor certificado con seguro completo del vehículo.",
      trust3Label: "Experto en Costa Rica",
      trust3Detail: "Conocimiento local de cada camino, playa y volcán.",
      trust4Label: "Calificación 5 Estrellas",
      trust4Detail: "Con la confianza de cientos de viajeros de todo el mundo.",
    },
    booking: {
      eyebrow: "Consulta Gratuita",
      point1Title: "Videollamada de 1 Hora",
      point1Desc: "Una sesión dedicada con tu experto personal en Costa Rica.",
      point2Title: "Itinerario a la Medida",
      point2Desc: "Diseñamos tu viaje perfecto según tus intereses y presupuesto.",
      point3Title: "Sin Compromiso",
      point3Desc: "La consulta es completamente gratuita. Sin obligación.",
      chatDirect: "¿Prefieres chatear directamente?",
      chatWhatsapp: "Escríbenos por WhatsApp",
      title: "Agenda Tu Consulta Gratuita",
      subtitle: "Programa una videollamada de 1 hora con tu experto personal en Costa Rica. Diseñaremos tu viaje perfecto juntos.",
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Correo Electrónico",
      country: "País de Origen",
      phone: "Número de Teléfono",
      date: "Fecha Preferida para la Consulta",
      time: "Hora Preferida (Costa Rica, GMT-6)",
      places: "Lugares y Experiencias que Deseas Visitar",
      placesPlaceholder: "Ej. Volcán Arenal, Manuel Antonio, rafting, tour de café…",
      special: "Solicitudes Especiales (opcional)",
      specialPlaceholder: "Necesidades alimentarias, accesibilidad, fechas de viaje, tamaño del grupo…",
      language: "Idioma Preferido",
      languageEn: "Inglés",
      languageEs: "Español",
      contact: "Método de Contacto Preferido",
      contactEmail: "Correo Electrónico",
      contactWhatsapp: "WhatsApp",
      submit: "Programar Mi Consulta",
      submitting: "Programando…",
      success: {
        title: "¡Reserva confirmada!",
        message: "Tu consulta ha sido confirmada. Revisa tu correo y WhatsApp para más detalles. ¡Esperamos conocerte pronto!",
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
    testimonials: {
      badge: "Testimonios",
      title: "Lo Que Dicen Nuestros Clientes",
      subtitle: "Experiencias reales de viajeros por toda Costa Rica",
    },
    footer: {
      tagline: "Explorando Costa Rica, un viaje a la vez.",
      rights: "Todos los derechos reservados.",
      contactHeading: "Contacto",
      servicesHeading: "Servicios",
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
