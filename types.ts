export interface ServiceSubItem {
  title: string;
  description: string;
  price: string;
}

export interface ServiceCategory {
  id: string;
  categoryTitle: string;
  items: ServiceSubItem[];
  ctaText: string;
  highlight?: boolean;
}

export interface PortfolioItem {
  title: string;
  category: string;
  image: string;
}

export interface Testimonial {
  name: string;
  company: string;
  text: string;
  stars: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}