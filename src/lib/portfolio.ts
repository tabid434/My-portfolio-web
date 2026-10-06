export const contact = {
  email: "talhaabid353@gmail.com",
  phone: "+923436060252",
  location: "Lahore / Gujranwala, Pakistan",
  github: "https://github.com/tabid434",
  linkedin: "https://www.linkedin.com/in/talha-abid-1b563b253/",
  resume: "/Talha_Abid_Resume.pdf",
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  company: string;
  role: string;
  technologies: string[];
  summary: string;
  problem: string;
  solution: string;
  challenges: string[];
  features: string[];
  workflow: string[];
  visual: "care" | "media" | "exam" | "health" | "analysis" | "system" | "energy";
  metric?: string;
  sourceUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "cairasu", title: "Cairasu", category: "Home care, connected.", company: "Brackets Private Limited", sourceUrl: "https://cairasuhomecare.com/",
    role: "Frontend Lead", technologies: ["React Native", "Next.js"], visual: "care",
    summary: "One care platform. Every moving part. A caregiver mobile app and multi-role web experience connecting people, schedules, and operations.",
    problem: "Care delivery involves caregivers, staff, clients, and administrators, each with different responsibilities. Attendance also needs to work when a reliable connection is not available.",
    solution: "Led the frontend effort, handled the complete mobile frontend, and worked extensively across the web UI. Translated product requirements into responsive workflows and worked through pull requests across the implementation.",
    challenges: ["Keeping offline attendance and centralized synchronization coherent.", "Presenting scheduling, payroll, and requests across distinct permissions.", "Maintaining a consistent product experience across mobile and responsive web."],
    features: ["Caregiver mobile application", "Admin, staff, and client workflows", "Attendance and offline attendance", "Location tracking", "Payroll and scheduling", "Requests and role-based access", "Push notifications", "Centralized data synchronization"],
    workflow: ["Schedule", "Caregiver visit", "Attendance / offline capture", "Data synchronization", "Admin review / payroll"],
  },
  {
    slug: "kaido", title: "KAIDO", category: "Property media. Reimagined.", company: "KM Productions / direct client",
    role: "Complete frontend development; backend contribution", technologies: ["Frontend architecture", "AI/API integrations", "Video workflows"], visual: "media",
    summary: "From property images to generated video. An AI-assisted media product with configurable editing, review, approval, and billing workflows.",
    problem: "Turning uploaded property media into a finished video requires many configurable decisions, asynchronous processing, and clear review states across different user permissions.",
    solution: "Worked directly with the client on the complete frontend, responsive UI, frontend architecture, and some backend implementation. Connected configurable forms and media controls with the product's multi-role workflows.",
    challenges: ["Representing AI processing and generated media as understandable workflow states.", "Managing forms, configurable options, animated styles, and editable video flows.", "Coordinating clip approval, review permissions, and billing interfaces."],
    features: ["Property image and media upload", "AI-assisted content analysis", "Video assembly", "Animated styles and transitions", "Configurable options and forms", "Video review and clip approval", "Multi-role permissions", "Billing workflows"],
    workflow: ["Upload property media", "AI-assisted analysis", "Media processing", "Video assembly", "Review / approval"],
  },
  {
    slug: "tudu", title: "TUDU", category: "Learning at scale.", company: "DEVFIED", sourceUrl: "https://play.google.com/store/apps/details?id=com.tudu.app&hl=en",
    role: "Mobile application development", technologies: ["Mobile interfaces", "Tablet / iPad", "PDF workflows"], visual: "exam", metric: "200K+ downloads",
    summary: "A YKS, TYT, and AYT learning product for solving questions, reviewing explanations, and planning study, with the broader multi-role platform spanning mobile, tablet, iPad, and extensive editable document workflows.",
    problem: "Teachers, mentors, students, and parents need distinct experiences within a document-heavy application. The interfaces must remain usable on a phone and a much larger tablet or iPad.",
    solution: "Worked at DEVFIED on responsive mobile interfaces, multi-role product flows, and PDF-based experiences with writing, drawing, and annotation capabilities.",
    challenges: ["Adapting complex navigation and layouts for phones, tablets, and iPads.", "Supporting extensive multi-document PDF workflows and editable content.", "Keeping teacher, mentor, student, and parent experiences understandable."],
    features: ["200K+ application downloads", "Question solving and explanations", "Study planning", "Teacher, mentor, student, and parent roles", "Tablet and iPad support", "Multiple PDF documents", "Writing, drawing, and annotation", "Responsive layouts"],
    workflow: ["Role-based entry", "Learning / exam content", "PDF documents", "Write / draw / annotate", "Role-specific workflows"],
  },
  {
    slug: "dermeez", title: "DERMEEZ", category: "Doctor meets patient.", company: "Brackets Private Limited",
    role: "Mobile application development", technologies: ["Mobile application", "Jitsi", "Audio / video calling"], visual: "health",
    summary: "A dermatology-focused mobile application connecting patient photographs and history with doctor review, treatment instructions, and direct communication.",
    problem: "Doctors need to review multiple photographs alongside detailed patient history, while patients need a clear way to submit information and stay in contact.",
    solution: "Developed patient submission and doctor review workflows with multiple photo uploads, medical history, treatment instructions, and Jitsi-integrated audio and video calls.",
    challenges: ["Keeping multiple photographs and detailed history associated with the patient submission.", "Connecting asynchronous review with live audio and video communication.", "Presenting distinct patient and doctor workflows within the same product."],
    features: ["Multiple photograph uploads", "Detailed patient and medical history", "Doctor review", "Treatment instructions and prescriptions", "In-app communication", "Jitsi audio calling", "Jitsi video calling"],
    workflow: ["Patient photographs / history", "Submission", "Doctor review", "Treatment instructions", "Audio / video follow-up"],
  },
  {
    slug: "boltiq", title: "BoltIQ", category: "Human judgment. AI assistance.", company: "Brackets Private Limited",
    role: "Web application and API integration", technologies: ["BoltIQ API", "Streaming responses", "Audio", "Web notifications"], visual: "analysis",
    summary: "An AI-assisted web workflow connecting patient information and audio to BoltIQ analysis, streamed responses, and doctor-led review.",
    problem: "Patient information, history, and audio need to move through an analysis service without obscuring the doctor's responsibility for evaluation and response.",
    solution: "Integrated the BoltIQ API, audio functionality, chunked and streaming responses, and web notifications into a doctor/patient workflow. AI assists analysis; the doctor evaluates the information and provides the prescription or response.",
    challenges: ["Handling partial and streaming API responses within a clear web experience.", "Coordinating audio, history, notifications, and analysis state.", "Keeping doctor review explicit in the product flow."],
    features: ["Patient information and history", "Audio functionality", "BoltIQ API integration", "AI-assisted analysis", "Chunked / streaming responses", "Web application notifications", "Doctor review and response"],
    workflow: ["Patient information / audio", "BoltIQ analysis", "Streamed response", "Doctor evaluation", "Doctor prescription / response"],
  },
  {
    slug: "brackets-team", title: "Brackets Team", category: "Everyday operations, organized.", company: "Brackets Private Limited",
    role: "React Native development", technologies: ["React Native", "Firebase"], visual: "system",
    summary: "Attendance, payroll, and employee requests in a mobile team management product.",
    problem: "Internal operations require reliable identity checks and accessible employee workflows.",
    solution: "Worked on attendance, payroll, requests, biometric authentication, and notifications alongside themes, animations, and gesture interactions.",
    challenges: ["Combining operational workflows with biometric authentication.", "Maintaining UI consistency across themes and gesture interactions."],
    features: ["Attendance", "Payroll", "Employee requests", "Biometric authentication", "Push notifications", "Animations", "Dark / light themes", "Gesture interactions"],
    workflow: ["Biometric authentication", "Attendance", "Employee requests", "Payroll"],
  },
  {
    slug: "eflea", title: "Eflea", category: "Connected safety.", company: "Product work", sourceUrl: "https://play.google.com/store/apps/details?id=com.eflea.app&hl=en",
    role: "React Native development", technologies: ["React Native", "Firebase", "Smart Watch"], visual: "system",
    summary: "A connected health and safety experience for tracking blood pressure, SpO2, and location while staying connected with loved ones.",
    problem: "Watch connectivity, location signals, and urgent notifications need to work together within a usable mobile experience.",
    solution: "Worked on smartwatch connectivity, calling, chat, emergency alerts, and map-based features.",
    challenges: ["Connecting smartwatch and mobile workflows.", "Coordinating live location and boundary alerts with real-time communication."],
    features: ["Smartwatch connectivity", "Blood pressure and SpO2 tracking", "Video calling", "Emergency alerts and SOS", "Live location tracking", "Chat", "Fall detection", "Geofencing / boundary alerts"],
    workflow: ["Watch connectivity", "Location / activity", "Alerts", "Communication"],
  },
  {
    slug: "veronicas-insurance", title: "Veronica's Insurance", category: "Insurance on mobile.", company: "Product work", sourceUrl: "https://veronicasinsurance.com/en/",
    role: "React Native development", technologies: ["React Native", "Firebase", "Stripe"], visual: "system",
    summary: "A customer-facing insurance experience spanning auto, home, commercial, life, and other coverage workflows with quote and payment support.",
    problem: "Insurance workflows need approachable mobile interfaces with integrated payments and communication.",
    solution: "Worked on Stripe payments, audio recordings, push notifications, and custom mobile UI components.",
    challenges: ["Connecting customer workflows with payment states.", "Integrating audio and notifications into a consistent mobile UI."],
    features: ["Auto, home, commercial, and life coverage", "Insurance management", "Quote workflows", "Stripe payments", "Audio recordings", "Push notifications", "Custom UI components"],
    workflow: ["Customer access", "Insurance management", "Payment", "Notifications"],
  },
  {
    slug: "tour-27", title: "Tour 27", category: "A tour, from anywhere.", company: "Product work", sourceUrl: "https://tour27.com/",
    role: "Application development", technologies: ["React Native", "Node.js / NestJS", "Firebase", "Agora"], visual: "system",
    summary: "A guide and virtual tour product with booking, scheduling, real-time communication, and live video workflows.",
    problem: "Remote tours require scheduling and identity to connect smoothly with real-time audio and video.",
    solution: "Worked on Google authentication, scheduling, sockets, Agora streaming, Firebase synchronization, and custom animations.",
    challenges: ["Coordinating booking and real-time session workflows.", "Keeping socket communication and Firebase synchronization aligned."],
    features: ["Virtual tour booking", "Google authentication", "Scheduling", "Audio / video streaming", "Automated YouTube live streaming", "Camera and zoom controls", "Sockets", "Firebase real-time synchronization"],
    workflow: ["Google authentication", "Book / schedule", "Live tour", "Real-time synchronization"],
  },
  {
    slug: "save-e", title: "Save-E", category: "Load monitoring, in real time.", company: "Final Year Project / Gift University",
    role: "IoT device and mobile application", technologies: ["IoT", "Machine learning", "Mobile application", "Real-time data"], visual: "energy",
    summary: "An IoT-based real-time device that measures readings from a dual single-phase energy meter, predicts unit consumption with machine learning, and brings live graphs, custom alarms, bills, and voltage alerts into one mobile app.",
    problem: "Households only see their electricity usage when the bill arrives. Voltage fluctuations go unnoticed, and there is no simple way to anticipate consumption or act on it before costs rise.",
    solution: "Built an IoT device that reads voltage, current, and units from a dual single-phase energy meter and streams them to a mobile app. A machine learning model predicts daily, weekly, and monthly units, while users set custom unit-based alarms and receive real-time alerts.",
    challenges: ["Capturing reliable, continuous readings from two single-phase lines on the IoT device.", "Training an ML model that predicts daily, weekly, and monthly unit consumption.", "Streaming live voltage and current data into responsive real-time graphs.", "Detecting voltage fluctuations and triggering alerts without false alarms."],
    features: ["Dual single-phase energy meter readings", "ML-based unit prediction", "Live voltage graph", "Live current graph", "Historical units by day, month, and year", "Custom unit-consumption alarms", "Real-time voltage fluctuation alerts", "Bill viewing"],
    workflow: ["Energy meter readings", "IoT device", "Real-time data stream", "ML unit prediction", "Graphs / alarms / bills"],
  },
];

export const ecosystem = [
  { name: "Interfaces", note: "One product, across screens.", technologies: ["React", "React Native", "Next.js", "TypeScript", "JavaScript"], project: "Cairasu / Mobile + web" },
  { name: "Systems", note: "The logic behind the experience.", technologies: ["Node.js", "NestJS", "Express", "Firebase", "Redux", "Redux Toolkit", "Authentication"], project: "Role-based product workflows" },
  { name: "Connections", note: "Products that work together.", technologies: ["REST APIs", "AI/API integrations", "Google Maps", "Stripe", "Jitsi", "Agora", "Real-time systems"], project: "BoltIQ / Kaido / Communication" },
  { name: "Practice", note: "Architecture is a daily decision.", technologies: ["Git", "GitHub", "Pull requests", "Responsive design", "Frontend architecture"], project: "Cairasu / Frontend leadership" },
  { name: "Deployments", note: "In the stores people already use.", technologies: ["App Store", "Play Store", "React Native", "Release builds"], project: "TUDU / Eflea" },
];