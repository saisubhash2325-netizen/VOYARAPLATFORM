import { createClient } from "@/lib/supabase/server";
import type { Booking } from "@/types";

export async function myBookings(): Promise<Booking[]> {
  const sb = await createClient();
  const { data, error } = await sb.from("bookings").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data as Booking[];
}
export async function getBooking(id: string): Promise<Booking | null> {
  const sb = await createClient();
  const { data } = await sb.from("bookings").select("*").eq("id", id).single();
  return data as Booking | null;
}
