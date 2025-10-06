# Room Images Setup Guide

## Database Structure

Rooms now have an `images` array field that stores direct URLs to Supabase storage:

```sql
-- Room images are stored as an array of URLs in the database
images: [
  "https://wjjsqjhgnjfnfamgilwk.supabase.co/storage/v1/object/public/room-images/deluxe-room-1.jpg",
  "https://wjjsqjhgnjfnfamgilwk.supabase.co/storage/v1/object/public/room-images/deluxe-room-2.jpg"
]
```

## Setup Steps

1. **Apply the migration**: Run the migration `20250920_add_room_images_array.sql` to add the `images` column to the rooms table

2. **Upload images to Supabase storage**: Upload room images to the `room-images` storage bucket

3. **Update room records**: Update each room's `images` array with the full Supabase storage URLs

## How it works

- The `getRoomsWithImages()` function reads the `images` array from each room record
- It takes the first image URL from the array and sets it as `image_url`
- The RoomsSection component displays this first image
- If no images exist, it shows "No Image Available" placeholder

## Example Database Update

```sql
UPDATE public.rooms 
SET images = ARRAY[
  'https://your-supabase-url.supabase.co/storage/v1/object/public/room-images/room1.jpg',
  'https://your-supabase-url.supabase.co/storage/v1/object/public/room-images/room1-2.jpg'
]
WHERE name = 'Deluxe Room';
```