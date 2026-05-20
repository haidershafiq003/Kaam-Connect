import { RequestIntent } from '../types';

/**
 * Enhanced NLU Tool — parses natural language in English, Urdu, and Roman Urdu.
 * Supports mixed language input (e.g., "Mujhe G-13 mein AC wala chahiye kal subah").
 */
export async function parseUserRequestTool(rawText: string, userId: string): Promise<RequestIntent> {
  const text = rawText.toLowerCase();

  // ── SERVICE TYPE DETECTION ──────────────────────────────────────────────────
  let serviceType = 'unknown';

  const serviceRules: [string[], string][] = [
    [['ac ', ' ac', 'air condition', 'ac technician', 'air cond', 'cooling', 'thanda', 'ٹھنڈا', 'ایئر کنڈیشن'], 'ac_technician'],
    [['plumber', 'plumbing', 'naali', 'nal', 'pipe', 'leakage', 'pani', 'پانی', 'نل', 'پلمبر'], 'plumber'],
    [['electrician', 'bijli', 'wiring', 'electric', 'bijlee', 'socket', 'switch', 'بجلی', 'الیکٹریشن'], 'electrician'],
    [['tutor', 'teacher', 'padhai', 'parhana', 'math', 'english teacher', 'science', 'استاد', 'ٹیوٹر', 'پڑھانا'], 'tutor'],
    [['beauty', 'beautician', 'parlor', 'mehendi', 'makeup', 'facial', 'waxing', 'salon', 'بیوٹی'], 'beautician'],
    [['mechanic', 'gari', 'car', 'vehicle', 'bike', 'engine', 'motor', 'گاڑی', 'میکینک'], 'mechanic'],
    [['carpenter', 'furniture', 'lakri', 'darwaza', 'door', 'wood', 'درزی', 'بڑھئی', 'فرنیچر'], 'carpenter'],
    [['clean', 'cleaning', 'safai', 'صفائی', 'sweep', 'mop', 'jharu', 'jharoo'], 'cleaning'],
    [['repair', 'maramat', 'fix', 'washing machine', 'fridge', 'freezer', 'oven', 'مرمت', 'ٹھیک'], 'appliance_repair'],
  ];

  for (const [keywords, type] of serviceRules) {
    if (keywords.some(k => text.includes(k))) {
      serviceType = type;
      break;
    }
  }

  // ── LOCATION DETECTION ──────────────────────────────────────────────────────
  const locationRules: [string[], string][] = [
    [['g-13', 'g 13', 'g13'], 'G-13'],
    [['g-11', 'g 11', 'g11'], 'G-11'],
    [['g-9', 'g 9', 'g9', 'g-nine'], 'G-9'],
    [['g-10', 'g10', 'g 10'], 'G-10'],
    [['g-12', 'g12', 'g 12'], 'G-12'],
    [['f-10', 'f10', 'f 10'], 'F-10'],
    [['f-11', 'f11', 'f 11'], 'F-11'],
    [['f-7', 'f7', 'f 7'], 'F-7'],
    [['f-8', 'f8', 'f 8'], 'F-8'],
    [['i-9', 'i9', 'i 9'], 'I-9'],
    [['i-10', 'i10', 'i 10'], 'I-10'],
    [['bahria', 'bahria town'], 'Bahria Town'],
    [['dha', 'defence'], 'DHA'],
    [['gulshan', 'gulshan iqbal'], 'Gulshan Iqbal'],
  ];

  let location = 'Islamabad';
  for (const [keywords, loc] of locationRules) {
    if (keywords.some(k => text.includes(k))) {
      location = loc;
      break;
    }
  }

  // ── DATE DETECTION ─────────────────────────────────────────────────────────
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  let dateStr = tomorrow.toISOString().split('T')[0];
  let dateLabel = 'Tomorrow';

  if (text.includes('aaj') || text.includes('today') || text.includes('abhi') || text.includes('آج')) {
    const today = new Date();
    dateStr = today.toISOString().split('T')[0];
    dateLabel = 'Today';
  } else if (text.includes('parso') || text.includes('day after')) {
    const d = new Date(); d.setDate(d.getDate() + 2);
    dateStr = d.toISOString().split('T')[0];
    dateLabel = 'Day After Tomorrow';
  }

  // ── TIME PREFERENCE ─────────────────────────────────────────────────────────
  let timePreference = 'anytime';
  let preferredSlot = '10:00';

  if (text.includes('subah') || text.includes('morning') || text.includes('صبح') || text.includes('savere')) {
    timePreference = 'morning'; preferredSlot = '09:00';
  } else if (text.includes('dopahar') || text.includes('afternoon') || text.includes('دوپہر')) {
    timePreference = 'afternoon'; preferredSlot = '13:00';
  } else if (text.includes('sham') || text.includes('evening') || text.includes('شام')) {
    timePreference = 'evening'; preferredSlot = '17:00';
  } else if (text.includes('raat') || text.includes('night') || text.includes('رات')) {
    timePreference = 'night'; preferredSlot = '20:00';
  }

  // ── URGENCY ────────────────────────────────────────────────────────────────
  const isUrgent = ['fori', 'urgent', 'jaldi', 'abhi', 'asap', 'فوری', 'جلدی'].some(k => text.includes(k));

  // ── LANGUAGE DETECTION ─────────────────────────────────────────────────────
  let language: 'english' | 'urdu' | 'roman_urdu' = 'english';
  if (/[\u0600-\u06FF]/.test(rawText)) {
    language = 'urdu';
  } else if (['mujhe', 'chahiye', 'hai', 'kal', 'aaj', 'subah', 'mein', 'wala', 'karo', 'dijiye'].some(k => text.includes(k))) {
    language = 'roman_urdu';
  }

  // ── CONFIDENCE ─────────────────────────────────────────────────────────────
  let confidence = 0.45;
  if (serviceType !== 'unknown') confidence += 0.40;
  if (location !== 'Islamabad') confidence += 0.10;
  if (timePreference !== 'anytime') confidence += 0.05;
  confidence = Math.min(confidence, 0.98);

  return {
    language,
    service_type: serviceType,
    location,
    city: 'Islamabad',
    date: dateLabel,
    time_preference: timePreference,
    preferred_slot: preferredSlot,
    urgency: isUrgent ? 'urgent' : 'normal',
    confidence,
    raw_text: rawText,
  };
}
