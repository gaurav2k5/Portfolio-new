export type ProjectCategory = 
  | "All"
  | "Poster Design"
  | "Key Visuals"
  | "Brand Identity"
  | "Social Media"
  | "Typography & Experiments";

export interface Project {
  id: string;
  title: string;
  category: "Poster Design" | "Key Visuals" | "Brand Identity" | "Social Media" | "Typography & Experiments";
  year: string;
  client: string;
  role: string;
  aspectRatio: "portrait" | "landscape" | "square" | "tall";
  dimensions: string;
  summary: string;
  concept: string;
  challenge: string;
  solution: string;
  typography: string[];
  colorPalette: { name: string; hex: string }[];
  featuredIn3D: boolean;
  wallPosition?: [number, number, number]; // [x, y, z] for 3D studio wall
  wallScale?: [number, number]; // [width, height]
  coverImage: string;
  additionalImages?: string[];
  tags: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

export interface StudioConfig {
  designerName: string;
  role: string;
  tagline: string;
  location: string;
  availability: string;
  email: string;
  socials: {
    instagram: string;
    behance?: string;
    linkedin?: string;
    github?: string;
  };
}
