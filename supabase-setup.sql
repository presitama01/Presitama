-- SQL to setup tables in Supabase

-- 1. Create Products Table
CREATE TABLE products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  title text NOT NULL,
  description text,
  specification text,
  image_url text,
  category_id text,
  id_num text,
  is_best_seller boolean DEFAULT false,
  views_count integer DEFAULT 0
);

-- 2. Create Contacts Table
CREATE TABLE contacts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  first_name text,
  last_name text,
  email text,
  phone text,
  project_type text,
  details text,
  is_read boolean DEFAULT false
);

-- 3. Create Function for Incrementing Views (Optional, app handles fallback)
CREATE OR REPLACE FUNCTION increment_view(row_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE products
  SET views_count = views_count + 1
  WHERE id = row_id;
END;
$$ LANGUAGE plpgsql;

-- 4. Sample Data (Optional)
INSERT INTO products (title, category_id, id_num, is_best_seller, image_url, description, specification)
VALUES 
('Precision Micrometer Set', 'measuring-testing', 'PR-101', true, 'https://images.unsplash.com/photo-1581092160562-40aa08e78837', 'High-precision micrometer set for heavy industrial manufacturing.', 'Detailed specification includes +/- 0.001mm accuracy, premium alloy steel construction, and climate-controlled storage box integration.'),
('Robotic Integration Axis', 'robotic-integration', 'PR-102', true, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', 'Automated robotic system with multi-axis integration capability.', 'Full paragraph specification for robotic systems: This system supports high-speed pick and place operations with a payload up to 10kg. Built-in PLC communication support for seamless factory automation.'),
('Pneumatic Control System', 'pneumatic-system', 'PR-103', false, 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad', 'Advanced pneumatic valve and cylinder control unit.', 'Standard pneumatic industrial spec: Operates at 6-8 bar pressure with optimized airflow for high-cycle frequency operations in MM2100 assembly lines.');
