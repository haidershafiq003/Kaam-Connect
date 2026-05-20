import { parseUserRequestTool } from '../tools/parseUserRequest';
import { RequestIntent } from '../types';

/**
 * Intent Understanding Agent
 * Responsibility: Parse natural language request, detect language, extract structured intent.
 */
export async function intentUnderstandingAgent(rawText: string, userId: string): Promise<RequestIntent> {
  console.log(`[Intent Agent] Processing request: "${rawText}"`);
  
  const intent = await parseUserRequestTool(rawText, userId);
  
  console.log(`[Intent Agent] Extracted intent with ${Math.round(intent.confidence * 100)}% confidence`);
  
  return intent;
}
