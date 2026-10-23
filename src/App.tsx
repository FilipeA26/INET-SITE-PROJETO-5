import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PlanCarousel from "./components/PlanCarousel";
import Why from "./components/Why";
import CoverageMap from "./components/CoverageMap";
import SlideToSubscribe from "./components/SlideToSubscribe";
import Footer from "./components/Footer";
import { SPRING } from "./motion";

/** Rolagem suave com inércia; links "#" deslizam com a mesma suavidade. */
function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.075, wheelMultiplier: 0.9 });
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href")!);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { duration: 1.8, easing: (x) => 1 - Math.pow(1 - x, 4) });
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);
}

export default function App() {
  useSmoothScroll();
  const [selected, setSelected] = useState(1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: bodyRef, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, SPRING);
  // fundo contínuo pela paleta INET: quase preto → marinho → azul → azul vivo
  const bg = useTransform(p, [0, 0.3, 0.6, 1], ["#010818", "#03256C", "#003F99", "#0a4fc4"]);

  return (
    <>
      <Header />
      <main>
        <motion.div ref={bodyRef} style={{ backgroundColor: bg }}>
          <Hero />
          <PlanCarousel selected={selected} onSelect={setSelected} />
          <Why />
          <CoverageMap />
        </motion.div>
        <SlideToSubscribe selected={selected} />
      </main>
      <Footer />
    </>
  );
}
