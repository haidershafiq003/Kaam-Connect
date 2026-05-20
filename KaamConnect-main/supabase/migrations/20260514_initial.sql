-- KaamConnect Initial Schema

-- 1. Categories Table
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT,
  color TEXT
);

INSERT INTO categories (id, name, icon, color) VALUES
('ac_technician', 'AC Repair', '❄️', '#E0F2FE'),
('plumber', 'Plumber', '🚰', '#E0E7FF'),
('electrician', 'Electrician', '⚡', '#FEF3C7'),
('tutor', 'Tutor', '📚', '#FCE7F3'),
('beautician', 'Beauty', '💅', '#F3E8FF'),
('mechanic', 'Mechanic', '🔧', '#FFEDD5'),
('carpenter', 'Carpenter', '🪚', '#ECFCCB'),
('cleaning', 'Cleaning', '🧹', '#D1FAE5'),
('appliance_repair', 'Appliance', '🛠️', '#FEE2E2');

-- 2. Providers Table
CREATE TABLE providers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category_id TEXT REFERENCES categories(id),
  area TEXT NOT NULL,
  city TEXT DEFAULT 'Islamabad',
  rating FLOAT DEFAULT 4.0,
  completed_jobs INTEGER DEFAULT 0,
  reliability_score FLOAT DEFAULT 0.8,
  price_min INTEGER,
  price_max INTEGER,
  languages TEXT[],
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Bookings Table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  provider_id TEXT REFERENCES providers(id),
  service_type TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'pending',
  total_price INTEGER,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Agent Logs Table (for Traceability)
CREATE TABLE agent_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id),
  step INTEGER,
  agent TEXT,
  decision TEXT,
  tool_used TEXT,
  output JSONB,
  confidence FLOAT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to providers" ON providers FOR SELECT USING (true);
CREATE POLICY "Allow users to see their own bookings" ON bookings FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY "Allow users to see logs for their bookings" ON agent_logs FOR SELECT USING (
  EXISTS (SELECT 1 FROM bookings WHERE bookings.id = agent_logs.booking_id AND bookings.user_id = auth.uid()::text)
);
