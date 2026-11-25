"use client";
import { useEffect, useState } from "react";
// Indicative display conversions for the hackathon prototype, not live FX quotes.
const rates: Record<string, number> = { INR:1,USD:.012,EUR:.011,GBP:.0094,AED:.044,AUD:.018,BDT:1.32,BHD:.0045,BRL:.072,CAD:.016,CHF:.011,CNY:.087,DKK:.082,EGP:.58,HKD:.094,IDR:192,ILS:.043,JPY:1.78,KRW:16.6,KWD:.0037,LKR:3.9,MXN:.22,MYR:.051,NPR:1.6,NZD:.020,OMR:.0046,PHP:.70,PKR:3.35,QAR:.044,RUB:1.05,SAR:.045,SEK:.12,SGD:.016,THB:.41,TRY:.52,TWD:.38,VND:310,ZAR:.21 };
export default function CurrencyPrice({ amount, suffix = " / night" }: { amount: number; suffix?: string }) {
  const [currency, setCurrency] = useState("INR");
  useEffect(() => { const sync = () => setCurrency(localStorage.getItem("voyara-currency") || "INR"); sync(); window.addEventListener("voyara-currency", sync); return () => window.removeEventListener("voyara-currency", sync); }, []);
  const value = new Intl.NumberFormat("en", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount * (rates[currency] ?? 1));
  return <span>{value}<small className="price-suffix">{suffix}</small>{currency !== "INR" && <small className="fx-note"> · approx.</small>}</span>;
}
