import type { Hotel } from "@/types";
export const demoHotels: Hotel[] = [
  { id: "demo-1", destination_id: "bali", name: "The Ubud Hideaway", description: "A slow-living sanctuary among the rice terraces, with an infinity pool, open-air breakfasts and room to really switch off.", image_url: "photo-1537996194471-e657df975ab4", price_per_night: 8900, rating: 4.96, total_rooms: 8 },
  { id: "demo-2", destination_id: "amalfi", name: "Casa Marina, Positano", description: "Sea-view mornings, lemon groves and a sunlit terrace above the Amalfi Coast.", image_url: "photo-1533105079780-92b9be482077", price_per_night: 14200, rating: 4.91, total_rooms: 4 },
  { id: "demo-3", destination_id: "goa", name: "Casa Solana", description: "A little Portuguese home by the beach, with a courtyard made for long lunches.", image_url: "photo-1512343879784-a960bf40e7f2", price_per_night: 6200, rating: 4.89, total_rooms: 6 },
  { id: "demo-4", destination_id: "kyoto", name: "Mizu House Kyoto", description: "A quiet machiya stay tucked between a moss garden and the old lanes of Higashiyama.", image_url: "photo-1493976040374-85c8e12f0c0e", price_per_night: 11600, rating: 4.93, total_rooms: 3 },
  { id: "demo-5", destination_id: "jaipur", name: "Haveli Gulab", description: "A restored pink-city haveli with hand-painted ceilings and a rooftop at golden hour.", image_url: "photo-1599661046827-dacff0c0f09a", price_per_night: 7400, rating: 4.87, total_rooms: 5 },
  { id: "demo-6", destination_id: "paris", name: "Maison des Arts", description: "A tucked-away pied-à-terre near the Canal Saint-Martin, made for neighbourhood mornings.", image_url: "photo-1502602898657-3e91760cbb34", price_per_night: 16800, rating: 4.90, total_rooms: 2 },
];
export const demoImage = (image: string | null) => image?.startsWith("photo-") ? `https://images.unsplash.com/${image}?auto=format&fit=crop&w=1000&q=80` : image || "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80";
