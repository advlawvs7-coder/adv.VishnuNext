import { MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
export function WhatsAppButton({ whatsapp }) {
  const digits = String(whatsapp || "").replace(/\D/g, "");
  if (!digits) return null;
  return (
    <a
      href={`https://wa.me/${digits}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact on WhatsApp"
      title="Contact on WhatsApp"
      className="fixed bottom-5 left-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[var(--theme-dark)] text-white shadow-xl transition hover:scale-105"
    >
      <FaWhatsapp size={29} className="text-[#25D366]" />
    </a>
  );
}
