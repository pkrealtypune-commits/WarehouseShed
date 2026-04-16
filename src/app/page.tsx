import Hero from "@/components/sections/Hero";
import Inventory from "@/components/sections/Inventory";
import Specs from "@/components/sections/PerformanceMetrics";
import Industries from "@/components/sections/Industries";
import Gallery from "@/components/sections/Gallery";
import AboutUs from "@/components/sections/AboutUs";
import { ImportIcon } from "lucide-react";
import TrustMetrics from "@/components/sections/TrustMetrics";

export default function Home() {
  return (
    <>
      <Hero />
      <Inventory />
      <AboutUs />
      <Industries />
      <Gallery />
      <Specs />
      <TrustMetrics />

      {/* Other sections will go here */}
    </>
  );
}