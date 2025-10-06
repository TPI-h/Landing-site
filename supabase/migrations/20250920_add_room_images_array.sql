-- Add images array column to rooms table
ALTER TABLE public.rooms ADD COLUMN images TEXT[];

-- Update existing rooms with sample image arrays
UPDATE public.rooms 
SET images = ARRAY[
  'https://bhbfoglknbiqubzipieh.supabase.co/storage/v1/object/public/room-images/deluxe-room-1.jpg',
  'https://bhbfoglknbiqubzipieh.supabase.co/storage/v1/object/public/room-images/deluxe-room-2.jpg'
]
WHERE name = 'Deluxe Room';

UPDATE public.rooms 
SET images = ARRAY[
  'https://bhbfoglknbiqubzipieh.supabase.co/storage/v1/object/public/room-images/executive-suite-1.jpg',
  'https://bhbfoglknbiqubzipieh.supabase.co/storage/v1/object/public/room-images/executive-suite-2.jpg'
]
WHERE name = 'Executive Suite';

UPDATE public.rooms 
SET images = ARRAY[
  'https://bhbfoglknbiqubzipieh.supabase.co/storage/v1/object/public/room-images/premium-room-1.jpg',
  'https://bhbfoglknbiqubzipieh.supabase.co/storage/v1/object/public/room-images/premium-room-2.jpg'
]
WHERE name = 'Premium Room';