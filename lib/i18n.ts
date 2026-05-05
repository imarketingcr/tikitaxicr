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
  };
  services: {
    title: string;
    subtitle: string;
    airport: { title: string; desc: string };
    tours: { title: string; desc: string };
    executive: { title: string; desc: string };
  };
  booking: {
    title: string;
    subtitle: string;
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
    success: {
      title: string;
      message: string;
    };
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
      about: "About",
      contact: "Contact",
    },
    hero: {
      headline: "Your Private Driver & Tour Expert in Costa Rica",
      subheadline: "Bilingual. Reliable. Unforgettable experiences.",
      cta: "Book a Free Consultation",
    },
    services: {
      title: "What We Offer",
      subtitle: "Premium transportation and personalized tours across Costa Rica",
      airport: {
        title: "Private Airport Transfers",
        desc: "Door-to-door comfort from any Costa Rican airport. Modern A/C vehicle, GPS navigation, complimentary WiFi, and full insurance — so you travel with total peace of mind.",
      },
      tours: {
        title: "Custom Tour Design",
        desc: "Tell us your dream destinations — volcanoes, beaches, rainforests, wildlife. We craft a fully personalized itinerary tailored to your budget, pace, and interests.",
      },
      executive: {
        title: "Executive & Tourist Transport",
        desc: "Whether it's a business trip or a family adventure, enjoy a spotless vehicle, a sober and professional driver, great music, and routes that show the real Costa Rica.",
      },
    },
    booking: {
      title: "Book Your Free Consultation",
      subtitle:
        "Schedule a 1-hour video call with your personal Costa Rica travel expert. We'll design your perfect trip together.",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      country: "Country of Origin",
      phone: "Phone Number",
      date: "Preferred Consultation Date",
      time: "Preferred Time (Costa Rica, GMT-6)",
      places: "Places & Experiences You Want to Visit",
      placesPlaceholder:
        "e.g. Arenal Volcano, Manuel Antonio, white-water rafting, coffee farm tour…",
      special: "Special Requests (optional)",
      specialPlaceholder:
        "Dietary needs, accessibility requirements, travel dates, group size…",
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
        message:
          "Your consultation has been confirmed. Check your email and WhatsApp for details. We look forward to meeting you!",
      },
      errors: {
        required: "This field is required",
        email: "Please enter a valid email address",
        phone: "Please enter a valid phone number",
        outsideHours:
          "TikiTaxi CR only schedules consultations Monday to Friday, 8:00 AM – 4:00 PM Costa Rica time. Please select a time within that window.",
        slotTaken:
          "That slot is already taken. We've automatically selected the next available time.",
        generic: "Something went wrong. Please try again or contact us directly.",
      },
      timeTooltip:
        "Consultations are available Monday–Friday, 8:00 AM – 4:00 PM (Costa Rica time, GMT-6).",
    },
    footer: {
      tagline: "Exploring Costa Rica, one journey at a time.",
      rights: "All rights reserved.",
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
    },
    services: {
      title: "Lo Que Ofrecemos",
      subtitle: "Transporte premium y tours personalizados por toda Costa Rica",
      airport: {
        title: "Traslados Privados al Aeropuerto",
        desc: "Comodidad puerta a puerta desde cualquier aeropuerto de Costa Rica. Vehículo moderno con A/C, navegación GPS, WiFi gratuito y seguro completo — viaja con total tranquilidad.",
      },
      tours: {
        title: "Diseño de Tours a la Medida",
        desc: "Cuéntanos tus destinos soñados — volcanes, playas, selvas, vida silvestre. Creamos un itinerario completamente personalizado según tu presupuesto, ritmo e intereses.",
      },
      executive: {
        title: "Transporte Ejecutivo y Turístico",
        desc: "Ya sea un viaje de negocios o una aventura familiar, disfruta de un vehículo impecable, un conductor profesional, buena música y rutas que muestran la verdadera Costa Rica.",
      },
    },
    booking: {
      title: "Agenda Tu Consulta Gratuita",
      subtitle:
        "Programa una videollamada de 1 hora con tu experto personal en Costa Rica. Diseñaremos tu viaje perfecto juntos.",
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Correo Electrónico",
      country: "País de Origen",
      phone: "Número de Teléfono",
      date: "Fecha Preferida para la Consulta",
      time: "Hora Preferida (Costa Rica, GMT-6)",
      places: "Lugares y Experiencias que Deseas Visitar",
      placesPlaceholder:
        "Ej. Volcán Arenal, Manuel Antonio, rafting, tour de café…",
      special: "Solicitudes Especiales (opcional)",
      specialPlaceholder:
        "Necesidades alimentarias, accesibilidad, fechas de viaje, tamaño del grupo…",
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
        message:
          "Tu consulta ha sido confirmada. Revisa tu correo y WhatsApp para más detalles. ¡Esperamos conocerte pronto!",
      },
      errors: {
        required: "Este campo es obligatorio",
        email: "Por favor ingresa un correo electrónico válido",
        phone: "Por favor ingresa un número de teléfono válido",
        outsideHours:
          "TikiTaxi CR solo programa consultas de lunes a viernes, de 8:00 AM a 4:00 PM hora de Costa Rica. Por favor selecciona un horario dentro de ese rango.",
        slotTaken:
          "Ese horario ya está ocupado. Hemos seleccionado automáticamente el próximo disponible.",
        generic:
          "Algo salió mal. Por favor inténtalo de nuevo o contáctanos directamente.",
      },
      timeTooltip:
        "Las consultas están disponibles de lunes a viernes, de 8:00 AM a 4:00 PM (hora de Costa Rica, GMT-6).",
    },
    footer: {
      tagline: "Explorando Costa Rica, un viaje a la vez.",
      rights: "Todos los derechos reservados.",
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
