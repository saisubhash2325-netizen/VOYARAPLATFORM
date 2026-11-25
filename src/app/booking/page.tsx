import { redirect } from "next/navigation";
import { getHotel } from "@/services/hotels";
import { createClient } from "@/lib/supabase/server";
import SubmitButton from "@/components/common/SubmitButton";
import { nightsBetween } from "@/utils/format";
import CurrencyPrice from "@/components/common/CurrencyPrice";

type SP = { hotel?: string; in?: string; out?: string; guests?: string; error?: string };
async function confirm(fd: FormData) {
  "use server";
  const hotel = String(fd.get("hotel")), cin = String(fd.get("in")), cout = String(fd.get("out")), guests = Number(fd.get("guests") || 1);
  if (!cin || !cout || nightsBetween(cin, cout) < 1) redirect(`/booking?hotel=${hotel}&in=${cin}&out=${cout}&guests=${guests}&error=${encodeURIComponent("Please choose a valid check-out date after check-in.")}`);
  if (hotel.startsWith("demo-") || !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("YOUR-PROJECT")) redirect(`/checkout?demo=1&hotel=${hotel}&in=${cin}&out=${cout}&guests=${guests}`);
  const sb = await createClient(); const { data, error } = await sb.rpc("create_hotel_booking", { p_hotel: hotel, p_in: cin, p_out: cout, p_guests: guests });
  if (error) redirect(`/booking?hotel=${hotel}&in=${cin}&out=${cout}&guests=${guests}&error=${encodeURIComponent(error.message)}`);
  redirect(`/checkout?id=${data.id}`);
}
export default async function Booking({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams; if (!sp.hotel || !sp.in || !sp.out) redirect("/hotels");
  const h = await getHotel(sp.hotel); if (!h) redirect("/hotels");
  const nights = nightsBetween(sp.in, sp.out); const guests = Math.max(1, Math.min(6, Number(sp.guests) || 1)); const total = nights * Number(h.price_per_night);
  return <div className="checkout-page"><LinkBack/><div className="checkout-layout"><section className="checkout-main"><span className="eyebrow">ONE STEP CLOSER</span><h1>Review your stay.</h1><p className="checkout-sub">Take a moment to check your details before confirming.</p>{sp.error && <p className="error-message">{sp.error}</p>}<div className="review-card"><div className="review-photo" style={{backgroundImage:`url(${h.image_url?.startsWith("photo-") ? `https://images.unsplash.com/${h.image_url}?auto=format&fit=crop&w=500&q=80` : h.image_url || ""})`}}/><div><span className="eyebrow">YOUR STAY</span><h2>{h.name}</h2><p>★ {Number(h.rating).toFixed(2)} · Guest favourite</p><span>{sp.in} &nbsp;→&nbsp; {sp.out}</span><p>{nights} nights · {guests} guest{guests > 1 ? "s" : ""}</p></div></div><div className="trust-note"><span>✳</span><div><strong>A little reassurance</strong><p>This is a demo booking. No payment details are collected.</p></div></div></section><aside className="summary-card"><span className="eyebrow">PRICE SUMMARY</span><h2>Stay total</h2><div className="summary-row"><span>Stay · {nights} night{nights !== 1 ? "s" : ""}</span><strong><CurrencyPrice amount={total} suffix=""/></strong></div><div className="summary-row"><span>Taxes & fees</span><span>Included</span></div><div className="summary-total"><span>Total</span><strong><CurrencyPrice amount={total} suffix=""/></strong></div><form action={confirm} className="confirm-form"><input type="hidden" name="hotel" value={h.id}/><input type="hidden" name="in" value={sp.in}/><input type="hidden" name="out" value={sp.out}/><input type="hidden" name="guests" value={guests}/><SubmitButton>Continue to confirmation ↗</SubmitButton></form><p className="booking-footnote">Secure booking · No payment in this demo</p></aside></div></div>;
}
function LinkBack() { return <a href="/hotels" className="back-link">← Back to stays</a>; }
