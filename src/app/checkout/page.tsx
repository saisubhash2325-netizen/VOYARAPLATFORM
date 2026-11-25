import { notFound, redirect } from "next/navigation";
import { getBooking } from "@/services/bookings";
import { getHotel } from "@/services/hotels";
import { createClient } from "@/lib/supabase/server";
import SubmitButton from "@/components/common/SubmitButton";
import { nightsBetween } from "@/utils/format";
import DemoCheckout from "@/components/common/DemoCheckout";

async function pay(fd: FormData) {
  "use server"; const sb = await createClient(); const id = String(fd.get("id"));
  await sb.from("bookings").update({ status: "confirmed", payment_status: "paid" }).eq("id", id); redirect("/dashboard");
}
export default async function Checkout({ searchParams }: { searchParams: Promise<{ id?: string; demo?: string; hotel?: string; in?: string; out?: string; guests?: string }> }) {
  const sp = await searchParams;
  if (sp.demo === "1" && sp.hotel && sp.in && sp.out) {
    const h = await getHotel(sp.hotel); if (!h) notFound(); const nights = nightsBetween(sp.in, sp.out); const total = nights * Number(h.price_per_night);
    return <div className="checkout-page"><a className="back-link" href="/hotels">← Back to stays</a><div className="checkout-layout single-checkout"><section className="checkout-main"><span className="eyebrow">A DEMO BOOKING, MADE SIMPLE</span><h1>Almost there.</h1><p className="checkout-sub">A clear price, a couple of details, and you’re all set.</p><div className="trust-note"><span>◎</span><div><strong>Your details stay yours</strong><p>Explore the full booking flow without entering payment or personal details.</p></div></div></section><aside className="summary-card"><span className="eyebrow">TRIP SUMMARY</span><h2>{h.name}</h2><div className="summary-row"><span>Dates</span><span>{sp.in} → {sp.out}</span></div><div className="summary-row"><span>Guests</span><span>{Number(sp.guests) || 1}</span></div><div className="summary-row"><span>Stay</span><span>{nights} nights</span></div><div className="summary-total"><span>Total · incl. taxes</span><strong>₹{total.toLocaleString("en-IN")}</strong></div><DemoCheckout name={h.name} checkIn={sp.in} checkOut={sp.out} guests={Number(sp.guests) || 1} total={total}/></aside></div></div>;
  }
  const b = sp.id ? await getBooking(sp.id) : null; if (!b) notFound();
  return <div className="simple-panel"><span className="eyebrow">SECURE CHECKOUT</span><h1>You’re nearly there.</h1><p>Total due: <strong>₹{Number(b.total_price).toLocaleString("en-IN")}</strong> · Status: {b.status}</p><p>Payment processing is a demo placeholder. No real payment is taken.</p><form action={pay}><input type="hidden" name="id" value={b.id}/><SubmitButton>Confirm demo payment</SubmitButton></form></div>;
}
