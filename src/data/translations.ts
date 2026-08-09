import { Language } from "../types";

export const translations = {
  en: {
    // Nav
    brandName: "HydroAccess AI",
    navHome: "Home",
    navHow: "How It Works",
    navAdvisor: "Water Advisor",
    navAbout: "About",
    langSwitch: "Español",

    // Home Section 1
    heroTitle: "Simple guidance for safer water at home",
    heroDesc:
      "Tell us about your water and what you have available. HydroAccess AI will help you find practical ways to collect, treat, and store water.",
    btnStartAdvisor: "Start Water Advisor",
    linkHowItWorks: "How does it work?",

    // Home Section 2 (Facts)
    fact1Number: "2.1 billion",
    fact1Text: "people lack safely managed drinking water",
    fact2Number: "1.6 billion",
    fact2Text: "people face both poverty and limited water and sanitation access",
    fact3Number: "HydroAccess",
    fact3Text: "helps you find practical water options using the resources you have",
    factSource: "Source: WHO / UNICEF Joint Monitoring Programme (JMP) for Water Supply, Sanitation and Hygiene.",

    // Home Section 3 (Why Easy)
    whyTitle: "Why HydroAccess is easy to use",
    why1Heading: "Easy to understand",
    why1Text: "Simple questions and clear instructions. No technical knowledge needed.",
    why2Heading: "Works with what you have",
    why2Text: "Recommendations consider your materials, budget, water source, and needs.",
    why3Heading: "English and Spanish",
    why3Text: "Switch languages at any time without losing your progress.",

    // Home Section 4 (Help list)
    helpTitle: "What HydroAccess can help with",
    helpItem1: "Understanding your water source",
    helpItem2: "Finding possible treatment options",
    helpItem3: "Learning what materials you may need",
    helpItem4: "Following step-by-step instructions",
    helpItem5: "Understanding important safety risks",
    helpItem6: "Saving your water plan for later",

    // Home Section 5
    readyTitle: "Ready to begin?",
    readyDesc: "Answer a few simple questions about your water.",

    // How It Works
    howTitle: "How HydroAccess Works",
    howIntro:
      "HydroAccess asks simple questions about your water and uses your answers to suggest practical next steps.",
    step1Num: "1",
    step1Heading: "Start the Water Advisor",
    step1Text: "Open the Water Advisor and choose Water Assessment.",
    step2Num: "2",
    step2Heading: "Answer simple questions",
    step2Text:
      "We will ask where your water comes from, what it looks like, what materials you have, your budget, and what you need the water for.",
    step3Num: "3",
    step3Heading: "Get your water suggestion",
    step3Text: "HydroAccess uses your answers to find options that may fit your situation.",
    step4Num: "4",
    step4Heading: "Follow the instructions",
    step4Text:
      "Your suggestion includes materials, building steps, safety information, and helpful videos.",
    step5Num: "5",
    step5Heading: "Save it for later",
    step5Text:
      "Save your suggestion on your device so you can read it again when you have little or no internet.",
    step6Num: "6",
    step6Heading: "Ask questions",
    step6Text: "If something is confusing, open Ask HydroAccess and ask for help.",

    safetyTitle: "Important Safety Information",
    safetyDesc:
      "HydroAccess gives guidance, but it cannot test your water. Some water problems need professional testing or local health guidance. HydroAccess will tell you when this may be necessary.",

    // Water Advisor
    tabAssessment: "Water Assessment",
    tabAsk: "Ask HydroAccess",

    // Assessment Common
    qProgress: "Question",
    ofText: "of",
    btnBack: "Back",
    btnContinue: "Continue",
    btnWhyAsk: "Why are we asking?",
    btnHideWhy: "Close explanation",

    // Questions
    q1Title: "What do you need help with?",
    q1Why: "Knowing how you will use the water helps us match the safest treatment level.",
    q1Opt1: "Drinking water",
    q1Opt2: "Cooking water",
    q1Opt3: "Household water",
    q1Opt4: "Emergency water",
    q1Opt5: "More than one",

    q2Title: "Where does your water come from?",
    q2Why: "Different water sources can have different risks. Knowing where the water comes from helps HydroAccess choose better options.",
    q2Opt1: "Rain",
    q2Opt2: "Well",
    q2Opt3: "River, stream, or lake",
    q2Opt4: "Piped water",
    q2Opt5: "Water delivered by truck or container",
    q2Opt6: "Another source",
    q2Opt7: "I don't know",

    q3Title: "What does the water look like?",
    q3Why: "Visible dirt or turbidity requires filtering before any disinfection method can work properly.",
    q3Opt1: "Clear",
    q3Opt2: "Cloudy",
    q3Opt3: "Muddy",
    q3Opt4: "Unusual color",
    q3Opt5: "Floating material",
    q3Opt6: "I don't know",

    q4Title: "Does anything make you worried about the water?",
    q4Why: "Certain chemical or biological dangers cannot be treated at home and require testing or special care.",
    q4Opt1: "Bad or unusual smell",
    q4Opt2: "Sewage nearby",
    q4Opt3: "Farms or pesticides nearby",
    q4Opt4: "Factories or industrial areas nearby",
    q4Opt5: "Flooding",
    q4Opt6: "Animals often enter the water",
    q4Opt7: "People became sick after drinking it",
    q4Opt8: "None of these",
    q4Opt9: "I don't know",

    q5Title: "How many people need water?",
    q5Why: "This helps estimate how much water needs to be disinfected each day.",
    q5Opt1: "1 person",
    q5Opt2: "2 to 4 people",
    q5Opt3: "5 to 8 people",
    q5Opt4: "9 or more people",

    q6Title: "What do you have available?",
    q6Why: "HydroAccess builds recommendations around tools you already own so you don't spend extra money.",
    q6Opt1: "Clean containers",
    q6Opt2: "Cloth (cotton T-shirt or towel)",
    q6Opt3: "Sand",
    q6Opt4: "Gravel",
    q6Opt5: "Charcoal",
    q6Opt6: "Chlorine or household bleach",
    q6Opt7: "Stove or fire",
    q6Opt8: "Electricity",
    q6Opt9: "Strong sunlight",
    q6Opt10: "None of these",

    q7Title: "How much can you spend?",
    q7Why: "We suggest free or low-cost options if your budget is limited.",
    q7Opt1: "Almost nothing",
    q7Opt2: "A small amount",
    q7Opt3: "A moderate amount",
    q7Opt4: "I'm not sure",

    q8Title: "How much maintenance can you do?",
    q8Why: "Some filters need regular cleaning or replacement to stay safe.",
    q8Opt1: "Very little",
    q8Opt2: "A few minutes regularly",
    q8Opt3: "Regular cleaning and replacement",
    q8Opt4: "I am not sure",

    q9Title: "Do you need a solution right away?",
    q9Why: "Immediate needs favor quick methods like boiling or chlorine over methods that take days to set up.",
    q9Opt1: "Yes, today",
    q9Opt2: "Within a few days",
    q9Opt3: "No, I am planning ahead",

    // Review Screen
    reviewTitle: "Ready for your suggestion?",
    reviewDesc: "Here is a quick summary of your answers:",
    btnChangeAnswers: "Change answers",
    btnGenerateSuggestion: "Generate Suggestion",
    generatingMessage: "Creating your water suggestion... This may take a moment.",

    // Suggestion Result Headings
    sSituationTitle: "Your Situation",
    sSafetyTitle: "Important Safety Note",
    sSystemTitle: "Suggested Water System",
    sMaterialsTitle: "What you need",
    sBuildTitle: "How to build it",
    sDiagramTitle: "Where everything goes",
    sUseTitle: "How to use it",
    sKeepTitle: "How to keep it working",
    sNotFixTitle: "What this does NOT fix",
    sVideosTitle: "Watch how to do this",
    videoNotice: "Note: Opening video links requires an active internet connection and uses data.",
    
    // Save / Actions
    btnSaveOffline: "Save for Offline",
    btnSavedPlans: "View Saved Plans",
    btnPrint: "Print / Download Plan",
    savedConfirmTitle: "Saved on this device",
    savedConfirmDesc: "You can read this plan without internet. Videos still need an internet connection.",
    alreadyHaveLabel: "You already have this",
    substituteLabel: "If you don't have this: ",

    // Ask HydroAccess
    askTitle: "Ask HydroAccess AI",
    askDesc: "Ask a question about water, your suggestion, or something you do not understand.",
    canned1: "What is a sand filter?",
    canned2: "Why does water need to be disinfected?",
    canned3: "Can you explain my suggestion more simply?",
    canned4: "What can I use if I don't have this material?",
    chatPlaceholder: "Type your water question here...",
    btnSend: "Send",
    offlineChatNotice: "Ask HydroAccess AI needs an internet connection. Your saved water suggestions are still available.",

    // About Page
    aboutTitle: "About HydroAccess AI",
    aboutWhatHeading: "What is HydroAccess AI?",
    aboutWhatBody:
      "HydroAccess AI is a free bilingual tool that helps people understand possible ways to collect, treat, and store water using the resources available to them.",
    aboutMissionHeading: "My Mission",
    aboutMissionBody:
      "My mission is to make practical water information easier to understand and easier to reach, especially for families with limited resources.",
    aboutCreatedHeading: "Why I Created HydroAccess AI",
    aboutCreatedBody:
      "I created HydroAccess AI after seeing communities struggle with water access and wanting to use engineering and technology to make practical water guidance easy to reach for anyone who needs it.",
    aboutWhoHeading: "Who It Is For",
    aboutWho1: "Families with limited resources",
    aboutWho2: "Rural and underserved communities",
    aboutWho3: "People looking for simple water guidance",
    aboutWho4: "English and Spanish speakers",
    aboutWho5: "People using phones or limited internet",
    aboutCannotHeading: "What HydroAccess AI Cannot Do",
    aboutCannot1: "It cannot test water.",
    aboutCannot2: "It cannot guarantee water is completely safe.",
    aboutCannot3: "It cannot replace local health officials or laboratory testing.",
    aboutCannot4: "Some chemical or heavy contamination requires professional help.",
    aboutCreatorHeading: "Creator",
    aboutCreatorText: "Created by Angel Hernandez — HydroAccess AI",

    // Footer
    footerCopyright: "© HydroAccess AI™. Created and developed by Angel Hernandez. All rights reserved.",
    footerDisclaimer:
      "HydroAccess AI provides educational water treatment guidance. For official health advisories, consult local authorities.",
  },

  es: {
    // Nav
    brandName: "HydroAccess AI",
    navHome: "Inicio",
    navHow: "Cómo funciona",
    navAdvisor: "Asesor de Agua",
    navAbout: "Acerca de",
    langSwitch: "English",

    // Home Section 1
    heroTitle: "Guía sencilla para agua más segura en el hogar",
    heroDesc:
      "Cuéntanos sobre tu agua y qué materiales tienes disponibles. HydroAccess AI te ayudará a encontrar formas prácticas de recolectar, tratar y almacenar agua.",
    btnStartAdvisor: "Iniciar asesor de agua",
    linkHowItWorks: "¿Cómo funciona?",

    // Home Section 2 (Facts)
    fact1Number: "2,100 millones",
    fact1Text: "de personas carecen de agua potable gestionada de forma segura",
    fact2Number: "1,600 millones",
    fact2Text: "de personas enfrentan pobreza y acceso limitado a agua y saneamiento",
    fact3Number: "HydroAccess AI",
    fact3Text: "te ayuda a encontrar opciones prácticas de agua con los recursos que tienes",
    factSource: "Fuente: Programa Conjunto de Monitoreo OMS / UNICEF para el Abastecimiento de Agua y Saneamiento.",

    // Home Section 3 (Why Easy)
    whyTitle: "Por qué HydroAccess AI es fácil de usar",
    why1Heading: "Fácil de entender",
    why1Text: "Preguntas sencillas e instrucciones claras. Sin necesidad de conocimientos técnicos.",
    why2Heading: "Funciona con lo que tienes",
    why2Text: "Las recomendaciones consideran tus materiales, presupuesto, fuente de agua y necesidades.",
    why3Heading: "Inglés y Español",
    why3Text: "Cambia de idioma en cualquier momento sin perder tu progreso.",

    // Home Section 4 (Help list)
    helpTitle: "En qué te puede ayudar HydroAccess",
    helpItem1: "Comprender la fuente de tu agua",
    helpItem2: "Encontrar posibles opciones de tratamiento",
    helpItem3: "Saber qué materiales podrías necesitar",
    helpItem4: "Seguir instrucciones paso a paso",
    helpItem5: "Entender riesgos de seguridad importantes",
    helpItem6: "Guardar tu plan de agua para leerlo después",

    // Home Section 5
    readyTitle: "¿Listo para comenzar?",
    readyDesc: "Responde unas breves preguntas sobre tu agua.",

    // How It Works
    howTitle: "Cómo funciona HydroAccess",
    howIntro:
      "HydroAccess te hace preguntas sencillas sobre tu agua y usa tus respuestas para sugerirte pasos prácticos a seguir.",
    step1Num: "1",
    step1Heading: "Inicia el Asesor de Agua",
    step1Text: "Abre el Asesor de Agua y elige Evaluación de Agua.",
    step2Num: "2",
    step2Heading: "Responde preguntas sencillas",
    step2Text:
      "Te preguntaremos de dónde viene tu agua, qué aspecto tiene, qué materiales tienes, tu presupuesto y para qué necesitas el agua.",
    step3Num: "3",
    step3Heading: "Obtén tu sugerencia de agua",
    step3Text: "HydroAccess usa tus respuestas para encontrar opciones que se adapten a tu situación.",
    step4Num: "4",
    step4Heading: "Sigue las instrucciones",
    step4Text:
      "Tu sugerencia incluye materiales, pasos de construcción, información de seguridad y videos útiles.",
    step5Num: "5",
    step5Heading: "Guárdalo para después",
    step5Text:
      "Guarda tu sugerencia en tu teléfono o dispositivo para leerla de nuevo aunque no tengas internet.",
    step6Num: "6",
    step6Heading: "Haz preguntas",
    step6Text: "Si algo te parece confuso, abre Consultar a HydroAccess y pide ayuda.",

    safetyTitle: "Información Importante de Seguridad",
    safetyDesc:
      "HydroAccess ofrece orientación, pero no puede probar tu agua. Algunos problemas del agua requieren análisis profesionales o guía de salud local. HydroAccess te indicará cuándo es necesario.",

    // Water Advisor
    tabAssessment: "Evaluación de Agua",
    tabAsk: "Consultar a HydroAccess",

    // Assessment Common
    qProgress: "Pregunta",
    ofText: "de",
    btnBack: "Atrás",
    btnContinue: "Continuar",
    btnWhyAsk: "¿Por qué preguntamos esto?",
    btnHideWhy: "Cerrar explicación",

    // Questions
    q1Title: "¿Para qué necesitas ayuda?",
    q1Why: "Saber para qué usarás el agua nos ayuda a recomendar el nivel de tratamiento más seguro.",
    q1Opt1: "Agua para beber",
    q1Opt2: "Agua para cocinar",
    q1Opt3: "Agua para uso del hogar",
    q1Opt4: "Agua para emergencias",
    q1Opt5: "Para más de un uso",

    q2Title: "¿De dónde viene tu agua?",
    q2Why: "Las diferentes fuentes de agua tienen distintos riesgos. Saber el origen ayuda a elegir mejores opciones.",
    q2Opt1: "Lluvia",
    q2Opt2: "Pozo",
    q2Opt3: "Río, arroyo o lago",
    q2Opt4: "Agua de tubería o grifo",
    q2Opt5: "Agua entregada por camión o garrafón",
    q2Opt6: "Otra fuente",
    q2Opt7: "No lo sé",

    q3Title: "¿Qué aspecto tiene el agua?",
    q3Why: "La suciedad o turbidez visible requiere filtrado antes de que cualquier método de desinfección funcione bien.",
    q3Opt1: "Clara y transparente",
    q3Opt2: "Nublada o turbia",
    q3Opt3: "Con barro o tierra",
    q3Opt4: "Color inusual",
    q3Opt5: "Con cosas flotando",
    q3Opt6: "No lo sé",

    q4Title: "¿Hay algo que te preocupe sobre el agua?",
    q4Why: "Ciertos peligros químicos o industriales no se pueden tratar en casa y requieren pruebas especiales.",
    q4Opt1: "Olor feo o inusual",
    q4Opt2: "Drenaje o aguas negras cerca",
    q4Opt3: "Campos agrícolas o pesticidas cerca",
    q4Opt4: "Fábricas o zonas industriales cerca",
    q4Opt5: "Inundaciones",
    q4Opt6: "Animales entran seguido al agua",
    q4Opt7: "Personas se enfermaron tras beberla",
    q4Opt8: "Ninguno de estos",
    q4Opt9: "No lo sé",

    q5Title: "¿Cuántas personas necesitan agua?",
    q5Why: "Esto ayuda a calcular cuánta agua se debe desinfectar cada día.",
    q5Opt1: "1 persona",
    q5Opt2: "2 a 4 personas",
    q5Opt3: "5 a 8 personas",
    q5Opt4: "9 o más personas",

    q6Title: "¿Qué materiales tienes disponibles?",
    q6Why: "HydroAccess crea recomendaciones con herramientas que ya tienes para que no gastes dinero extra.",
    q6Opt1: "Recipientes o cubetas limpias",
    q6Opt2: "Tela limpia (camiseta de algodón o toalla)",
    q6Opt3: "Arena",
    q6Opt4: "Grava / piedras pequeñas",
    q6Opt5: "Carbón vegetal",
    q6Opt6: "Cloro o blanqueador de hogar",
    q6Opt7: "Estufa o fuego",
    q6Opt8: "Electricidad",
    q6Opt9: "Luz solar fuerte",
    q6Opt10: "Ninguno de estos",

    q7Title: "¿Cuánto puedes gastar?",
    q7Why: "Sugerimos opciones gratuitas o muy económicas si tu presupuesto es limitado.",
    q7Opt1: "Casi nada",
    q7Opt2: "Una cantidad pequeña",
    q7Opt3: "Una cantidad moderada",
    q7Opt4: "No estoy seguro",

    q8Title: "¿Cuánto mantenimiento puedes hacer?",
    q8Why: "Algunos filtros necesitan limpieza o reemplazo continuo para seguir siendo seguros.",
    q8Opt1: "Muy poco",
    q8Opt2: "Unos minutos con regularidad",
    q8Opt3: "Limpieza y reemplazo constante",
    q8Opt4: "No estoy seguro",

    q9Title: "¿Necesitas la solución de inmediato?",
    q9Why: "Las necesidades urgentes favorecen métodos rápidos como hervir o cloro en lugar de métodos que toman días.",
    q9Opt1: "Sí, hoy mismo",
    q9Opt2: "En pocos días",
    q9Opt3: "No, estoy planeando con tiempo",

    // Review Screen
    reviewTitle: "¿Listo para tu sugerencia?",
    reviewDesc: "Aquí hay un resumen breve de tus respuestas:",
    btnChangeAnswers: "Cambiar respuestas",
    btnGenerateSuggestion: "Generar sugerencia",
    generatingMessage: "Creando tu sugerencia de agua... Esto puede tomar un momento.",

    // Suggestion Result Headings
    sSituationTitle: "Tu Situación",
    sSafetyTitle: "Nota Importante de Seguridad",
    sSystemTitle: "Sistema de Agua Sugerido",
    sMaterialsTitle: "Lo que necesitas",
    sBuildTitle: "Cómo construirlo",
    sDiagramTitle: "Dónde va cada elemento",
    sUseTitle: "Cómo usarlo",
    sKeepTitle: "Cómo mantenerlo funcionando",
    sNotFixTitle: "Lo que esto NO resuelve",
    sVideosTitle: "Mira cómo hacerlo",
    videoNotice: "Nota: Abrir enlaces de video requiere conexión a internet y consume datos.",

    // Save / Actions
    btnSaveOffline: "Guardar para usar sin internet",
    btnSavedPlans: "Ver planes guardados",
    btnPrint: "Imprimir / Descargar Plan",
    savedConfirmTitle: "Guardado en este dispositivo",
    savedConfirmDesc: "Puedes leer este plan sin conexión a internet. Los videos aún requieren datos.",
    alreadyHaveLabel: "Ya tienes esto",
    substituteLabel: "Si no tienes esto: ",

    // Ask HydroAccess
    askTitle: "Consultar a HydroAccess AI",
    askDesc: "Haz una pregunta sobre agua, tu sugerencia o algo que no entiendas.",
    canned1: "¿Qué es un filtro de arena?",
    canned2: "¿Por qué hay que desinfectar el agua?",
    canned3: "¿Puedes explicarme mi sugerencia más fácil?",
    canned4: "¿Qué uso si no tengo este material?",
    chatPlaceholder: "Escribe tu pregunta de agua aquí...",
    btnSend: "Enviar",
    offlineChatNotice: "Consultar a HydroAccess AI necesita conexión a internet. Tus sugerencias guardadas siguen disponibles.",

    // About Page
    aboutTitle: "Acerca de HydroAccess AI",
    aboutWhatHeading: "¿Qué es HydroAccess AI?",
    aboutWhatBody:
      "HydroAccess AI es una herramienta gratuita y bilingüe que ayuda a las familias a entender formas posibles de recolectar, tratar y almacenar agua usando los recursos disponibles.",
    aboutMissionHeading: "Mi Misión",
    aboutMissionBody:
      "Mi misión es hacer que la información práctica sobre el agua sea fácil de entender y de alcanzar, especialmente para familias con recursos limitados.",
    aboutCreatedHeading: "Por qué creé HydroAccess AI",
    aboutCreatedBody:
      "Creé HydroAccess AI al ver a comunidades batallar con el acceso al agua y querer usar la ingeniería y tecnología para facilitar información práctica a quienes más la necesitan.",
    aboutWhoHeading: "Para quién es",
    aboutWho1: "Familias con recursos limitados",
    aboutWho2: "Comunidades rurales y vulnerables",
    aboutWho3: "Personas buscando guía sencilla de agua",
    aboutWho4: "Hablantes de inglés y español",
    aboutWho5: "Personas con celulares sencillos o internet limitado",
    aboutCannotHeading: "Lo que HydroAccess AI no puede hacer",
    aboutCannot1: "No puede analizar agua en laboratorio.",
    aboutCannot2: "No puede garantizar que el agua sea 100% segura.",
    aboutCannot3: "No reemplaza a las autoridades de salud ni pruebas profesionales.",
    aboutCannot4: "Cierta contaminación química grave requiere ayuda profesional.",
    aboutCreatorHeading: "Creador",
    aboutCreatorText: "Creado por Angel Hernandez — HydroAccess AI",

    // Footer
    footerCopyright: "© HydroAccess AI™. Creado y desarrollado por Angel Hernandez. Todos los derechos reservados.",
    footerDisclaimer:
      "HydroAccess AI brinda educación práctica sobre tratamiento de agua. Para alertas oficiales, consulte a las autoridades locales.",
  },
};

export function getTranslation(lang: Language) {
  return translations[lang] || translations.en;
}
