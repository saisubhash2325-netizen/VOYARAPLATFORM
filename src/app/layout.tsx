import Navbar from "@/components/navbar/Navbar";
import "./globals.css";

export const metadata = { title: "VOYARA — Find your somewhere", description: "Thoughtful stays and journeys worth remembering." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><Navbar /><main>{children}</main><footer className="footer"><LinkHome /><span>Made for the way you want to feel.</span><span>© VOYARA 2026</span></footer></body></html>;
}
function LinkHome() { return <a href="/" className="brand footer-brand">VOYARA<span>.</span></a>; }
