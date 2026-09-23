import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FeatureScroll } from "@/components/sections/FeatureScroll";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { Footer } from "@/components/sections/Footer";

const stops = [
  { id: "hero", label: "Intro" },
  { id: "results", label: "Results" },
  { id: "how-it-works", label: "How it works" },
  { id: "capabilities", label: "Capabilities" },
  { id: "case-study", label: "Process" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  return (
    <>
      <Nav />
      <ScrollProgress stops={stops} />
      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <FeatureScroll />
        <CaseStudy />
        <Footer />
      </main>
    </>
  );
}
