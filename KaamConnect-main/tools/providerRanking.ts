import { Provider, RankedProvider } from '../types';

/**
 * Ranks providers using the weighted formula from plan.md:
 * Final Score = (rating_score * 0.30) + (distance_score * 0.25) + (availability_score * 0.25) + (reliability_score * 0.15) + (price_score * 0.05)
 */
export async function providerRankingTool(providers: Provider[], userPrefs: { location: string, slot: string }): Promise<RankedProvider[]> {
  const maxDistance = 15;
  const maxPrice = 8000;
  
  const ranked = providers.map(p => {
    // Ensure distance is available for mock (smaller for providers in same area)
    const distance = p.distance_km ?? (p.area === userPrefs.location ? Math.random() * 2 + 0.5 : Math.random() * 8 + 2);
    
    const ratingScore = p.rating / 5.0;
    const distanceScore = Math.max(0, 1 - (distance / maxDistance));
    const availabilityScore = 1.0; // In this mock, we only pass available providers
    const reliabilityScore = p.reliability_score;
    const priceScore = Math.max(0, 1 - (p.price_min / maxPrice));
    
    const finalScore = 
      (ratingScore * 0.30) + 
      (distanceScore * 0.25) + 
      (availabilityScore * 0.25) + 
      (reliabilityScore * 0.15) + 
      (priceScore * 0.05);
    
    // Dynamic reason generation
    let reason = "Good overall match for your requirements.";
    if (distance < 2 && p.rating > 4.5) {
      reason = "Highest rated provider within 2km of your location.";
    } else if (p.rating > 4.8) {
      reason = "Top-tier reliability and historical performance rating.";
    } else if (p.price_min < 1500) {
      reason = "Most cost-effective professional available for this slot.";
    } else if (distance < 1) {
      reason = "Extremely close to your location, ensuring prompt arrival.";
    }

    return {
      ...p,
      distance_km: parseFloat(distance.toFixed(1)),
      final_score: finalScore,
      rank: 0, 
      reason,
      breakdown: {
        rating: ratingScore * 0.30,
        distance: distanceScore * 0.25,
        availability: availabilityScore * 0.25,
        reliability: reliabilityScore * 0.15,
        price: priceScore * 0.05
      }
    };
  });
  
  return ranked
    .sort((a, b) => b.final_score - a.final_score)
    .map((p, idx) => ({ ...p, rank: idx + 1 }));
}
