-- Add image fields to hotels table for hero carousel
ALTER TABLE public.hotels 
ADD COLUMN hero_image_1 TEXT,
ADD COLUMN hero_image_2 TEXT,
ADD COLUMN hero_image_3 TEXT;

-- Update the existing hotel with hero images
UPDATE public.hotels 
SET 
  hero_image_1 = '/src/assets/hotel-exterior.jpg',
  hero_image_2 = '/src/assets/hotel-lobby.jpg',
  hero_image_3 = '/src/assets/pool-area.jpg'
WHERE name = 'Thendral Park Inn';