import React from "react";
import HeroSection from "./HeroSection";
import Services from "./Services";
import About from "./About";
import Distribution from "./Distribution"
import Grow from "./Grow"
import Roadmap from "./Roadmap"
import SliderSection from "./SliderSection"
import Team from "./Team";
import Advisors from "./Advisors";
import ICO from "./ICO";
import Token from "./Token";
import Partners from "./Partners";
import News from "./News";

const Home = () => {
  return (
    <div className="bg-[#050816]">
      <div id="home"><HeroSection /></div>
      <div id="services"><Services /></div>
      <div id="about"><About /></div>
      <div id="distribution"><Distribution /></div>
      <div id="grow"><Grow /></div>
      <div id="roadmap"><Roadmap /></div>
      <SliderSection />
      <div id="team"><Team /></div>
      <Advisors />
      <ICO />
      <Token />
      <Partners />
      <News />
    </div>
  );
};

export default Home;