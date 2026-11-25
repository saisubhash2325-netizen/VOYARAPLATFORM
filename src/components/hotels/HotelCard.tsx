import Link from "next/link";
import type { Hotel } from "@/types";
import CurrencyPrice from "@/components/common/CurrencyPrice";
import { demoImage } from "@/lib/demo";
export default function HotelCard({ h }: { h: Hotel }) {
  const place = h.destination_id === "amalfi" ? "Amalfi Coast, Italy" : h.destination_id === "goa" ? "Goa, India" : h.destination_id === "kyoto" ? "Kyoto, Japan" : h.destination_id === "jaipur" ? "Jaipur, India" : h.destination_id === "paris" ? "Paris, France" : h.destination_id === "bali" ? "Ubud, Bali" : "A lovely place";
  return <Link href={`/hotels/${h.id}`} className="hotel-card"><div className="hotel-image-wrap"><div className="hotel-image" style={{ backgroundImage: `url(${demoImage(h.image_url)})` }} /><span className="save-heart" aria-label="A guest favourite">♡</span></div><div className="hotel-info"><div className="hotel-card-top"><span>{place}</span><span>★ {Number(h.rating).toFixed(2)}</span></div><h3>{h.name}</h3><p>{h.description}</p><div className="hotel-price"><CurrencyPrice amount={Number(h.price_per_night)} /></div></div></Link>;
}
