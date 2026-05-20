export interface RequestIntent {
  language: string;
  service_type: string;
  location: string;
  city: string;
  date: string;
  time_preference: string;
  preferred_slot: string;
  urgency: string;
  confidence: number;
}

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
  distance_km?: number;
}

export interface RankedProvider extends Provider {
  final_score: number;
  rank: number;
  reason: string;
  breakdown: {
    rating: number;
    distance: number;
    availability: number;
    reliability: number;
    price: number;
  };
}

export interface Booking {
  id: string;
  booking_code: string;
  user_id: string;
  provider_id: string;
  request_id: string;
  scheduled_at: string;
  location: string;
  status: string;
}

export interface AgentLog {
  step: number;
  timestamp: string;
  agent: string;
  tool_used: string;
  input: any;
  output: any;
  decision: string;
  confidence: number;
}
