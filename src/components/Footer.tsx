import { artist, links } from "@/content/site";

export default function Footer() {
  return (
    <footer className="footer">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/wordmark-luz.svg" alt={artist.name} width={688} height={180} className="footer__word" />
      <div className="footer__row">
        <p>
          © {artist.name} · {artist.person} · desde {artist.since}
        </p>
        <ul>
          <li>
            <a href={links.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          </li>
          <li>
            <a href={links.soundcloud} target="_blank" rel="noopener noreferrer">SoundCloud</a>
          </li>
          <li>
            <a href={links.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
