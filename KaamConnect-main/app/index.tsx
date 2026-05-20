import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { Search, User, History, PlayCircle, Star, ShieldCheck, MapPin, Zap } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { id: 'ac_technician', name: 'AC Repair', icon: '❄️', color: '#E0F2FE' },
  { id: 'plumber', name: 'Plumber', icon: '🚰', color: '#E0E7FF' },
  { id: 'electrician', name: 'Electrician', icon: '⚡', color: '#FEF3C7' },
  { id: 'tutor', name: 'Tutor', icon: '📚', color: '#FCE7F3' },
  { id: 'beautician', name: 'Beauty', icon: '💅', color: '#F3E8FF' },
  { id: 'mechanic', name: 'Mechanic', icon: '🔧', color: '#FFEDD5' },
  { id: 'carpenter', name: 'Carpenter', icon: '🪚', color: '#ECFCCB' },
  { id: 'cleaning', name: 'Cleaning', icon: '🧹', color: '#D1FAE5' },
  { id: 'appliance_repair', name: 'Appliance', icon: '🛠️', color: '#FEE2E2' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    router.push({
      pathname: '/request',
      params: { text: searchQuery }
    });
  };

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={s.greeting}>Asalam-o-Alaikum,</Text>
            <Text style={s.userName}>Ahsaan Saeed</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/profile')} style={s.profileBtn}>
            <View style={s.avatar}>
              <User color="#00A86B" size={24} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Hero Card / Search */}
        <View style={s.heroCard}>
          <Text style={s.heroTitle}>How can we help you today?</Text>
          <Text style={s.heroSubtitle}>Find the best local service providers in seconds.</Text>
          
          <View style={s.searchContainer}>
            <Search color="#9CA3AF" size={20} style={s.searchIcon} />
            <TextInput 
              placeholder="e.g., Mujhe G-13 mein AC wala chahiye"
              placeholderTextColor="#9CA3AF"
              style={s.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity onPress={handleSearch} style={s.goBtn}>
              <Zap color="white" size={18} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Demo Mode Feature - High Prominence */}
        <TouchableOpacity 
          onPress={() => router.push('/demo')}
          style={s.demoCard}
        >
          <View style={s.demoIconBg}>
            <PlayCircle color="#FFFFFF" size={32} />
          </View>
          <View style={s.demoTextContent}>
            <Text style={s.demoLabel}>HACKATHON MODE</Text>
            <Text style={s.demoTitle}>Experience the Agentic AI</Text>
            <Text style={s.demoSubtitle}>Watch the 7-agent orchestrator in action</Text>
          </View>
        </TouchableOpacity>

        {/* Categories Grid */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Quick Services</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={s.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={s.grid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity 
              key={cat.id}
              style={s.gridItem}
              onPress={() => router.push({
                pathname: '/request',
                params: { text: `Mujhe ${cat.name} chahiye` }
              })}
            >
              <View style={[s.catIconBox, { backgroundColor: cat.color }]}>
                <Text style={s.catEmoji}>{cat.icon}</Text>
              </View>
              <Text style={s.catName}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Trust Banner */}
        <View style={s.trustBanner}>
          <View style={s.trustItem}>
            <ShieldCheck color="#00A86B" size={20} />
            <Text style={s.trustText}>Verified Experts</Text>
          </View>
          <View style={s.trustDivider} />
          <View style={s.trustItem}>
            <Star color="#00A86B" fill="#00A86B" size={16} />
            <Text style={s.trustText}>Top Rated</Text>
          </View>
          <View style={s.trustDivider} />
          <View style={s.trustItem}>
            <MapPin color="#00A86B" size={20} />
            <Text style={s.trustText}>Local to You</Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Floating Action / Navigation Mimic */}
      <View style={s.navBar}>
        <TouchableOpacity onPress={() => router.replace('/')} style={s.navItem}>
          <Zap color="#00A86B" size={24} />
          <Text style={[s.navText, { color: '#00A86B' }]}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/history')} style={s.navItem}>
          <History color="#9CA3AF" size={24} />
          <Text style={s.navText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/profile')} style={s.navItem}>
          <User color="#9CA3AF" size={24} />
          <Text style={s.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  scroll: { paddingHorizontal: 20 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 20,
    marginTop: 10
  },
  greeting: { fontSize: 16, color: '#6B7280', fontWeight: '500' },
  userName: { fontSize: 24, color: '#111827', fontWeight: '800' },
  profileBtn: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    backgroundColor: 'white', 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10
  },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F0FFF8', justifyContent: 'center', alignItems: 'center' },
  
  heroCard: { 
    backgroundColor: '#004D30', 
    borderRadius: 28, 
    padding: 24, 
    marginTop: 10,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#004D30',
    shadowOpacity: 0.3,
    shadowRadius: 15
  },
  heroTitle: { fontSize: 28, fontWeight: '800', color: 'white', marginBottom: 10 },
  heroSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 24 },
  searchContainer: { 
    flexDirection: 'row', 
    backgroundColor: 'white', 
    borderRadius: 18, 
    padding: 8, 
    alignItems: 'center' 
  },
  searchIcon: { marginLeft: 12 },
  searchInput: { 
    flex: 1, 
    height: 48, 
    paddingHorizontal: 12, 
    fontSize: 15, 
    color: '#111827' 
  },
  goBtn: { 
    backgroundColor: '#00A86B', 
    width: 44, 
    height: 44, 
    borderRadius: 14, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },

  demoCard: { 
    backgroundColor: '#FFB800', 
    borderRadius: 24, 
    padding: 20, 
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 30,
    elevation: 4,
    shadowColor: '#FFB800',
    shadowOpacity: 0.2,
    shadowRadius: 12
  },
  demoIconBg: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginRight: 16
  },
  demoTextContent: { flex: 1 },
  demoLabel: { fontSize: 10, fontWeight: '900', color: '#FFF', letterSpacing: 1.5, opacity: 0.8, marginBottom: 4 },
  demoTitle: { fontSize: 18, fontWeight: '800', color: 'white' },
  demoSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.8)' },

  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 16 
  },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#111827' },
  seeAll: { fontSize: 14, color: '#00A86B', fontWeight: '700' },

  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between' 
  },
  gridItem: { 
    width: (width - 60) / 3, 
    backgroundColor: 'white', 
    borderRadius: 20, 
    padding: 16, 
    alignItems: 'center', 
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5
  },
  catIconBox: { 
    width: 54, 
    height: 54, 
    borderRadius: 18, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  catEmoji: { fontSize: 24 },
  catName: { fontSize: 12, fontWeight: '700', color: '#374151', textAlign: 'center' },

  trustBanner: { 
    flexDirection: 'row', 
    backgroundColor: 'white', 
    borderRadius: 20, 
    padding: 16, 
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6'
  },
  trustItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  trustText: { fontSize: 11, fontWeight: '700', color: '#6B7280' },
  trustDivider: { width: 1, height: 20, backgroundColor: '#F3F4F6' },

  navBar: { 
    flexDirection: 'row', 
    backgroundColor: 'white', 
    paddingVertical: 12, 
    borderTopWidth: 1, 
    borderTopColor: '#F3F4F6',
    justifyContent: 'space-around',
    paddingBottom: 20
  },
  navItem: { alignItems: 'center', gap: 4 },
  navText: { fontSize: 10, fontWeight: '700', color: '#9CA3AF' }
});
