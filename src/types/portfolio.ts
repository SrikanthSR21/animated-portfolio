export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Poster Design' | 'Brand Identity' | 'Video & Motion' | 'Editorial' | 'Photo Manipulation';
  year: string;
  tools: string[];
  description: string;
  fullDescription: string;
  process: string[];
  coverImage: string;
  additionalImages?: string[];
  client: string;
  metrics?: string;
  accentColor: string;
}

export interface PosterItem {
  id: string;
  title: string;
  year: string;
  software: string;
  description: string;
  concept: string;
  image: string;
  colorAccent: string;
  tags: string[];
  dimensions: string;
  initialRotation: number;
}

export interface SkillItem {
  name: string;
  percentage: number;
  category: string;
  highlight: string;
}

export interface ToolItem {
  name: string;
  abbr: string;
  category: string;
  color: string;
  textColor?: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  year: string;
}

export interface AchievementItem {
  title: string;
  organization: string;
  year: string;
  badge: string;
}
