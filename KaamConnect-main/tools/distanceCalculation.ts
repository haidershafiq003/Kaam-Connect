/**
 * Mocks distance calculation between user location and provider area.
 * Returns distance in KM.
 */
export async function distanceCalculationTool(userLocation: string, providerLocation: string): Promise<number> {
  // Simple mock logic for Islamabad sectors
  if (userLocation === providerLocation) return 1.2;
  
  const sectors = ['G-13', 'G-11', 'G-12', 'G-10', 'G-9', 'F-11', 'F-10', 'F-8', 'F-7', 'I-10', 'I-9'];
  const userIdx = sectors.indexOf(userLocation);
  const provIdx = sectors.indexOf(providerLocation);
  
  if (userIdx === -1 || provIdx === -1) return 5.0; // Default if unknown
  
  return Math.abs(userIdx - provIdx) * 1.5 + 0.5;
}
