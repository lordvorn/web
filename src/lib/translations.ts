export type Language = 'cz' | 'en' | 'de'

export interface Translation {
  tagline: string
  explore: string
  heroConsult: string
  nav: {
    home: string
    services: string
    portfolio: string
    contact: string
  }
  langSwitch: {
    cz: string
    en: string
    de: string
  }
  portfolio: {
    title: string
    ctaLiveDemo: string
    ctaGitHub: string
    projects: {
      name: string
      category: string
      tagline: string
      description: string
      stackLabel: string
      stackMain: string[]
      stackDetails: string[]
      liveUrl: string
      githubUrl: string
    }[]
    screenshots: {
      label: string
      sublabel: string
      description: string
    }[]
  }
  services: {
    title: string
    subtitle: string
    cta: string
    items: {
      title: string
      desc: string
      longDesc: string
      features: string[]
    }[]
  }
  contact: {
    title: string
    name: string
    email: string
    message: string
    submit: string
    submitting: string
    details: string
    phone: string
    socials: string
    success: string
    error: string
    errName: string
    errEmail: string
    errMessage: string
    errDate: string
    errTime: string
    bookConsult: string
    selectDate: string
    pickTime: string
    confirm: string
    months: string[]
    weekdays: string[]
    times: string[]
  }
  footer: {
    rights: string
  }
  chatbot: {
    title: string
    placeholder: string
    greeting: string
    send: string
    hint: string
  }
}

export const translations: Record<Language, Translation> = {
  cz: {
    tagline: 'Digitální řešení na míru, díky kterým vaše firma nezaspí dobu.',
    explore: 'PROZKOUMAT ↓',
    heroConsult: 'Domluvit konzultaci zdarma',
    nav: {
      home: 'Domů',
      services: 'Služby',
      portfolio: 'Portfolio',
      contact: 'Kontakt',
    },
    langSwitch: { cz: 'CZ', en: 'EN', de: 'DE' },
    portfolio: {
      title: 'Portfolio',
      ctaLiveDemo: 'Live Demo',
      ctaGitHub: 'GitHub',
      projects: [
        {
          name: 'EduFin',
          category: 'Web App',
          tagline: 'Gamifikovaná appka pro finanční vzdělávání',
          description: 'Webová aplikace, která učí uživatele základům osobních financí formou interaktivních lekcí, kvízů a simulací investování. Obsahuje AI asistenta „Finny", který odpovídá na finanční dotazy v reálném čase, systém XP/levelů/odznaků pro udržení motivace a žebříček uživatelů.',
          stackLabel: 'Použité technologie',
          stackMain: ['Next.js (App Router)', 'TypeScript', 'Tailwind CSS'],
          stackDetails: ['Prisma ORM', 'PostgreSQL (Supabase)', 'Zustand', 'Groq API (Llama 3.3 70B)', 'Vercel'],
          liveUrl: 'https://edu-fin-flame.vercel.app',
          githubUrl: '',
        },
      ],
      screenshots: [
        { label: 'Dashboard', sublabel: 'Přehled & XP', description: 'Hlavní nástěnka s úrovní, XP a odznaky uživatele.' },
        { label: 'Lekce & Kvízy', sublabel: 'Interaktivní výuka', description: 'Interaktivní lekce a kvízy procvičující finanční koncepty.' },
        { label: 'Finny AI', sublabel: 'AI asistent', description: 'AI asistent odpovídá na finanční dotazy v reálném čase.' },
        { label: 'Žebříček', sublabel: 'Motivace & gamifikace', description: 'Srovnání uživatelů podle XP s odznaky a odměnami.' },
        { label: 'Simulace', sublabel: 'Simulace investování', description: 'Cvičné investování a simulace trhu v bezpečném prostředí.' },
      ],
    },
    services: {
      title: 'Služby',
      subtitle: 'Co pro vás můžeme udělat',
      cta: 'Domluvit konzultaci',
      items: [
        { title: 'Weby na míru', desc: 'Moderní, rychlé a responzivní weby stavěné přesně na míru vaší značce.', longDesc: 'Weby, které reprezentují vaši značku a konvertují návštěvníky na zákazníky.', features: ['Responzivní design', 'SEO optimalizace', 'Rychlost', 'Tailwind CSS'] },
        { title: 'AI chatbot', desc: 'Inteligentní chatbot, který odpovídá na otázky zákazníků 24/7.', longDesc: 'Chatbot školený na vašich datech, který odpovídá přesně a okamžitě.', features: ['24/7 dostupnost', 'Vlastní data', 'Vícejazyčnost', 'Streaming'] },
        { title: 'Automatizace', desc: 'Automatické zpracování poptávek, emailů a opakujících se úloh.', longDesc: 'Ušetřete čas automatizací rutinních procesů ve vaší firmě.', features: ['Zpracování emailů', 'Poptávky', 'Integrace', 'Úspora času'] },
        { title: 'Aplikace na míru', desc: 'Firemní aplikace a interní nástroje přesně podle vašich procesů.', longDesc: 'Interní nástroje a aplikace postavené přesně podle vašich pracovních postupů.', features: ['Interní nástroje', 'Dashboardy', 'API integrace', 'Škálovatelnost'] },
        { title: 'Custom Order', desc: 'Máte specifický požadavek? Navrhneme řešení přesně na míru vaší situaci.', longDesc: 'Žádný požadavek není příliš specifický. Postavíme řešení, které přesně odpovídá vašim potřebám.', features: ['Individuální přístup', 'Analýza potřeb', 'Návrh řešení', 'Konzultace'] },
      ],
    },
    contact: {
      title: 'Kontakt',
      name: 'Jméno',
      email: 'E-mail',
      message: 'Zpráva',
      submit: 'Odeslat',
      submitting: 'Odesílám…',
      details: 'Kontaktní údaje',
      phone: 'Telefon',
      socials: 'Sociální sítě',
      success: 'Zpráva byla odeslána. Ozveme se vám soon.',
      error: 'Omlouváme se, došlo k chybě. Zkuste to prosím znovu.',
      errName: 'Jméno nesmí být prázdné.',
      errEmail: 'Zadejte prosím platnou emailovou adresu.',
      errMessage: 'Zpráva nesmí být prázdná.',
      errDate: 'Vyberte prosím datum konzultace.',
      errTime: 'Vyberte prosím čas konzultace.',
      bookConsult: 'Domluvit konzultaci',
      selectDate: 'Vyberte datum',
      pickTime: 'Vyberte čas',
      confirm: 'Potvrdit termín',
      months: ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'],
      weekdays: ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'],
      times: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'],
    },
    footer: {
      rights: 'Všechna práva vyhrazena.',
    },
    chatbot: {
      title: 'AI Asistent',
      placeholder: 'Napište svou otázku…',
      greeting: 'Ahoj! Jak vám mohu pomoci s vaším digitálním projektem?',
      send: 'Odeslat',
      hint: 'Nevíte si s něčím rady? Zeptejte se!',
    },
  },
  en: {
    tagline: 'Tailored digital solutions that keep your business ahead of the times.',
    explore: 'EXPLORE ↓',
    heroConsult: 'Book a free consultation',
    nav: {
      home: 'Home',
      services: 'Services',
      portfolio: 'Portfolio',
      contact: 'Contact',
    },
    langSwitch: { cz: 'CZ', en: 'EN', de: 'DE' },
    portfolio: {
      title: 'Portfolio',
      ctaLiveDemo: 'Live Demo',
      ctaGitHub: 'GitHub',
      projects: [
        {
          name: 'EduFin',
          category: 'Web App',
          tagline: 'Gamified app for financial education',
          description: 'A web application that teaches users personal finance basics through interactive lessons, quizzes, and investment simulations. It features an AI assistant "Finny" answering financial questions in real time, an XP/levels/badges system to keep users motivated, and a user leaderboard.',
          stackLabel: 'Tech Stack',
          stackMain: ['Next.js (App Router)', 'TypeScript', 'Tailwind CSS'],
          stackDetails: ['Prisma ORM', 'PostgreSQL (Supabase)', 'Zustand', 'Groq API (Llama 3.3 70B)', 'Vercel'],
          liveUrl: 'https://edu-fin-flame.vercel.app',
          githubUrl: '',
        },
      ],
      screenshots: [
        { label: 'Dashboard', sublabel: 'Overview & XP', description: 'Main dashboard with level, XP and user badges.' },
        { label: 'Lessons & Quizzes', sublabel: 'Interactive learning', description: 'Interactive lessons and quizzes practicing financial concepts.' },
        { label: 'Finny AI', sublabel: 'AI assistant', description: 'AI assistant answering financial questions in real time.' },
        { label: 'Leaderboard', sublabel: 'Motivation & gamification', description: 'Compare users by XP with badges and rewards.' },
        { label: 'Simulation', sublabel: 'Investment simulation', description: 'Practice investing and market simulation in a safe environment.' },
      ],
    },
    services: {
      title: 'Services',
      subtitle: 'What we can do for you',
      cta: 'Book a consultation',
      items: [
        { title: 'Custom Websites', desc: 'Modern, fast and responsive websites built precisely for your brand.', longDesc: 'Websites that represent your brand and convert visitors into customers.', features: ['Responsive design', 'SEO optimization', 'Performance', 'Tailwind CSS'] },
        { title: 'AI Chatbot', desc: 'Intelligent chatbot answering your customers\' questions 24/7.', longDesc: 'A chatbot trained on your data, answering accurately and instantly.', features: ['24/7 availability', 'Custom data', 'Multilingual', 'Streaming'] },
        { title: 'Automation', desc: 'Automatic processing of inquiries, emails and recurring tasks.', longDesc: 'Save time by automating routine processes in your business.', features: ['Email processing', 'Inquiries', 'Integrations', 'Time saving'] },
        { title: 'Custom Apps', desc: 'Business applications and internal tools built around your processes.', longDesc: 'Internal tools and apps built precisely around your workflows.', features: ['Internal tools', 'Dashboards', 'API integrations', 'Scalability'] },
        { title: 'Custom Order', desc: 'Have a specific request? We will design a solution tailored to your situation.', longDesc: 'No request is too specific. We build solutions that exactly match your needs.', features: ['Individual approach', 'Needs analysis', 'Solution design', 'Consultation'] },
      ],
    },
    contact: {
      title: 'Contact',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      submit: 'Send',
      submitting: 'Sending…',
      details: 'Contact details',
      phone: 'Phone',
      socials: 'Socials',
      success: 'Message sent. We will get back to you soon.',
      error: 'Sorry, something went wrong. Please try again.',
      errName: 'Name cannot be empty.',
      errEmail: 'Please enter a valid email address.',
      errMessage: 'Message cannot be empty.',
      errDate: 'Please select a consultation date.',
      errTime: 'Please select a consultation time.',
      bookConsult: 'Book a consultation',
      selectDate: 'Select a date',
      pickTime: 'Select a time',
      confirm: 'Confirm appointment',
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      times: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'],
    },
    footer: {
      rights: 'All rights reserved.',
    },
    chatbot: {
      title: 'AI Assistant',
      placeholder: 'Type your question…',
      greeting: 'Hi! How can I help you with your digital project?',
      send: 'Send',
      hint: 'Not sure about something? Just ask!',
    },
  },
  de: {
    tagline: 'Maßgeschneiderte digitale Lösungen, mit denen Ihr Unternehmen den Anschluss nicht verpasst.',
    explore: 'ENTDECKEN ↓',
    heroConsult: 'Kostenlose Beratung vereinbaren',
    nav: {
      home: 'Startseite',
      services: 'Leistungen',
      portfolio: 'Portfolio',
      contact: 'Kontakt',
    },
    langSwitch: { cz: 'CZ', en: 'EN', de: 'DE' },
    portfolio: {
      title: 'Portfolio',
      ctaLiveDemo: 'Live Demo',
      ctaGitHub: 'GitHub',
      projects: [
        {
          name: 'EduFin',
          category: 'Web App',
          tagline: 'Gamifizierte App für finanzielle Bildung',
          description: 'Eine Webanwendung, die Nutzer in den Grundlagen persönlicher Finanzen unterrichtet — durch interaktive Lektionen, Quizze und Investitionssimulationen. Enthält den KI-Assistenten „Finny", der Finanzfragen in Echtzeit beantwortet, ein XP-Level-Badge-System zur Motivation und ein Nutzer-Ranking.',
          stackLabel: 'Verwendete Technologien',
          stackMain: ['Next.js (App Router)', 'TypeScript', 'Tailwind CSS'],
          stackDetails: ['Prisma ORM', 'PostgreSQL (Supabase)', 'Zustand', 'Groq API (Llama 3.3 70B)', 'Vercel'],
          liveUrl: 'https://edu-fin-flame.vercel.app',
          githubUrl: '',
        },
      ],
      screenshots: [
        { label: 'Dashboard', sublabel: 'Übersicht & XP', description: 'Haupt-Dashboard mit Level, XP und Nutzer-Badges.' },
        { label: 'Lektionen & Quizze', sublabel: 'Interaktives Lernen', description: 'Interaktive Lektionen und Quizze zu Finanzkonzepten.' },
        { label: 'Finny KI', sublabel: 'KI-Assistent', description: 'KI-Assistent beantwortet Finanzfragen in Echtzeit.' },
        { label: 'Ranking', sublabel: 'Motivation & Gamification', description: 'Nutzervergleich nach XP mit Badges und Belohnungen.' },
        { label: 'Simulation', sublabel: 'Investitionssimulation', description: 'Übendes Investieren und Markt-Simulation in einer sicheren Umgebung.' },
      ],
    },
    services: {
      title: 'Leistungen',
      subtitle: 'Was wir für Sie tun können',
      cta: 'Beratung buchen',
      items: [
        { title: 'Maßgeschneiderte Websites', desc: 'Moderne, schnelle und responsive Websites, genau für Ihre Marke gebaut.', longDesc: 'Websites, die Ihre Marke repräsentieren und Besucher in Kunden verwandeln.', features: ['Responsives Design', 'SEO-Optimierung', 'Leistung', 'Tailwind CSS'] },
        { title: 'KI-Chatbot', desc: 'Intelligenter Chatbot, der rund um die Uhr Kundenfragen beantwortet.', longDesc: 'Ein Chatbot, der mit Ihren Daten trainiert ist und genau und sofort antwortet.', features: ['24/7 verfügbar', 'Eigene Daten', 'Mehrsprachig', 'Streaming'] },
        { title: 'Automatisierung', desc: 'Automatische Verarbeitung von Anfragen, E-Mails und wiederkehrenden Aufgaben.', longDesc: 'Sparen Sie Zeit durch Automatisierung routinemäßiger Prozesse.', features: ['E-Mail-Verarbeitung', 'Anfragen', 'Integrationen', 'Zeitersparnis'] },
        { title: 'Maßgeschneiderte Apps', desc: 'Geschäftsanwendungen und interne Tools genau nach Ihren Prozessen.', longDesc: 'Interne Tools und Apps, die genau um Ihre Workflows herum gebaut sind.', features: ['Interne Tools', 'Dashboards', 'API-Integrationen', 'Skalierbarkeit'] },
        { title: 'Custom Order', desc: 'Haben Sie eine spezifische Anfrage? Wir entwerfen eine Lösung, die genau zu Ihrer Situation passt.', longDesc: 'Keine Anfrage ist zu spezifisch. Wir bauen Lösungen, die genau Ihren Bedürfnissen entsprechen.', features: ['Individueller Ansatz', 'Bedarfsanalyse', 'Lösungsdesign', 'Beratung'] },
      ],
    },
    contact: {
      title: 'Kontakt',
      name: 'Name',
      email: 'E-Mail',
      message: 'Nachricht',
      submit: 'Senden',
      submitting: 'Wird gesendet…',
      details: 'Kontaktdaten',
      phone: 'Telefon',
      socials: 'Soziale Netzwerke',
      success: 'Nachricht gesendet. Wir melden uns in Kürze.',
      error: 'Entschuldigung, es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
      errName: 'Name darf nicht leer sein.',
      errEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      errMessage: 'Nachricht darf nicht leer sein.',
      errDate: 'Bitte wählen Sie ein Beratungsdatum.',
      errTime: 'Bitte wählen Sie eine Beratungszeit.',
      bookConsult: 'Beratung buchen',
      selectDate: 'Datum auswählen',
      pickTime: 'Uhrzeit auswählen',
      confirm: 'Termin bestätigen',
      months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
      weekdays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
      times: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'],
    },
    footer: {
      rights: 'Alle Rechte vorbehalten.',
    },
    chatbot: {
      title: 'KI-Assistent',
      placeholder: 'Stellen Sie Ihre Frage…',
      greeting: 'Hallo! Wie kann ich Ihnen bei Ihrem digitalen Projekt helfen?',
      send: 'Senden',
      hint: 'Unsicher bei etwas? Fragen Sie einfach!',
    },
  },
}

export const defaultLanguage: Language = 'cz'
