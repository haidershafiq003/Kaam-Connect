import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, User, Star, MapPin, Phone, Clock, Briefcase, ChevronRight } from 'lucide-react-native';

const INITIAL_WORK_HOURS = [
  { slot: "09:00 AM - 12:00 PM", active: true },
  { slot: "01:00 PM - 04:00 PM", active: true },
  { slot: "05:00 PM - 08:00 PM", active: false },
];

export default function ProfileScreen() {
  const router = useRouter();
  const [isProvider, setIsProvider] = useState(false);
  const [workHours, setWorkHours] = useState(INITIAL_WORK_HOURS);

  const toggleSlot = (index: number) => {
    const newHours = [...workHours];
    newHours[index].active = !newHours[index].active;
    setWorkHours(newHours);
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <ArrowLeft color="#1F2937" size={22} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>My Profile</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={s.avatarSection}>
          <View style={s.avatarCircle}>
            <User color="#00A86B" size={40} />
          </View>
          <Text style={s.name}>Ahsaan Saeed</Text>
          <Text style={s.area}>📍 G-13, Islamabad</Text>
        </View>

        {/* Mode Toggle Card */}
        <View style={[s.card, s.modeCard]}>
          <View style={s.modeInfo}>
            <Briefcase color={isProvider ? "#00A86B" : "#6B7280"} size={22} />
            <View>
              <Text style={s.modeTitle}>{isProvider ? "Provider Dashboard" : "Customer Account"}</Text>
              <Text style={s.modeSub}>{isProvider ? "Managing your services & hours" : "Browsing for services"}</Text>
            </View>
          </View>
          <Switch 
            value={isProvider} 
            onValueChange={setIsProvider}
            trackColor={{ false: "#E5E7EB", true: "#DCFCE7" }}
            thumbColor={isProvider ? "#00A86B" : "#F3F4F6"}
          />
        </View>

        {!isProvider ? (
          <>
            {/* Customer Stats */}
            <View style={s.statsRow}>
              <View style={s.statItem}>
                <Text style={s.statNum}>3</Text>
                <Text style={s.statLabel}>Bookings</Text>
              </View>
              <View style={s.statDivider} />
              <View style={s.statItem}>
                <Text style={s.statNum}>4.8</Text>
                <Text style={s.statLabel}>Avg Rating</Text>
              </View>
              <View style={s.statDivider} />
              <View style={s.statItem}>
                <Text style={s.statNum}>3</Text>
                <Text style={s.statLabel}>Services</Text>
              </View>
            </View>

            {/* Account Info */}
            <View style={s.card}>
              <Text style={s.cardLabel}>ACCOUNT INFO</Text>
              <View style={s.infoRow}>
                <Phone color="#6B7280" size={18} />
                <Text style={s.infoText}>+92 300 1234567</Text>
              </View>
              <View style={s.divider} />
              <View style={s.infoRow}>
                <MapPin color="#6B7280" size={18} />
                <Text style={s.infoText}>G-13/4, Street 5, Islamabad</Text>
              </View>
            </View>
          </>
        ) : (
          <>
            {/* Provider Settings */}
            <View style={s.card}>
              <View style={s.cardHeader}>
                <Clock color="#00A86B" size={18} />
                <Text style={s.cardLabel}>MY WORK HOURS</Text>
              </View>
              <Text style={s.cardSub}>Set your availability for service requests</Text>
              
              <View style={s.hoursList}>
                {workHours.map((h, i) => (
                  <View key={i} style={s.hourRow}>
                    <Text style={[s.hourText, !h.active && s.textDisabled]}>{h.slot}</Text>
                    <Switch 
                      value={h.active} 
                      onValueChange={() => toggleSlot(i)}
                      scaleX={0.8} scaleY={0.8}
                    />
                  </View>
                ))}
              </View>
            </View>

            <View style={s.card}>
              <Text style={s.cardLabel}>SERVICE CATEGORY</Text>
              <TouchableOpacity style={s.pickerMimic}>
                <Text style={s.pickerText}>AC Technician</Text>
                <ChevronRight color="#9CA3AF" size={18} />
              </TouchableOpacity>
            </View>
          </>
        )}

        <TouchableOpacity onPress={() => router.push('/demo')} style={s.demoBtn}>
          <Text style={s.demoBtnText}>▶  Try Demo Mode</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  backBtn: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1F2937' },
  scroll: { flex: 1 },
  content: { padding: 20 },
  
  avatarSection: { alignItems: 'center', paddingVertical: 20 },
  avatarCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#DCFCE7', alignItems: 'center', justifyContent: 'center', marginBottom: 14, borderWidth: 3, borderColor: '#00A86B' },
  name: { fontSize: 24, fontWeight: '800', color: '#1F2937', marginBottom: 4 },
  area: { fontSize: 15, color: '#6B7280' },

  card: { backgroundColor: 'white', borderRadius: 24, padding: 20, marginBottom: 16, elevation: 1, borderWidth: 1, borderColor: '#F3F4F6' },
  modeCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F9FAFB' },
  modeInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  modeTitle: { fontSize: 16, fontWeight: '800', color: '#1F2937' },
  modeSub: { fontSize: 12, color: '#6B7280' },

  statsRow: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 24, padding: 20, marginBottom: 16, elevation: 1 },
  statItem: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 24, fontWeight: '800', color: '#00A86B' },
  statLabel: { fontSize: 11, fontWeight: '700', color: '#9CA3AF', marginTop: 2 },
  statDivider: { width: 1, backgroundColor: '#F3F4F6' },

  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  cardLabel: { fontSize: 11, fontWeight: '900', color: '#9CA3AF', letterSpacing: 1.5 },
  cardSub: { fontSize: 13, color: '#6B7280', marginBottom: 20 },
  
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  infoText: { fontSize: 15, color: '#374151', fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 14 },

  hoursList: { gap: 12 },
  hourRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F9FAFB', padding: 12, borderRadius: 16 },
  hourText: { fontSize: 14, fontWeight: '700', color: '#374151' },
  textDisabled: { color: '#9CA3AF', textDecorationLine: 'line-through' },

  pickerMimic: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 4 },
  pickerText: { fontSize: 15, fontWeight: '700', color: '#374151' },

  demoBtn: { backgroundColor: '#FFB800', borderRadius: 20, paddingVertical: 18, alignItems: 'center', marginTop: 10 },
  demoBtnText: { color: 'white', fontWeight: '900', fontSize: 16 },
});
