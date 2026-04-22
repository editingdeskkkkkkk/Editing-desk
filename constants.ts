import {
  Scissors,
  Sparkles,
  Layers,
  MonitorSmartphone,
} from "lucide-react";

// ... [skipping constants, redefining the whole file block isn't necessary if I just replace imports and the SERVICES array]

export const COMPANY_INFO = {
  name: "Editing Desk",
  tagline: "Craft  Create  Captivate",
  email: "editingdesk.co@gmail.com",
  location: "300 Bowery, New York, NY 10012, United States",
  locationSecondary: "Available for Remote Projects Worldwide",
};

export const BRAND_COLORS = {
  gold: "#C9A84C",
  goldLight: "#E8C96A",
  ink: "#080808",
};

// --- SECTION: HERO (HOME) ---
export const HERO_CONTENT = {
  badge: "Premium Social Media Agency",
  titleLine1: "High End Video Editing and",
  titleLine2: "Creative Production for",
  titleHighlight: "Modern Brands",
  description:
    "We create polished edits, commercial visuals, and brand focused content designed to strengthen your identity, elevate your presence, and drive measurable engagement.",
  ctaPrimary: "View Work",
  ctaSecondary: "Contact Us",
};

// --- SECTION: ABOUT US ---
export const ABOUT_CONTENT = {
  title: "Where Creativity Meets Precision",
  paragraph1:
    "Founded in the heart of Doha, Editing Desk began with a singular vision: to bridge the gap between raw footage and cinematic storytelling. What started as a boutique editing studio has evolved into a full-service creative agency.",
  paragraph2:
    "We believe that every brand has a story waiting to be told. Our approach combines technical mastery with artistic intuition, ensuring that your content doesn't just look good—it feels right. From high-end commercials to comprehensive brand identities, we craft assets that resonate.",
  features: [
    "Premium Quality",
    "Fast Turnaround",
    "Creative Strategy",
    "Global Reach",
  ],
  stats: [
    { value: "150+", label: "Projects Completed" },
    { value: "50+", label: "Happy Clients" },
    { value: "12", label: "Countries Served" },
    { value: "24h", label: "Support Response" },
  ],
  missionTitle: "Our Mission",
  missionStatement:
    '"To empower visionary brands with high-end visual narratives that captivate audiences and define market leadership."',
};

// --- SECTION: SERVICES ---
export const SERVICES = [
  {
    title: "Post Production & Color Grading",
    description:
      "Full-scale post-production pipelines for films, commercials, and branded content. Precision color grading that transforms raw footage into a cinematic visual identity.",
    icon: Scissors,
  },
  {
    title: "Motion Graphics & Animation",
    description:
      "From animated logos and motion ads to full broadcast graphics  we craft movement that amplifies your brand's voice and keeps audiences locked in.",
    icon: Sparkles,
  },
  {
    title: "Short-Form & Social Content",
    description:
      "High-retention edits built for Reels, TikTok, YouTube Shorts, and beyond. AI-enhanced content, wedding films, and long-form YouTube productions also covered.",
    icon: MonitorSmartphone,
  },
  {
    title: "Brand Identity & Design",
    description:
      "Logo design, animated brand marks, full brand identity systems, and ad campaign creatives  everything needed to make your brand unmistakable across every platform.",
    icon: Layers,
  },
];

// --- SECTION: PORTFOLIO ---
export interface PortfolioItem {
  videoUrl: string;
  category: string;
  allowed?: boolean;
  featured?: boolean;
  title?: string;
  image?: string;
  description?: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    videoUrl: "https://www.youtube.com/shorts/UHg3Ny9kIRY",
    description: "This video showcases a professionally produced model introduction intended for agency review. We handled concept planning, shooting, direction, and final editing. The edit focuses on clean cuts, natural tones, smooth pacing, and a polished presentation that highlights the model's features and on camera presence. The final output is suitable for agency submissions, castings, and digital portfolios.",
    category: "Commercial",
    featured: true,
    allowed: true,
  },
];

export const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Team", href: "#team" },
  { name: "Reviews", href: "#reviews" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];
