import { supabase } from "@/integrations/supabase/client";

export async function getRoomsWithImages() {
    // Fetch rooms with their images array
    const { data: rooms, error } = await supabase
        .from("rooms")
        .select("*")
        .order("price", { ascending: true });

    if (error) throw error;

    // Process rooms to get the first image from the images array
    const roomsWithImages = (rooms ?? []).map((room) => {
        let imageUrl = null;

        // Check if room has images array and get the first image
        if (room.images && Array.isArray(room.images) && room.images.length > 0) {
            imageUrl = room.images[0];
        }

        return { ...room, image_url: imageUrl };
    });

    return roomsWithImages;
}