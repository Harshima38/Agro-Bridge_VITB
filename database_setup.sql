-- Supabase PostgreSQL Schema for Agro-Bridge VITB

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone VARCHAR(15) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  role_type VARCHAR(20) NOT NULL CHECK (role_type IN ('student', 'farmer', 'aggregator')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Student profiles
CREATE TABLE student_profiles (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  registration_number VARCHAR(20) UNIQUE NOT NULL,
  hostel_block VARCHAR(10),
  room_number VARCHAR(10),
  trust_score DECIMAL(3,2) DEFAULT 5.00, -- rated on pickup punctuality
  total_orders INT DEFAULT 0
);

-- Farmer profiles
CREATE TABLE farmer_profiles (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  village_name VARCHAR(100) NOT NULL, -- e.g., "Kothri Village, Sehore"
  upi_id VARCHAR(100) NOT NULL,
  farmer_story TEXT, -- personal narrative for humanizing
  photo_url VARCHAR(500),
  trust_score DECIMAL(3,2) DEFAULT 5.00, -- rated on harvest quality
  total_sales INT DEFAULT 0,
  is_aggregator BOOLEAN DEFAULT FALSE,
  managed_by UUID REFERENCES users(id) -- if listed by an aggregator
);

-- Product listings (Virtual Warehouse)
CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_name VARCHAR(100) NOT NULL, -- e.g., "Fresh Guava", "Tomatoes"
  product_name_hindi VARCHAR(100), -- Hindi name for farmer convenience
  category VARCHAR(50) NOT NULL, -- "fruit", "vegetable", "grain", "dairy"
  description TEXT,
  price_per_kg DECIMAL(10,2) NOT NULL,
  minimum_order_kg DECIMAL(5,2) DEFAULT 0.5,
  maximum_available_kg DECIMAL(10,2) NOT NULL,
  remaining_kg DECIMAL(10,2) NOT NULL,
  harvest_date DATE, -- when it will be harvested (JIT concept)
  listing_expiry TIMESTAMP NOT NULL, -- auto-expire after window
  image_urls TEXT[], -- array of image URLs
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  created_via VARCHAR(20) DEFAULT 'text' -- 'text' or 'voice'
);

-- Price history (for regression model)
CREATE TABLE price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  price_per_kg DECIMAL(10,2) NOT NULL,
  recorded_date DATE NOT NULL,
  source VARCHAR(50) DEFAULT 'platform', -- 'platform', 'mandi_api', 'manual'
  region VARCHAR(100) DEFAULT 'Sehore'
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_token VARCHAR(64) UNIQUE NOT NULL, -- unique cryptographic token
  order_token_short VARCHAR(8) UNIQUE NOT NULL, -- 8-char human-readable code
  student_id UUID REFERENCES users(id),
  farmer_id UUID REFERENCES users(id),
  listing_id UUID REFERENCES listings(id),
  quantity_kg DECIMAL(5,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN (
    'pending', 'confirmed', 'ready_for_pickup', 'picked_up', 'completed', 'cancelled', 'disputed'
  )),
  pickup_slot TIMESTAMP, -- scheduled pickup time
  pickup_location VARCHAR(200) DEFAULT 'VIT Bhopal Main Gate',
  payment_status VARCHAR(20) DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'verified')),
  upi_transaction_ref VARCHAR(100), -- student enters UPI ref after paying
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Ratings
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  rated_by UUID REFERENCES users(id),
  rated_user UUID REFERENCES users(id),
  score INT CHECK (score BETWEEN 1 AND 5),
  review TEXT,
  rating_type VARCHAR(20) CHECK (rating_type IN ('quality', 'punctuality')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- User roles (admin roles - separate table as required)
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'moderator')),
  UNIQUE(user_id, role)
);

-- ====================================================
-- AGRO-BRIDGE VITB V2 ARCHITECTURAL MIGRATION EXTENSIONS
-- ====================================================

-- 8. Persistent User Carts
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  quantity_kg DECIMAL(5,2) NOT NULL,
  added_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(student_id, listing_id)
);

-- 9. Notification Center Matrix
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(30) NOT NULL,
  title VARCHAR(200) NOT NULL,
  body TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 10. Saved / Favorited Farmers Network
CREATE TABLE saved_farmers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  farmer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  saved_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(student_id, farmer_id)
);

-- 11. Custom Pickup Routes
CREATE TABLE pickup_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  name_hindi VARCHAR(100),
  description TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  available_slots JSONB,
  is_active BOOLEAN DEFAULT TRUE
);

-- 12. Support & Dispute Channels
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  subject VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  created_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP
);
