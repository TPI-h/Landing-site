-- Create storage buckets for images
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('hotel-images', 'hotel-images', true),
  ('room-images', 'room-images', true),
  ('gallery-images', 'gallery-images', true);

-- Create hotels table
CREATE TABLE public.hotels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create rooms table
CREATE TABLE public.rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hotel_id UUID REFERENCES public.hotels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  currency TEXT DEFAULT 'INR',
  image_url TEXT,
  amenities TEXT[],
  max_occupancy INTEGER,
  room_size TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create amenities table
CREATE TABLE public.amenities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hotel_id UUID REFERENCES public.hotels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create attractions table
CREATE TABLE public.attractions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hotel_id UUID REFERENCES public.hotels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  distance TEXT,
  image_url TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hotel_id UUID REFERENCES public.hotels(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  guest_location TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  guest_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create gallery table
CREATE TABLE public.gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hotel_id UUID REFERENCES public.hotels(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attractions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for hotels" ON public.hotels FOR SELECT USING (true);
CREATE POLICY "Public read access for rooms" ON public.rooms FOR SELECT USING (true);
CREATE POLICY "Public read access for amenities" ON public.amenities FOR SELECT USING (true);
CREATE POLICY "Public read access for attractions" ON public.attractions FOR SELECT USING (true);
CREATE POLICY "Public read access for testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public read access for gallery" ON public.gallery FOR SELECT USING (true);

-- Create storage policies for public read access
CREATE POLICY "Public read access for hotel images" ON storage.objects FOR SELECT USING (bucket_id = 'hotel-images');
CREATE POLICY "Public read access for room images" ON storage.objects FOR SELECT USING (bucket_id = 'room-images');
CREATE POLICY "Public read access for gallery images" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-images');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_hotels_updated_at BEFORE UPDATE ON public.hotels FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON public.rooms FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for Thendral Park Inn
INSERT INTO public.hotels (name, description, address, phone, email, images) VALUES 
('Thendral Park Inn', 'A luxury hotel experience in the heart of Villupuram, Tamil Nadu', 'Villupuram, Tamil Nadu, India', '+91-XXXXXXXXXX', 'info@thendralpark.com', 
 ARRAY['hotel-exterior.jpg', 'hotel-lobby.jpg', 'pool-area.jpg']);

-- Get the hotel ID for sample data
DO $$
DECLARE
    hotel_uuid UUID;
BEGIN
    SELECT id INTO hotel_uuid FROM public.hotels WHERE name = 'Thendral Park Inn';
    
    -- Insert sample rooms
    INSERT INTO public.rooms (hotel_id, name, description, price, image_url, max_occupancy, room_size) VALUES 
    (hotel_uuid, 'Deluxe Room', 'Spacious deluxe room with modern amenities and city view', 3500.00, '/src/assets/deluxe-room.jpg', 2, '350 sq ft'),
    (hotel_uuid, 'Executive Suite', 'Luxurious suite with separate living area and premium facilities', 6500.00, '/src/assets/hotel-lobby.jpg', 4, '600 sq ft'),
    (hotel_uuid, 'Premium Room', 'Comfortable premium room with garden view and modern furnishings', 4200.00, '/src/assets/pool-area.jpg', 2, '400 sq ft');
    
    -- Insert sample amenities
    INSERT INTO public.amenities (hotel_id, name, icon, category) VALUES 
    (hotel_uuid, 'Free WiFi', 'Wifi', 'connectivity'),
    (hotel_uuid, 'Swimming Pool', 'Waves', 'recreation'),
    (hotel_uuid, 'Restaurant', 'UtensilsCrossed', 'dining'),
    (hotel_uuid, 'Gym', 'Dumbbell', 'fitness'),
    (hotel_uuid, 'Room Service', 'Room', 'service'),
    (hotel_uuid, 'Air Conditioning', 'Wind', 'comfort'),
    (hotel_uuid, 'Parking', 'Car', 'facility'),
    (hotel_uuid, 'Laundry', 'Shirt', 'service'),
    (hotel_uuid, 'Concierge', 'Users', 'service'),
    (hotel_uuid, 'Spa', 'Flower2', 'wellness'),
    (hotel_uuid, 'Business Center', 'Building', 'business'),
    (hotel_uuid, 'Conference Hall', 'Users', 'business');
    
    -- Insert sample attractions
    INSERT INTO public.attractions (hotel_id, name, description, distance, category) VALUES 
    (hotel_uuid, 'Gingee Fort', 'Historic hill fort with stunning architecture and panoramic views', '25 km', 'historical'),
    (hotel_uuid, 'Villupuram Railway Junction', 'Major railway hub connecting to various destinations', '2 km', 'transport'),
    (hotel_uuid, 'Sri Margabandhu Temple', 'Ancient temple dedicated to Lord Murugan', '5 km', 'religious'),
    (hotel_uuid, 'Thiruvakkarai Temple', 'Beautiful temple known for its architectural beauty', '15 km', 'religious'),
    (hotel_uuid, 'Kolanjiappar Temple', 'Sacred Shiva temple with rich history', '10 km', 'religious'),
    (hotel_uuid, 'Villupuram Market', 'Local market for shopping and local experiences', '3 km', 'shopping');
    
    -- Insert sample testimonials
    INSERT INTO public.testimonials (hotel_id, guest_name, guest_location, rating, review_text) VALUES 
    (hotel_uuid, 'Rajesh Kumar', 'Chennai, Tamil Nadu', 5, 'Excellent service and beautiful rooms. The staff was very courteous and helpful. Highly recommended!'),
    (hotel_uuid, 'Priya Sharma', 'Bangalore, Karnataka', 4, 'Great location and comfortable stay. The restaurant food was delicious and the amenities were top-notch.'),
    (hotel_uuid, 'Michael Johnson', 'Mumbai, Maharashtra', 5, 'Outstanding hospitality and luxurious experience. The hotel exceeded all my expectations.'),
    (hotel_uuid, 'Lakshmi Devi', 'Villupuram, Tamil Nadu', 5, 'Perfect for both business and leisure. Clean rooms, excellent service, and great value for money.'),
    (hotel_uuid, 'Ahmed Ali', 'Coimbatore, Tamil Nadu', 4, 'Comfortable rooms and friendly staff. The swimming pool and gym facilities were excellent.');
    
    -- Insert sample gallery images
    INSERT INTO public.gallery (hotel_id, image_url, title, category) VALUES 
    (hotel_uuid, '/src/assets/hotel-exterior.jpg', 'Hotel Exterior', 'exterior'),
    (hotel_uuid, '/src/assets/hotel-lobby.jpg', 'Lobby Area', 'lobby'),
    (hotel_uuid, '/src/assets/deluxe-room.jpg', 'Deluxe Room', 'rooms'),
    (hotel_uuid, '/src/assets/pool-area.jpg', 'Swimming Pool', 'amenities'),
    (hotel_uuid, '/src/assets/restaurant.jpg', 'Restaurant', 'dining');
END $$;