import Link from "next/link";
import CurrencyPicker from "@/components/common/CurrencyPicker";
export default function Navbar() {
  return <header className="site-header"><Link href="/" className="brand">VOYARA<span>.</span></Link><nav className="nav-links"><Link href="/destinations">Places</Link><Link href="/hotels">Stays</Link><Link href="/transport">Getting there</Link><Link href="/packages">Journeys</Link></nav><div className="nav-actions"><CurrencyPicker /><Link href="/dashboard" className="trips-link">My trips</Link><Link href="/login" className="nav-signin">Sign in <span>↗</span></Link></div></header>;
}
