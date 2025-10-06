import {
  // Connectivity & Technology
  Wifi, Tv, Phone, Laptop, Radio, Signal, Monitor, Smartphone,

  // Transportation
  Car, Bus, Plane, Train, Bike, MapPin, Navigation,

  // Dining & Food
  Coffee, UtensilsCrossed, ChefHat, Utensils, Pizza, Soup, Cookie,
  IceCream, Wine, Beer, GlassWater, Apple, Sandwich, Cake,

  // Recreation & Entertainment
  Waves, Gamepad2, Music, Camera, Headphones, Mic, PartyPopper,
  Trophy, Target, Dice1, Guitar, Piano, Film, Theater,

  // Fitness & Wellness
  Dumbbell, Heart, Activity, Zap, Flower2, Leaf, TreePine,

  // HVAC & Climate
  Wind, AirVent, Snowflake, Sun, Thermometer, Fan,

  // Room & Comfort
  Bed, Bath, Shirt, Armchair, Sofa, Lamp, BedDouble, BedSingle,
  Home, Key, Lock,

  // Services & Facilities
  Users, Star, Clock, Bell, Calendar, MapIcon, Building,
  Building2, Store, ShoppingBag, Gift, Package, Truck,

  // Business & Work
  Briefcase, Printer, FileText, Presentation, Projector,

  // Bathroom & Hygiene
  Droplets, Sparkles, Scissors,

  // Security & Safety
  Shield, Camera as SecurityCamera, Eye, AlertTriangle,

  // Miscellaneous
  Accessibility, Baby, Dog, Cat, Flower,
  Trees, Mountain, Sunset, Sunrise,

  // Default
  LucideIcon
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  // CONNECTIVITY & TECHNOLOGY
  'wifi': Wifi,
  'internet': Wifi,
  'wireless': Wifi,
  'tv': Tv,
  'television': Tv,
  'cable-tv': Tv,
  'satellite-tv': Tv,
  'phone': Phone,
  'telephone': Phone,
  'laptop': Laptop,
  'computer': Laptop,
  'radio': Radio,
  'signal': Signal,
  'monitor': Monitor,
  'smartphone': Smartphone,
  'mobile': Smartphone,

  // TRANSPORTATION
  'car': Car,
  'parking': Car,
  'valet-parking': Car,
  'bus': Bus,
  'shuttle': Bus,
  'airport-shuttle': Bus,
  'plane': Plane,
  'airport': Plane,
  'flight': Plane,
  'train': Train,
  'railway': Train,
  'bike': Bike,
  'bicycle': Bike,
  'bicycle-rental': Bike,
  'taxi': Car, // Using Car as fallback for Taxi
  'cab': Car, // Using Car as fallback for Taxi
  'map': MapPin,
  'location': MapPin,
  'navigation': Navigation,
  'directions': Navigation,

  // DINING & FOOD
  'coffee': Coffee,
  'cafe': Coffee,
  'espresso': Coffee,
  'restaurant': UtensilsCrossed,
  'dining': UtensilsCrossed,
  'utensils': Utensils,
  'chef': ChefHat,
  'kitchen': ChefHat,
  'pizza': Pizza,
  'soup': Soup,
  'cookie': Cookie,
  'cookies': Cookie,
  'ice-cream': IceCream,
  'dessert': IceCream,
  'wine': Wine,
  'wine-bar': Wine,
  'beer': Beer,
  'bar': Beer,
  'pub': Beer,
  'water': GlassWater,
  'drinks': GlassWater,
  'apple': Apple,
  'fruit': Apple,
  'sandwich': Sandwich,
  'snacks': Sandwich,
  'cake': Cake,
  'bakery': Cake,
  'breakfast': Utensils,
  'lunch': UtensilsCrossed,
  'dinner': UtensilsCrossed,
  'room-service': UtensilsCrossed,

  // RECREATION & ENTERTAINMENT
  'pool': Waves,
  'swimming': Waves,
  'swimming-pool': Waves,
  'water-sports': Waves,
  'games': Gamepad2,
  'gaming': Gamepad2,
  'arcade': Gamepad2,
  'music': Music,
  'live-music': Music,
  'camera': Camera,
  'photography': Camera,
  'headphones': Headphones,
  'audio': Headphones,
  'microphone': Mic,
  'karaoke': Mic,
  'party': PartyPopper,
  'events': PartyPopper,
  'celebration': PartyPopper,
  'trophy': Trophy,
  'awards': Trophy,
  'target': Target,
  'activities': Target,
  'dice': Dice1,
  'casino': Dice1,
  'guitar': Guitar,
  'piano': Piano,
  'instruments': Piano,
  'film': Film,
  'cinema': Film,
  'movies': Film,
  'theater': Theater,
  'theatre': Theater,

  // FITNESS & WELLNESS
  'gym': Dumbbell,
  'fitness': Dumbbell,
  'exercise': Dumbbell,
  'workout': Dumbbell,
  'heart': Heart,
  'health': Heart,
  'wellness': Heart,
  'activity': Activity,
  'sports': Activity,
  'energy': Zap,
  'power': Zap,
  'spa': Flower2,
  'massage': Flower2,
  'relaxation': Flower2,
  'leaf': Leaf,
  'nature': Leaf,
  'organic': Leaf,
  'tree': TreePine,
  'forest': TreePine,

  // HVAC & CLIMATE
  'air-conditioning': Snowflake,
  'air conditioning': Snowflake,
  'airconditioner': Snowflake,
  'airconditioning': Snowflake,
  'ac': Snowflake,
  'a/c': Snowflake,
  'a.c': Snowflake,
  'cooling': Snowflake,
  'air-vent': AirVent,
  'airvent': AirVent,
  'ventilation': AirVent,
  'wind': Wind,
  'breeze': Wind,
  'sun': Sun,
  'sunny': Sun,
  'heating': Sun,
  'thermometer': Thermometer,
  'temperature': Thermometer,
  'fan': Fan,
  'ceiling-fan': Fan,

  // ROOM & COMFORT
  'bed': Bed,
  'bedroom': Bed,
  'double-bed': BedDouble,
  'king-bed': BedDouble,
  'queen-bed': BedDouble,
  'single-bed': BedSingle,
  'twin-bed': BedSingle,
  'bath': Bath,
  'bathroom': Bath,
  'bathtub': Bath,
  'laundry': Shirt,
  'dry-cleaning': Shirt,
  'washing': Shirt,
  'armchair': Armchair,
  'chair': Armchair,
  'sofa': Sofa,
  'couch': Sofa,
  'lamp': Lamp,
  'lighting': Lamp,
  'pillow': Star, // Using Star as placeholder for pillow
  'pillows': Star,
  'blanket': Star, // Using Star as placeholder for blanket
  'bedding': Star,
  'bedsheet': Star,
  'linen': Star,
  'home': Home,
  'room': Home,
  'door': Home, // Using Home as fallback for Door
  'entrance': Home, // Using Home as fallback for Door
  'key': Key,
  'keycard': Key,
  'lock': Lock,
  'safe': Shield, // Using Shield as fallback for Safe
  'security-box': Shield, // Using Shield as fallback for Safe

  // SERVICES & FACILITIES
  'concierge': Users,
  'reception': Users,
  'front-desk': Users,
  'staff': Users,
  'service': Star,
  'quality': Star,
  'rating': Star,
  'clock': Clock,
  '24-hour': Clock,
  'round-the-clock': Clock,
  'bell': Bell,
  'bell-service': Bell,
  'calendar': Calendar,
  'schedule': Calendar,
  'booking': Calendar,
  'map-icon': MapIcon,
  'building': Building,
  'hotel': Building,
  'building2': Building2,
  'motel': Building2,
  'resort': Building2,
  'store': Store,
  'shop': Store,
  'shopping': ShoppingBag,
  'gift': Gift,
  'souvenir': Gift,
  'package': Package,
  'delivery': Package,
  'truck': Truck,
  'transport': Truck,

  // BUSINESS & WORK
  'business': Briefcase,
  'business-center': Briefcase,
  'conference': Briefcase,
  'meeting': Briefcase,
  'printer': Printer,
  'printing': Printer,
  'fax': Printer, // Using Printer as fallback for Fax
  'document': FileText,
  'files': FileText,
  'presentation': Presentation,
  'projector': Projector,

  // BATHROOM & HYGIENE
  'shower': Droplets, // Using Droplets as fallback for Shower
  'droplets': Droplets,
  'water-drops': Droplets,
  'sparkles': Sparkles,
  'clean': Sparkles,
  'hygiene': Sparkles,
  'scissors': Scissors,
  'salon': Scissors,
  'barber': Scissors,
  'mirror': Sparkles, // Using Sparkles as fallback for Mirror

  // SECURITY & SAFETY
  'shield': Shield,
  'security': Shield,
  'protection': Shield,
  'security-camera': SecurityCamera,
  'cctv': SecurityCamera,
  'surveillance': SecurityCamera,
  'eye': Eye,
  'monitoring': Eye,
  'alert': AlertTriangle,
  'warning': AlertTriangle,

  // ACCESSIBILITY & SPECIAL NEEDS
  'elevator': Star, // Using Star as placeholder
  'lift': Star,
  'stairs': Building, // Using Building as fallback for Stairs
  'accessibility': Accessibility,
  'disabled': Accessibility,
  'wheelchair': Accessibility,
  'baby': Baby,
  'child': Baby,
  'kids': Baby,
  'pet': Dog,
  'dog': Dog,
  'pets-allowed': Dog,
  'cat': Cat,

  // OUTDOOR & NATURE
  'flower': Flower,
  'flowers': Flower,
  'garden': Trees, // Using Trees as fallback for Tree
  'gardening': Trees, // Using Trees as fallback for Tree
  'mountain': Mountain,
  'mountains': Mountain,
  'hiking': Mountain,
  'beach': Star, // Using Star as placeholder
  'ocean': Waves,
  'sea': Waves,
  'sunset': Sunset,
  'sunrise': Sunrise,
  'view': Sunrise,

  // LEGACY MAPPINGS (keep for backwards compatibility)
  'Wifi': Wifi,
  'Car': Car,
  'Coffee': Coffee,
  'Waves': Waves,
  'UtensilsCrossed': UtensilsCrossed,
  'Dumbbell': Dumbbell,
  'Star': Star,
  'Room': Star,
  'Wind': Wind,
  'Shirt': Shirt,
  'Users': Users,
  'Flower2': Flower2,
  'Building': Building,
  'AirVent': AirVent,
  'Snowflake': Snowflake,
  'Tv': Tv,
  'Bath': Bath,
  'Bed': Bed,
  'Shield': Shield,
  'Clock': Clock,

  // DEFAULT FALLBACK
  'default': Star,
};