"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Search,
  Route,
  ClipboardCheck,
  FlaskConical,
  ListFilter,
  BookOpen,
  Globe,
  Send,
  Bell,
  ChevronDown,
  ChevronUp,
  ToggleLeft,
  ToggleRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Clock,
  BadgeCheck,
  Shield,
  FileText,
  HelpCircle,
  Loader2,
  Menu,
  X,
  Info,
  ArrowRight,
  Home as HomeIcon,
  ShieldCheck,
  AlertTriangle,
  UploadCloud,
  FileSpreadsheet,
  Copy,
  Check,
  MapPin,
  Map,
  Layers,
  Scale,
  Users,
  BookmarkCheck,
  Calendar,
  DollarSign,
  Building,
  Award,
  BarChart3,
  FileSearch,
  Download,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Languages,
  Navigation,
  Phone,
  ExternalLink,
  Compass,
} from "lucide-react";

/* ═══════════════════════════ i18n ═══════════════════════════ */
const labels = {
  en: {
    brand: "BIS Sahayak",
    tagline: "Your guide to Indian Standards",
    taglineLong: "National Standards Intelligence & Compliance Navigator",
    nav: [
      "Ask a Question",
      "Find My Standard",
      "Certification Journey",
      "Compliance Check",
      "Find a Lab",
      "Status Tracker",
      "Scheme Guide",
      "Verify a Product",
      "Report an Issue",
    ],
    askPlaceholder: "Ask about any Indian Standard…",
    recommendPlaceholder: "Describe your product or service…",
    send: "Send",
    loading: "Thinking…",
    certTitle: "Certification Journey Tracker",
    compTitle: "Compliance Check — Lab Report Evaluator",
    labTitle: "Find a BIS-Recognized Lab",
    trackerTitle: "Standard Status Tracker",
    schemeTitle: "BIS Certification Scheme Guide",
    verifyTitle: "Verify a Product (ISI / CRS / HUID)",
    reportTitle: "Report an Issue / Draft BIS CARE Grievance",
    adminTitle: "Admin Insights & Analytics Dashboard",
    parameter: "Parameter",
    limit: "Limit",
    observed: "Observed",
    result: "Result",
    pass: "PASS",
    fail: "FAIL",
    lang: "हिन्दी",
    simpleMode: "Simple Explanation Mode",
    filterBySector: "Filter by sector…",
    subscribe: "Subscribe for updates",
    subscribed: "You'll be notified when this standard's status changes!",
    relatedTitle: "You may also be eligible for",
    askEmpty: "Ask your first question above",
    askEmptySub: "Get instant answers about Indian Standards, compliance requirements, and BIS specifications.",
    recEmpty: "Describe your product to find standards",
    recEmptySub: "Tell us what you make or sell, and we'll identify which Indian Standards and certifications apply.",
    // Landing strings
    heroBadge: "National Standards Intelligence",
    heroHeadingPrefix: "Find the right Indian Standard for your product in ",
    heroHeadingHighlight: "seconds — not hours",
    heroDesc: "Navigate 22,000+ Bureau of Indian Standards specifications, identify mandatory certification schemes, verify lab parameters, and streamline your compliance journey.",
    getStarted: "Get Started",
    exploreSchemes: "Explore Schemes",
    backToHome: "Back to Overview",
    stat1Number: "22,000+",
    stat1Label: "Indian Standards",
    stat1Desc: "Across 15+ industrial, engineering & Ayush sectors",
    stat2Number: "Multiple Schemes",
    stat2Label: "Certification Schemes Simplified",
    stat2Desc: "ISI Mark, CRS, Hallmarking & SDOC requirements",
    stat3Number: "MSME First",
    stat3Label: "Built for MSMEs, Startups & Consumers",
    stat3Desc: "Fast-track compliance pathways & testing fee guidance",
    howItWorksTitle: "How BIS Sahayak Works",
    howItWorksSub: "Three simple steps to clarify your Indian Standard compliance requirements",
    step1Title: "1. Describe your product or ask a question",
    step1Desc: "Type in plain language — describe what you manufacture, import, or ask about any standard specification.",
    step2Title: "2. Get the applicable standard with citations",
    step2Desc: "Instant mapping to official IS numbers, scope analysis, and mandatory vs voluntary scheme guidance.",
    step3Title: "3. Follow the certification steps",
    step3Desc: "Understand testing parameters, locate recognized NABL/BIS labs, and track your certification journey.",
    quickLaunchTitle: "Explore Core Capabilities",
    quickLaunchSub: "Jump directly into any module of BIS Sahayak",
    about: "About",
    aboutModalTitle: "About BIS Sahayak",
    aboutModalBadge: "Hackathon Prototype & Concept",
    aboutModalP1: "BIS Sahayak is an AI-powered compliance assistant developed as a hackathon demonstration prototype. It operates on a curated dataset of Indian Standards, laboratory directories, and certification schemes compiled from publicly available Bureau of Indian Standards (BIS) specifications.",
    aboutModalP2: "In a production deployment, this system is designed to integrate directly with BIS's official standards database, Manak Online, and National Gazette portals via formal data-sharing APIs — enabling real-time updates on Quality Control Orders (QCOs), standard revisions, and live laboratory accreditation registries.",
    aboutModalTechTitle: "Technology & Stack",
    aboutModalTechDesc: "Built with Next.js App Router, Tailwind CSS, and ultra-low latency inference powered by Groq and LLaMA 3.1.",
    aboutModalClose: "Close",
    poweredBy: "Powered by Groq & LLaMA · BIS Sahayak Team",
  },
  hi: {
    brand: "BIS सहायक",
    tagline: "भारतीय मानकों के लिए आपका मार्गदर्शक",
    taglineLong: "राष्ट्रीय मानक बुद्धिमत्ता और अनुपालन मार्गदर्शक",
    nav: [
      "प्रश्न पूछें",
      "मेरा मानक खोजें",
      "प्रमाणन यात्रा",
      "अनुपालन जाँच",
      "प्रयोगशाला खोजें",
      "स्थिति ट्रैकर",
      "योजना गाइड",
      "उत्पाद सत्यापन",
      "शिकायत दर्ज करें",
    ],
    askPlaceholder: "किसी भी भारतीय मानक के बारे में पूछें…",
    recommendPlaceholder: "अपने उत्पाद या सेवा का वर्णन करें…",
    send: "भेजें",
    loading: "सोच रहा है…",
    certTitle: "प्रमाणन यात्रा ट्रैकर",
    compTitle: "अनुपालन जाँच — लैब रिपोर्ट विश्लेषक",
    labTitle: "BIS मान्यता प्राप्त प्रयोगशाला खोजें",
    trackerTitle: "मानक स्थिति ट्रैकर",
    schemeTitle: "BIS प्रमाणन योजना गाइड",
    verifyTitle: "उत्पाद सत्यापन (ISI / CRS / HUID)",
    reportTitle: "शिकायत दर्ज करें / BIS CARE प्रारूप",
    adminTitle: "प्रशासन अंतर्दृष्टि एवं विश्लेषण डैशबोर्ड",
    parameter: "पैरामीटर",
    limit: "सीमा",
    observed: "प्रेक्षित",
    result: "परिणाम",
    pass: "उत्तीर्ण",
    fail: "अनुत्तीर्ण",
    lang: "English",
    simpleMode: "सरल व्याख्या मोड",
    filterBySector: "क्षेत्र से फ़िल्टर करें…",
    subscribe: "अपडेट की सदस्यता लें",
    subscribed: "इस मानक की स्थिति बदलने पर आपको सूचित किया जाएगा!",
    relatedTitle: "आप इसके लिए भी पात्र हो सकते हैं",
    askEmpty: "ऊपर अपना पहला प्रश्न पूछें",
    askEmptySub: "भारतीय मानकों, अनुपालन आवश्यकताओं और BIS विनिर्देशों के बारे में तत्काल उत्तर प्राप्त करें।",
    recEmpty: "मानक खोजने के लिए अपने उत्पाद का वर्णन करें",
    recEmptySub: "हमें बताएं कि आप क्या बनाते या बेचते हैं, और हम बताएंगे कि कौन से मानक लागू होते हैं।",
    // Landing strings
    heroBadge: "राष्ट्रीय मानक बुद्धिमत्ता",
    heroHeadingPrefix: "अपने उत्पाद के लिए सही भारतीय मानक खोजें ",
    heroHeadingHighlight: "सेकंडों में — घंटों में नहीं",
    heroDesc: "22,000+ भारतीय मानक विनिर्देशों को नेविगेट करें, अनिवार्य प्रमाणन योजनाओं की पहचान करें, और अपनी अनुपालन यात्रा को आसान बनाएं।",
    getStarted: "आरंभ करें",
    exploreSchemes: "योजनाएं देखें",
    backToHome: "अवलोकन पर वापस",
    stat1Number: "22,000+",
    stat1Label: "भारतीय मानक",
    stat1Desc: "15+ औद्योगिक, इंजीनियरिंग और आयुष क्षेत्रों में",
    stat2Number: "कई योजनाएं",
    stat2Label: "प्रमाणन योजनाएं सरल",
    stat2Desc: "ISI मार्क, CRS, हॉलमार्किंग और SDOC आवश्यकताएं",
    stat3Number: "MSME प्रथम",
    stat3Label: "MSME, स्टार्टअप और उपभोक्ताओं के लिए",
    stat3Desc: "त्वरित अनुपालन मार्ग और परीक्षण शुल्क मार्गदर्शन",
    howItWorksTitle: "BIS सहायक कैसे काम करता है",
    howItWorksSub: "अपनी मानक अनुपालन आवश्यकताओं को स्पष्ट करने के तीन सरल चरण",
    step1Title: "1. अपने उत्पाद का वर्णन करें या प्रश्न पूछें",
    step1Desc: "सरल भाषा में लिखें — बताएं कि आप क्या बनाते हैं या किसी भी मानक विनिर्देश के बारे में पूछें।",
    step2Title: "2. उद्धरणों सहित लागू मानक प्राप्त करें",
    step2Desc: "आधिकारिक IS नंबरों, कार्यक्षेत्र और अनिवार्य बनाम स्वैच्छिक योजना का तत्काल विवरण प्राप्त करें।",
    step3Title: "3. प्रमाणन चरणों का पालन करें",
    step3Desc: "सटीक परीक्षण आवश्यकताओं को समझें, मान्यता प्राप्त प्रयोगशालाएं खोजें और अपनी प्रमाणन यात्रा ट्रैक करें।",
    quickLaunchTitle: "मुख्य मॉड्यूल देखें",
    quickLaunchSub: "BIS सहायक के किसी भी मॉड्यूल पर सीधे जाएं",
    about: "के बारे में",
    aboutModalTitle: "BIS सहायक के बारे में",
    aboutModalBadge: "हैकथॉन प्रोटोटाइप और संकल्पना",
    aboutModalP1: "BIS सहायक एक एआई-संचालित अनुपालन मार्गदर्शक है जिसे एक हैकथॉन प्रोटोटाइप के रूप में विकसित किया गया है। यह सार्वजनिक रूप से उपलब्ध BIS विनिर्देशों से संकलित भारतीय मानकों के डेटासेट पर काम करता है।",
    aboutModalP2: "पूर्ण उत्पादन संस्करण गुणवत्ता नियंत्रण आदेशों (QCOs), मानक संशोधनों और वास्तविक समय प्रयोगशाला मान्यता के लिए औपचारिक API के माध्यम से BIS के आधिकारिक डेटाबेस और मानक ऑनलाइन पोर्टल से सीधे जुड़ेगा।",
    aboutModalTechTitle: "प्रौद्योगिकी और स्टैक",
    aboutModalTechDesc: "Next.js App Router, Tailwind CSS, और Groq + LLaMA 3.1 द्वारा संचालित।",
    aboutModalClose: "समझ गया, धन्यवाद",
    poweredBy: "Groq और LLaMA द्वारा संचालित · BIS सहायक टीम",
  },
} as const;

type Lang = keyof typeof labels;

/* ═══════════════ Nav icons mapping ═══════════════ */
const navIcons = [
  MessageSquare,
  Search,
  Route,
  ClipboardCheck,
  FlaskConical,
  ListFilter,
  BookOpen,
  ShieldCheck,
  AlertTriangle,
];

/* ═══════════════ Certification steps ═══════════════ */
const certSteps = [
  { title: "Apply", titleHi: "आवेदन", desc: "Submit application with product details", descHi: "उत्पाद विवरण के साथ आवेदन जमा करें", icon: FileText },
  { title: "Document Verification", titleHi: "दस्तावेज़ सत्यापन", desc: "BIS reviews submitted documents", descHi: "BIS प्रस्तुत दस्तावेज़ों की समीक्षा करता है", icon: ClipboardCheck },
  { title: "Testing", titleHi: "परीक्षण", desc: "Product samples tested at recognized lab", descHi: "मान्यता प्राप्त प्रयोगशाला में नमूना परीक्षण", icon: FlaskConical },
  { title: "Certificate Issued", titleHi: "प्रमाणपत्र जारी", desc: "ISI Mark / CRS Certificate granted", descHi: "ISI मार्क / CRS प्रमाणपत्र प्रदान", icon: BadgeCheck },
];
const currentCertStep = 1;

/* ═══════════════ Compliance data ═══════════════ */
const haritakiLimits: Record<string, { limit: number; type: "max" | "min" }> = {
  "Foreign Matter (%)": { limit: 1.0, type: "max" },
  "Loss on Drying (%)": { limit: 12.0, type: "max" },
  "Total Ash (%)": { limit: 6.0, type: "max" },
  "Acid Insoluble Ash (%)": { limit: 3.0, type: "max" },
  "Alcohol Soluble Extractive (%)": { limit: 40.0, type: "min" },
  "Water Soluble Extractive (%)": { limit: 60.0, type: "min" },
};
const sampleTestReport: Record<string, number> = {
  "Foreign Matter (%)": 0.5,
  "Loss on Drying (%)": 9.8,
  "Total Ash (%)": 5.2,
  "Acid Insoluble Ash (%)": 3.5,
  "Alcohol Soluble Extractive (%)": 42.1,
  "Water Soluble Extractive (%)": 55.0,
};

/* ═══════════════ Lab data ═══════════════ */
const labs = [
  { name: "Central Food Technological Research Institute", city: "Mysuru, Karnataka", specialization: "Food & Ayush Products" },
  { name: "NABL Accredited Testing Lab — SGS India", city: "Mumbai, Maharashtra", specialization: "Consumer Electronics, Electrical Safety" },
  { name: "Shriram Institute for Industrial Research", city: "Delhi", specialization: "Cement, Construction Materials" },
  { name: "TÜV SÜD South Asia", city: "Bengaluru, Karnataka", specialization: "Toys, Automotive, Medical Devices" },
  { name: "Bureau Veritas Consumer Products Lab", city: "Chennai, Tamil Nadu", specialization: "Textiles, Toys, Hardlines" },
  { name: "National Test House", city: "Kolkata, West Bengal", specialization: "Metals, Cables, General Engineering" },
];

/* ═══════════════ Standards data (imported at client for tracker) ═══════════════ */
import standardsData from "@/data/standards.json";
interface StandardEntry {
  is_number: string;
  title: string;
  sector: string;
  status: string;
  scheme: string;
  scope: string;
  parameters: Record<string, unknown>;
}
const allStandards = standardsData as StandardEntry[];

/* ═══════════════ Scheme Guide data ═══════════════ */
const schemes = [
  {
    name: "ISI Mark",
    nameHi: "ISI मार्क",
    icon: BadgeCheck,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    covers: "Consumer products like cement, LPG cylinders, electrical appliances, packaged water, food items, and more. Covers products where safety, health, or mass consumer interest is involved.",
    coversHi: "सीमेंट, एलपीजी सिलेंडर, विद्युत उपकरण, पैकेज्ड पानी, खाद्य पदार्थ आदि उपभोक्ता उत्पाद। सुरक्षा, स्वास्थ्य या उपभोक्ता हित से जुड़े उत्पाद।",
    who: "Manufacturers of products covered under mandatory BIS certification orders (as notified by the Government of India). Both domestic and foreign manufacturers must obtain the ISI Mark before selling in India.",
    whoHi: "अनिवार्य BIS प्रमाणन आदेशों के तहत आने वाले उत्पादों के निर्माता। घरेलू और विदेशी दोनों निर्माताओं को भारत में बिक्री से पहले ISI मार्क प्राप्त करना होगा।",
    steps: ["Apply online on BIS portal (Manak Online)", "Submit product samples & factory documents", "BIS conducts factory inspection", "Samples tested at BIS-recognized lab", "Grant of licence & ISI Mark use", "Periodic surveillance audits"],
    stepsHi: ["BIS पोर्टल (मानक ऑनलाइन) पर ऑनलाइन आवेदन", "उत्पाद नमूने और कारखाने के दस्तावेज़ जमा करें", "BIS कारखाने का निरीक्षण करता है", "BIS मान्यता प्राप्त प्रयोगशाला में नमूने का परीक्षण", "लाइसेंस प्रदान और ISI मार्क उपयोग", "नियमित निगरानी ऑडिट"],
  },
  {
    name: "CRS (Compulsory Registration Scheme)",
    nameHi: "CRS (अनिवार्य पंजीकरण योजना)",
    icon: Shield,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    covers: "Electronics and IT products — mobile phones, laptops, tablets, LED lights, chargers, power banks, smart watches, printers, set-top boxes, and other electronic goods covered under the Electronics & IT Goods (Requirement for Compulsory Registration) Order.",
    coversHi: "इलेक्ट्रॉनिक्स और आईटी उत्पाद — मोबाइल फोन, लैपटॉप, टैबलेट, LED लाइट, चार्जर, पावर बैंक, स्मार्ट वॉच, प्रिंटर आदि।",
    who: "Any manufacturer (Indian or foreign) who wants to sell electronic/IT goods in India. Registration is product-model-specific.",
    whoHi: "कोई भी निर्माता (भारतीय या विदेशी) जो भारत में इलेक्ट्रॉनिक/आईटी उत्पाद बेचना चाहता है। पंजीकरण उत्पाद-मॉडल विशिष्ट है।",
    steps: ["Apply on BIS CRS portal", "Submit test report from a BIS-recognized lab", "BIS verifies documents & test reports", "Registration certificate issued (valid 2 years)", "Renewal before expiry"],
    stepsHi: ["BIS CRS पोर्टल पर आवेदन", "BIS मान्यता प्राप्त प्रयोगशाला से परीक्षण रिपोर्ट जमा करें", "BIS दस्तावेज़ों और परीक्षण रिपोर्टों की जांच करता है", "पंजीकरण प्रमाणपत्र जारी (2 वर्ष वैध)", "समाप्ति से पहले नवीनीकरण"],
  },
  {
    name: "Hallmarking",
    nameHi: "हॉलमार्किंग",
    icon: Sparkles,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    covers: "Gold jewellery and gold artefacts. Mandatory hallmarking ensures the purity of gold (14K, 18K, 20K, 22K, 24K) sold in India. Covers gold jewellery, bullion, and coins.",
    coversHi: "सोने के आभूषण और सोने की कलाकृतियाँ। अनिवार्य हॉलमार्किंग भारत में बेचे जाने वाले सोने (14K, 18K, 20K, 22K, 24K) की शुद्धता सुनिश्चित करती है।",
    who: "Jewellers selling gold jewellery in India. They must get their products hallmarked from BIS-recognized Assaying & Hallmarking Centres (AHCs).",
    whoHi: "भारत में सोने के आभूषण बेचने वाले ज्वैलर्स। उन्हें BIS मान्यता प्राप्त परख और हॉलमार्किंग केंद्रों (AHC) से हॉलमार्क कराना होगा।",
    steps: ["Jeweller registers on BIS portal", "Gold articles sent to BIS-recognized AHC", "AHC tests purity via XRF / fire assay", "Hallmark (HUID) laser-engraved on article", "Jeweller can sell hallmarked items"],
    stepsHi: ["ज्वैलर BIS पोर्टल पर पंजीकरण", "सोने के उत्पाद BIS मान्यता प्राप्त AHC को भेजें", "AHC XRF / अग्नि परीक्षा द्वारा शुद्धता का परीक्षण करता है", "हॉलमार्क (HUID) लेजर से अंकित", "ज्वैलर हॉलमार्क वाले उत्पाद बेच सकता है"],
  },
  {
    name: "SDOC (Self Declaration of Conformity)",
    nameHi: "SDOC (अनुरूपता की स्व-घोषणा)",
    icon: FileText,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    covers: "Select products where the manufacturer self-declares that the product conforms to the relevant Indian Standard. Currently applicable to certain categories of toys, footwear, helmets, and other products notified under SDOC.",
    coversHi: "चुनिंदा उत्पाद जहां निर्माता स्वयं घोषित करता है कि उत्पाद संबंधित भारतीय मानक के अनुरूप है। वर्तमान में खिलौने, जूते, हेलमेट आदि पर लागू।",
    who: "Manufacturers or importers of products notified under the SDOC scheme. They must test at a BIS-recognized lab but do not need a BIS licence — they self-declare conformity.",
    whoHi: "SDOC योजना के तहत अधिसूचित उत्पादों के निर्माता या आयातक। उन्हें BIS मान्यता प्राप्त प्रयोगशाला में परीक्षण कराना होगा लेकिन BIS लाइसेंस की आवश्यकता नहीं।",
    steps: ["Get product tested at a BIS-recognized lab", "Prepare Declaration of Conformity (DoC)", "Register on BIS SDOC portal", "Upload test report & DoC", "Self-declare & affix Standard Mark", "Maintain records for BIS inspection"],
    stepsHi: ["BIS मान्यता प्राप्त प्रयोगशाला में उत्पाद का परीक्षण कराएं", "अनुरूपता की घोषणा (DoC) तैयार करें", "BIS SDOC पोर्टल पर पंजीकरण", "परीक्षण रिपोर्ट और DoC अपलोड करें", "स्व-घोषणा करें और मानक चिह्न लगाएं", "BIS निरीक्षण के लिए रिकॉर्ड रखें"],
  },
];

/* ═══════════════ Related MSME schemes ═══════════════ */
const relatedSchemes = [
  {
    name: "MSME Testing Fee Reimbursement Scheme",
    nameHi: "MSME परीक्षण शुल्क प्रतिपूर्ति योजना",
    desc: "MSMEs can claim reimbursement of testing fees paid to BIS-recognized labs for product certification, up to ₹1 lakh per standard.",
    descHi: "MSME उत्पाद प्रमाणन के लिए BIS मान्यता प्राप्त प्रयोगशालाओं को भुगतान किए गए परीक्षण शुल्क की प्रतिपूर्ति का दावा कर सकते हैं।",
  },
  {
    name: "ZED Certification — Zero Defect Zero Effect",
    nameHi: "ZED प्रमाणन — जीरो डिफेक्ट जीरो इफेक्ट",
    desc: "Government subsidy for MSMEs to achieve quality & sustainability certification. Subsidizes up to 80% of certification costs for Micro enterprises.",
    descHi: "गुणवत्ता और स्थिरता प्रमाणन प्राप्त करने के लिए MSME को सरकारी सब्सिडी। सूक्ष्म उद्यमों के लिए प्रमाणन लागत का 80% तक सब्सिडी।",
  },
];

/* ═══════════════ Types ═══════════════ */
interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  sources?: { is_number: string; status: string; scheme?: string }[];
  matchedParameters?: { is_number: string; title: string; parameters: Record<string, unknown> }[];
  isError?: boolean;
  crossConflictWarning?: string | { sector?: string; reason?: string } | null;
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════
   ABOUT MODAL (Hackathon Architecture & Production Vision)
   ═══════════════════════════════════════════════════════ */
function AboutModal({ lang, onClose }: { lang: Lang; onClose: () => void }) {
  const t = labels[lang];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-900 to-indigo-700 flex items-center justify-center text-white shadow-md">
            <Info size={22} />
          </div>
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 mb-1">
              {t.aboutModalBadge}
            </span>
            <h3 className="text-xl font-black text-slate-900">{t.aboutModalTitle}</h3>
          </div>
        </div>

        <div className="space-y-3.5 text-sm text-slate-600 leading-relaxed">
          <p>{t.aboutModalP1}</p>
          <p>{t.aboutModalP2}</p>
          <div className="rounded-2xl bg-indigo-50/70 border border-indigo-100 p-4 mt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-1">
              {t.aboutModalTechTitle}
            </h4>
            <p className="text-xs text-indigo-800 leading-relaxed">
              {t.aboutModalTechDesc}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>{t.poweredBy}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all active:scale-[0.98]"
          >
            {t.aboutModalClose}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   LANDING / HERO VIEW (Market-Ready Product Showcase)
   ═══════════════════════════════════════════════════════ */
function LandingView({
  lang,
  setLang,
  onLaunch,
  onOpenAbout,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  onLaunch: (tabIndex?: number) => void;
  onOpenAbout: () => void;
}) {
  const t = labels[lang];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-800 font-sans">
      {/* ─── Top Navbar ─── */}
      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-white to-green-500 flex items-center justify-center text-lg font-black text-indigo-950 shadow-md">
              B
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-indigo-950">
                  {t.brand}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  AI MVP
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-none">{t.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenAbout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all active:scale-[0.98]"
            >
              <Info size={15} />
              <span className="hidden sm:inline">{t.about}</span>
            </button>
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-all border border-indigo-200 active:scale-[0.98]"
            >
              <Globe size={15} />
              {t.lang}
            </button>
            <button
              onClick={() => onLaunch(0)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white shadow-md shadow-indigo-950/20 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>{t.getStarted}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Hero Section ─── */}
      <section className="relative px-4 sm:px-6 pt-12 sm:pt-20 pb-16 max-w-6xl mx-auto w-full text-center">
        {/* Glow backdrop */}
        <div className="absolute inset-x-0 -top-10 -z-10 transform-gpu overflow-hidden blur-3xl opacity-30">
          <div className="aspect-[1155/678] w-[48rem] mx-auto bg-gradient-to-tr from-amber-400 via-indigo-600 to-amber-200" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200 shadow-sm mb-6">
          <Sparkles size={14} className="text-amber-500" />
          <span>{t.heroBadge}</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
          {t.heroHeadingPrefix}
          <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-indigo-600 bg-clip-text text-transparent">
            {t.heroHeadingHighlight}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t.heroDesc}
        </p>

        {/* Primary CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            onClick={() => onLaunch(0)}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white font-bold text-sm sm:text-base shadow-xl shadow-indigo-950/20 hover:shadow-indigo-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
          >
            <span>{t.getStarted}</span>
            <ArrowRight size={18} />
          </button>
          <button
            onClick={() => onLaunch(6)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white text-slate-700 font-semibold text-sm sm:text-base border border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <BookOpen size={17} className="text-amber-600" />
            <span>{t.exploreSchemes}</span>
          </button>
        </div>

        {/* ─── 3 Stat Callouts (Public BIS Numbers) ─── */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto text-left">
          <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all">
            <div className="text-3xl font-black text-indigo-950">{t.stat1Number}</div>
            <div className="text-sm font-bold text-slate-800 mt-1">{t.stat1Label}</div>
            <div className="text-xs text-slate-500 mt-1 leading-relaxed">{t.stat1Desc}</div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm hover:shadow-md hover:border-amber-200 transition-all">
            <div className="text-3xl font-black text-amber-600">{t.stat2Number}</div>
            <div className="text-sm font-bold text-slate-800 mt-1">{t.stat2Label}</div>
            <div className="text-xs text-slate-500 mt-1 leading-relaxed">{t.stat2Desc}</div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all">
            <div className="text-3xl font-black text-emerald-700">{t.stat3Number}</div>
            <div className="text-sm font-bold text-slate-800 mt-1">{t.stat3Label}</div>
            <div className="text-xs text-slate-500 mt-1 leading-relaxed">{t.stat3Desc}</div>
          </div>
        </div>
      </section>

      {/* ─── How It Works Section (3 Simple Steps) ─── */}
      <section className="px-4 sm:px-6 py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {t.howItWorksTitle}
            </h2>
            <p className="text-sm text-slate-500 mt-2">{t.howItWorksSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative flex flex-col p-6 rounded-2xl bg-slate-50 border border-slate-200/70 hover:bg-indigo-50/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700 mb-4 shadow-sm">
                <MessageSquare size={24} />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">{t.step1Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t.step1Desc}</p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col p-6 rounded-2xl bg-slate-50 border border-slate-200/70 hover:bg-amber-50/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 mb-4 shadow-sm">
                <BadgeCheck size={24} />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">{t.step2Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t.step2Desc}</p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col p-6 rounded-2xl bg-slate-50 border border-slate-200/70 hover:bg-emerald-50/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-4 shadow-sm">
                <Route size={24} />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">{t.step3Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t.step3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Quick Feature Launchers ─── */}
      <section className="px-4 sm:px-6 py-16 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{t.quickLaunchTitle}</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">{t.quickLaunchSub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { idx: 0, icon: MessageSquare, title: t.nav[0], desc: "Natural language answers with IS citations" },
            { idx: 1, icon: Search, title: t.nav[1], desc: "Match products to mandatory & voluntary standards" },
            { idx: 3, icon: ClipboardCheck, title: t.nav[3], desc: "Evaluate test lab report limits vs. standards" },
            { idx: 5, icon: ListFilter, title: t.nav[5], desc: "Filter standards database & subscribe to updates" },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.idx}
                onClick={() => onLaunch(card.idx)}
                className="p-5 text-left rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 hover:-translate-y-0.5 active:scale-[0.98] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-indigo-50 flex items-center justify-center text-slate-600 group-hover:text-indigo-600 mb-3 transition-colors">
                    <Icon size={20} />
                  </div>
                  <h4 className="font-bold text-sm text-slate-800 group-hover:text-indigo-950 transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{card.desc}</p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:translate-x-0.5 transition-transform">
                  <span>Open</span>
                  <ArrowRight size={13} />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="mt-auto border-t border-slate-200 bg-white px-4 sm:px-6 py-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="font-semibold text-slate-700">{t.brand}</span> · {t.poweredBy}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenAbout} className="hover:text-slate-800 transition-colors">
              {t.about}
            </button>
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="hover:text-slate-800 transition-colors flex items-center gap-1"
            >
              <Globe size={13} />
              {t.lang}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [activeTab, setActiveTab] = useState(0);
  const [inApp, setInApp] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const t = labels[lang];

  const handleLaunch = (tabIndex = 0) => {
    setActiveTab(tabIndex);
    setIsAdminView(false);
    setInApp(true);
  };

  if (!inApp) {
    return (
      <>
        <LandingView
          lang={lang}
          setLang={setLang}
          onLaunch={handleLaunch}
          onOpenAbout={() => setShowAbout(true)}
        />
        {showAbout && <AboutModal lang={lang} onClose={() => setShowAbout(false)} />}
      </>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      {/* ─── Desktop Left Sidebar (hidden on mobile) ─── */}
      <aside className="hidden md:flex w-64 flex-shrink-0 bg-gradient-to-b from-indigo-950 via-indigo-900 to-slate-900 text-white flex-col">
        {/* Brand */}
        <div className="px-5 py-6 border-b border-white/10">
          <button
            onClick={() => {
              setInApp(false);
              setIsAdminView(false);
            }}
            className="flex items-center gap-3 text-left group w-full"
            title={t.backToHome}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-white to-green-500 flex items-center justify-center text-lg font-bold text-indigo-950 shadow-lg group-hover:scale-105 transition-transform">
              B
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight group-hover:text-amber-300 transition-colors">
                {t.brand}
              </h1>
              <p className="text-[11px] text-indigo-300/70">{t.tagline}</p>
            </div>
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {t.nav.map((label, i) => {
            const Icon = navIcons[i] || MessageSquare;
            const isActive = !isAdminView && activeTab === i;
            return (
              <button
                key={i}
                onClick={() => {
                  setActiveTab(i);
                  setIsAdminView(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                  isActive
                    ? "bg-amber-500/20 text-amber-300 shadow-inner"
                    : "text-indigo-200/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.2 : 1.5} />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="px-4 py-4 border-t border-white/10 text-[11px] text-indigo-400/60 space-y-2.5">
          <button
            onClick={() => setIsAdminView(!isAdminView)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
              isAdminView
                ? "bg-amber-500 text-white border-amber-400 shadow-md"
                : "bg-white/5 hover:bg-white/10 text-indigo-200 hover:text-white border-white/10"
            }`}
          >
            <span className="flex items-center gap-2">
              <BarChart3 size={15} className={isAdminView ? "text-white" : "text-amber-400"} />
              <span>{isAdminView ? "Exit Admin View" : "Switch to Admin"}</span>
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/20 text-amber-300 font-mono">Demo</span>
          </button>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => setShowAbout(true)}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Info size={14} />
              <span>{t.about}</span>
            </button>
            <button
              onClick={() => {
                setInApp(false);
                setIsAdminView(false);
              }}
              className="flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <HomeIcon size={14} />
              <span>Overview</span>
            </button>
          </div>
          <div className="text-[10px] text-indigo-400/40">
            Powered by Groq & LLaMA 3.1
          </div>
        </div>
      </aside>

      {/* ─── Mobile Slide-out Drawer ─── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-indigo-950 text-white h-full flex flex-col shadow-2xl z-10 animate-fadeIn">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-400 text-indigo-950 font-bold flex items-center justify-center">
                  B
                </div>
                <span className="font-bold text-base">{t.brand}</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-white/70 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {t.nav.map((label, i) => {
                const Icon = navIcons[i] || MessageSquare;
                const isActive = !isAdminView && activeTab === i;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveTab(i);
                      setIsAdminView(false);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-amber-500/20 text-amber-300"
                        : "text-indigo-200/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </button>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/10 space-y-2 text-xs text-indigo-300/70">
              <button
                onClick={() => {
                  setIsAdminView(!isAdminView);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 py-1.5 text-amber-300 hover:text-white"
              >
                <BarChart3 size={16} />
                <span>{isAdminView ? "Return to User View" : "Switch to Admin Insights"}</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setInApp(false);
                  setIsAdminView(false);
                }}
                className="w-full flex items-center gap-2 py-1.5 hover:text-white"
              >
                <HomeIcon size={16} />
                <span>{t.backToHome}</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowAbout(true);
                }}
                className="w-full flex items-center gap-2 py-1.5 hover:text-white"
              >
                <Info size={16} />
                <span>{t.about}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Main area ─── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ─── Top header ─── */}
        <header className="flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 bg-white border-b border-slate-200">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <button
              onClick={() => {
                setInApp(false);
                setIsAdminView(false);
              }}
              className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-600 transition-colors mr-2"
              title={t.backToHome}
            >
              <HomeIcon size={14} />
              <span>Overview</span>
            </button>
            <h2 className="text-base sm:text-lg font-bold text-slate-800">
              {isAdminView ? t.adminTitle : t.nav[activeTab]}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdminView(!isAdminView)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all border ${
                isAdminView
                  ? "bg-amber-500 text-white border-amber-600 shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200"
              }`}
              title="Toggle Admin View"
            >
              <BarChart3 size={15} />
              <span className="hidden sm:inline">{isAdminView ? "Exit Admin" : "Admin View"}</span>
            </button>
            <button
              onClick={() => setShowAbout(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all border border-slate-200"
            >
              <Info size={15} />
              <span className="hidden sm:inline">{t.about}</span>
            </button>
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-all border border-indigo-200"
            >
              <Globe size={15} />
              {t.lang}
            </button>
          </div>
        </header>

        {/* ─── Tab Content with smooth transition ─── */}
        <main className="flex-1 overflow-hidden bg-slate-50">
          {isAdminView ? (
            <div key="admin-view" className="h-full animate-fadeIn">
              <AdminInsightsTab lang={lang} onClose={() => setIsAdminView(false)} />
            </div>
          ) : (
            <div key={activeTab} className="h-full animate-fadeIn">
              {activeTab === 0 && <AskTab lang={lang} />}
              {activeTab === 1 && <RecommendTab lang={lang} />}
              {activeTab === 2 && <CertificationTab lang={lang} />}
              {activeTab === 3 && <ComplianceTab lang={lang} />}
              {activeTab === 4 && <LabTab lang={lang} />}
              {activeTab === 5 && <StatusTrackerTab lang={lang} />}
              {activeTab === 6 && <SchemeGuideTab lang={lang} />}
              {activeTab === 7 && <VerifyProductTab lang={lang} />}
              {activeTab === 8 && <ReportIssueTab lang={lang} />}
            </div>
          )}
        </main>
      </div>

      {/* ─── Global About Modal ─── */}
      {showAbout && <AboutModal lang={lang} onClose={() => setShowAbout(false)} />}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ASK TAB (Feature 7: Simple Explanation Mode)
   ═══════════════════════════════════════════════════════ */
function AskTab({ lang }: { lang: Lang }) {
  const t = labels[lang];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [simpleMode, setSimpleMode] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed, simple: simpleMode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.answer, sources: data.sources, matchedParameters: data.matchedParameters },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: err instanceof Error ? err.message : "Something went wrong, please try again.",
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Simple mode toggle */}
      <div className="px-8 py-3 bg-white border-b border-slate-200 flex items-center gap-3">
        <button
          onClick={() => setSimpleMode(!simpleMode)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            simpleMode
              ? "bg-amber-100 text-amber-800 border border-amber-300"
              : "bg-slate-100 text-slate-500 border border-slate-200"
          }`}
        >
          {simpleMode ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
          {t.simpleMode}
          {simpleMode && <Sparkles size={14} className="text-amber-500" />}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
        {messages.length === 0 && (
          <EmptyState icon={MessageSquare} title={t.askEmpty} subtitle={t.askEmptySub} />
        )}
        {messages.map((msg, i) => (
          <ChatBubble key={i} msg={msg} simpleMode={simpleMode} lang={lang} />
        ))}
        {loading && <LoadingBubble text={t.loading} />}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <ChatInput
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        placeholder={t.askPlaceholder}
        sendLabel={t.send}
        loading={loading}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   RECOMMEND TAB (Feature 10: Related Schemes panel)
   ═══════════════════════════════════════════════════════ */
function RecommendTab({ lang }: { lang: Lang }) {
  const t = labels[lang];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (overrideText?: unknown) => {
    const raw = typeof overrideText === "string" ? overrideText : input;
    const textToSubmit = (raw || "").trim();
    if (!textToSubmit || loading) return;
    setMessages((prev) => [...prev, { role: "user", text: textToSubmit }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: textToSubmit }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.answer,
          sources: data.sources,
          crossConflictWarning: data.crossConflictWarning || null,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: err instanceof Error ? err.message : "Something went wrong, please try again.",
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const hasAssistantMessages = messages.some((m) => m.role === "assistant");

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
        {messages.length === 0 && (
          <div className="py-6 space-y-6 max-w-3xl mx-auto animate-fadeIn">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200">
                <Sparkles size={14} className="text-amber-500" />
                <span>Sector Onboarding Navigator</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                {lang === "en" ? "What are you working with?" : "आप किस क्षेत्र में कार्य कर रहे हैं?"}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {lang === "en"
                  ? "Select a sector below to pre-fill a starter compliance question, or describe your custom product."
                  : "लागू अनुपालन प्रश्न लोड करने के लिए नीचे एक क्षेत्र चुनें, या नीचे अपने उत्पाद का वर्णन करें।"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {[
                { sector: "Ayush", icon: FlaskConical, query: "Herbal extract powder containing Terminalia chebula (Haritaki) for dietary wellness capsules", color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
                { sector: "Electronics", icon: Shield, query: "Smart LED ceiling light with Wi-Fi and Bluetooth wireless controller module", color: "text-indigo-700", bg: "bg-indigo-50", border: "border-indigo-200" },
                { sector: "Food", icon: ClipboardCheck, query: "Packaged natural mineral water in 1-litre food-grade PET bottles", color: "text-sky-700", bg: "bg-sky-50", border: "border-sky-200" },
                { sector: "Construction", icon: Building, query: "Portland pozzolana cement bags for high-strength residential concrete structures", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
                { sector: "Toys", icon: Award, query: "Battery-operated plastic musical robot toy designed for children aged 3 and above", color: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSubmit(item.query)}
                    className="text-left p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 hover:-translate-y-0.5 active:scale-[0.98] transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className={`w-8 h-8 rounded-xl ${item.bg} ${item.color} flex items-center justify-center font-bold`}>
                          <Icon size={16} />
                        </div>
                        <span className="font-bold text-sm text-slate-800 group-hover:text-indigo-900 transition-colors">
                          {item.sector}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        &ldquo;{item.query}&rdquo;
                      </p>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
                      <span>Ask about this sector</span>
                      <ArrowRight size={12} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <ChatBubble key={i} msg={msg} lang={lang} />
        ))}
        {loading && <LoadingBubble text={t.loading} />}

        {/* Feature 10: Related Schemes panel */}
        {hasAssistantMessages && !loading && (
          <div className="ml-0 mt-6 max-w-2xl">
            <div className="rounded-2xl bg-gradient-to-r from-indigo-50 to-amber-50 border border-indigo-200 p-5">
              <h4 className="text-sm font-bold text-indigo-800 mb-3 flex items-center gap-2">
                <HelpCircle size={16} />
                {t.relatedTitle}
              </h4>
              <div className="space-y-3">
                {relatedSchemes.map((s, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-indigo-100">
                    <p className="text-sm font-semibold text-slate-800">{lang === "en" ? s.name : s.nameHi}</p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{lang === "en" ? s.desc : s.descHi}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <ChatInput
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        placeholder={t.recommendPlaceholder}
        sendLabel={t.send}
        loading={loading}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CERTIFICATION JOURNEY TAB (Features 6 & 9: Multi-Scheme + Timeline/Cost)
   ═══════════════════════════════════════════════════════ */
const certificationSchemes = [
  {
    id: "isi",
    name: "ISI Mark Scheme (Product Certification)",
    nameHi: "ISI मार्क प्रमाणन (योजना I)",
    badge: "Scheme I · Manufacturing Licence",
    product: "Cotton Yoga Mat (IS 17873:2022) / Packaged Drinking Water (IS 14543)",
    productHi: "कॉटन योगा मैट (IS 17873:2022) / पैकेज्ड पानी (IS 14543)",
    steps: [
      { title: "Apply Online", titleHi: "ऑनलाइन आवेदन", desc: "Submit Manak Online form & factory layout", descHi: "मानक ऑनलाइन फॉर्म और कारखाना लेआउट जमा करें", icon: FileText },
      { title: "Document Scrutiny", titleHi: "दस्तावेज़ सत्यापन", desc: "BIS officer verifies manufacturing QC records", descHi: "BIS अधिकारी विनिर्माण QC रिकॉर्ड की जांच करता है", icon: ClipboardCheck },
      { title: "Factory Audit & Sampling", titleHi: "कारखाना निरीक्षण", desc: "BIS auditor inspects plant & draws test samples", descHi: "BIS लेखा परीक्षक संयंत्र का निरीक्षण करता है", icon: Building },
      { title: "Sample Testing", titleHi: "नमूना परीक्षण", desc: "Samples tested at BIS-recognized laboratory", descHi: "मान्यता प्राप्त प्रयोगशाला में नमूने का परीक्षण", icon: FlaskConical },
      { title: "Grant of Licence", titleHi: "लाइसेंस प्रदान", desc: "CM/L licence issued with ISI Mark rights", descHi: "ISI मार्क अधिकारों के साथ CM/L लाइसेंस जारी", icon: BadgeCheck },
    ],
    currentStep: 1, // Step 2 (0-indexed 1)
    statusTitle: "Step 2: Document Scrutiny In Progress",
    statusTitleHi: "चरण 2: दस्तावेज़ सत्यापन प्रगति में है",
    statusNote: "BIS technical officers are reviewing submitted manufacturing process documents, quality control equipment lists, and calibration logs. This typically takes 15–30 business days. Once verified, physical factory inspection will be scheduled.",
    statusNoteHi: "BIS तकनीकी अधिकारी प्रस्तुत विनिर्माण प्रक्रिया दस्तावेज़ों और गुणवत्ता नियंत्रण लॉग की समीक्षा कर रहे हैं। इसमें आमतौर पर 15-30 कार्य दिवस लगते हैं।",
    duration: "approx. 4–6 months",
    feeRange: "₹50,000 – ₹1,50,000 (indicative, excl. lab testing fees)",
  },
  {
    id: "crs",
    name: "CRS (Compulsory Registration Scheme for Electronics)",
    nameHi: "CRS (इलेक्ट्रॉनिक्स अनिवार्य पंजीकरण)",
    badge: "MeitY / BIS Notified",
    product: "Smart LED Driver / Laptop Adapter (IS 15885 / IS 13252)",
    productHi: "स्मार्ट LED ड्राइवर / लैपटॉप अडैप्टर (IS 15885 / IS 13252)",
    steps: [
      { title: "Lab Testing", titleHi: "प्रयोगशाला परीक्षण", desc: "Test samples at BIS-recognized NABL lab", descHi: "मान्यता प्राप्त NABL लैब में परीक्षण कराएं", icon: FlaskConical },
      { title: "CRS Portal Application", titleHi: "पोर्टल आवेदन", desc: "Submit test report on BIS CRS portal within 90 days", descHi: "90 दिनों के भीतर परीक्षण रिपोर्ट जमा करें", icon: FileText },
      { title: "Technical Scrutiny", titleHi: "तकनीकी जांच", desc: "BIS scrutinizes safety markings and critical components", descHi: "BIS सुरक्षा चिह्नों और घटकों की जांच करता है", icon: ClipboardCheck },
      { title: "Registration Granted", titleHi: "पंजीकरण जारी", desc: "Unique R-number allocated for retail distribution", descHi: "वितरण के लिए विशिष्ट R-नंबर आवंटित", icon: BadgeCheck },
    ],
    currentStep: 2, // Step 3
    statusTitle: "Step 3: Technical Scrutiny In Progress",
    statusTitleHi: "चरण 3: तकनीकी जांच प्रगति में है",
    statusNote: "Lab safety test report uploaded. BIS technical committee is validating critical component insulation and label markings against IS 13252. Turnaround: 15–20 business days.",
    statusNoteHi: "लैब सुरक्षा परीक्षण रिपोर्ट अपलोड कर दी गई है। BIS तकनीकी समिति IS 13252 के अनुसार घटकों की जांच कर रही है।",
    duration: "approx. 4–8 weeks (post test report)",
    feeRange: "₹30,000 – ₹60,000 per model / brand series",
  },
  {
    id: "hallmarking",
    name: "Hallmarking Scheme (Gold & Silver Jewellery)",
    nameHi: "हॉलमार्किंग योजना (स्वर्ण एवं रजत आभूषण)",
    badge: "Mandatory Purity Certification",
    product: "22 Carat Gold Bangle / Jewellery Consignment (IS 1417)",
    productHi: "22 कैरेट सोने की चूड़ी / आभूषण खेप (IS 1417)",
    steps: [
      { title: "Jeweller Registration", titleHi: "ज्वैलर पंजीकरण", desc: "Register on BIS Manak Online portal", descHi: "BIS मानक ऑनलाइन पोर्टल पर पंजीकरण", icon: FileText },
      { title: "Consignment Handover", titleHi: "खेप सुपुर्दगी", desc: "Deliver articles to BIS-recognized AHC", descHi: "BIS मान्यता प्राप्त AHC को आभूषण सौंपें", icon: Building },
      { title: "Assay & Purity Test", titleHi: "शुद्धता परीक्षण", desc: "XRF spectrometry and fire assay test", descHi: "XRF स्पेक्ट्रोमेट्री और अग्नि परीक्षा", icon: FlaskConical },
      { title: "Laser HUID Engraved", titleHi: "HUID लेजर अंकन", desc: "6-character unique HUID laser inscribed", descHi: "विशिष्ट 6-अंकीय HUID लेजर से अंकित", icon: Sparkles },
    ],
    currentStep: 2, // Step 3
    statusTitle: "Step 3: Assay & Purity Test In Progress",
    statusTitleHi: "चरण 3: परख एवं शुद्धता परीक्षण प्रगति में है",
    statusNote: "Non-destructive XRF test and fire assay sampling completed with 91.6% (22K) purity conformity. Consignment queued for laser HUID engraving and central BIS portal synchronization.",
    statusNoteHi: "91.6% (22K) शुद्धता के साथ परख परीक्षण पूरा हुआ। लेजर HUID अंकन प्रगति में है।",
    duration: "approx. 2–4 business days per consignment",
    feeRange: "₹45 (+GST) per gold article (standard BIS fee)",
  },
];

function CertificationTab({ lang }: { lang: Lang }) {
  const t = labels[lang];
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>("isi");

  const currentScheme = certificationSchemes.find((s) => s.id === selectedSchemeId) || certificationSchemes[0];
  const activeStep = currentScheme.currentStep;

  return (
    <div className="p-8 overflow-y-auto h-full space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{t.certTitle}</h2>
          <p className="text-slate-500 mt-1 text-sm">
            {lang === "en"
              ? `Current Target: ${currentScheme.product}`
              : `वर्तमान लक्ष्य: ${currentScheme.productHi}`}
          </p>
        </div>

        {/* Feature 6: Scheme Selector Dropdown */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-2xl border border-slate-200 shadow-sm">
          <Layers size={16} className="text-indigo-600" />
          <span className="text-xs font-semibold text-slate-600">Scheme:</span>
          <select
            value={selectedSchemeId}
            onChange={(e) => setSelectedSchemeId(e.target.value)}
            className="bg-transparent text-xs font-bold text-indigo-900 focus:outline-none cursor-pointer py-1"
          >
            {certificationSchemes.map((s) => (
              <option key={s.id} value={s.id}>
                {lang === "en" ? s.name : s.nameHi}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Scheme badge indicator */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200">
        <BadgeCheck size={15} className="text-amber-500" />
        <span>{currentScheme.badge}</span>
      </div>

      {/* Dynamic Progress Steps Tracker */}
      <div className="relative pt-2 pb-4">
        <div className="hidden sm:block absolute top-10 left-10 right-10 h-1 bg-slate-200 rounded-full" />
        <div
          className="hidden sm:block absolute top-10 left-10 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-700"
          style={{ width: `${((activeStep + 1) / currentScheme.steps.length) * 100 - 16}%` }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 gap-4 relative">
          {currentScheme.steps.map((step, i) => {
            const done = i <= activeStep;
            const active = i === activeStep;
            const Icon = step.icon;
            return (
              <div key={i} className="flex flex-col sm:items-center gap-3">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
                    active
                      ? "bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-lg shadow-amber-300/30 scale-105 ring-4 ring-amber-200"
                      : done
                      ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                      : "bg-slate-100 text-slate-400 border border-slate-200"
                  }`}
                >
                  {done && !active ? <CheckCircle2 size={22} /> : <Icon size={22} />}
                </div>
                <div className="sm:text-center">
                  <p className={`text-xs sm:text-sm font-semibold ${active ? "text-amber-700" : done ? "text-emerald-700" : "text-slate-400"}`}>
                    {lang === "en" ? step.title : step.titleHi}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 max-w-[140px]">
                    {lang === "en" ? step.desc : step.descHi}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active step detail card */}
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
            <Clock size={20} className="text-amber-600" />
          </div>
          <div>
            <h3 className="font-bold text-amber-900 text-sm sm:text-base">
              {lang === "en" ? currentScheme.statusTitle : currentScheme.statusTitleHi}
            </h3>
            <p className="text-xs text-amber-600 font-semibold">
              {lang === "en" ? "Frozen Simulation Point · Stage In Progress" : "सिमुलेशन बिंदु · प्रगति में"}
            </p>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {lang === "en" ? currentScheme.statusNote : currentScheme.statusNoteHi}
        </p>
      </div>

      {/* Feature 9: Estimated Timeline & Cost Mocked Panel */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 shadow-md border border-slate-800">
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-amber-400" />
            <h4 className="font-bold text-sm text-slate-100">
              {lang === "en" ? "Estimated Timeline & Cost Outlook" : "अनुमानित समय-सीमा और लागत दृष्टिकोण"}
            </h4>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
            Illustrative Mock
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-indigo-200/80 mb-1 flex items-center gap-1.5">
              <Clock size={14} className="text-amber-400" />
              <span>{lang === "en" ? "Expected Timeline" : "अपेक्षित समय-सीमा"}</span>
            </p>
            <p className="text-sm sm:text-base font-bold text-white">{currentScheme.duration}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-indigo-200/80 mb-1 flex items-center gap-1.5">
              <DollarSign size={14} className="text-emerald-400" />
              <span>{lang === "en" ? "Indicative Scheme Fees" : "संकेतात्मक योजना शुल्क"}</span>
            </p>
            <p className="text-sm sm:text-base font-bold text-white">{currentScheme.feeRange}</p>
          </div>
        </div>

        <p className="text-[11px] text-indigo-300/60 mt-4 leading-relaxed italic">
          *Important Notice: Timeline and fee figures shown are indicative estimates compiled for hackathon demonstration. Real figures vary widely by product complexity, manufacturing scale, and lab testing scopes, and must be obtained officially from the Bureau of Indian Standards (manakonline.in).
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   COMPLIANCE CHECK TAB (Feature 4: Real CSV Upload Support)
   ═══════════════════════════════════════════════════════ */
function ComplianceTab({ lang }: { lang: Lang }) {
  const t = labels[lang];
  const [reportData, setReportData] = useState<Record<string, number>>(sampleTestReport);
  const [reportSource, setReportSource] = useState<string>("Sample Report (IS 18087 Haritaki Extract)");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Handle PDF Upload via server-side /api/parse-pdf
    if (file.name.toLowerCase().endsWith(".pdf") || file.type.includes("pdf")) {
      setUploadLoading(true);
      setUploadError(null);
      const fd = new FormData();
      fd.append("file", file);
      fetch("/api/parse-pdf", {
        method: "POST",
        body: fd,
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.error) throw new Error(data.error);
          setReportData(data.parameters);
          setReportSource(`Live PDF: ${file.name}`);
          setUploadError(null);
        })
        .catch((err) => {
          setUploadError(err instanceof Error ? err.message : "Failed to parse PDF file.");
        })
        .finally(() => {
          setUploadLoading(false);
          if (fileInputRef.current) fileInputRef.current.value = "";
        });
      return;
    }

    // Handle CSV Upload locally
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
        const parsed: Record<string, number> = {};
        for (const line of lines) {
          const parts = line.split(",").map((p) => p.trim().replace(/^["']|["']$/g, ""));
          if (parts.length >= 2) {
            const rawKey = parts[0];
            const rawVal = parseFloat(parts[1]);
            if (!isNaN(rawVal)) {
              for (const knownKey of Object.keys(haritakiLimits)) {
                const normKnown = knownKey.toLowerCase().replace(/[^a-z]/g, "");
                const normRaw = rawKey.toLowerCase().replace(/[^a-z]/g, "");
                if (normKnown.includes(normRaw) || normRaw.includes(normKnown)) {
                  parsed[knownKey] = rawVal;
                  break;
                }
              }
            }
          }
        }
        if (Object.keys(parsed).length === 0) {
          setUploadError("Could not match parameters from CSV. Ensure format: Parameter, Observed Value (e.g. Total Ash (%), 5.2)");
        } else {
          setReportData(parsed);
          setReportSource(`Live CSV: ${file.name}`);
          setUploadError(null);
        }
      } catch (err) {
        setUploadError("Failed to parse CSV. Please upload a valid comma-separated text file.");
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  };

  const handleDownloadSample = () => {
    const csvContent = [
      "Parameter,Observed Value",
      "Foreign Matter (%),0.6",
      "Loss on Drying (%),10.2",
      "Total Ash (%),5.1",
      "Acid Insoluble Ash (%),2.8",
      "Alcohol Soluble Extractive (%),44.5",
      "Water Soluble Extractive (%),62.0",
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sample_haritaki_lab_report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleResetSample = () => {
    setReportData(sampleTestReport);
    setReportSource("Sample Report (IS 18087 Haritaki Extract)");
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const rows = Object.entries(haritakiLimits).map(([param, { limit, type }]) => {
    const observed = reportData[param] ?? sampleTestReport[param];
    const pass = type === "max" ? observed <= limit : observed >= limit;
    return { param, limit, type, observed, pass };
  });
  const allPass = rows.every((r) => r.pass);

  return (
    <div className="p-8 overflow-y-auto h-full space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{t.compTitle}</h2>
          <p className="text-slate-500 mt-1 text-sm">
            {reportSource} vs. IS 18087:2022 Specifications
          </p>
        </div>

        {/* Feature 4: CSV & PDF Upload and Sample Fallback Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".csv,text/csv,.pdf,application/pdf"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadLoading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all disabled:opacity-50"
          >
            {uploadLoading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <UploadCloud size={15} />
            )}
            <span>{uploadLoading ? "Analyzing Report…" : "Upload Lab Report (CSV / PDF)"}</span>
          </button>
          <button
            onClick={handleDownloadSample}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-all"
            title="Download formatted sample test CSV"
          >
            <Download size={14} />
            <span>Sample CSV</span>
          </button>
          <button
            onClick={handleResetSample}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
          >
            Reset Sample
          </button>
        </div>
      </div>

      {uploadError && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-fadeIn">
          <AlertCircle size={16} />
          <span>{uploadError}</span>
        </div>
      )}

      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${
        allPass
          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
          : "bg-red-50 text-red-700 border border-red-200"
      }`}>
        {allPass ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
        {allPass
          ? lang === "en" ? "All parameters within mandatory limits" : "सभी पैरामीटर सीमा के भीतर"
          : lang === "en" ? "Some parameters out of specification" : "कुछ पैरामीटर विनिर्देश से बाहर"}
      </div>

      <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-6 py-4 font-semibold text-slate-600">{t.parameter}</th>
              <th className="text-center px-6 py-4 font-semibold text-slate-600">{t.limit}</th>
              <th className="text-center px-6 py-4 font-semibold text-slate-600">{t.observed}</th>
              <th className="text-center px-6 py-4 font-semibold text-slate-600">{t.result}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={`border-t border-slate-100 transition-colors ${
                row.pass ? "hover:bg-emerald-50/50" : "bg-red-50/50 hover:bg-red-50"
              }`}>
                <td className="px-6 py-4 text-slate-700 font-medium">{row.param}</td>
                <td className="px-6 py-4 text-center text-slate-500">
                  {row.type === "max" ? "≤" : "≥"} {row.limit}
                </td>
                <td className={`px-6 py-4 text-center font-mono font-semibold ${
                  row.pass ? "text-emerald-600" : "text-red-600"
                }`}>
                  {row.observed}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                    row.pass ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${row.pass ? "bg-emerald-500" : "bg-red-500"}`} />
                    {row.pass ? t.pass : t.fail}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FIND A LAB TAB (Feature 5: Simple Map View & Pin Markers)
   ═══════════════════════════════════════════════════════ */
interface LabFacility {
  id: string;
  name: string;
  city: string;
  state: string;
  region: "North" | "South" | "West" | "East" | "Northeast";
  category: "Food & Ayush" | "Electronics" | "Construction" | "Toys & Safety" | "Metals & Engineering";
  categoryColor: string;
  pinColor: string;
  lat: string;
  lon: string;
  x: number; // percentage X on map canvas (0-100)
  y: number; // percentage Y on map canvas (0-100)
  nablId: string;
  turnaround: string;
  phone: string;
  equipment: string[];
  standards: string[];
  address: string;
}

const labMapLocations: LabFacility[] = [
  {
    id: "delhi-shriram",
    name: "Shriram Institute for Industrial Research",
    city: "Delhi NCR",
    state: "Delhi",
    region: "North",
    category: "Construction",
    categoryColor: "bg-amber-100 text-amber-800 border-amber-200",
    pinColor: "from-amber-500 to-amber-600",
    lat: "28.70° N",
    lon: "77.10° E",
    x: 28.4,
    y: 33.4,
    nablId: "TC-5109",
    turnaround: "3–5 business days",
    phone: "+91 11 2766 7267",
    equipment: ["Universal Testing Machine (UTM 1000kN)", "Autoclave Expansion Rig", "Le-Chatelier Flask", "Compression Tester"],
    standards: ["IS 1489 (Part 1)", "IS 269:2015", "IS 455:2015"],
    address: "19, University Road, Delhi – 110007",
  },
  {
    id: "mumbai-sgs",
    name: "SGS India Consumer Testing Laboratory",
    city: "Mumbai",
    state: "Maharashtra",
    region: "West",
    category: "Electronics",
    categoryColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    pinColor: "from-indigo-500 to-indigo-600",
    lat: "19.07° N",
    lon: "72.87° E",
    x: 15.9,
    y: 56.8,
    nablId: "TC-6124",
    turnaround: "5–7 business days",
    phone: "+91 22 6640 8888",
    equipment: ["10m Semi-Anechoic EMC Chamber", "Dielectric Breakdown Tester", "Glow Wire Test Apparatus", "Thermal Shock Chamber"],
    standards: ["IS 13252 (Part 1)", "IS 15885", "IS 1293:2019"],
    address: "Pawana Industrial Complex, Thane-Belapur Road, Mumbai – 400705",
  },
  {
    id: "ahmedabad-cipet",
    name: "CIPET Centre for Testing & Quality Evaluation",
    city: "Ahmedabad",
    state: "Gujarat",
    region: "West",
    category: "Toys & Safety",
    categoryColor: "bg-purple-100 text-purple-800 border-purple-200",
    pinColor: "from-purple-500 to-purple-600",
    lat: "23.02° N",
    lon: "72.57° E",
    x: 15.0,
    y: 47.4,
    nablId: "TC-5890",
    turnaround: "4–6 business days",
    phone: "+91 79 2583 2053",
    equipment: ["FTIR Spectrophotometer", "Universal Polymer Tensile Rig", "Drop Weight Impact Tester", "Melt Flow Indexer"],
    standards: ["IS 9873 (Part 1-3)", "IS 15410", "IS 14543"],
    address: "Plot No. 630, Phase-IV, GIDC Vatva, Ahmedabad – 382445",
  },
  {
    id: "bengaluru-tuv",
    name: "TÜV SÜD South Asia Laboratory",
    city: "Bengaluru",
    state: "Karnataka",
    region: "South",
    category: "Toys & Safety",
    categoryColor: "bg-purple-100 text-purple-800 border-purple-200",
    pinColor: "from-purple-500 to-purple-600",
    lat: "12.97° N",
    lon: "77.59° E",
    x: 29.9,
    y: 70.9,
    nablId: "TC-7821",
    turnaround: "4–6 business days",
    phone: "+91 80 6745 8000",
    equipment: ["Helmet Retention Rig & Impact Anvil", "Phthalate Screening GC-MS", "Sharp Edge/Tip Tester", "Small Parts Cylinder"],
    standards: ["IS 4151:2020", "IS 9873 (Part 1)", "IS 9873 (Part 3)"],
    address: "TÜV SÜD House, Peenya Industrial Area, Bengaluru – 560058",
  },
  {
    id: "mysuru-cftri",
    name: "Central Food Technological Research Institute (CFTRI)",
    city: "Mysuru",
    state: "Karnataka",
    region: "South",
    category: "Food & Ayush",
    categoryColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    pinColor: "from-emerald-500 to-emerald-600",
    lat: "12.31° N",
    lon: "76.65° E",
    x: 27.1,
    y: 72.4,
    nablId: "TC-5012",
    turnaround: "5–8 business days",
    phone: "+91 821 251 4532",
    equipment: ["High-Performance Liquid Chromatography (HPLC)", "GC-MS/MS System", "ICP-OES Heavy Metal Analyzer", "Flash Evaporator"],
    standards: ["IS 18087:2022", "IS 18082:2022", "IS 14543:2024", "IS 18098:2022"],
    address: "CSIR-CFTRI Campus, Cheluvamba Mansion, Mysuru – 570020",
  },
  {
    id: "chennai-bv",
    name: "Bureau Veritas Consumer Products Services",
    city: "Chennai",
    state: "Tamil Nadu",
    region: "South",
    category: "Food & Ayush",
    categoryColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    pinColor: "from-emerald-500 to-emerald-600",
    lat: "13.08° N",
    lon: "80.27° E",
    x: 37.8,
    y: 70.7,
    nablId: "TC-6340",
    turnaround: "4–6 business days",
    phone: "+91 44 4296 8200",
    equipment: ["Yarn Count & Tensile Tester", "Crockmeter & Colour Fastness Tester", "Aqueous pH Extractor", "Microbiological Incubators"],
    standards: ["IS 17873:2022", "IS 18089 (Part 1)", "IS 18089 (Part 2)"],
    address: "F-2, Phase III, MEPZ-SEZ, Tambaram, Chennai – 600045",
  },
  {
    id: "kolkata-nth",
    name: "National Test House (Govt. of India)",
    city: "Kolkata",
    state: "West Bengal",
    region: "East",
    category: "Metals & Engineering",
    categoryColor: "bg-sky-100 text-sky-800 border-sky-200",
    pinColor: "from-sky-500 to-sky-600",
    lat: "22.57° N",
    lon: "88.36° E",
    x: 61.8,
    y: 48.5,
    nablId: "TC-5001",
    turnaround: "6–8 business days",
    phone: "+91 33 2471 1802",
    equipment: ["Optical Emission Spectrometer (OES)", "Salt Spray Corrosion Chamber", "Conductor Resistance Bridge", "Bend & Re-bend Machine"],
    standards: ["IS 694:2010", "IS 1786:2008", "IS 2062:2011"],
    address: "11/1, Judges Court Road, Alipore, Kolkata – 700027",
  },
  {
    id: "guwahati-nerist",
    name: "North East Quality Testing & Research Centre",
    city: "Guwahati",
    state: "Assam",
    region: "Northeast",
    category: "Food & Ayush",
    categoryColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    pinColor: "from-emerald-500 to-emerald-600",
    lat: "26.14° N",
    lon: "91.73° E",
    x: 71.8,
    y: 39.8,
    nablId: "TC-7210",
    turnaround: "6–9 business days",
    phone: "+91 361 258 3000",
    equipment: ["UV-Visible Spectrophotometer", "Muffle Furnace (Ash Value)", "Moisture Analyzer Balance", "Microbial Limit Test Rig"],
    standards: ["IS 18085:2022", "IS 18087:2022", "IS 14543"],
    address: "Technology Complex, Amingaon, Guwahati – 781039",
  },
];

const labCategories = ["All", "Food & Ayush", "Electronics", "Construction", "Toys & Safety", "Metals & Engineering"] as const;

function LabTab({ lang }: { lang: Lang }) {
  const t = labels[lang];
  const [viewMode, setViewMode] = useState<"list" | "map">("map");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLabId, setSelectedLabId] = useState<string>("delhi-shriram");
  const [mapTheme, setMapTheme] = useState<"voyager" | "osm" | "satellite">("voyager");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredLabs = labMapLocations.filter((lab) => {
    const matchCat = selectedCategory === "All" || lab.category === selectedCategory;
    const matchSearch =
      searchQuery.trim() === "" ||
      lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.standards.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const activeLab = labMapLocations.find((l) => l.id === selectedLabId) || filteredLabs[0] || labMapLocations[0];

  const handleCopyPhone = (phone: string, id: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getGoogleMapsUrl = (lab: LabFacility) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lab.name + " " + lab.address)}`;
  };

  const geoapifyKey = process.env.NEXT_PUBLIC_GEOAPIFY_KEY || "82a6dc0a76d54e2aa6eda568e24e1797";

  const getTileSrc = (col: number, row: number) => {
    if (geoapifyKey) {
      if (mapTheme === "osm") {
        return `https://maps.geoapify.com/v1/tile/klokantech-basic/5/${col}/${row}.png?apiKey=${geoapifyKey}`;
      }
      if (mapTheme === "satellite") {
        return `https://maps.geoapify.com/v1/tile/dark-matter-purple-roads/5/${col}/${row}.png?apiKey=${geoapifyKey}`;
      }
      return `https://maps.geoapify.com/v1/tile/osm-bright/5/${col}/${row}.png?apiKey=${geoapifyKey}`;
    }
    if (mapTheme === "osm") {
      return `https://tile.openstreetmap.org/5/${col}/${row}.png`;
    }
    if (mapTheme === "satellite") {
      return `https://basemaps.cartocdn.com/rastertiles/dark_all/5/${col}/${row}.png`;
    }
    return `https://basemaps.cartocdn.com/rastertiles/voyager/5/${col}/${row}.png`;
  };

  return (
    <div className="p-8 overflow-y-auto h-full space-y-6 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck size={13} className="text-emerald-600" />
              <span>NABL & BIS Recognized Network</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">ISO/IEC 17025 Accredited</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{t.labTitle}</h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            {lang === "en"
              ? "Locate certified product conformity assessment laboratories, test instrumentation, and regional BIS hubs across India."
              : "पूरे भारत में प्रमाणित उत्पाद परीक्षण प्रयोगशालाएं और NABL क्षेत्रीय केंद्र खोजें।"}
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-semibold self-start sm:self-auto shadow-2xs">
          <button
            onClick={() => setViewMode("map")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
              viewMode === "map"
                ? "bg-white text-indigo-900 shadow-sm shadow-indigo-100 font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Map size={14} className={viewMode === "map" ? "text-amber-500" : "text-slate-400"} />
            <span>Interactive Map</span>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
              viewMode === "list"
                ? "bg-white text-indigo-900 shadow-sm shadow-indigo-100 font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ListFilter size={14} className={viewMode === "list" ? "text-amber-500" : "text-slate-400"} />
            <span>Directory List ({filteredLabs.length})</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-1">
        {/* Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {labCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-indigo-900 text-white shadow-sm shadow-indigo-200"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by lab, city or IS standard…"
            className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-white border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all shadow-2xs"
          />
        </div>
      </div>

      {viewMode === "map" ? (
        /* ══════════════════ GEOSPATIAL MAP VIEW ══════════════════ */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Interactive Map Canvas */}
          <div className="lg:col-span-7 xl:col-span-8 rounded-3xl border border-slate-200/80 bg-slate-100 shadow-lg relative min-h-[520px] flex flex-col justify-between overflow-hidden">
            {/* Top Toolbar Overlay with Map Style Switcher */}
            <div className="relative z-20 flex items-center justify-between p-3.5 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-slate-800">
                  National Testing Map ({filteredLabs.length} Hubs)
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  Geoapify HD
                </span>
              </div>

              {/* Map Layer Switcher: Street / OSM / Night */}
              <div className="flex items-center p-0.5 rounded-xl bg-slate-100 border border-slate-200 text-[11px] font-semibold">
                <button
                  onClick={() => setMapTheme("voyager")}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    mapTheme === "voyager"
                      ? "bg-white text-indigo-900 shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                  title="High-detail street & city map"
                >
                  🗺️ Street
                </button>
                <button
                  onClick={() => setMapTheme("osm")}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    mapTheme === "osm"
                      ? "bg-white text-indigo-900 shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                  title="Official OpenStreetMap layer"
                >
                  🌐 OSM
                </button>
                <button
                  onClick={() => setMapTheme("satellite")}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    mapTheme === "satellite"
                      ? "bg-slate-900 text-white shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                  title="Night dark mode map"
                >
                  🌑 Night
                </button>
              </div>
            </div>

            {/* Genuine Real World Map Tile Canvas (OpenStreetMap / CartoDB) */}
            <div className="relative w-full flex-1 min-h-[440px] overflow-hidden bg-slate-100 flex items-center justify-center">
              {/* 3x4 Real OpenStreetMap Tile Grid covering Indian Subcontinent */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-4 select-none pointer-events-none">
                {[12, 13, 14, 15].map((row) =>
                  [22, 23, 24].map((col) => (
                    <div key={`${col}-${row}`} className="relative w-full h-full overflow-hidden">
                      <img
                        src={getTileSrc(col, row)}
                        alt={`Map Tile ${col},${row}`}
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                        loading="eager"
                      />
                    </div>
                  ))
                )}
              </div>

              {/* Real Latitude & Longitude Reference Grid Lines Overlay */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
                <line x1="0" y1="33.4" x2="100" y2="33.4" stroke="#4338ca" strokeWidth="0.3" strokeDasharray="1 1" />
                <line x1="0" y1="56.8" x2="100" y2="56.8" stroke="#4338ca" strokeWidth="0.3" strokeDasharray="1 1" />
                <line x1="0" y1="70.9" x2="100" y2="70.9" stroke="#4338ca" strokeWidth="0.3" strokeDasharray="1 1" />
                <line x1="28.4" y1="0" x2="28.4" y2="100" stroke="#4338ca" strokeWidth="0.3" strokeDasharray="1 1" />
                <line x1="61.8" y1="0" x2="61.8" y2="100" stroke="#4338ca" strokeWidth="0.3" strokeDasharray="1 1" />
              </svg>

              {/* Compass Indicator in Map Viewport */}
              <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-sm border border-slate-200 text-[10px] text-slate-700 font-mono shadow-sm">
                <Compass size={13} className="text-amber-500 animate-spin [animation-duration:16s]" />
                <span>N 20.59° / E 78.96°</span>
              </div>

              {/* Interactive Positioned Pins Layer */}
              <div className="absolute inset-0 pointer-events-auto">
                {filteredLabs.map((lab) => {
                  const isSelected = activeLab.id === lab.id;

                  return (
                    <div
                      key={lab.id}
                      style={{ left: `${lab.x}%`, top: `${lab.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                    >
                      {/* Clickable Pin Button */}
                      <button
                        onClick={() => setSelectedLabId(lab.id)}
                        className="relative flex flex-col items-center focus:outline-none cursor-pointer"
                      >
                        {/* Radar Ping on Selected */}
                        {isSelected && (
                          <>
                            <span className="absolute -top-1 w-11 h-11 rounded-full bg-amber-400/50 animate-ping pointer-events-none" />
                            <span className="absolute top-0 w-9 h-9 rounded-full border-2 border-amber-500 animate-pulse pointer-events-none" />
                          </>
                        )}

                        {/* Custom Teardrop Map Pin Marker */}
                        <div
                          className={`relative flex items-center justify-center transition-all duration-300 ${
                            isSelected ? "scale-125 z-30" : "hover:scale-115 hover:z-20"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center border-2 ${
                              isSelected
                                ? "bg-amber-400 border-white text-indigo-950 shadow-amber-500/50"
                                : `bg-gradient-to-tr ${lab.pinColor} border-white text-white shadow-slate-900/40`
                            }`}
                          >
                            <FlaskConical size={14} />
                          </div>
                          {/* Pin Pointer Arrow */}
                          <div
                            className={`absolute -bottom-1 w-2 h-2 rotate-45 ${
                              isSelected ? "bg-amber-400" : "bg-indigo-600"
                            }`}
                          />
                        </div>

                        {/* City Label Badge Pill */}
                        <div
                          className={`mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all duration-200 shadow-sm border ${
                            isSelected
                              ? "bg-amber-400 text-indigo-950 border-amber-500 scale-105"
                              : "bg-white/95 text-slate-800 border-slate-300 group-hover:bg-indigo-900 group-hover:text-white"
                          }`}
                        >
                          {lab.city}
                        </div>
                      </button>

                      {/* Tooltip on Hover */}
                      <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-52 p-2.5 rounded-xl bg-slate-900/95 border border-indigo-500/30 text-white shadow-2xl z-30 pointer-events-none animate-fadeIn">
                        <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{lab.category}</div>
                        <div className="text-xs font-semibold leading-snug mt-0.5 text-slate-100">{lab.name}</div>
                        <div className="text-[10px] text-slate-300 mt-1 flex items-center justify-between">
                          <span>NABL: {lab.nablId}</span>
                          <span className="text-emerald-400 font-semibold">{lab.turnaround}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Map Legend & Attribution */}
            <div className="relative z-20 px-4 py-2.5 bg-white/90 backdrop-blur-md border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Food & Ayush
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Electronics
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Construction
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Toys & Safety
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> Metals
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                <span>Scale: ~500 km</span>
                <span>•</span>
                <span>© Geoapify · OpenStreetMap</span>
              </div>
            </div>
          </div>

          {/* Active Lab Facility Detail Card (Side Inspector) */}
          <div className="lg:col-span-5 xl:col-span-4 rounded-3xl bg-white border border-slate-200 p-6 shadow-md flex flex-col justify-between space-y-5 animate-fadeIn">
            <div className="space-y-4">
              {/* Facility Header & Badges */}
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border ${activeLab.categoryColor}`}>
                  <FlaskConical size={13} />
                  <span>{activeLab.category}</span>
                </span>
                <span className="px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  NABL #{activeLab.nablId}
                </span>
              </div>

              {/* Lab Title and City */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {activeLab.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                  <MapPin size={13} className="text-amber-500 flex-shrink-0" />
                  <span>{activeLab.address}</span>
                </p>
              </div>

              {/* Coordinate and TAT Bar */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Coordinates</span>
                  <span className="font-mono font-semibold text-indigo-900">{activeLab.lat}, {activeLab.lon}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Avg. Turnaround</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <Clock size={12} />
                    {activeLab.turnaround}
                  </span>
                </div>
              </div>

              {/* Tested Indian Standards */}
              <div>
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Verified Standard Scopes
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeLab.standards.map((std, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100"
                    >
                      📄 {std}
                    </span>
                  ))}
                </div>
              </div>

              {/* Advanced Analytical Equipment */}
              <div>
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Key Testing Instrumentation
                </span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {activeLab.equipment.map((eq, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold mt-0.5">•</span>
                      <span>{eq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <a
                href={getGoogleMapsUrl(activeLab)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Navigation size={14} />
                <span>Get Directions on Google Maps</span>
                <ExternalLink size={12} className="opacity-70" />
              </a>

              <button
                onClick={() => handleCopyPhone(activeLab.phone, activeLab.id)}
                className="w-full py-2 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
              >
                {copiedId === activeLab.id ? (
                  <>
                    <Check size={14} className="text-emerald-600" />
                    <span className="text-emerald-700">Phone Number Copied!</span>
                  </>
                ) : (
                  <>
                    <Phone size={13} className="text-slate-500" />
                    <span>Desk: {activeLab.phone}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ══════════════════ DIRECTORY LIST VIEW ══════════════════ */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredLabs.map((lab) => (
            <div
              key={lab.id}
              onClick={() => {
                setSelectedLabId(lab.id);
                setViewMode("map");
              }}
              className="group rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-indigo-300 hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${lab.pinColor} shadow-sm`}>
                    <FlaskConical size={18} />
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${lab.categoryColor}`}>
                    {lab.category}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-800 group-hover:text-indigo-700 transition-colors leading-snug">
                  {lab.name}
                </h3>
                <p className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
                  <MapPin size={13} className="text-amber-500 flex-shrink-0" />
                  <span>{lab.city}, {lab.state}</span>
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono font-bold text-slate-700">NABL #{lab.nablId}</span>
                  <span className="text-emerald-700 font-semibold">{lab.turnaround}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {lab.standards.map((std, j) => (
                    <span key={j} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-600">
                      {std}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-indigo-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>View on Interactive Map</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   STATUS TRACKER TAB (Feature 11: LocalStorage Subscription Persistence)
   ═══════════════════════════════════════════════════════ */
function StatusTrackerTab({ lang }: { lang: Lang }) {
  const t = labels[lang];
  const [sectorFilter, setSectorFilter] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [subscriptions, setSubscriptions] = useState<string[]>([]);
  const [onlySubscribed, setOnlySubscribed] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bis_subscriptions");
      if (saved) {
        setSubscriptions(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const sectors = Array.from(new Set(allStandards.map((s) => s.sector))).sort();

  let filtered = sectorFilter
    ? allStandards.filter((s) => s.sector.toLowerCase().includes(sectorFilter.toLowerCase()))
    : allStandards;

  if (onlySubscribed) {
    filtered = filtered.filter((s) => subscriptions.includes(s.is_number));
  }

  const handleSubscribe = (isNumber: string) => {
    const next = subscriptions.includes(isNumber)
      ? subscriptions.filter((s) => s !== isNumber)
      : [...subscriptions, isNumber];
    setSubscriptions(next);
    try {
      localStorage.setItem("bis_subscriptions", JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
    const msg = subscriptions.includes(isNumber)
      ? `Unsubscribed from updates for ${isNumber}`
      : `${isNumber}: Subscribed! Saved in local sessions.`;
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="p-8 overflow-y-auto h-full space-y-6 relative max-w-5xl mx-auto">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-indigo-900 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 animate-fadeIn border border-indigo-700">
          <Bell size={16} className="text-amber-400" />
          <span>{toast}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{t.trackerTitle}</h2>
          <p className="text-slate-500 mt-1 text-sm">
            {lang === "en"
              ? `${allStandards.length} standards cataloged · ${subscriptions.length} active in My Subscriptions`
              : `डेटाबेस में ${allStandards.length} मानक · ${subscriptions.length} सक्रिय सदस्यता`}
          </p>
        </div>

        {/* Feature 11: My Subscriptions toggle pill */}
        <button
          onClick={() => setOnlySubscribed(!onlySubscribed)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
            onlySubscribed
              ? "bg-amber-500 text-white border-amber-600 shadow-sm"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <BookmarkCheck size={15} />
          <span>My Subscriptions ({subscriptions.length})</span>
        </button>
      </div>

      {/* Filter and quick-pills */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <ListFilter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            placeholder={t.filterBySector}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all"
          />
        </div>
        {sectorFilter && (
          <button onClick={() => setSectorFilter("")} className="text-xs text-indigo-600 hover:underline">
            {lang === "en" ? "Clear" : "साफ करें"}
          </button>
        )}
        <div className="flex gap-2 flex-wrap">
          {sectors.slice(0, 5).map((sector) => (
            <button
              key={sector}
              onClick={() => setSectorFilter(sector === sectorFilter ? "" : sector)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                sectorFilter === sector
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {sector}
            </button>
          ))}
        </div>
      </div>

      {/* Standards list */}
      <div className="space-y-3">
        {filtered.map((std, i) => {
          const isSubscribed = subscriptions.includes(std.is_number);
          return (
            <div key={i} className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {std.is_number}
                    </span>
                    <StatusBadge status={std.status} />
                    <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded">{std.sector}</span>
                    {isSubscribed && (
                      <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        ✓ Subscribed
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-slate-800 mt-2 leading-snug">{std.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{std.scope}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    <span className="font-medium">{lang === "en" ? "Scheme" : "योजना"}:</span> {std.scheme}
                  </p>
                </div>
                <button
                  onClick={() => handleSubscribe(std.is_number)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                    isSubscribed
                      ? "bg-amber-500 text-white border-amber-600 shadow-sm"
                      : "bg-slate-50 text-slate-600 hover:bg-amber-50 hover:text-amber-700 border-slate-200 hover:border-amber-200"
                  }`}
                >
                  <Bell size={14} />
                  {isSubscribed ? "Subscribed" : t.subscribe}
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <EmptyState
            icon={ListFilter}
            title={onlySubscribed ? "No active subscriptions" : "No standards found"}
            subtitle={onlySubscribed ? "Click 'Subscribe for updates' on any standard to track it in local storage." : "Try a different search query."}
          />
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCHEME GUIDE TAB (Feature 9)
   ═══════════════════════════════════════════════════════ */
function SchemeGuideTab({ lang }: { lang: Lang }) {
  const t = labels[lang];
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="p-8 overflow-y-auto h-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{t.schemeTitle}</h2>
        <p className="text-slate-500 mt-1 text-sm">
          {lang === "en"
            ? "Understanding India's main BIS certification schemes"
            : "भारत की मुख्य BIS प्रमाणन योजनाओं को समझें"}
        </p>
      </div>

      <div className="space-y-4">
        {schemes.map((scheme, i) => {
          const isOpen = expanded === i;
          const Icon = scheme.icon;
          return (
            <div key={i} className={`rounded-2xl bg-white border shadow-sm transition-all ${
              isOpen ? `${scheme.border} shadow-md` : "border-slate-200 hover:shadow-md"
            }`}>
              <button
                onClick={() => setExpanded(isOpen ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl ${scheme.bg} flex items-center justify-center`}>
                    <Icon size={22} className={scheme.color} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-800">
                      {lang === "en" ? scheme.name : scheme.nameHi}
                    </h3>
                  </div>
                </div>
                {isOpen ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
              </button>

              {isOpen && (
                <div className="px-6 pb-6 space-y-5 border-t border-slate-100 pt-5">
                  {/* Covers */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      {lang === "en" ? "What it covers" : "यह क्या कवर करता है"}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {lang === "en" ? scheme.covers : scheme.coversHi}
                    </p>
                  </div>
                  {/* Who */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      {lang === "en" ? "Who needs it" : "किसे इसकी आवश्यकता है"}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {lang === "en" ? scheme.who : scheme.whoHi}
                    </p>
                  </div>
                  {/* Steps */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      {lang === "en" ? "Process steps" : "प्रक्रिया चरण"}
                    </h4>
                    <ol className="space-y-2">
                      {(lang === "en" ? scheme.steps : scheme.stepsHi).map((step, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-slate-600">
                          <span className={`flex-shrink-0 w-6 h-6 rounded-full ${scheme.bg} ${scheme.color} flex items-center justify-center text-xs font-bold`}>
                            {j + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   VERIFY A PRODUCT TAB (Feature 1: Mock ISI/CRS/HUID Verification)
   ═══════════════════════════════════════════════════════ */
function VerifyProductTab({ lang }: { lang: Lang }) {
  const t = labels[lang];
  const [licenseInput, setLicenseInput] = useState("");
  const [result, setResult] = useState<{
    licenseNumber: string;
    schemeType: string;
    manufacturer: string;
    category: string;
    status: "Valid" | "Expired";
    issueDate: string;
    validTill: string;
    standard: string;
    location: string;
  } | null>(null);

  const handleVerify = (inputToTest?: string) => {
    const val = (inputToTest ?? licenseInput).trim();
    if (!val) return;

    const digits = val.replace(/\D/g, "");
    const lastNum = digits.length > 0 ? parseInt(digits[digits.length - 1], 10) : val.length;
    const isValid = lastNum % 2 === 0;

    let schemeType = "ISI Mark (Product Scheme I)";
    let category = "Packaged Drinking Water";
    let standard = "IS 14543:2016";

    if (val.toUpperCase().startsWith("R-") || val.toUpperCase().includes("CRS")) {
      schemeType = "CRS (Compulsory Registration Scheme)";
      category = "Power Adapter & LED Driver Electronics";
      standard = "IS 13252 (Part 1):2010";
    } else if (val.length <= 6 && /^[a-zA-Z0-9]+$/.test(val)) {
      schemeType = "Gold Hallmarking (HUID Verification)";
      category = "22 Karat Gold Jewellery Article";
      standard = "IS 1417:2016";
    }

    setResult({
      licenseNumber: val,
      schemeType,
      manufacturer: "Bharat Quality Manufacturing & Industries Pvt. Ltd.",
      category,
      status: isValid ? "Valid" : "Expired",
      issueDate: "15 Oct 2021",
      validTill: isValid ? "14 Oct 2026 (Active)" : "14 Oct 2023 (Expired)",
      standard,
      location: "Bhiwadi Industrial Estate, Alwar, Rajasthan - 301019",
    });
  };

  const sampleInputs = [
    { label: "Valid ISI Mark", val: "CM/L-8400123456" },
    { label: "Expired ISI Mark", val: "CM/L-7200987651" },
    { label: "Valid CRS Electronics", val: "R-41029482" },
    { label: "Valid Gold HUID", val: "8A42K9" },
  ];

  return (
    <div className="p-8 overflow-y-auto h-full space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{t.verifyTitle}</h2>
        <p className="text-slate-500 mt-1 text-sm">
          {lang === "en"
            ? "Instant validation of ISI Mark License, CRS Registration (R-number), or Hallmarking Unique ID (HUID)"
            : "ISI मार्क लाइसेंस, CRS पंजीकरण या HUID का सत्यापन"}
        </p>
      </div>

      {/* Input Card */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          Enter License / Registration / HUID Number
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={licenseInput}
            onChange={(e) => setLicenseInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleVerify()}
            placeholder="e.g. CM/L-8400123456, R-41029482, or 8A42K9"
            className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 font-mono placeholder:font-sans placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
          />
          <button
            onClick={() => handleVerify()}
            disabled={!licenseInput.trim()}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all disabled:opacity-40 flex items-center justify-center gap-2 shadow-sm"
          >
            <ShieldCheck size={16} />
            <span>Verify Now</span>
          </button>
        </div>

        {/* Quick sample buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Try mock samples:</span>
          {sampleInputs.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setLicenseInput(s.val);
                handleVerify(s.val);
              }}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all font-mono"
            >
              {s.label}: {s.val}
            </button>
          ))}
        </div>
      </div>

      {/* Result Card */}
      {result && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-md space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase">License / ID Number</span>
              <h3 className="text-lg font-mono font-bold text-slate-900">{result.licenseNumber}</h3>
            </div>
            <span
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold ${
                result.status === "Valid"
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : "bg-red-100 text-red-800 border border-red-300"
              }`}
            >
              {result.status === "Valid" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              {result.status === "Valid" ? "VALID & CERTIFIED" : "EXPIRED / SUSPENDED"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 font-medium">Manufacturer / Licensee</span>
              <p className="font-bold text-slate-800 mt-0.5 text-sm">{result.manufacturer}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 font-medium">Scheme Type</span>
              <p className="font-bold text-indigo-900 mt-0.5 text-sm">{result.schemeType}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 font-medium">Product Category & Specification</span>
              <p className="font-bold text-slate-800 mt-0.5 text-sm">{result.category} · {result.standard}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 font-medium">Validity Period</span>
              <p className="font-bold text-slate-800 mt-0.5 text-sm">{result.issueDate} → {result.validTill}</p>
            </div>
          </div>

          <div className="text-xs text-slate-500 flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <Building size={16} className="text-slate-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-700">Registered Facility:</span> {result.location}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 leading-relaxed">
            *Notice: This verification card is simulated for hackathon demonstration. Official real-time license lookups are executed on the BIS Manak Online portal or the BIS CARE Mobile App.
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   REPORT AN ISSUE TAB (Feature 2: Auto-Draft Grievance with Groq LLM)
   ═══════════════════════════════════════════════════════ */
function ReportIssueTab({ lang }: { lang: Lang }) {
  const t = labels[lang];
  const [productName, setProductName] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [wherePurchased, setWherePurchased] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [draftGrievance, setDraftGrievance] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePreFill = (pName: string, pIssue: string, pWhere: string) => {
    setProductName(pName);
    setIssueDescription(pIssue);
    setWherePurchased(pWhere);
  };

  const handleSubmit = async () => {
    if (!productName.trim() || !issueDescription.trim() || !wherePurchased.trim()) {
      setError("Please fill out Product Name, Issue Description, and Where Purchased.");
      return;
    }
    setError(null);
    setLoading(true);
    setDraftGrievance(null);

    try {
      const res = await fetch("/api/complaint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          issueDescription,
          wherePurchased,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to generate complaint");
      }
      setDraftGrievance(data.complaintDraft);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to auto-draft grievance");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!draftGrievance) return;
    navigator.clipboard.writeText(draftGrievance);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 overflow-y-auto h-full space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{t.reportTitle}</h2>
        <p className="text-slate-500 mt-1 text-sm">
          {lang === "en"
            ? "Report substandard goods, counterfeit ISI Marks, or safety defects. AI auto-formats a formal structured BIS CARE complaint."
            : "घटिया उत्पादों या नकली ISI मार्क की शिकायत दर्ज करने के लिए औपचारिक प्रारूप तैयार करें।"}
        </p>
      </div>

      {/* Form Container */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-100">
          <span className="text-xs text-slate-400 font-medium">Quick pre-fill templates:</span>
          <button
            onClick={() => handlePreFill(
              "FreshPure 1L Packaged Drinking Water",
              "Missing mandatory ISI mark CM/L number on bottle label, broken cap tamper seal, and noticeable foul chemical smell.",
              "Supermarket mart, Connaught Place, New Delhi"
            )}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-800 transition-all"
          >
            Tampered Water Bottle
          </button>
          <button
            onClick={() => handlePreFill(
              "HyperFast 65W USB-C Wall Charger",
              "Charger overheated excessively within 10 minutes and emitted sparks. No BIS CRS registration number (R-number) visible on product casing.",
              "Retail electronics shop, Lamington Road, Mumbai"
            )}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-800 transition-all"
          >
            Sparking Electronic Charger
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Product / Brand Name *
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. PureDrop Packaged Drinking Water"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Where Purchased / Discovered *
            </label>
            <input
              type="text"
              value={wherePurchased}
              onChange={(e) => setWherePurchased(e.target.value)}
              placeholder="e.g. Local supermarket in Karol Bagh, Delhi"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
            Issue / Non-Compliance Description *
          </label>
          <textarea
            rows={3}
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            placeholder="Describe defects, missing ISI/CRS mark, strange odor, electrical faults, or false quality claims..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
          />
        </div>

        {/* Optional Image Upload with Thumbnail Preview */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
            Product Image / Defect Evidence (Optional Thumbnail Preview)
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />

          {imagePreview ? (
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm">
              <img
                src={imagePreview}
                alt="Upload preview"
                className="w-16 h-16 object-cover rounded-xl border border-slate-300"
              />
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-slate-700 block truncate">Selected Image</span>
                <span className="text-[11px] text-slate-400">Thumbnail preview loaded</span>
              </div>
              <button
                onClick={handleRemoveImage}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-white transition-colors"
                title="Remove image"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-indigo-400 bg-slate-50 hover:bg-indigo-50/50 text-xs font-medium text-slate-600 hover:text-indigo-700 transition-all"
            >
              <UploadCloud size={16} />
              <span>Attach product or label photo (preview only)</span>
            </button>
          )}
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-sm transition-all shadow-md shadow-amber-200 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin text-white" />
              <span>AI Auto-Drafting Formal Grievance…</span>
            </>
          ) : (
            <>
              <FileSearch size={16} />
              <span>Generate Formal Complaint Draft</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Formal Complaint Card */}
      {draftGrievance && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-md space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-indigo-950 font-bold text-sm">
              <FileText size={18} className="text-amber-500" />
              <span>Structured BIS CARE Complaint Draft</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-all"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copied ? "Copied to Clipboard!" : "Copy Draft"}</span>
            </button>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl font-mono text-xs text-slate-800 leading-relaxed whitespace-pre-wrap border border-slate-200">
            {draftGrievance}
          </div>

          {/* Official Submission Disclaimer */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 leading-relaxed flex items-start gap-3">
            <AlertTriangle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Important BIS CARE Submission Disclaimer:</p>
              <p className="mt-0.5 text-amber-800">
                This grievance draft is structured using AI for maximum clarity and alignment with BIS inspection regulations. To initiate official enforcement action, sample seizure, or surveillance audit, copy this text and submit it via the official <strong>BIS CARE Mobile App</strong> (Android / iOS) or the BIS Manak Online portal at <strong>manakonline.in</strong>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ADMIN INSIGHTS TAB (Feature 3: Simulated Analytics & Query Telemetry)
   ═══════════════════════════════════════════════════════ */
function AdminInsightsTab({ lang, onClose }: { lang: Lang; onClose: () => void }) {
  const t = labels[lang];

  const mostSearchedStandards = [
    { is: "IS 18098:2022", title: "Ashvagandha & Herbal Extracts", count: 430, pct: 95, sector: "Ayush" },
    { is: "IS 13252 (Part 1):2010", title: "IT Equipment & Charger Safety", count: 345, pct: 76, sector: "Electronics" },
    { is: "IS 17873:2022", title: "Cotton Yoga Mats (ISI Mark)", count: 285, pct: 63, sector: "Ayush / Textiles" },
    { is: "IS 9873 (Part 1):2019", title: "Mechanical Safety of Toys", count: 215, pct: 47, sector: "Toys" },
    { is: "IS 18087:2022", title: "Haritaki Raw Extract Limits", count: 175, pct: 38, sector: "Ayush" },
    { is: "IS 14543:2016", title: "Packaged Drinking Water", count: 130, pct: 28, sector: "Food & Water" },
  ];

  const sectorBreakdown = [
    { sector: "Ayush & Traditional Medicine", pct: 34, color: "bg-emerald-500" },
    { sector: "Electronics & IT Goods (CRS)", pct: 28, color: "bg-indigo-600" },
    { sector: "Toys & Child Safety", pct: 18, color: "bg-purple-500" },
    { sector: "Food & Agricultural Products", pct: 12, color: "bg-sky-500" },
    { sector: "Construction Materials & Cement", pct: 8, color: "bg-amber-500" },
  ];

  const last10MockedQuestions = [
    { query: "What is the permissible foreign matter % in Haritaki fruit extract?", sector: "Ayush", is: "IS 18087:2022", time: "2 mins ago" },
    { query: "Is CRS certification mandatory for 65W GaN laptop power adapters?", sector: "Electronics", is: "IS 13252:2010", time: "5 mins ago" },
    { query: "What are the migration limits for lead and barium in children plastic toys?", sector: "Toys", is: "IS 9873:2019", time: "11 mins ago" },
    { query: "How long does factory document scrutiny take for packaged water?", sector: "Food", is: "IS 14543:2016", time: "18 mins ago" },
    { query: "Differences between ISO 22525 and Indian modified adoption IS 17942?", sector: "Ayush", is: "IS 17942:2022", time: "27 mins ago" },
    { query: "Do imported wooden puzzle toys from ASEAN need ISI Mark certification?", sector: "Toys", is: "IS 9873:2019", time: "34 mins ago" },
    { query: "Can MSMEs claim testing fee reimbursement for NABL test reports?", sector: "Policy", is: "MSME Scheme", time: "42 mins ago" },
    { query: "What test parameters are required for Portland Pozzolana cement bags?", sector: "Construction", is: "IS 1489:2015", time: "53 mins ago" },
    { query: "How to register an assaying and hallmarking centre for gold jewellery?", sector: "Hallmarking", is: "IS 1417:2016", time: "1 hr ago" },
    { query: "Is SDOC applicable for industrial safety footwear exports?", sector: "Consumer Safety", is: "IS 15298:2016", time: "1.2 hrs ago" },
  ];

  return (
    <div className="p-8 overflow-y-auto h-full space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 mb-1.5 border border-amber-200">
            <BarChart3 size={14} />
            <span>Simulated Analytics Engine</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{t.adminTitle}</h2>
          <p className="text-slate-500 mt-1 text-sm">
            Telemetry metrics, search queries, and regulatory sector distributions across BIS Sahayak
          </p>
        </div>

        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm"
        >
          Exit Admin View
        </button>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total User Queries</span>
          <p className="text-2xl font-black text-slate-900 mt-1">1,482</p>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            ↑ 24% vs last week
          </span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Compliance Reports Evaluated</span>
          <p className="text-2xl font-black text-slate-900 mt-1">247</p>
          <span className="text-[11px] text-indigo-600 font-semibold flex items-center gap-1 mt-1">
            92.4% pass conformity rate
          </span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Top Industry Sector</span>
          <p className="text-2xl font-black text-slate-900 mt-1">Ayush (34%)</p>
          <span className="text-[11px] text-slate-400 mt-1 block">504 consultations</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg LLM Latency</span>
          <p className="text-2xl font-black text-slate-900 mt-1">1.12s</p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Groq LLaMA 3.1 70B</span>
        </div>
      </div>

      {/* Tailwind Bar Chart (Most Searched Standards) & Sector Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart Container */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <BarChart3 size={16} className="text-indigo-600" />
              <span>Most Consulted Standards (Search Volume)</span>
            </h3>
            <span className="text-[11px] text-slate-400">Total: 1,580 hits</span>
          </div>

          <div className="space-y-3.5 pt-2">
            {mostSearchedStandards.map((std, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">
                    {std.is} <span className="font-normal text-slate-400">· {std.title}</span>
                  </span>
                  <span className="font-mono font-semibold text-indigo-900">{std.count} queries</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-600 to-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${std.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sector Breakdown */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-800 pb-2 border-b border-slate-100 mb-4">
              Sector Distribution
            </h3>
            <div className="space-y-3">
              {sectorBreakdown.map((s, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">{s.sector}</span>
                    <span className="font-bold text-slate-900">{s.pct}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 leading-relaxed">
            *Simulated telemetry aggregated from user queries in the current session.
          </div>
        </div>
      </div>

      {/* Table of Last 10 Mocked Questions with Timestamps */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <h3 className="font-bold text-sm text-slate-800">Recent User Queries (Last 10 Log Entries)</h3>
          <span className="text-xs text-slate-400 font-mono">Live Session Stream</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="px-6 py-3">Timestamp</th>
                <th className="px-6 py-3">User Question</th>
                <th className="px-6 py-3">Sector</th>
                <th className="px-6 py-3">Referenced Standard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {last10MockedQuestions.map((q, i) => (
                <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-3 text-slate-400 whitespace-nowrap font-mono">{q.time}</td>
                  <td className="px-6 py-3 font-medium text-slate-800 max-w-md truncate">{q.query}</td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                      {q.sector}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap font-mono text-indigo-700 font-semibold">{q.is}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════════════════════════ */

function StatusBadge({ status }: { status: string }) {
  const isPublished = status === "Published";
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
      isPublished ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? "bg-emerald-500" : "bg-amber-500"}`} />
      {status}
    </span>
  );
}

function EmptyState({ icon: Icon, title, subtitle }: { icon: React.ComponentType<{ size?: number; className?: string }>; title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center gap-4 py-16">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center">
        <Icon size={28} className="text-indigo-400" />
      </div>
      <div>
        <p className="text-base font-semibold text-slate-600">{title}</p>
        <p className="text-sm text-slate-400 mt-1 max-w-md">{subtitle}</p>
      </div>
    </div>
  );
}

function MermaidVisualizer({ chart }: { chart: string }) {
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function renderMermaid() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          themeVariables: {
            primaryColor: "#e0e7ff",
            primaryTextColor: "#1e1b4b",
            primaryBorderColor: "#6366f1",
            lineColor: "#d97706",
            secondaryColor: "#fef3c7",
            tertiaryColor: "#f8fafc",
            edgeLabelBackground: "#ffffff",
            fontSize: "12px",
            fontFamily: "inherit",
          },
          securityLevel: "loose",
        });

        const id = `mm-${Math.random().toString(36).substring(2, 9)}`;
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        if (active) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (err) {
        console.error("Mermaid client render error:", err);
        if (active) {
          setError("Visual summary unavailable for this standard right now");
        }
      }
    }

    renderMermaid();
    return () => {
      active = false;
    };
  }, [chart]);

  if (error) {
    return (
      <div className="p-3 text-xs text-amber-800 bg-amber-50 rounded-xl border border-amber-200">
        {error}
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="py-6 flex items-center justify-center gap-2 text-xs text-slate-400">
        <Loader2 size={16} className="animate-spin text-amber-500" />
        <span>Rendering visual architecture…</span>
      </div>
    );
  }

  return (
    <div
      className="overflow-x-auto py-2 flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

function ChatBubble({ msg, simpleMode, lang }: { msg: ChatMessage; simpleMode?: boolean; lang: Lang }) {
  const isUser = msg.role === "user";
  const [showVisual, setShowVisual] = useState(false);
  const [visualLoading, setVisualLoading] = useState(false);
  const [mermaidCode, setMermaidCode] = useState<string | null>(null);
  const [visualError, setVisualError] = useState<string | null>(null);

  // Voice Output (Text-to-Speech)
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Dynamic Translation (Groq LLM)
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [translating, setTranslating] = useState(false);

  const primaryStandard = msg.sources && msg.sources.length > 0 ? msg.sources[0] : null;

  const handleToggleSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const textToSpeak = showTranslation && translatedText ? translatedText : msg.text;
    const cleanText = textToSpeak.replace(/[#*`_~[\]()]/g, " ").replace(/\|/g, " ");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = showTranslation && lang === "en" ? "hi-IN" : lang === "hi" ? "hi-IN" : "en-IN";
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleTranslate = async () => {
    if (translatedText) {
      setShowTranslation(!showTranslation);
      return;
    }
    const targetLang = lang === "hi" ? "en" : "hi";
    setTranslating(true);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: msg.text, targetLang }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Translation failed");
      setTranslatedText(data.translatedText);
      setShowTranslation(true);
    } catch (err) {
      console.error("Translation error:", err);
    } finally {
      setTranslating(false);
    }
  };

  const handleFetchVisual = async () => {
    if (!primaryStandard) return;
    if (mermaidCode) {
      setShowVisual(!showVisual);
      return;
    }

    setShowVisual(true);
    setVisualLoading(true);
    setVisualError(null);

    try {
      const res = await fetch("/api/visualize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_number: primaryStandard.is_number }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to generate visual summary");
      }
      setMermaidCode(data.mermaid);
    } catch (err) {
      setVisualError("Visual summary unavailable for this standard right now");
    } finally {
      setVisualLoading(false);
    }
  };

  if (msg.isError) {
    return (
      <div className="flex justify-start">
        <div className="max-w-[80%] rounded-2xl p-4 bg-red-50/90 border border-red-200 text-red-850 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0 text-red-600 mt-0.5">
              <AlertCircle size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-red-900">
                {lang === "en" ? "Something went wrong, please try again" : "कुछ गलत हो गया, कृपया पुन: प्रयास करें"}
              </p>
              <p className="text-xs text-red-700 mt-1 leading-relaxed">{msg.text}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-5 py-4 text-sm leading-relaxed ${
        isUser
          ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-200/30"
          : "bg-white text-slate-700 border border-slate-200 shadow-sm"
      }`}>
        {/* Dynamic translation badge if active */}
        {showTranslation && translatedText && (
          <div className="mb-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
            <Languages size={13} className="text-indigo-600" />
            <span>{lang === "hi" ? "English Translation (AI Translated)" : "हिन्दी अनुवाद (AI Translated)"}</span>
          </div>
        )}

        <div className="whitespace-pre-wrap">{showTranslation && translatedText ? translatedText : msg.text}</div>

        {/* Parameter tables in simple mode */}
        {simpleMode && msg.matchedParameters && msg.matchedParameters.length > 0 && (
          <div className="mt-4 space-y-3">
            {msg.matchedParameters.map((mp, i) => {
              const entries = Object.entries(mp.parameters).filter(
                ([key]) => key !== "Scope"
              );
              if (entries.length === 0) return null;
              return (
                <div key={i} className="rounded-xl overflow-hidden border border-slate-200">
                  <div className="bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600">
                    {mp.is_number} — Parameters
                  </div>
                  <table className="w-full text-xs">
                    <tbody>
                      {entries.map(([key, val], j) => (
                        <tr key={j} className="border-t border-slate-100">
                          <td className="px-3 py-2 text-slate-500">{key.replace(/_/g, " ")}</td>
                          <td className="px-3 py-2 text-right font-mono font-semibold text-slate-700">{String(val)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        )}

        {/* Assistant Action Tools: Listen (TTS), Translate, Visual Flowchart, Citation Badges */}
        {!isUser && (
          <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                {/* Voice Output (TTS) */}
                <button
                  onClick={handleToggleSpeak}
                  title={isSpeaking ? "Stop speaking" : "Read aloud answer"}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    isSpeaking
                      ? "bg-amber-100 border-amber-300 text-amber-900 animate-pulse"
                      : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                  }`}
                >
                  {isSpeaking ? <VolumeX size={13} className="text-amber-700" /> : <Volume2 size={13} className="text-slate-600" />}
                  <span>{isSpeaking ? "Stop" : lang === "en" ? "Listen" : "सुनें"}</span>
                </button>

                {/* Dynamic Translation */}
                <button
                  onClick={handleTranslate}
                  disabled={translating}
                  title="Dynamic AI Translation"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition-all disabled:opacity-50"
                >
                  {translating ? (
                    <Loader2 size={13} className="animate-spin text-indigo-600" />
                  ) : (
                    <Languages size={13} className="text-indigo-600" />
                  )}
                  <span>
                    {translating
                      ? (lang === "en" ? "Translating…" : "अनुवाद हो रहा है…")
                      : showTranslation
                      ? (lang === "en" ? "Show Original" : "मूल पाठ दिखाएं")
                      : (lang === "en" ? "Translate to Hindi" : "अंग्रेज़ी में अनुवाद")}
                  </span>
                </button>

                {/* Visual Standard Flowchart */}
                {primaryStandard && (
                  <button
                    onClick={handleFetchVisual}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 text-white shadow-sm shadow-amber-200/50 hover:from-amber-600 hover:to-amber-700 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <Sparkles size={13} className="text-amber-100" />
                    <span>
                      {showVisual
                        ? lang === "en"
                          ? "Hide Visual Summary"
                          : "दृश्य सारांश छिपाएं"
                        : lang === "en"
                        ? "Show Visual Summary"
                        : "दृश्य सारांश देखें"}
                    </span>
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {msg.sources?.map((s, j) => (
                  <span
                    key={j}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-100"
                  >
                    📄 {s.is_number} · {s.status}
                    {s.scheme && ` · ${s.scheme}`}
                  </span>
                ))}
              </div>
            </div>

            {/* Visual Summary Card Container */}
            {showVisual && (
              <div className="rounded-2xl bg-gradient-to-b from-indigo-50/50 via-white to-amber-50/30 border border-indigo-200/70 p-4 shadow-sm animate-fadeIn mt-2">
                <div className="flex items-center justify-between pb-2.5 border-b border-indigo-100/80 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                      <Sparkles size={13} />
                    </div>
                    <span className="text-xs font-bold text-indigo-950">
                      {lang === "en"
                        ? `Visual Standard Flowchart — ${primaryStandard?.is_number || "Overview"}`
                        : `दृश्य मानक फ्लोचार्ट — ${primaryStandard?.is_number || "अवलोकन"}`}
                    </span>
                  </div>
                  <span className="text-[10px] text-indigo-600/70 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100 font-mono">
                    Mermaid.js
                  </span>
                </div>

                {visualLoading ? (
                  <div className="py-6 flex flex-col items-center justify-center gap-2 text-xs text-slate-500">
                    <Loader2 size={20} className="animate-spin text-amber-500" />
                    <span>
                      {lang === "en"
                        ? "Generating visual standard flowchart…"
                        : "दृश्य फ्लोचार्ट तैयार किया जा रहा है…"}
                    </span>
                  </div>
                ) : visualError ? (
                  <div className="p-3 text-xs text-amber-800 bg-amber-50 rounded-xl border border-amber-200">
                    {visualError}
                  </div>
                ) : mermaidCode ? (
                  <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-100 shadow-inner overflow-x-auto">
                    <MermaidVisualizer chart={mermaidCode} />
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}

        {/* Cross-Sector Conflict Warning */}
        {msg.crossConflictWarning && (
          <div className="mt-3.5 p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2.5 animate-fadeIn">
            <AlertTriangle size={17} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed font-medium">
              {typeof msg.crossConflictWarning === "object" && msg.crossConflictWarning !== null
                ? (msg.crossConflictWarning as { warningText?: string; reason?: string }).warningText ||
                  (msg.crossConflictWarning as { warningText?: string; reason?: string }).reason ||
                  JSON.stringify(msg.crossConflictWarning)
                : String(msg.crossConflictWarning)}
            </div>
          </div>
        )}

        {/* Feature 8: Static ISO Comparison Panel (IS 17942:2022 Modified Adoption) */}
        {primaryStandard && (primaryStandard.is_number.includes("17942") || msg.text.includes("17942") || msg.text.toLowerCase().includes("modified adoption")) && (
          <div className="mt-3.5 pt-3 border-t border-slate-100 animate-fadeIn">
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Scale size={15} className="text-indigo-600" />
                  <span>ISO vs Indian Standard Comparison: ISO 22525 vs IS 17942:2022</span>
                </div>
                <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-mono font-semibold">
                  Modified Adoption
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Scope analysis: IS 17942 adopts international medical tourism benchmarks while mandating specific Indian traditional medicine and infrastructure requirements.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs pt-1">
                <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                  <p className="font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <span>🌐 What ISO 22525 Specifies:</span>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px]">
                    <li>Allopathic medical facilitator standards</li>
                    <li>Basic foreign language and patient reception norms</li>
                    <li>Standard cross-border hospital admission protocols</li>
                    <li>General international medical travel insurance</li>
                  </ul>
                </div>
                <div className="bg-amber-50/70 p-3 rounded-lg border border-amber-200 shadow-2xs">
                  <p className="font-bold text-amber-950 mb-1.5 flex items-center gap-1.5">
                    <span>🇮🇳 What India Added in IS 17942:</span>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-amber-900 text-[11px]">
                    <li>Direct inclusion of Ayush systems (Ayurveda, Yoga, Unani, Siddha)</li>
                    <li>NABH-accredited traditional wellness clinic norms</li>
                    <li>Ayush Medical Value Tourism (AY Visa) protocols</li>
                    <li>Post-discharge Panchakarma & dietary continuity checklists</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feature 10: Community Insights Mocked Collapsible Panel */}
        {primaryStandard && (
          <div className="mt-3">
            <details className="group rounded-xl bg-amber-50/40 border border-amber-200/70 p-2.5 text-xs transition-colors hover:bg-amber-50/70">
              <summary className="cursor-pointer font-semibold text-amber-900 flex items-center justify-between select-none">
                <span className="flex items-center gap-1.5">
                  <Users size={13} className="text-amber-600" />
                  <span>From other applicants (unverified)</span>
                </span>
                <ChevronDown size={14} className="text-amber-600 transition-transform group-open:rotate-180" />
              </summary>
              <div className="mt-2 pt-2 border-t border-amber-200/60 text-slate-600 space-y-1.5 text-[11px] leading-relaxed">
                <p>
                  💡 <strong>Turnaround tip:</strong> Applicants frequently note testing turnaround was 10–15 days faster when raw material HPLC fingerprints and calibration records were pre-verified prior to lab dispatch.
                </p>
                <p>
                  💡 <strong>Documentation checklist:</strong> For electronic products under CRS, ensure model designations on product rating plates match the NABL lab report verbatim to prevent portal bounce.
                </p>
                <p className="text-[10px] text-amber-700 italic pt-1">
                  *Disclaimer: Community-sourced insights from previous applicants; not official BIS guidance.
                </p>
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-start">
      <div className="bg-white rounded-2xl px-5 py-4 border border-slate-200 shadow-sm space-y-3 min-w-[260px] max-w-sm">
        <div className="flex items-center gap-2.5 text-sm text-slate-600 font-medium">
          <Loader2 size={16} className="animate-spin text-amber-500" />
          <span>{text}</span>
          <span className="flex gap-1 ml-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:300ms]" />
          </span>
        </div>
        {/* Skeleton animation state */}
        <div className="space-y-2 pt-0.5">
          <div className="h-2 bg-slate-200 rounded-full w-full animate-pulse" />
          <div className="h-2 bg-slate-200 rounded-full w-4/5 animate-pulse [animation-delay:200ms]" />
          <div className="h-2 bg-slate-200 rounded-full w-3/5 animate-pulse [animation-delay:400ms]" />
        </div>
      </div>
    </div>
  );
}

function ChatInput({ value, onChange, onSubmit, placeholder, sendLabel, loading }: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  placeholder: string;
  sendLabel: string;
  loading: boolean;
}) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-IN";

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join("");
          if (transcript) {
            onChange(transcript);
          }
        };

        recognition.onerror = (err: any) => {
          console.error("Speech recognition error:", err);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [onChange]);

  const toggleListen = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please try Chrome, Edge, or Safari.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Failed to start speech recognition:", err);
        setIsListening(false);
      }
    }
  };

  return (
    <div className="px-8 py-4 border-t border-slate-200 bg-white">
      <div className="flex gap-2.5 max-w-3xl">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          placeholder={isListening ? "Listening… speak now into microphone" : placeholder}
          disabled={loading}
          className={`flex-1 px-4 py-3 rounded-xl bg-slate-50 border text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all disabled:opacity-50 ${
            isListening ? "border-red-400 ring-2 ring-red-100 bg-red-50/40" : "border-slate-200"
          }`}
        />

        {/* Voice Input (Speech-to-Text) Button */}
        <button
          type="button"
          onClick={toggleListen}
          title={isListening ? "Stop listening" : "Voice dictation (Speech to text)"}
          disabled={loading}
          className={`px-3.5 py-3 rounded-xl border transition-all flex items-center justify-center ${
            isListening
              ? "bg-red-500 hover:bg-red-600 text-white border-red-600 animate-pulse shadow-md shadow-red-200"
              : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
          }`}
        >
          {isListening ? <MicOff size={17} /> : <Mic size={17} />}
        </button>

        <button
          onClick={() => onSubmit()}
          disabled={loading || !value.trim()}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium hover:from-indigo-700 hover:to-indigo-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-indigo-200/30 hover:shadow-indigo-300/40 flex items-center gap-2"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin text-white" />
          ) : (
            <Send size={16} />
          )}
          {sendLabel}
        </button>
      </div>
    </div>
  );
}
