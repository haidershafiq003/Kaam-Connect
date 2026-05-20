import { Provider, RequestIntent } from '../types';
import { supabase } from '../lib/supabase';

/**
 * Searches for providers matching the service type and location using Supabase.
 * Falls back to mock data if DB is empty or connection fails.
 */
export async function providerSearchTool(intent: RequestIntent): Promise<Provider[]> {
  console.log(`[Search Tool] Searching for ${intent.service_type} in ${intent.location}`);
  
  try {
    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .eq('category_id', intent.service_type)
      .eq('is_available', true);

    if (error) throw error;

    if (data && data.length > 0) {
      return data.map(p => ({
        ...p,
        // Ensure distance is mocked if not in DB for now
        distance_km: p.distance_km ?? (p.area === intent.location ? Math.random() * 2 + 0.5 : Math.random() * 8 + 2)
      }));
    }
  } catch (err) {
    console.warn("Supabase Search failed, using mock providers:", err);
  }

  // MOCK FALLBACK (so the app works even without DB keys during first run)
  const mockProviders: Provider[] = [
    { id: 'prov_001', name: 'Ali AC Services', category_id: 'ac_technician', area: 'G-13', city: 'Islamabad', rating: 4.8, completed_jobs: 156, reliability_score: 0.92, price_min: 1500, price_max: 3500, languages: ['en', 'roman_urdu'] },
    { id: 'prov_002', name: 'Hamza Cool Air', category_id: 'ac_technician', area: 'G-11', city: 'Islamabad', rating: 4.5, completed_jobs: 98, reliability_score: 0.85, price_min: 1200, price_max: 3000, languages: ['roman_urdu'] },
    { id: 'prov_003', name: 'Usman Plumbing', category_id: 'plumber', area: 'G-13', city: 'Islamabad', rating: 4.6, completed_jobs: 210, reliability_score: 0.88, price_min: 800, price_max: 2500, languages: ['roman_urdu', 'urdu'] },
    { id: 'prov_016', name: 'Khan AC & Refrigeration', category_id: 'ac_technician', area: 'F-7', city: 'Islamabad', rating: 4.9, completed_jobs: 300, reliability_score: 0.94, price_min: 2000, price_max: 5000, languages: ['en', 'urdu', 'roman_urdu'] },
  ];

  return mockProviders.filter(p => p.category_id === intent.service_type);
}
