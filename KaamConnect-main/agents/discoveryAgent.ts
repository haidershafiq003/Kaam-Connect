import { providerSearchTool } from '../tools/providerSearch';
import { distanceCalculationTool } from '../tools/distanceCalculation';
import { availabilityCheckerTool } from '../tools/availabilityChecker';
import { Provider, RequestIntent } from '../types';

/**
 * Provider Discovery Agent
 * Responsibility: Search provider database, calculate distances, and check availability.
 */
export async function providerDiscoveryAgent(intent: RequestIntent): Promise<Provider[]> {
  console.log(`[Discovery Agent] Finding providers for ${intent.service_type}`);
  
  // 1. Search providers
  const providers = await providerSearchTool(intent);
  
  // 2. Enhance with distance and filter by availability
  const enhancedProviders = await Promise.all(providers.map(async (p) => {
    const dist = await distanceCalculationTool(intent.location, p.area);
    const availability = await availabilityCheckerTool(p.id, intent.date, intent.time_preference);
    
    if (availability.available) {
      return { ...p, distance_km: dist };
    }
    return null;
  }));
  
  const availableProviders = enhancedProviders.filter(p => p !== null) as Provider[];
  
  console.log(`[Discovery Agent] Found ${availableProviders.length} available providers`);
  
  return availableProviders;
}
