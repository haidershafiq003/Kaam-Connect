import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Send, Phone, MoreVertical, Image as ImageIcon, Smile } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const INITIAL_MESSAGES = [
  { id: 1, text: "Asalam-o-Alaikum! I have received your booking.", sender: 'provider', time: '10:05 AM' },
  { id: 2, text: "Walaikum Assalam. Please arrive on time.", sender: 'user', time: '10:06 AM' },
  { id: 3, text: "Sure, I will be there at 10 AM sharp. G-13 right?", sender: 'provider', time: '10:07 AM' },
];

export default function ChatScreen() {
  const router = useRouter();
  const { id, name } = useLocalSearchParams();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      text: input,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setInput('');
  };

  useEffect(() => {
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages]);

  return (
    <SafeAreaView style={s.container}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <ArrowLeft color="#1F2937" size={24} />
        </TouchableOpacity>
        <View style={s.providerInfo}>
          <View style={s.avatar}>
            <Text style={s.avatarText}>{String(name || 'P').charAt(0)}</Text>
          </View>
          <View>
            <Text style={s.nameText}>{name || 'Service Provider'}</Text>
            <Text style={s.statusText}>Online</Text>
          </View>
        </View>
        <View style={s.headerActions}>
          <TouchableOpacity style={s.iconBtn}>
            <Phone color="#00A86B" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={s.iconBtn}>
            <MoreVertical color="#6B7280" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={s.messageArea} 
          contentContainerStyle={s.messageContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <View 
              key={msg.id} 
              style={[
                s.msgWrapper, 
                msg.sender === 'user' ? s.msgUser : s.msgProvider
              ]}
            >
              <View style={[
                s.bubble, 
                msg.sender === 'user' ? s.bubbleUser : s.bubbleProvider
              ]}>
                <Text style={[
                  s.msgText, 
                  msg.sender === 'user' ? s.textUser : s.textProvider
                ]}>
                  {msg.text}
                </Text>
              </View>
              <Text style={s.timeText}>{msg.time}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Input Area */}
        <View style={s.inputArea}>
          <View style={s.inputWrapper}>
            <TouchableOpacity style={s.inputIcon}>
              <Smile color="#9CA3AF" size={22} />
            </TouchableOpacity>
            <TextInput 
              placeholder="Type a message..."
              placeholderTextColor="#9CA3AF"
              style={s.input}
              value={input}
              onChangeText={setInput}
              multiline
            />
            <TouchableOpacity style={s.inputIcon}>
              <ImageIcon color="#9CA3AF" size={22} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            onPress={handleSend}
            style={[s.sendBtn, !input.trim() && s.sendBtnDisabled]}
          >
            <Send color="white" size={20} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16, 
    backgroundColor: 'white', 
    borderBottomWidth: 1, 
    borderBottomColor: '#E5E7EB' 
  },
  backBtn: { padding: 4, marginRight: 12 },
  providerInfo: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#DCFCE7', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#00A86B', fontWeight: '800', fontSize: 18 },
  nameText: { fontSize: 16, fontWeight: '800', color: '#1F2937' },
  statusText: { fontSize: 12, color: '#00A86B', fontWeight: '600' },
  headerActions: { flexDirection: 'row', gap: 16 },
  iconBtn: { padding: 4 },

  messageArea: { flex: 1 },
  messageContent: { padding: 16, gap: 16 },
  msgWrapper: { maxWidth: '80%', gap: 4 },
  msgUser: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  msgProvider: { alignSelf: 'flex-start', alignItems: 'flex-start' },
  
  bubble: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 20 },
  bubbleUser: { backgroundColor: '#00A86B', borderBottomRightRadius: 4 },
  bubbleProvider: { backgroundColor: 'white', borderBottomLeftRadius: 4, elevation: 1 },
  
  msgText: { fontSize: 15, lineHeight: 22 },
  textUser: { color: 'white' },
  textProvider: { color: '#374151' },
  timeText: { fontSize: 10, color: '#9CA3AF', fontWeight: '600' },

  inputArea: { 
    flexDirection: 'row', 
    alignItems: 'flex-end', 
    padding: 12, 
    backgroundColor: 'white', 
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB'
  },
  inputWrapper: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F9FAFB', 
    borderRadius: 24, 
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  input: { flex: 1, maxHeight: 100, paddingVertical: 10, paddingHorizontal: 8, fontSize: 15, color: '#111827' },
  inputIcon: { padding: 8 },
  sendBtn: { 
    width: 48, 
    height: 48, 
    borderRadius: 24, 
    backgroundColor: '#00A86B', 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 3
  },
  sendBtnDisabled: { backgroundColor: '#9CA3AF' }
});
