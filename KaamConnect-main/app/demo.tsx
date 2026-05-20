import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, CheckCircle2, ListChecks, ArrowLeft, Cpu, Sparkles, AlertCircle } from 'lucide-react-native';
import { orchestrateWorkflow } from '../agents/orchestrator';

const { width } = Dimensions.get('window');

const steps = [
  { id: 1, label: "Intent Intelligence", sub: "NLU Parsing & Keyword Detection", icon: "🧠" },
  { id: 2, label: "Provider Discovery", sub: "Filtering 16+ Local Professionals", icon: "🔍" },
  { id: 3, label: "Weighted Ranking", sub: "Applying 5-Factor Scoring Model", icon: "📊" },
  { id: 4, label: "Booking Simulation", sub: "Transaction & State Finalization", icon: "✅" }
];

export default function DemoModeScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const demoInput = "Mujhe kal subah G-13 mein AC technician chahiye";

  const runDemo = async () => {
    setLoading(true);
    setError(null);
    setStep(1);
    await new Promise(r => setTimeout(r, 1200));
    setStep(2);
    try {
      const res = await orchestrateWorkflow(demoInput, 'usr_demo_001');
      setResult(res);
      await new Promise(r => setTimeout(r, 1000));
      setStep(3);
      await new Promise(r => setTimeout(r, 800));
      setStep(4);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setStep(0); setResult(null); setError(null); };

  return (
    <SafeAreaView style={s.container}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <ArrowLeft color="#1F2937" size={24} />
        </TouchableOpacity>
        <View style={s.headerTitleGroup}>
          <Cpu color="#00A86B" size={20} />
          <Text style={s.headerTitle}>KaamConnect AI</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        
        {/* Title Section */}
        <View style={s.titleSection}>
          <View style={s.badge}>
            <Sparkles color="#FFB800" size={12} />
            <Text style={s.badgeText}>GOOGLE ANTIGRAVITY ORCHESTRATOR</Text>
          </View>
          <Text style={s.mainTitle}>Demo Mode</Text>
          <Text style={s.mainSubtitle}>Observe the end-to-end agentic reasoning process in real-time.</Text>
        </View>

        {step === 0 ? (
          <View style={s.startCard}>
            <View style={s.playCircle}>
              <Play color="#00A86B" fill="#00A86B" size={40} />
            </View>
            <Text style={s.startTitle}>Ready to begin simulation?</Text>
            <Text style={s.startSubtitle}>Processing high-confidence Roman Urdu input:</Text>
            <View style={s.inputPreview}>
              <Text style={s.inputPreviewText}>"{demoInput}"</Text>
            </View>
            <TouchableOpacity onPress={runDemo} style={s.startBtn}>
              <Text style={s.startBtnText}>Initialize Pipeline</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {/* Pipeline Visualization */}
            <View style={s.pipelineCard}>
              <Text style={s.pipelineHeader}>AGENT PIPELINE EXECUTION</Text>
              {steps.map((st, i) => {
                const done = step > st.id;
                const active = step === st.id;
                return (
                  <View key={st.id} style={s.stepRow}>
                    <View style={s.indicatorColumn}>
                      <View style={[s.indicatorDot, done || active ? s.dotActive : s.dotInactive]}>
                        {done ? <CheckCircle2 color="white" size={16} /> : <Text style={s.dotIcon}>{st.icon}</Text>}
                      </View>
                      {i !== steps.length - 1 && <View style={[s.indicatorLine, done ? s.lineActive : s.lineInactive]} />}
                    </View>
                    <View style={s.stepText}>
                      <Text style={[s.stepLabel, active && s.labelActive, done && s.labelDone]}>{st.label}</Text>
                      <Text style={s.stepSub}>{st.sub}</Text>
                    </View>
                    {active && loading && <ActivityIndicator size="small" color="#00A86B" />}
                  </View>
                );
              })}
            </View>

            {/* Final Results Card */}
            {step === 4 && result && (
              <View style={s.resultCard}>
                <View style={s.resultHeader}>
                  <Text style={s.resultTitle}>Orchestration Success</Text>
                  <View style={s.successBadge}>
                    <Text style={s.successBadgeText}>CONFIRMED</Text>
                  </View>
                </View>

                <View style={s.resultBody}>
                  <View style={s.resultItem}>
                    <Text style={s.resultLabel}>Top Provider</Text>
                    <Text style={s.resultValue}>{result.topProvider?.name}</Text>
                  </View>
                  <View style={s.resultItem}>
                    <Text style={s.resultLabel}>Reasoning</Text>
                    <Text style={s.resultValue}>{result.topProvider?.reason}</Text>
                  </View>
                  <View style={s.resultItem}>
                    <Text style={s.resultLabel}>Match Score</Text>
                    <Text style={s.resultValue}>{((result.topProvider?.final_score ?? 0) * 100).toFixed(0)}%</Text>
                  </View>
                </View>

                <TouchableOpacity 
                  onPress={() => router.push({ pathname: `/trace/${result.booking?.id}`, params: { logs: JSON.stringify(result.logs) } })}
                  style={s.traceBtn}
                >
                  <ListChecks color="white" size={18} />
                  <Text style={s.traceBtnText}>Review Deep Trace Logs</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={reset} style={s.restartBtn}>
                  <Text style={s.restartBtnText}>Restart Simulation</Text>
                </TouchableOpacity>
              </View>
            )}

            {error && (
              <View style={s.errorCard}>
                <AlertCircle color="#EF4444" size={24} />
                <Text style={s.errorText}>{error}</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6'
  },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F9FAFB', justifyContent: 'center', alignItems: 'center' },
  headerTitleGroup: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#111827' },
  
  scroll: { flex: 1 },
  content: { padding: 24, paddingBottom: 50 },
  
  titleSection: { marginBottom: 32 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  badgeText: { fontSize: 10, fontWeight: '900', color: '#B45309', letterSpacing: 1 },
  mainTitle: { fontSize: 36, fontWeight: '900', color: '#111827', marginBottom: 8 },
  mainSubtitle: { fontSize: 16, color: '#6B7280', lineHeight: 24 },

  startCard: { 
    backgroundColor: 'white', 
    borderRadius: 32, 
    padding: 32, 
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20
  },
  playCircle: { 
    width: 90, 
    height: 90, 
    borderRadius: 45, 
    backgroundColor: '#F0FFF8', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 24
  },
  startTitle: { fontSize: 22, fontWeight: '800', color: '#111827', marginBottom: 12 },
  startSubtitle: { fontSize: 14, color: '#9CA3AF', marginBottom: 16 },
  inputPreview: { 
    backgroundColor: '#F9FAFB', 
    borderRadius: 20, 
    padding: 20, 
    width: '100%', 
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#F3F4F6'
  },
  inputPreviewText: { fontSize: 16, color: '#374151', fontStyle: 'italic', textAlign: 'center', lineHeight: 24 },
  startBtn: { 
    backgroundColor: '#00A86B', 
    width: '100%', 
    paddingVertical: 18, 
    borderRadius: 20, 
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#00A86B',
    shadowOpacity: 0.2,
    shadowRadius: 10
  },
  startBtnText: { color: 'white', fontSize: 18, fontWeight: '800' },

  pipelineCard: { backgroundColor: 'white', borderRadius: 32, padding: 24, marginBottom: 24, elevation: 2 },
  pipelineHeader: { fontSize: 11, fontWeight: '900', color: '#9CA3AF', letterSpacing: 1.5, marginBottom: 24 },
  stepRow: { flexDirection: 'row', gap: 16, marginBottom: 2 },
  indicatorColumn: { alignItems: 'center', width: 40 },
  indicatorDot: { 
    width: 40, 
    height: 40, 
    borderRadius: 14, 
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 2 
  },
  dotActive: { backgroundColor: '#00A86B' },
  dotInactive: { backgroundColor: '#F3F4F6' },
  dotIcon: { fontSize: 16 },
  indicatorLine: { width: 2, height: 30, marginTop: -4, marginBottom: -4, zIndex: 1 },
  lineActive: { backgroundColor: '#00A86B' },
  lineInactive: { backgroundColor: '#F3F4F6' },
  stepText: { flex: 1, paddingTop: 2, paddingBottom: 24 },
  stepLabel: { fontSize: 17, fontWeight: '700', color: '#9CA3AF' },
  labelActive: { color: '#111827' },
  labelDone: { color: '#00A86B' },
  stepSub: { fontSize: 13, color: '#9CA3AF', marginTop: 2 },

  resultCard: { 
    backgroundColor: '#004D30', 
    borderRadius: 32, 
    padding: 24, 
    elevation: 10,
    shadowColor: '#004D30',
    shadowOpacity: 0.4,
    shadowRadius: 20
  },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  resultTitle: { fontSize: 22, fontWeight: '800', color: 'white' },
  successBadge: { backgroundColor: '#00A86B', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  successBadgeText: { color: 'white', fontSize: 10, fontWeight: '900' },
  resultBody: { gap: 16, marginBottom: 24 },
  resultItem: { gap: 4 },
  resultLabel: { fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: '700' },
  resultValue: { fontSize: 16, color: 'white', fontWeight: '600' },
  traceBtn: { 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    paddingVertical: 16, 
    borderRadius: 16, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  traceBtnText: { color: 'white', fontWeight: '800', fontSize: 15 },
  restartBtn: { marginTop: 16, alignItems: 'center' },
  restartBtnText: { color: 'rgba(255,255,255,0.6)', fontWeight: '700', fontSize: 14 },
  
  errorCard: { backgroundColor: '#FEF2F2', padding: 16, borderRadius: 16, flexDirection: 'row', gap: 12, alignItems: 'center' },
  errorText: { color: '#EF4444', fontWeight: '600', flex: 1 }
});
