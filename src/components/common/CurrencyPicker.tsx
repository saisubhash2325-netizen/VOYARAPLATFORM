"use client";
import { useEffect, useState } from "react";
export default function CurrencyPicker() {
  const [currency, setCurrency] = useState("INR");
  useEffect(() => { setCurrency(localStorage.getItem("voyara-currency") || "INR"); }, []);
  function change(value: string) { setCurrency(value); localStorage.setItem("voyara-currency", value); window.dispatchEvent(new Event("voyara-currency")); }
  return <label className="currency-control" aria-label="Choose display currency">◎ <select value={currency} onChange={e => change(e.target.value)}>{["INR", "USD", "EUR", "GBP", "AED", "AUD", "BDT", "BHD", "BRL", "CAD", "CHF", "CNY", "DKK", "EGP", "HKD", "IDR", "ILS", "JPY", "KRW", "KWD", "LKR", "MXN", "MYR", "NPR", "NZD", "OMR", "PHP", "PKR", "QAR", "RUB", "SAR", "SEK", "SGD", "THB", "TRY", "TWD", "VND", "ZAR"].map(c => <option key={c}>{c}</option>)}</select></label>;
}
