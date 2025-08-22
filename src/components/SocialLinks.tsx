// /src/components/SocialLinks.tsx
"use client";
import { SOCIAL_LINKS } from "@/data/links";
import { Twitter, Send, MessageCircle } from "lucide-react"; // Discord → MessageCircle fallback

function Icon({ keyName }: { keyName: string }) {
  switch (keyName) {
    case "x":
      return <Twitter className="h-4 w-4" aria-hidden />;
    case "telegram":
      return <Send className="h-4 w-4" aria-hidden />;
    case "discord":
      return <MessageCircle className="h-4 w-4" aria-hidden />; // fallback icon
    default:
      return null;
  }
}

export default function SocialLinks({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <nav aria-label="Social links" className={className}>
      <ul className="flex flex-wrap items-center gap-2">
        {SOCIAL_LINKS.map((s) => (
          <li key={s.key}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer me"
              aria-label={s.name}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10"
              title={s.name}
            >
              <Icon keyName={s.key} />
              {!compact && <span>{s.name}</span>}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
