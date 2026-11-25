"use client";
import { useState } from "react";
import Link from "next/link";
import CurrencyPrice from "@/components/common/CurrencyPrice";
export default function DemoCheckout({ name, checkIn, checkOut, guests, total }: { name: string; checkIn: string; checkOut: string; guests: number; total: number }) {
  const [done, setDone] = useState(false);
  const [reference, setReference] = useState("");
  function confirm() {
    const bookings = JSON.parse(localStorage.getItem("voyara-trips") || "[]");
    bookings.unshift({ id: `VY-${Date.now().toString().slice(-6)}`, name, checkIn, checkOut, guests, total, status: "Confirmed", bookedAt: new Date().toLocaleDateString() });
    localStorage.setItem("voyara-trips", JSON.stringify(bookings)); setReference(bookings[0].id); setDone(true);
  }
  if (done) return <div className="success-card"><div className="success-icon">✓</div><span className="eyebrow">IT’S ALL YOURS</span><h1>Somewhere is waiting.</h1><p>Your demo booking for <strong>{name}</strong> is confirmed. We’ve added the details to My Trips.</p><div className="success-booking-id">BOOKING REFERENCE &nbsp; <strong>{reference}</strong></div><Link className="search-button success-cta" href="/dashboard">View my trips ↗</Link><Link className="text-link success-link" href="/hotels">Keep exploring stays</Link></div>;
  return <div className="demo-confirm-card"><span className="eyebrow">DEMO CHECKOUT</span><h2>Ready to make it yours?</h2><p>In a live app, you’d choose a secure payment method here. For this prototype, confirm your demo booking—no card details needed.</p><div className="summary-row"><span>{name} · {checkIn} → {checkOut} · {guests} guest(s)</span><strong><CurrencyPrice amount={total} suffix=""/></strong></div><button className="search-button" onClick={confirm}>Confirm demo booking ↗</button><span className="demo-disclaimer">Demo only · no real payment will be taken</span></div>;
}
