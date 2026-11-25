import { createClient } from "@/lib/supabase/server";
import { demoHotels } from "@/lib/demo";
import type { Hotel } from "@/types";

function configured() { return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("YOUR-PROJECT"); }
export async function listHotels(q?: string): Promise<Hotel[]> {
  if (!configured()) return findDemo(q);
  try {
    const sb = await createClient(); let query = sb.from("hotels").select("*").order("rating", { ascending: false });
    if (q) query = query.ilike("name", `%${q}%`);
    const { data, error } = await query; if (error) throw error;
    return data?.length ? data as Hotel[] : findDemo(q);
  } catch { return findDemo(q); }
}
function findDemo(q?: string) {
  if (!q) return demoHotels;
  const term = q.toLowerCase();
  return demoHotels.filter(h => `${h.name} ${h.description} ${h.destination_id}`.toLowerCase().includes(term) || (term === "bali" && h.id === "demo-1") || (term === "kyoto" && h.id === "demo-4") || (term === "amalfi coast" && h.id === "demo-2") || (term === "rajasthan" && h.id === "demo-5"));
}
export async function getHotel(id: string): Promise<Hotel | null> {
  if (id.startsWith("demo-")) return demoHotels.find(h => h.id === id) || null;
  if (!configured()) return null;
  try { const sb = await createClient(); const { data } = await sb.from("hotels").select("*").eq("id", id).single(); return data as Hotel | null; } catch { return null; }
}
