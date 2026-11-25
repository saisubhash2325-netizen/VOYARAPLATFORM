import Link from "next/link";
import HotelCard from "@/components/hotels/HotelCard";
import { listHotels } from "@/services/hotels";
import { demoHotels } from "@/lib/demo";

const places = [
  { name: "Bali", country: "Indonesia", label: "Island escapes", img: "photo-1537996194471-e657df975ab4", color: "#254837" },
  { name: "Kyoto", country: "Japan", label: "Culture & calm", img: "photo-1493976040374-85c8e12f0c0e", color: "#4c3930" },
  { name: "Amalfi Coast", country: "Italy", label: "Coastal living", img: "photo-1533105079780-92b9be482077", color: "#324757" },
  { name: "Rajasthan", country: "India", label: "Royal trails", img: "photo-1599661046827-dacff0c0f09a", color: "#63503a" },
];

export default async function Home() {
  let hotels = demoHotels;
  try { const live = await listHotels(); if (live.length) hotels = live.slice(0, 3); } catch { /* The curated demo stays available without Supabase credentials. */ }
  return <>
    <section className="hero">
      <div className="hero-photo" />
      <div className="hero-copy"><span className="eyebrow"><i /> YOUR NEXT CHAPTER STARTS HERE</span><h1>Find your<br /><em>somewhere.</em></h1><p>Stays with a story. Journeys you’ll remember.</p>
      <form action="/hotels" className="search-panel">
        <label className="search-field"><span>⌕</span><span><small>WHERE TO?</small><input name="q" placeholder="Try Bali, Goa, Kyoto…" /></span></label>
        <label className="search-field"><span>▦</span><span><small>CHECK IN</small><input type="date" name="in" /></span></label>
        <label className="search-field"><span>▦</span><span><small>CHECK OUT</small><input type="date" name="out" /></span></label>
        <label className="search-field guests-field"><span>♧</span><span><small>TRAVELLERS</small><select name="guests" defaultValue="2"><option value="1">1 guest</option><option value="2">2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option></select></span></label>
        <button className="search-button">Find a stay <span>↗</span></button>
      </form>
      <div className="hero-note">✳ &nbsp; Thoughtful stays, picked just for you</div></div>
      <div className="hero-caption"><span>01 / 04</span><span>UBUD, INDONESIA &nbsp; · &nbsp; 8°30′S 115°15′E</span></div>
    </section>
    <section className="section destinations-section"><div className="section-heading"><div><span className="eyebrow">A GOOD PLACE TO BEGIN</span><h2>Somewhere calling?</h2></div><Link className="text-link" href="/destinations">Explore all destinations ↗</Link></div><div className="destination-grid">{places.map((p, i) => <Link className={`destination destination-${i + 1}`} key={p.name} href={`/hotels?q=${encodeURIComponent(p.name)}`} style={{ backgroundColor: p.color, backgroundImage: `linear-gradient(180deg, transparent 30%, rgba(0,0,0,.58)), url(https://images.unsplash.com/${p.img}?auto=format&fit=crop&w=1000&q=80)` }}><span className="destination-label">{p.label}</span><div><h3>{p.name}</h3><span>{p.country} &nbsp; ↗</span></div></Link>)}</div></section>
    <section className="section stays-section"><div className="section-heading"><div><span className="eyebrow">THE ONES YOU’LL WANT TO STAY IN</span><h2>Stays worth the trip.</h2></div><Link className="text-link" href="/hotels">See all stays ↗</Link></div><div className="hotel-grid">{hotels.map(h => <HotelCard key={h.id} h={h} />)}</div></section>
    <section className="story-band"><span>✳</span><div><span className="eyebrow">A LITTLE LESS CHECKLIST. A LITTLE MORE WONDER.</span><h2>Travel isn’t just getting there.<br/><em>It’s how the place gets under your skin.</em></h2></div><Link className="story-link" href="/packages">Find your kind of trip ↗</Link></section>
  </>;
}
