// /src/data/links.ts
export const SOCIAL_LINKS = [
    { name: "X",        href: "https://x.com/BitFtxOfficial",      key: "x" },
    { name: "Telegram", href: "https://t.me/BitFtx",               key: "telegram" },
    { name: "Discord",  href: "https://discord.gg/BitFtxOfficial", key: "discord" },
  ];
  
  export type ExchangeLink = { name: string; href: string };
  
  // Explicit typing avoids never[]
  export const EXCHANGE_LINKS: ExchangeLink[] = [
    // { name: "ExampleExchange", href: "https://exchange.example.com/bitftx" },
  ];
  