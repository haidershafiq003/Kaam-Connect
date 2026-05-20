import { useState } from 'react';
import { orchestrateWorkflow } from '../agents/orchestrator';
import { AgentLog, RankedProvider, RequestIntent } from '../types';

export function useServiceRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    intent: RequestIntent;
    rankedProviders: RankedProvider[];
    topProvider: RankedProvider;
    booking: any;
    notifications: any;
    logs: AgentLog[];
  } | null>(null);

  const processRequest = async (text: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await orchestrateWorkflow(text, 'usr_demo_001');
      
      if (response.status === 'success') {
        setResult({
          intent: response.intent!,
          rankedProviders: response.rankedProviders!,
          topProvider: response.topProvider!,
          booking: response.booking!,
          notifications: response.notifications!,
          logs: response.logs
        });
      } else if (response.status === 'clarification_needed') {
        setError('Could not understand clearly. Please try again.');
      } else {
        setError('Something went wrong. No providers found.');
      }
    } catch (err) {
      setError('System error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    processRequest,
    loading,
    error,
    result,
    setResult
  };
}
