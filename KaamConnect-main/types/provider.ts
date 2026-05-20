export interface Provider {
  id: string;
  name: string;
  category_id: string;
  area: string;
  city: string;
  rating: number;
  completed_jobs: number;
  reliability_score: number;
  price_min: number;
  price_max: number;
  languages: string[];
  contact_placeholder: string;
  active: boolean;
  distance_km?: number;
}
