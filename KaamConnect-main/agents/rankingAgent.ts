import { providerRankingTool } from '../tools/providerRanking';
import { Provider, RankedProvider, RequestIntent } from '../types';

/**
 * Matching & Ranking Agent
 * Responsibility: Score and rank available providers based on user preferences.
 */
export async function rankingAgent(providers: Provider[], intent: RequestIntent): Promise<RankedProvider[]> {
  console.log(`[Ranking Agent] Ranking ${providers.length} providers`);
  
  const ranked = await providerRankingTool(providers, {
    location: intent.location,
    slot: intent.preferred_slot
  });
  
  console.log(`[Ranking Agent] Top provider: ${ranked[0]?.name} with score ${ranked[0]?.final_score.toFixed(3)}`);
  
  return ranked;
}
