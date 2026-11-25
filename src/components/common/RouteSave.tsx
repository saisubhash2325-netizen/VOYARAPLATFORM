"use client";
import { useState } from "react";
export default function RouteSave({ type, from, to, time, departure, price }: { type: string; from: string; to: string; time: string; departure: string; price: number }) {
  const [saved, setSaved] = useState(false);
  function save() {
    const trips = JSON.parse(localStorage.getItem("voyara-trips") || "[]");
    trips.unshift({ id: `IT-${Date.now().toString().slice(-6)}`, name: `${type}: ${from} → ${to}`, checkIn: `${departure} · sample time`, checkOut: time, guests: 1, total: price, status: "Planned", bookedAt: new Date().toLocaleDateString() });
    localStorage.setItem("voyara-trips", JSON.stringify(trips)); setSaved(true);
  }
  return <button type="button" onClick={save} disabled={saved} className="route-save">{saved ? "Saved ✓" : "Add to trip ↗"}</button>;
}
