import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, LogIn, Github, Chrome } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const [role, setRole] = useState<'user' | 'provider'>('user');
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Mock login logic
    router.replace('/');
  };

  return (
    <SafeAreaView style={s.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Header */}
          <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
            <ArrowLeft color="#1F2937" size={24} />
          </TouchableOpacity>

          <View style={s.titleSection}>
            <Text style={s.title}>Welcome Back</Text>
            <Text style={s.subtitle}>Sign in to continue your journey with KaamConnect</Text>
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

          {/* Form */}
          <View style={s.form}>
            <View style={s.inputGroup}>
              <Text style={s.label}>Email Address</Text>
              <View style={s.inputWrapper}>
                <Mail color="#9CA3AF" size={20} style={s.inputIcon} />
                <TextInput 
                  placeholder="name@example.com"
                  placeholderTextColor="#9CA3AF"
                  style={s.input}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={s.inputGroup}>
              <View style={s.labelRow}>
                <Text style={s.label}>Password</Text>
                <TouchableOpacity>
                  <Text style={s.forgotText}>Forgot?</Text>
                </TouchableOpacity>
              </View>
              <View style={s.inputWrapper}>
                <Lock color="#9CA3AF" size={20} style={s.inputIcon} />
                <TextInput 
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  style={s.input}
                  secureTextEntry={!showPass}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPass(!showPass)} style={s.eyeIcon}>
                  {showPass ? <EyeOff color="#9CA3AF" size={20} /> : <Eye color="#9CA3AF" size={20} />}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={handleLogin} style={s.loginBtn}>
              <Text style={s.loginBtnText}>Sign In</Text>
              <LogIn color="white" size={20} />
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={s.dividerSection}>
            <View style={s.dividerLine} />
            <Text style={s.dividerText}>OR CONTINUE WITH</Text>
            <View style={s.dividerLine} />
          </View>

          {/* Social Auth */}
          <View style={s.socialRow}>
            <TouchableOpacity style={s.socialBtn}>
              <Chrome color="#1F2937" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={s.socialBtn}>
              <Github color="#1F2937" size={24} />
            </TouchableOpacity>
          </View>

          <View style={s.footer}>
            <Text style={s.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/register')}>
              <Text style={s.footerLink}>Register Now</Text>
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
  tabActive: { backgroundColor: 'white', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
  tabText: { fontSize: 14, fontWeight: '700', color: '#6B7280' },
  tabTextActive: { color: '#00A86B' },

  form: { gap: 24 },
  inputGroup: { gap: 8 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 14, fontWeight: '700', color: '#374151' },
  forgotText: { fontSize: 13, color: '#00A86B', fontWeight: '700' },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', borderRadius: 16, borderWidth: 1, borderColor: '#F3F4F6', paddingHorizontal: 16 },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, height: 56, fontSize: 16, color: '#111827' },
  eyeIcon: { padding: 8 },

  loginBtn: { backgroundColor: '#00A86B', borderRadius: 18, height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 12, elevation: 4, shadowColor: '#00A86B', shadowOpacity: 0.2, shadowRadius: 10 },
  loginBtnText: { color: 'white', fontSize: 18, fontWeight: '800' },

  dividerSection: { flexDirection: 'row', alignItems: 'center', gap: 16, marginVertical: 40 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#F3F4F6' },
  dividerText: { fontSize: 11, fontWeight: '800', color: '#9CA3AF', letterSpacing: 1 },

  socialRow: { flexDirection: 'row', gap: 16, justifyContent: 'center' },
  socialBtn: { width: 64, height: 64, borderRadius: 20, borderWidth: 1, borderColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },

  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 40 },
  footerText: { color: '#6B7280', fontSize: 15 },
  footerLink: { color: '#00A86B', fontWeight: '800', fontSize: 15 }
});
