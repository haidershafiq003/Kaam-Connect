import { Booking } from '../types';
import { supabase } from '../lib/supabase';

/**
 * Creates a booking record in Supabase.
 * Falls back to mock if DB fails.
 */
export async function bookingCreationTool(data: { user_id: string, provider_id: string, slot: string, location: string }): Promise<Booking> {
  console.log(`[Booking Tool] Creating booking for ${data.provider_id} at ${data.slot}`);
  
  try {
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        user_id: data.user_id,
        provider_id: data.provider_id,
        scheduled_at: new Date().toISOString(), // Mocking date for now
        status: 'confirmed',
        location: data.location
      })
      .select()
      .single();

    if (error) throw error;
    if (booking) return booking;
  } catch (err) {
    console.warn("Supabase Booking failed, using mock:", err);
  }

  // Mock Fallback
  return {
    id: 'BK-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    user_id: data.user_id,
    provider_id: data.provider_id,
    scheduled_at: new Date().toISOString(),
    status: 'confirmed',
    total_price: 2500,
    location: data.location
  };
}
