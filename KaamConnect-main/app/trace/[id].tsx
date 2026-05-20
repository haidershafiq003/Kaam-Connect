import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Cpu, Clock, ChevronDown, Terminal, Info } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function AgentTraceScreen() {
  const router = useRouter();
  const { id, logs } = useLocalSearchParams();
  const traceLogs = JSON.parse(logs as string || "[]");

  const agentColors: Record<string, string> = {
    intent_understanding: '#6366F1',
    provider_discovery:   '#0EA5E9',
    matching_ranking:     '#F59E0B',
    booking:              '#10B981',
    notification:         '#8B5CF6',
    followup:             '#EC4899',
  };

  return (
    <SafeAreaView style={s.container}>
      {/* Console Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <ArrowLeft color="white" size={20} />
        </TouchableOpacity>
        <View style={s.headerTitleGroup}>
          <Terminal color="#86EFAC" size={16} />
          <Text style={s.headerTitle}>AGENT_TRACE_CONSOLE</Text>
        </View>
        <View style={s.statusBadge}>
          <View style={s.pulseDot} />
          <Text style={s.statusText}>LIVE</Text>
        </View>
      </View>

      <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        
        {/* Meta Card */}
        <View style={s.metaCard}>
          <View style={s.metaRow}>
            <Text style={s.metaLabel}>SESSION_ID</Text>
            <Text style={s.metaValue}>{String(id).toUpperCase()}</Text>
          </View>
          <View style={s.metaDivider} />
          <View style={s.metaRow}>
            <Text style={s.metaLabel}>ORCHESTRATOR</Text>
            <Text style={s.metaValue}>GOOGLE_ANTIGRAVITY_V3</Text>
          </View>
        </View>

        {/* Trace Timeline */}
        {traceLogs.map((log: any, i: number) => {
          const color = agentColors[log.agent] ?? '#00A86B';
          const isLast = i === traceLogs.length - 1;
          return (
            <View key={i} style={s.logEntry}>
              {/* Timeline Connector */}
              <View style={s.timelineColumn}>
                <View style={[s.dot, { backgroundColor: color }]}>
                  <Text style={s.dotText}>{log.step}</Text>
                </View>
                {!isLast && <View style={[s.line, { backgroundColor: color + '40' }]} />}
              </View>

              {/* Log Card */}
              <View style={s.card}>
                <View style={s.cardHeader}>
                  <View style={[s.agentBadge, { backgroundColor: color + '15' }]}>
                    <Text style={[s.agentName, { color }]}>{log.agent.toUpperCase()}</Text>
                  </View>
                  <Text style={s.timestamp}>{new Date(log.timestamp).toLocaleTimeString()}</Text>
                </View>

                <Text style={s.decision}>{log.decision}</Text>

                <View style={s.detailsRow}>
                  <View style={s.detailItem}>
                    <Text style={s.detailLabel}>TOOL</Text>
                    <Text style={s.detailValue}>{log.tool_used}</Text>
                  </View>
                  <View style={s.detailItem}>
                    <Text style={s.detailLabel}>CONFIDENCE</Text>
                    <Text style={[s.detailValue, { color: log.confidence > 0.8 ? '#10B981' : '#F59E0B' }]}>
                      {(log.confidence * 100).toFixed(0)}%
                    </Text>
                  </View>
                </View>

                {/* JSON Code Block */}
                <View style={s.codeBlock}>
                  <View style={s.codeHeader}>
                    <Text style={s.codeHeaderText}>RAW_OUTPUT.JSON</Text>
                    <TouchableOpacity>
                      <ChevronDown color="#9CA3AF" size={14} />
                    </TouchableOpacity>
                  </View>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Text style={s.codeText}>
                      {JSON.stringify(log.output, null, 2)}
                    </Text>
                  </ScrollView>
                </View>
              </View>
            </View>
          );
        })}

        {traceLogs.length === 0 && (
          <View style={s.emptyState}>
            <Info color="#9CA3AF" size={48} />
            <Text style={s.emptyTitle}>No Trace Data Found</Text>
            <Text style={s.emptySub}>Please run a demo simulation first.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' }, // Deep Navy Dark Mode
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 16, 
    backgroundColor: '#1E293B',
    borderBottomWidth: 1, 
    borderBottomColor: '#334155' 
  },
  backBtn: { padding: 8 },
  headerTitleGroup: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 13, fontWeight: '800', color: '#86EFAC', letterSpacing: 1 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#064E3B', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  pulseDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10B981' },
  statusText: { color: '#10B981', fontSize: 10, fontWeight: '900' },

  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 60 },

  metaCard: { 
    backgroundColor: '#1E293B', 
    borderRadius: 16, 
    padding: 16, 
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155'
  },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between' },
  metaLabel: { fontSize: 10, color: '#9CA3AF', fontWeight: '800' },
  metaValue: { fontSize: 10, color: 'white', fontWeight: '800', opacity: 0.8 },
  metaDivider: { height: 1, backgroundColor: '#334155', marginVertical: 12 },

  logEntry: { flexDirection: 'row', gap: 12, marginBottom: 8 },
  timelineColumn: { alignItems: 'center', width: 28 },
  dot: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', zIndex: 2 },
  dotText: { color: 'white', fontSize: 12, fontWeight: '900' },
  line: { width: 2, flex: 1, marginTop: -4, marginBottom: -4, zIndex: 1 },

  card: { 
    flex: 1, 
    backgroundColor: '#1E293B', 
    borderRadius: 20, 
    padding: 16, 
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155'
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  agentBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  agentName: { fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  timestamp: { fontSize: 10, color: '#9CA3AF', fontWeight: '700' },

  decision: { fontSize: 15, fontWeight: '800', color: 'white', marginBottom: 16, lineHeight: 22 },
  
  detailsRow: { flexDirection: 'row', gap: 24, marginBottom: 16 },
  detailItem: { gap: 4 },
  detailLabel: { fontSize: 9, color: '#9CA3AF', fontWeight: '800' },
  detailValue: { fontSize: 12, color: 'white', fontWeight: '700' },

  codeBlock: { backgroundColor: '#0F172A', borderRadius: 12, overflow: 'hidden' },
  codeHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#334155', 
    paddingHorizontal: 12, 
    paddingVertical: 6 
  },
  codeHeaderText: { fontSize: 9, color: '#9CA3AF', fontWeight: '900' },
  codeText: { padding: 12, color: '#86EFAC', fontSize: 11, fontFamily: 'monospace' },

  emptyState: { alignItems: 'center', marginTop: 100, gap: 12 },
  emptyTitle: { color: 'white', fontSize: 20, fontWeight: '800' },
  emptySub: { color: '#9CA3AF', fontSize: 14 }
});
