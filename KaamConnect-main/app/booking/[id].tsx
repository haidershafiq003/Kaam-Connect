import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle2, Calendar, MapPin, MessageSquare, ArrowLeft, Clock, Zap, Check } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM", 
  "01:00 PM", "02:00 PM", "03:00 PM", 
  "05:00 PM", "06:00 PM"
];

export default function BookingScreen() {
  const router = useRouter();
  const { id, provider } = useLocalSearchParams();
  const p = provider ? JSON.parse(provider as string) : null;

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedTime, setSelectedTime] = useState("10:00 AM");

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  if (!isConfirmed) {
    return (
      <SafeAreaView style={s.container}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
            <ArrowLeft color="#1F2937" size={22} />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Review Booking</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
          <View style={s.card}>
            <Text style={s.cardLabel}>PROFESSIONAL</Text>
            <View style={s.providerRow}>
              <View style={s.avatarBox}>
                <Text style={s.avatarEmoji}>👨‍🔧</Text>
              </View>
              <View style={s.providerInfo}>
                <Text style={s.providerName}>{p?.name}</Text>
                <Text style={s.providerArea}>{p?.area}, {p?.city}</Text>
              </View>
            </View>
          </View>

          <View style={s.card}>
            <Text style={s.cardLabel}>SELECT APPOINTMENT TIME</Text>
            <View style={s.timeGrid}>
              {TIME_SLOTS.map((t) => (
                <TouchableOpacity 
                  key={t} 
                  onPress={() => setSelectedTime(t)}
                  style={[s.timeSlot, selectedTime === t && s.timeSlotActive]}
                >
                  <Text style={[s.timeSlotText, selectedTime === t && s.timeSlotTextActive]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={s.card}>
            <Text style={s.cardLabel}>LOCATION</Text>
            <View style={s.detailRow}>
              <MapPin color="#00A86B" size={18} />
              <Text style={s.detailValue}>Sector G-13, Islamabad</Text>
            </View>
          </View>

          <TouchableOpacity onPress={handleConfirm} style={s.primaryBtn}>
            <Text style={s.primaryBtnText}>Confirm Booking</Text>
            <Zap color="white" size={18} />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.replace('/')} style={s.backBtn}>
          <ArrowLeft color="#1F2937" size={22} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Confirmation</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.successCard}>
          <View style={s.successIconBox}>
            <CheckCircle2 color="white" size={40} />
          </View>
          <Text style={s.successTitle}>Booking Confirmed</Text>
          <Text style={s.bookingId}>TRANSACTION_ID: {String(id).toUpperCase().slice(0, 12)}</Text>
        </View>

        <View style={s.card}>
          <Text style={s.cardLabel}>APPOINTMENT LOGISTICS</Text>
          <View style={s.detailRow}>
            <View style={s.detailIconBox}>
              <Calendar color="#00A86B" size={18} />
            </View>
            <View>
              <Text style={s.detailLabel}>DATE & TIME</Text>
              <Text style={s.detailValue}>Tomorrow, {selectedTime}</Text>
            </View>
          </View>
          <View style={s.divider} />
          <View style={s.detailRow}>
            <View style={s.detailIconBox}>
              <MapPin color="#00A86B" size={18} />
            </View>
            <View>
              <Text style={s.detailLabel}>LOCATION</Text>
              <Text style={s.detailValue}>Sector G-13, Islamabad</Text>
            </View>
          </View>
        </View>

        <View style={s.notifCard}>
          <View style={s.notifHeader}>
            <MessageSquare color="#86EFAC" size={16} />
            <Text style={s.notifTitle}>BILINGUAL CONFIRMATION SMS</Text>
          </View>
          <Text style={s.notifText}>
            “Apki booking confirm ho gayi hai. {p?.name} kal {selectedTime} par G-13 ayenge. Booking ID: {String(id).slice(0, 8)}”
          </Text>
        </View>

        <TouchableOpacity onPress={() => router.replace('/')} style={s.primaryBtn}>
          <Text style={s.primaryBtnText}>Back to Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => router.push({ pathname: `/chat/${id}`, params: { name: p?.name } })} 
          style={s.chatBtn}
        >
          <MessageSquare color="white" size={18} />
          <Text style={s.chatBtnText}>Chat with Professional</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F9FAFB', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#111827' },
  scroll: { flex: 1 },
  content: { padding: 24, paddingBottom: 60 },

  card: { backgroundColor: 'white', borderRadius: 28, padding: 24, marginBottom: 16, elevation: 2, borderWidth: 1, borderColor: '#F3F4F6' },
  cardLabel: { fontSize: 10, fontWeight: '900', color: '#9CA3AF', letterSpacing: 1, marginBottom: 20 },
  
  providerRow: { flexDirection: 'row', gap: 16, alignItems: 'center' },
  avatarBox: { width: 64, height: 64, borderRadius: 24, backgroundColor: '#F0FFF8', justifyContent: 'center', alignItems: 'center' },
  avatarEmoji: { fontSize: 32 },
  providerInfo: { flex: 1 },
  providerName: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 4 },
  providerArea: { fontSize: 14, color: '#6B7280', fontWeight: '500' },

  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  timeSlot: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, borderWidth: 1.5, borderColor: '#F3F4F6', minWidth: (width - 110) / 3, alignItems: 'center' },
  timeSlotActive: { borderColor: '#00A86B', backgroundColor: '#F0FFF8' },
  timeSlotText: { fontSize: 13, fontWeight: '700', color: '#6B7280' },
  timeSlotTextActive: { color: '#00A86B' },

  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  detailIconBox: { width: 44, height: 44, borderRadius: 16, backgroundColor: '#F0FFF8', justifyContent: 'center', alignItems: 'center' },
  detailValue: { fontSize: 16, fontWeight: '800', color: '#111827' },
  divider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 16 },

  successCard: { backgroundColor: '#00A86B', borderRadius: 32, padding: 32, alignItems: 'center', marginBottom: 24, elevation: 8 },
  successIconBox: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  successTitle: { fontSize: 26, fontWeight: '900', color: 'white', marginBottom: 8 },
  bookingId: { fontSize: 10, fontWeight: '800', color: 'rgba(255,255,255,0.7)', letterSpacing: 1.5 },

  notifCard: { backgroundColor: '#1E293B', borderRadius: 28, padding: 24, marginBottom: 32 },
  notifHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  notifTitle: { color: '#86EFAC', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  notifText: { color: 'white', fontSize: 15, lineHeight: 24, fontStyle: 'italic' },

  primaryBtn: { backgroundColor: '#00A86B', borderRadius: 20, paddingVertical: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, elevation: 4 },
  primaryBtnText: { color: 'white', fontSize: 17, fontWeight: '800' },
  chatBtn: { backgroundColor: '#3B82F6', borderRadius: 20, paddingVertical: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 12, elevation: 4 },
  chatBtnText: { color: 'white', fontSize: 16, fontWeight: '800' }
});
