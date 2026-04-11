import Hero from "@/components/sections/Hero";
import Inventory from "@/components/sections/Inventory";
import Specs from "@/components/sections/Specs";
import Stats from "@/components/sections/Stats";
import Industries from "@/components/sections/Industries";
import Gallery from "@/components/sections/Gallery";
import AboutUs from "@/components/sections/AboutUs";

export default function Home() {
  return (
    <>
      <Hero />
      <Inventory />
      <AboutUs />
      <Industries />
      <Gallery />
      <Specs />
      <Stats />
      {/* Other sections will go here */}
    </>
  );
}