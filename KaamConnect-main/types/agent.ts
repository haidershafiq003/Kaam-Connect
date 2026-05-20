export interface AgentLog {
  step: number;
  timestamp: string;
  agent: string;
  tool_used: string;
  input: any;
  output: any;
  decision: string;
  confidence: number;
}

export interface AgentTrace {
  booking_id: string;
  total_steps: number;
  trace: AgentLog[];
}
