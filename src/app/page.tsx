import SmoothScroll from "@/components/SmoothScroll";
import DawnSky from "@/components/DawnSky";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import SymbolSection from "@/components/Symbol";
import Lotus from "@/components/Lotus";
import Sound from "@/components/Sound";
import Gallery from "@/components/Gallery";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <DawnSky />
      <div className="grain" aria-hidden="true" />
      <a href="#manifesto" className="skip">
        Pular para o conteúdo
      </a>
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <SymbolSection />
        <Lotus />
        <Sound />
        <Gallery />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
