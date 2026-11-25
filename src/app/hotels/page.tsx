import HotelCard from "@/components/hotels/HotelCard";
import { listHotels } from "@/services/hotels";
export default async function Hotels({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams; const hotels = await listHotels(q);
  return <div className="listing-page"><div className="listing-head"><span className="eyebrow">A PLACE TO LAND</span><h1>{q ? `Stays around ${q}` : "Stay somewhere special."}</h1><p>Considered places to rest, recharge and feel at home.</p><form action="/hotels" className="filter-bar"><input name="q" defaultValue={q} placeholder="Search a destination or stay"/><button>Search stays ↗</button><span>{hotels.length} stays to explore</span></form></div>{hotels.length ? <div className="hotel-grid">{hotels.map(h => <HotelCard key={h.id} h={h}/>)}</div> : <div className="empty-state"><span>✳</span><h2>No stays found just yet</h2><p>Try another place name, or browse all stays.</p><a href="/hotels" className="search-button">See every stay</a></div>}</div>;
}
