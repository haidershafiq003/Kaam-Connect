import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, MapPin, ShieldCheck, ChevronRight, ArrowLeft, Zap } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ProvidersScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const providers = JSON.parse(params.providers as string || "[]");

  return (
    <SafeAreaView style={s.container}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <ArrowLeft color="#1F2937" size={22} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>AI Recommendations</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.infoBox}>
          <Zap color="#00A86B" size={16} />
          <Text style={s.infoText}>{providers.length} verified providers found in your area</Text>
        </View>

        {providers.map((p: any) => (
          <TouchableOpacity
            key={p.id}
            onPress={() => router.push({ pathname: `/booking/${p.id}`, params: { provider: JSON.stringify(p) } })}
            style={s.card}
          >
            {/* Rank Badge */}
            <View style={[s.rankBadge, p.rank === 1 ? s.rankGold : s.rankSilver]}>
              <Text style={s.rankText}>{p.rank === 1 ? 'TOP MATCH' : `#${p.rank}`}</Text>
            </View>

            <View style={s.cardMain}>
              <View style={s.avatarBox}>
                <Text style={s.avatarEmoji}>{p.category_id === 'ac_technician' ? '❄️' : '🔧'}</Text>
              </View>
              <View style={s.providerInfo}>
                <Text style={s.providerName}>{p.name}</Text>
                <View style={s.locationRow}>
                  <MapPin color="#9CA3AF" size={14} />
                  <Text style={s.locationText}>{p.area}, {p.city}</Text>
                </View>
              </View>
              <View style={s.scoreBox}>
                <Text style={s.scoreVal}>{((p.final_score ?? 0) * 100).toFixed(0)}%</Text>
                <Text style={s.scoreLabel}>MATCH</Text>
              </View>
            </View>

            {/* Stats Bar */}
            <View style={s.statsBar}>
              <View style={s.statItem}>
                <Star color="#FFB800" fill="#FFB800" size={14} />
                <Text style={s.statText}>{p.rating}</Text>
              </View>
              <View style={s.statDivider} />
              <View style={s.statItem}>
                <Text style={s.statText}>{p.distance_km}km</Text>
              </View>
              <View style={s.statDivider} />
              <View style={s.statItem}>
                <ShieldCheck color="#00A86B" size={14} />
                <Text style={s.statText}>{Math.round((p.reliability_score ?? 0) * 100)}%</Text>
              </View>
              <View style={s.statDivider} />
              <View style={s.statItem}>
                <Text style={s.statText}>Rs.{p.price_min}+</Text>
              </View>
            </View>

            {/* Reason Box */}
            <View style={s.reasonBox}>
              <Text style={s.reasonText}>“{p.reason}”</Text>
            </View>

            <TouchableOpacity 
              onPress={() => router.push({ pathname: `/booking/${p.id}`, params: { provider: JSON.stringify(p) } })}
              style={s.bookBtn}
            >
              <Text style={s.bookBtnText}>Book Now</Text>
              <ChevronRight color="white" size={18} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        {providers.length === 0 && (
          <View style={s.emptyState}>
            <Text style={s.emptyText}>No providers found matching your criteria.</Text>
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
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 16, 
    backgroundColor: 'white', 
    borderBottomWidth: 1, 
    borderBottomColor: '#F3F4F6' 
  },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F9FAFB', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#111827' },
  
  scroll: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  
  infoBox: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    backgroundColor: '#F0FFF8', 
    padding: 12, 
    borderRadius: 16, 
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#DCFCE7'
  },
  infoText: { fontSize: 13, color: '#004D30', fontWeight: '600' },

  card: { 
    backgroundColor: 'white', 
    borderRadius: 28, 
    padding: 20, 
    marginBottom: 20, 
    elevation: 4, 
    shadowColor: '#000', 
    shadowOpacity: 0.08, 
    shadowRadius: 15,
    borderWidth: 1,
    borderColor: '#F3F4F6'
  },
  rankBadge: { 
    position: 'absolute', 
    top: 16, 
    right: 20, 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 8 
  },
  rankGold: { backgroundColor: '#FFF7E0' },
  rankSilver: { backgroundColor: '#F3F4F6' },
  rankText: { fontSize: 10, fontWeight: '900', color: '#B45309' },

  cardMain: { flexDirection: 'row', gap: 16, alignItems: 'center', marginBottom: 20 },
  avatarBox: { 
    width: 60, 
    height: 60, 
    borderRadius: 20, 
    backgroundColor: '#F3F4F6', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  avatarEmoji: { fontSize: 28 },
  providerInfo: { flex: 1 },
  providerName: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 4 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationText: { fontSize: 13, color: '#9CA3AF', fontWeight: '500' },
  
  scoreBox: { alignItems: 'center', backgroundColor: '#F0FFF8', padding: 10, borderRadius: 16 },
  scoreVal: { fontSize: 18, fontWeight: '900', color: '#00A86B' },
  scoreLabel: { fontSize: 8, fontWeight: '900', color: '#00A86B', opacity: 0.6 },

  statsBar: { 
    flexDirection: 'row', 
    backgroundColor: '#F9FAFB', 
    borderRadius: 16, 
    padding: 14, 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statText: { fontSize: 13, fontWeight: '700', color: '#374151' },
  statDivider: { width: 1, height: 14, backgroundColor: '#E5E7EB' },

  reasonBox: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12, 
    paddingTop: 16, 
    borderTopWidth: 1, 
    borderTopColor: '#F3F4F6' 
  },
  reasonText: { flex: 1, fontSize: 13, color: '#6B7280', fontStyle: 'italic', lineHeight: 18 },

  bookBtn: { 
    backgroundColor: '#00A86B', 
    borderRadius: 14, 
    paddingVertical: 12, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 8, 
    marginTop: 16 
  },
  bookBtnText: { color: 'white', fontSize: 15, fontWeight: '800' },

  emptyState: { alignItems: 'center', paddingVertical: 100 },
  emptyText: { color: '#9CA3AF', fontSize: 16 }
});
