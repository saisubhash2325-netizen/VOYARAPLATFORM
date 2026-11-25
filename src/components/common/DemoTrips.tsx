"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
type Trip = { id: string; name: string; checkIn: string; checkOut: string; guests: number; total: number; status: string; bookedAt: string };
export default function DemoTrips() {
  const [trips, setTrips] = useState<Trip[]>([]); useEffect(() => { setTrips(JSON.parse(localStorage.getItem("voyara-trips") || "[]")); }, []);
  function cancel(id: string) { const next = trips.map(t => t.id === id ? { ...t, status: "Cancelled" } : t); setTrips(next); localStorage.setItem("voyara-trips", JSON.stringify(next)); }
  return <>{trips.length ? <div className="trip-list">{trips.map(t => <article className="trip-card" key={t.id}><div className="trip-image"/><div className="trip-details"><span className="eyebrow">{t.id.startsWith("IT-") ? "ITINERARY" : "BOOKING"} · {t.id}</span><h2>{t.name}</h2><p>{t.checkIn} &nbsp;→&nbsp; {t.checkOut} &nbsp;·&nbsp; {t.guests} guest{t.guests > 1 ? "s" : ""}</p><span className={`trip-status ${t.status === "Cancelled" ? "cancelled" : ""}`}>{t.status}</span></div><div className="trip-right"><strong>₹{t.total.toLocaleString("en-IN")}</strong>{t.status !== "Cancelled" && <button className="cancel-button" onClick={() => cancel(t.id)}>{t.status === "Planned" ? "Remove itinerary" : "Cancel trip"}</button>}</div></article>)}</div> : <div className="empty-state"><span>✳</span><h2>Your next story starts somewhere.</h2><p>Once you find a place you love, your trips will live here.</p><Link className="search-button" href="/hotels">Find your stay ↗</Link></div>}</>;
}
