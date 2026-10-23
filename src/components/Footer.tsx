import { Instagram, MessageCircle, Phone } from "lucide-react";
import { PHONE, waLink } from "../lib";

export default function Footer() {
  return (
    <footer className="bg-navy-ink">
      <div className="wrap flex flex-col items-center justify-between gap-5 py-10 text-xs text-white/50 md:flex-row">
        <img src="/inet-logo-branca.png" alt="INET Internet Fibra Óptica" className="h-7 w-auto opacity-80" />
        <div className="flex flex-wrap justify-center gap-6">
          <a href="tel:+553335363939" className="inline-flex items-center gap-1.5 hover:text-lime"><Phone size={13} /> {PHONE}</a>
          <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-lime"><MessageCircle size={13} /> WhatsApp</a>
          <a href="https://instagram.com/inetminas" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-lime"><Instagram size={13} /> @inetminas</a>
        </div>
        <span>© {new Date().getFullYear()} INET – Internet Fibra Óptica</span>
      </div>
    </footer>
  );
}
