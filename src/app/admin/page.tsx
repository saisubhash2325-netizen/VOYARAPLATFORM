import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { inr } from "@/utils/format";

async function addHotel(fd: FormData) {
  "use server";
  const sb = await createClient();
  await sb.from("hotels").insert({
    name: String(fd.get("name")), description: String(fd.get("description")),
    price_per_night: Number(fd.get("price")), total_rooms: Number(fd.get("rooms")),
  });
  revalidatePath("/admin");
}

export default async function Admin() {
  const sb = await createClient();
  const { data: bookings } = await sb.from("bookings").select("*").order("created_at", { ascending: false }).limit(50);
  const revenue = (bookings ?? []).filter((b) => b.payment_status === "paid").reduce((s, b) => s + Number(b.total_price), 0);
  return (
    <>
      <h1>Admin</h1><p>Bookings: {bookings?.length ?? 0} · Revenue: {inr(revenue)}</p>
      <h2>Add hotel</h2>
      <form action={addHotel} style={{ display: "grid", gap: 8, maxWidth: 320 }}>
        <input name="name" placeholder="Name" required /><input name="description" placeholder="Description" />
        <input name="price" type="number" placeholder="Price/night" required /><input name="rooms" type="number" placeholder="Rooms" defaultValue={1} />
        <button>Add</button>
      </form>
    </>
  );
}
