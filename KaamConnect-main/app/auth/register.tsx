import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Mail, Lock, User, Phone, MapPin, ArrowRight } from 'lucide-react-native';

export default function RegisterScreen() {
  const router = useRouter();
  const [role, setRole] = useState<'user' | 'provider'>('user');

  return (
    <SafeAreaView style={s.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
          
          <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
            <ArrowLeft color="#1F2937" size={24} />
          </TouchableOpacity>

          <View style={s.titleSection}>
            <Text style={s.title}>Create Account</Text>
            <Text style={s.subtitle}>Join thousands of users and professionals on KaamConnect</Text>
          </View>

          {/* Role Selector */}
          <View style={s.tabContainer}>
            <TouchableOpacity 
              onPress={() => setRole('user')}
              style={[s.tab, role === 'user' && s.tabActive]}
            >
              <Text style={[s.tabText, role === 'user' && s.tabTextActive]}>Customer</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setRole('provider')}
              style={[s.tab, role === 'provider' && s.tabActive]}
            >
              <Text style={[s.tabText, role === 'provider' && s.tabTextActive]}>Professional</Text>
            </TouchableOpacity>
          </View>

          <View style={s.form}>
            <View style={s.inputGroup}>
              <Text style={s.label}>Full Name</Text>
              <View style={s.inputWrapper}>
                <User color="#9CA3AF" size={20} style={s.inputIcon} />
                <TextInput placeholder="John Doe" placeholderTextColor="#9CA3AF" style={s.input} />
              </View>
            </View>

            <View style={s.inputGroup}>
              <Text style={s.label}>Email Address</Text>
              <View style={s.inputWrapper}>
                <Mail color="#9CA3AF" size={20} style={s.inputIcon} />
                <TextInput placeholder="name@example.com" placeholderTextColor="#9CA3AF" style={s.input} autoCapitalize="none" />
              </View>
            </View>

            <View style={s.inputGroup}>
              <Text style={s.label}>Phone Number</Text>
              <View style={s.inputWrapper}>
                <Phone color="#9CA3AF" size={20} style={s.inputIcon} />
                <TextInput placeholder="+92 3XX XXXXXXX" placeholderTextColor="#9CA3AF" style={s.input} keyboardType="phone-pad" />
              </View>
            </View>

            {role === 'provider' && (
              <View style={s.inputGroup}>
                <Text style={s.label}>Service Type</Text>
                <View style={s.inputWrapper}>
                  <MapPin color="#9CA3AF" size={20} style={s.inputIcon} />
                  <TextInput placeholder="e.g. AC Technician" placeholderTextColor="#9CA3AF" style={s.input} />
                </View>
              </View>
            )}

            <View style={s.inputGroup}>
              <Text style={s.label}>Password</Text>
              <View style={s.inputWrapper}>
                <Lock color="#9CA3AF" size={20} style={s.inputIcon} />
                <TextInput placeholder="••••••••" placeholderTextColor="#9CA3AF" style={s.input} secureTextEntry />
              </View>
            </View>

            <TouchableOpacity onPress={() => router.replace('/')} style={s.registerBtn}>
              <Text style={s.registerBtnText}>Create Account</Text>
              <ArrowRight color="white" size={20} />
            </TouchableOpacity>
          </View>

          <View style={s.footer}>
            <Text style={s.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text style={s.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { padding: 24, paddingBottom: 60 },
  backBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#F9FAFB', justifyContent: 'center', alignItems: 'center', marginBottom: 32 },
  titleSection: { marginBottom: 32 },
  title: { fontSize: 32, fontWeight: '900', color: '#111827', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6B7280', lineHeight: 24 },
  tabContainer: { flexDirection: 'row', backgroundColor: '#F3F4F6', borderRadius: 16, padding: 6, marginBottom: 32 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12 },
  tabActive: { backgroundColor: 'white' },
  tabText: { fontSize: 14, fontWeight: '700', color: '#6B7280' },
  tabTextActive: { color: '#00A86B' },
  form: { gap: 20 },
  inputGroup: { gap: 8 },
  label: { fontSize: 14, fontWeight: '700', color: '#374151' },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', borderRadius: 16, borderWidth: 1, borderColor: '#F3F4F6', paddingHorizontal: 16 },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, height: 56, fontSize: 16, color: '#111827' },
  registerBtn: { backgroundColor: '#00A86B', borderRadius: 18, height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 12, elevation: 4 },
  registerBtnText: { color: 'white', fontSize: 18, fontWeight: '800' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 40 },
  footerText: { color: '#6B7280', fontSize: 15 },
  footerLink: { color: '#00A86B', fontWeight: '800', fontSize: 15 }
});
