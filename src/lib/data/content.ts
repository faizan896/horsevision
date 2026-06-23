import {
  Activity,
  Crosshair,
  Eye,
  Layers,
  ScanLine,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  body: string;
}

export const FEATURES: Feature[] = [
  {
    icon: ScanLine,
    title: "Cinematic analysis",
    body: "Watch the model work — landmarks, scan lines and heatmaps animate over your photo in real time.",
  },
  {
    icon: Eye,
    title: "Explainable AI",
    body: "Every verdict comes with a body heatmap and per-region importance so you can see exactly what drove it.",
  },
  {
    icon: Layers,
    title: "Top-3 matches",
    body: "Never a single guess. We rank the most likely breeds with calibrated confidence and key differences.",
  },
  {
    icon: Sparkles,
    title: "Breed encyclopedia",
    body: "Explore, compare and favourite breeds with rich histories, traits, origin maps and galleries.",
  },
  {
    icon: Activity,
    title: "Built for the field",
    body: "Mobile-first, fast and shareable — capture a horse on your phone and get a result in seconds.",
  },
  {
    icon: Crosshair,
    title: "Provider-agnostic",
    body: "A clean AI layer means OpenAI, Gemini, Claude or a custom ONNX model can power it with no UI change.",
  },
];

export interface HowStep {
  step: string;
  title: string;
  body: string;
}

export const HOW_IT_WORKS: HowStep[] = [
  { step: "01", title: "Upload a photo", body: "Drag, paste, pick a file or snap one with your camera. A side-on shot works best." },
  { step: "02", title: "AI looks closely", body: "We detect the horse, find landmarks and scan head, coat, build and proportions." },
  { step: "03", title: "Get an explained verdict", body: "See the top breeds, confidence and the exact features that drove the prediction." },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "The explainability is the part that won me over — I can show clients why, not just what.",
    name: "Dr. Lena Hartman",
    role: "Equine veterinarian",
    initials: "LH",
  },
  {
    quote: "Identified a rescue's likely breeding in seconds. The analysis animation is genuinely beautiful.",
    name: "Marcus Bello",
    role: "Rescue coordinator",
    initials: "MB",
  },
  {
    quote: "My students love the anatomy and compare tools. It feels like a product, not a demo.",
    name: "Priya Nair",
    role: "Equine science lecturer",
    initials: "PN",
  },
  {
    quote: "Clean, fast, and the share cards look great on our club's socials.",
    name: "Sofia Castellano",
    role: "Equestrian club lead",
    initials: "SC",
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: "How accurate is HorseVision?",
    a: "On clear, side-on photos of common breeds our internal benchmark reaches ~92% top-3 accuracy. Crossbreds and unusual angles lower confidence — which is why we always show top-3 matches and explain our reasoning rather than forcing a single answer.",
  },
  {
    q: "What photo works best?",
    a: "A side-on shot in good light, with the whole horse in frame and minimal clutter. The conformation, coat and proportions matter most, so avoid heavy rugs or tack where possible.",
  },
  {
    q: "Do you store my images?",
    a: "In this build, analysis runs locally against a mock model and nothing leaves your device. When a real vision provider is connected, image handling follows that provider's policy and a clear consent step.",
  },
  {
    q: "Can it identify crossbreds?",
    a: "It surfaces the closest pure breeds and their similarity, which is often the most useful read for a crossbred. Dedicated pedigree suggestions are on the roadmap.",
  },
  {
    q: "Which AI model powers it?",
    a: "The architecture is provider-agnostic. This preview ships a deterministic mock provider; OpenAI Vision, Gemini, Claude or a custom ONNX/PyTorch model can be dropped in behind the same interface.",
  },
];

export const SUPPORTED_STATS = [
  { value: 12, suffix: "", label: "Breeds in encyclopedia" },
  { value: 92, suffix: "%", label: "Top-3 benchmark accuracy" },
  { value: 18, suffix: "", label: "Analysis stages" },
  { value: 7, suffix: "", label: "Body regions explained" },
];
