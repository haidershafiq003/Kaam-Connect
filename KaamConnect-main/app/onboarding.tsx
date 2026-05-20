import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Languages, Check, Sparkles } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const languages = [
  { id: 'english', name: 'English', native: 'English', desc: 'Standard business English' },
  { id: 'urdu', name: 'Urdu', native: 'اردو', desc: 'اردو زبان میں' },
  { id: 'roman_urdu', name: 'Roman Urdu', native: 'Roman Urdu', desc: 'Urdu in English alphabets' },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState('roman_urdu');

  return (
    <SafeAreaView style={s.container}>
      <View style={s.topDecoration} />
      <View style={s.content}>
        
        {/* Brand Header */}
        <View style={s.brandSection}>
          <View style={s.badge}>
            <Sparkles color="#FFB800" size={14} />
            <Text style={s.badgeText}>AI POWERED</Text>
          </View>
          <Text style={s.title}>KaamConnect</Text>
          <Text style={s.subtitle}>Connecting you to verified local service professionals across Pakistan.</Text>
        </View>

        {/* Language Selection Card */}
        <View style={s.card}>
          <View style={s.cardHeader}>
            <View style={s.langIconBox}>
              <Languages color="#00A86B" size={24} />
            </View>
            <View>
              <Text style={s.cardTitle}>Language Preference</Text>
              <Text style={s.cardSubtitle}>Select your preferred language to start</Text>
            </View>
          </View>
          
          <View style={s.langList}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.id}
                onPress={() => setSelectedLang(lang.id)}
                style={[
                  s.langItem,
                  selectedLang === lang.id && s.langItemActive
                ]}
              >
                <View style={s.langInfo}>
                  <Text style={[s.langName, selectedLang === lang.id && s.langTextActive]}>{lang.name}</Text>
                  <Text style={s.langDesc}>{lang.desc}</Text>
                </View>
                <View style={[s.radioCircle, selectedLang === lang.id && s.radioCircleActive]}>
                  {selectedLang === lang.id && <Check color="white" size={12} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Action Section */}
        <View style={s.footer}>
          <TouchableOpacity 
            onPress={() => router.push('/auth/login')}
            style={s.primaryBtn}
          >
            <Text style={s.primaryBtnText}>Get Started</Text>
            <View style={s.btnIconCircle}>
              <ChevronRight color="#00A86B" size={20} />
            </View>
          </TouchableOpacity>
          <Text style={s.termsText}>
            By continuing, you agree to our <Text style={s.link}>Terms of Service</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  topDecoration: { 
    position: 'absolute', 
    top: -100, 
    right: -100, 
    width: 300, 
    height: 300, 
    borderRadius: 150, 
    backgroundColor: '#F0FFF8',
    zIndex: -1
  },
  content: { flex: 1, padding: 24, justifyContent: 'space-between' },
  
  brandSection: { marginTop: 40, alignItems: 'center' },
  badge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6, 
    backgroundColor: '#FFF7E0', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 20,
    marginBottom: 16
  },
  badgeText: { fontSize: 10, fontWeight: '900', color: '#B45309', letterSpacing: 1 },
  title: { fontSize: 42, fontWeight: '900', color: '#004D30', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#6B7280', textAlign: 'center', lineHeight: 24, paddingHorizontal: 10 },
  
  card: { 
    backgroundColor: 'white', 
    borderRadius: 32, 
    padding: 24, 
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6'
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 24 },
  langIconBox: { 
    width: 50, 
    height: 50, 
    borderRadius: 16, 
    backgroundColor: '#F0FFF8', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  cardTitle: { fontSize: 20, fontWeight: '800', color: '#111827' },
  cardSubtitle: { fontSize: 13, color: '#9CA3AF' },
  
  langList: { gap: 12 },
  langItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 16, 
    borderRadius: 20, 
    borderWidth: 1.5, 
    borderColor: '#F3F4F6' 
  },
  langItemActive: { borderColor: '#00A86B', backgroundColor: '#F0FFF8' },
  langInfo: { flex: 1 },
  langName: { fontSize: 16, fontWeight: '700', color: '#374151' },
  langDesc: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  langTextActive: { color: '#004D30' },
  radioCircle: { 
    width: 24, 
    height: 24, 
    borderRadius: 12, 
    borderWidth: 2, 
    borderColor: '#E5E7EB', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  radioCircleActive: { backgroundColor: '#00A86B', borderColor: '#00A86B' },

  footer: { alignItems: 'center', marginBottom: 20 },
  primaryBtn: { 
    backgroundColor: '#00A86B', 
    width: '100%', 
    paddingVertical: 18, 
    borderRadius: 24, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 12,
    elevation: 5,
    shadowColor: '#00A86B',
    shadowOpacity: 0.3,
    shadowRadius: 15
  },
  primaryBtnText: { color: 'white', fontSize: 20, fontWeight: '800' },
  btnIconCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' },
  termsText: { fontSize: 12, color: '#9CA3AF', marginTop: 20 },
  link: { color: '#00A86B', fontWeight: '700' }
});
