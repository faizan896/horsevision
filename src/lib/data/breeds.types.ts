export type BreedType =
  | "Hotblood"
  | "Warmblood"
  | "Coldblood"
  | "Draft"
  | "Pony"
  | "Gaited";

export type BodyRegion = "head" | "eyes" | "neck" | "chest" | "body" | "legs" | "tail";

export type RegionImportance = Record<BodyRegion, number>;

export interface Breed {
  slug: string;
  name: string;
  tagline: string;
  origin: {
    country: string;
    countryCode: string;
    coords: [number, number]; // [lat, lng]
  };
  type: BreedType;
  heightHands: [number, number];
  weightKg: [number, number];
  lifespanYears: [number, number];
  colors: string[];
  uses: string[];
  temperament: string[];
  /** 0–100 metrics used for compare charts + trait meters. */
  metrics: {
    speed: number;
    endurance: number;
    strength: number;
    popularity: number;
    trainability: number;
  };
  history: string;
  timeline: { year: string; event: string }[];
  funFacts: string[];
  health: string[];
  famous: string[];
  related: string[]; // slugs
  /** Default explainability profile used by the mock AI provider. */
  regionImportance: RegionImportance;
  /** Tailwind-friendly accent for cards (hex). */
  accent: string;
  /** Public-domain breed photograph (Wikimedia), shown with a vintage plate treatment. */
  image: string;
  /** Optional short credit for the image. */
  imageCredit?: string;
}
