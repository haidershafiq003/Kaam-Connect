import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle2, AlertCircle, ArrowRight, Cpu, Sparkles, MapPin, Calendar, Clock, Zap, Star, ListChecks } from 'lucide-react-native';
import { useServiceRequest } from '../hooks/useServiceRequest';

const { width } = Dimensions.get('window');

export default function RequestScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { processRequest, loading, error, result } = useServiceRequest();
  const [started, setStarted] = useState(false);

  const inputText = (params.text as string) || "Mujhe kal subah G-13 mein AC technician chahiye";

  const handleStart = () => {
    setStarted(true);
    processRequest(inputText);
  };

  if (!started) {
    return (
      <SafeAreaView style={s.container}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
            <ArrowRight color="#1F2937" size={22} style={{ transform: [{ rotate: '180deg' }] }} />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Confirm Request</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={s.centerContent}>
          <View style={s.brandIconBox}>
            <Cpu color="#00A86B" size={40} />
          </View>
          <Text style={s.mainTitle}>Ready for AI Processing?</Text>
          <Text style={s.mainSubtitle}>We will analyze your request and orchestrate the best matches.</Text>
          
          <View style={s.inputCard}>
            <View style={s.inputCardHeader}>
              <Sparkles color="#FFB800" size={14} />
              <Text style={s.inputCardLabel}>YOUR NATURAL LANGUAGE REQUEST</Text>
            </View>
            <Text style={s.inputText}>“{inputText}”</Text>
          </View>

          <TouchableOpacity onPress={handleStart} style={s.confirmBtn}>
            <Text style={s.confirmBtnText}>Initialize Orchestrator</Text>
            <ArrowRight color="white" size={22} />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.statusHeader}>
          <Text style={s.statusTitle}>AI Orchestration</Text>
          <View style={s.activeBadge}>
            <View style={s.pulseDot} />
            <Text style={s.activeText}>PROCESSING</Text>
          </View>
        </View>

        {loading && (
          <View style={s.loadingBox}>
            <View style={s.spinnerBox}>
              <ActivityIndicator size="large" color="#00A86B" />
            </View>
            <Text style={s.loadingTitle}>Thinking...</Text>
            <Text style={s.loadingSub}>Antigravity is extracting intent & scanning providers</Text>
            <View style={s.loadingGrid}>
              {['NLU Parsing', 'Area Mapping', 'Provider Scoring'].map((t) => (
                <View key={t} style={s.loadingTag}>
                  <Text style={s.loadingTagText}>{t}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {error && (
          <View style={s.errorCard}>
            <View style={s.errorIconCircle}>
              <AlertCircle color="#EF4444" size={32} />
            </View>
            <Text style={s.errorTitle}>Analysis Failed</Text>
            <Text style={s.errorSub}>{error}</Text>
            <TouchableOpacity onPress={() => setStarted(false)} style={s.retryBtn}>
              <Text style={s.retryBtnText}>Retry Analysis</Text>
            </TouchableOpacity>
          </View>
        )}

        {result && !loading && (
          <View>
            {/* Intent Insight Card */}
            <View style={s.intentCard}>
              <View style={s.intentHeader}>
                <View style={s.intentIconBox}>
                  <CheckCircle2 color="white" size={16} />
                </View>
                <Text style={s.intentHeaderText}>Intent Intelligence Analysis</Text>
              </View>

              <View style={s.intentStats}>
                <View style={s.intentStatItem}>
                  <Text style={s.statLabel}>SERVICE</Text>
                  <Text style={s.statVal}>{result.intent?.service_type?.replace(/_/g, ' ').toUpperCase()}</Text>
                </View>
                <View style={s.statSep} />
                <View style={s.intentStatItem}>
                  <Text style={s.statLabel}>CONFIDENCE</Text>
                  <Text style={[s.statVal, { color: '#00A86B' }]}>{Math.round((result.intent?.confidence ?? 0) * 100)}%</Text>
                </View>
              </View>

              <View style={s.intentDetails}>
                <View style={s.detailRow}>
                  <MapPin color="#9CA3AF" size={16} />
                  <Text style={s.detailLabel}>Location:</Text>
                  <Text style={s.detailValue}>{result.intent?.location}</Text>
                </View>
                <View style={s.detailRow}>
                  <Calendar color="#9CA3AF" size={16} />
                  <Text style={s.detailLabel}>Schedule:</Text>
                  <Text style={s.detailValue}>{result.intent?.date}</Text>
                </View>
                <View style={s.detailRow}>
                  <Clock color="#9CA3AF" size={16} />
                  <Text style={s.detailLabel}>Time Slot:</Text>
                  <Text style={s.detailValue}>{result.intent?.time_preference} ({result.intent?.preferred_slot})</Text>
                </View>
              </View>
            </View>

            {/* Match Recommendation */}
            <View style={s.matchCard}>
              <View style={s.matchHeader}>
                <Sparkles color="#86EFAC" size={16} />
                <Text style={s.matchTitle}>TOP RECOMMENDED MATCH</Text>
              </View>
              <Text style={s.matchProvider}>{result.topProvider?.name}</Text>
              <View style={s.matchStats}>
                <View style={s.matchBadge}>
                  <Text style={s.matchBadgeText}>{((result.topProvider?.final_score ?? 0) * 100).toFixed(0)}% MATCH SCORE</Text>
                </View>
                <View style={s.ratingBadge}>
                  <Star color="#FFB800" fill="#FFB800" size={10} />
                  <Text style={s.ratingText}>{result.topProvider?.rating}</Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => router.push({ 
                  pathname: `/booking/${result.topProvider?.id}`, 
                  params: { provider: JSON.stringify(result.topProvider) } 
                })}
                style={s.directBookBtn}
              >
                <Zap color="#004D30" size={18} />
                <Text style={s.directBookBtnText}>Book Now</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => router.push({
                pathname: '/providers',
                params: { providers: JSON.stringify(result.rankedProviders) }
              })}
              style={s.viewProvidersBtn}
            >
              <Text style={s.viewProvidersText}>View Ranked Provider List</Text>
              <ArrowRight color="white" size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push({
                pathname: `/trace/${result.booking?.id}`,
                params: { logs: JSON.stringify(result.logs) }
              })}
              style={s.traceBtn}
            >
              <ListChecks color="#00A86B" size={18} />
              <Text style={s.traceBtnText}>View AI Trace Console</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F9FAFB', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#111827' },

  centerContent: { flex: 1, padding: 32, justifyContent: 'center' },
  content: { padding: 24, paddingBottom: 60 },

  brandIconBox: { width: 80, height: 80, borderRadius: 32, backgroundColor: '#F0FFF8', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 24 },
  mainTitle: { fontSize: 28, fontWeight: '900', color: '#111827', textAlign: 'center', marginBottom: 12 },
  mainSubtitle: { fontSize: 15, color: '#6B7280', textAlign: 'center', lineHeight: 24, marginBottom: 32 },

  inputCard: { backgroundColor: 'white', borderRadius: 28, padding: 24, elevation: 4, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 15, marginBottom: 40, borderWidth: 1, borderColor: '#F3F4F6' },
  inputCardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  inputCardLabel: { fontSize: 10, fontWeight: '900', color: '#9CA3AF', letterSpacing: 1 },
  inputText: { fontSize: 18, color: '#374151', fontStyle: 'italic', fontWeight: '600', lineHeight: 28, textAlign: 'center' },

  confirmBtn: { backgroundColor: '#00A86B', borderRadius: 24, paddingVertical: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, elevation: 5, shadowColor: '#00A86B', shadowOpacity: 0.3, shadowRadius: 15 },
  confirmBtnText: { color: 'white', fontSize: 18, fontWeight: '800' },

  statusHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  statusTitle: { fontSize: 24, fontWeight: '900', color: '#111827' },
  activeBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#F0FFF8', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  pulseDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10B981' },
  activeText: { color: '#00A86B', fontSize: 10, fontWeight: '900', letterSpacing: 1 },

  loadingBox: { alignItems: 'center', paddingVertical: 60 },
  spinnerBox: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', elevation: 4, marginBottom: 24 },
  loadingTitle: { fontSize: 22, fontWeight: '800', color: '#111827', marginBottom: 8 },
  loadingSub: { fontSize: 14, color: '#9CA3AF', textAlign: 'center', marginBottom: 24 },
  loadingGrid: { flexDirection: 'row', gap: 8 },
  loadingTag: { backgroundColor: '#F3F4F6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  loadingTagText: { fontSize: 10, fontWeight: '800', color: '#6B7280' },

  intentCard: { backgroundColor: 'white', borderRadius: 28, padding: 24, marginBottom: 20, elevation: 3, borderWidth: 1, borderColor: '#F3F4F6' },
  intentHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  intentIconBox: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#10B981', justifyContent: 'center', alignItems: 'center' },
  intentHeaderText: { fontSize: 15, fontWeight: '800', color: '#111827' },
  
  intentStats: { flexDirection: 'row', backgroundColor: '#F9FAFB', borderRadius: 20, padding: 16, marginBottom: 20 },
  intentStatItem: { flex: 1, alignItems: 'center' },
  statLabel: { fontSize: 9, fontWeight: '900', color: '#9CA3AF', marginBottom: 4 },
  statVal: { fontSize: 15, fontWeight: '800', color: '#111827' },
  statSep: { width: 1, height: 30, backgroundColor: '#E5E7EB' },

  intentDetails: { gap: 12 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  detailLabel: { fontSize: 13, fontWeight: '700', color: '#9CA3AF', width: 70 },
  detailValue: { fontSize: 13, fontWeight: '700', color: '#374151', flex: 1 },

  matchCard: { backgroundColor: '#004D30', borderRadius: 28, padding: 24, marginBottom: 24, elevation: 8, shadowColor: '#004D30', shadowOpacity: 0.3, shadowRadius: 15 },
  matchHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  matchTitle: { color: '#86EFAC', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  matchProvider: { color: 'white', fontSize: 24, fontWeight: '900', marginBottom: 12 },
  matchStats: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  matchBadge: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  matchBadgeText: { color: '#86EFAC', fontSize: 10, fontWeight: '900' },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  ratingText: { color: 'white', fontSize: 12, fontWeight: '800' },

  directBookBtn: { 
    backgroundColor: '#86EFAC', 
    borderRadius: 14, 
    paddingVertical: 12, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 8, 
    marginTop: 20 
  },
  directBookBtnText: { color: '#004D30', fontSize: 15, fontWeight: '800' },

  viewProvidersBtn: { backgroundColor: '#00A86B', borderRadius: 20, paddingVertical: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12 },
  viewProvidersText: { color: 'white', fontSize: 16, fontWeight: '800' },
  traceBtn: { paddingVertical: 16, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, borderWidth: 1.5, borderColor: '#00A86B' },
  traceBtnText: { color: '#00A86B', fontSize: 15, fontWeight: '800' },

  errorCard: { backgroundColor: 'white', borderRadius: 28, padding: 32, alignItems: 'center' },
  errorIconCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#FEF2F2', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  errorTitle: { fontSize: 20, fontWeight: '800', color: '#111827', marginBottom: 8 },
  errorSub: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginBottom: 24 },
  retryBtn: { backgroundColor: '#EF4444', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  retryBtnText: { color: 'white', fontWeight: '800' }
});
