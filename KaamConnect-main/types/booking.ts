export type BookingStatus = 'pending' | 'confirmed' | 'reminded' | 'in_progress' | 'completed' | 'cancelled' | 'delayed' | 'rated';

export interface Booking {
  id: string;
  booking_code: string;
  user_id: string;
  provider_id: string;
  request_id: string;
  scheduled_at: string;
  location: string;
  status: BookingStatus;
  created_at: string;
  provider_name?: string;
  service_type?: string;
}
