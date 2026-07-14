export interface Flavor {
  id: string;
  name: string;
  tagline: string;
  color: "amber" | "yellow" | "red" | "orange";
  colorClass: string; // Tailwind bg color class
  textBgClass: string; // Tailwind soft background color class
  borderClass: string; // Tailwind border accent class
  description: string;
  pairings: string[];
  ingredients: string;
  nutritionalInfo: string;
  isBestSeller?: boolean;
}

export interface Recommendation {
  flavorId: string;
  flavorName: string;
  reason: string;
  servingSuggestion: string;
}

export interface AiResponse {
  recommendations: Recommendation[];
  generalTip: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatarColor: string;
  tag: string;
}
