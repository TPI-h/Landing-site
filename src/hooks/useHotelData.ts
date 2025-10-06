import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getRoomsWithImages } from "@/lib/getRooms";

export const useHotelData = () => {
  return useQuery({
    queryKey: ["hotel"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hotels")
        .select("*")
        .eq("name", "Thendral Park Inn")
        .single();

      if (error) throw error;
      return data;
    },
  });
};

export const useRooms = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      return await getRoomsWithImages();
    },
  });
};

export const useAmenities = () => {
  return useQuery({
    queryKey: ["amenities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("amenities")
        .select("*")
        .order("name");

      if (error) throw error;
      return data;
    },
  });
};

export const useAttractions = () => {
  return useQuery({
    queryKey: ["attractions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("attractions")
        .select("*")
        .order("name");

      if (error) throw error;
      return data;
    },
  });
};

export const useTestimonials = () => {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;
      return data;
    },
  });
};

export const useGalleryImages = () => {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useHotelHeroImages = () => {
  return useQuery({
    queryKey: ["hotel-hero-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .in("category", ["exterior", "lobby", "amenities"])
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      return data;
    },
  });
};