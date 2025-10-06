-- Update testimonials with sample profile image URLs
UPDATE testimonials 
SET image_url = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
WHERE guest_name = 'Rakesh' AND image_url IS NULL;

-- Add more sample testimonials with images if needed
INSERT INTO testimonials (guest_name, guest_location, review_text, rating, image_url)
VALUES 
  ('Priya Sharma', 'Chennai, Tamil Nadu', 'Excellent service and beautiful rooms. The staff was very courteous and helpful throughout our stay.', 5, 'https://images.unsplash.com/photo-1494790108755-2616b612b5c4?w=150&h=150&fit=crop&crop=face'),
  ('Rajesh Kumar', 'Bangalore, Karnataka', 'Great location and amazing amenities. The pool area is fantastic and the restaurant serves delicious food.', 4, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'),
  ('Anjali Patel', 'Mumbai, Maharashtra', 'Perfect for family vacation. Clean rooms, friendly staff, and great value for money. Highly recommended!', 5, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face')
ON CONFLICT (id) DO NOTHING;