import { intentUnderstandingAgent } from './intentAgent';
import { providerDiscoveryAgent } from './discoveryAgent';
import { rankingAgent } from './rankingAgent';
import { bookingCreationTool } from '../tools/bookingCreation';
import { notificationGeneratorTool } from '../tools/notificationGenerator';
import { reminderSchedulerTool } from '../tools/reminderScheduler';
import { AgentLog, RankedProvider, RequestIntent } from '../types';

/**
 * Google Antigravity Orchestrator
 * Responsibility: Receive user request, create workplan, execute agents in sequence, and return final state.
 */
export async function orchestrateWorkflow(rawText: string, userId: string) {
  const logs: AgentLog[] = [];
  
  const addLog = (agent: string, tool: string, input: any, output: any, decision: string, confidence: number) => {
    logs.push({
      step: logs.length + 1,
      timestamp: new Date().toISOString(),
      agent,
      tool_used: tool,
      input,
      output,
      decision,
      confidence
    });
  };

  try {
    // Step 1: Intent Understanding
    const intent = await intentUnderstandingAgent(rawText, userId);
    addLog(
      'intent_understanding', 
      'parse_user_request_tool', 
      { rawText }, 
      intent, 
      `Extracted intent: ${intent.service_type} for ${intent.location}`, 
      intent.confidence
    );

    if (intent.confidence < 0.6) {
      return { status: 'clarification_needed', logs, intent };
    }

    // Step 2: Provider Discovery
    const providers = await providerDiscoveryAgent(intent);
    addLog(
      'provider_discovery', 
      'provider_search_tool', 
      intent, 
      { count: providers.length }, 
      `Found ${providers.length} available providers`, 
      1.0
    );

    if (providers.length === 0) {
      return { status: 'no_providers_found', logs, intent };
    }

    // Step 3: Matching & Ranking
    const rankedProviders = await rankingAgent(providers, intent);
    const topProvider = rankedProviders[0];
    addLog(
      'matching_ranking', 
      'provider_ranking_tool', 
      { providerCount: providers.length }, 
      { topProvider: topProvider.name, score: topProvider.final_score }, 
      `Recommended ${topProvider.name} based on score ${topProvider.final_score.toFixed(3)}`, 
      0.95
    );

    // Step 4: Booking Simulation
    const booking = await bookingCreationTool({
      user_id: userId,
      provider_id: topProvider.id,
      slot: intent.preferred_slot,
      location: intent.location
    });
    addLog(
      'booking',
      'booking_creation_tool',
      { providerId: topProvider.id, slot: intent.preferred_slot },
      booking,
      `Simulated booking created: ${booking.id}`,
      1.0
    );

    // Step 5: Notification Generation
    const notifications = await notificationGeneratorTool({
      ...booking,
      provider_name: topProvider.name
    });
    addLog(
      'notification',
      'notification_generator_tool',
      booking,
      notifications,
      `Generated bilingual notifications for user and provider`,
      1.0
    );

    // Step 6: Follow-Up Scheduling
    const reminder = await reminderSchedulerTool(booking.id, 'T-1hr');
    addLog(
      'followup',
      'reminder_scheduler_tool',
      { bookingId: booking.id },
      reminder,
      `Scheduled 1-hour-before reminder`,
      1.0
    );

    return {
      status: 'success',
      intent,
      rankedProviders,
      topProvider,
      booking,
      notifications,
      logs
    };

  } catch (error) {
    console.error('[Orchestrator] Error:', error);
    return { status: 'error', error: String(error), logs };
  }
}
