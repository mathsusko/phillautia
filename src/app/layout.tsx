import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { artist, identity, links } from "@/content/site";

const display = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const sans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const description = `${artist.name} é o projeto de ${artist.person}: ${artist.genre}, amor por si e energia em movimento. ${identity.lead}`;

export const metadata: Metadata = {
  // TODO: trocar pelo domínio definitivo
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: `${artist.name} · ${artist.genre}`,
  description,
  openGraph: {
    title: `${artist.name} · ${artist.genre}`,
    description,
    type: "profile",
    locale: "pt_BR",
    images: [{ url: "/images/giovanna-oculos.jpg", width: 720, height: 1080, alt: artist.name }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0A051C",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: artist.name,
  genre: ["Psytrance", artist.genre],
  foundingDate: String(artist.since),
  member: { "@type": "Person", name: artist.person, roleName: "DJ" },
  sameAs: [links.instagram, links.soundcloud, links.youtube],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
