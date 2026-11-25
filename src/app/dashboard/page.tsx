import DemoTrips from "@/components/common/DemoTrips";
import { myBookings } from "@/services/bookings";
import { inr } from "@/utils/format";
export default async function Dashboard() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("YOUR-PROJECT")) return <div className="listing-page"><div className="listing-head"><span className="eyebrow">YOUR VOYARA</span><h1>Your trips.</h1><p>All your little getaways, together in one place.</p></div><DemoTrips/></div>;
  const bookings = await myBookings();
  return <div className="listing-page"><div className="listing-head"><span className="eyebrow">YOUR VOYARA</span><h1>Your trips.</h1><p>All your little getaways, together in one place.</p></div>{bookings.length === 0 ? <div className="empty-state"><h2>Your next story starts somewhere.</h2><p>Once you find a place you love, your trips will live here.</p><a className="search-button" href="/hotels">Find your stay ↗</a></div> : bookings.map(b => <article className="trip-card" key={b.id}><div className="trip-details"><span className="eyebrow">{b.kind} · {b.id.slice(0, 8)}</span><h2>Your {b.kind} booking</h2><p>{b.check_in} → {b.check_out}</p><span className="trip-status">{b.status}</span></div><div className="trip-right"><strong>{inr(b.total_price)}</strong></div></article>)}</div>;
}
