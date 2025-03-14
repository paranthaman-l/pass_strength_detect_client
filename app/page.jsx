"use client";
import Clipboard from "@/components/Clipboard";
import FeedBack from "@/components/FeedBack";
import Navbar from "@/components/Navbar";
import React from "react";
import ButtonGradient from "@/assets/svg/ButtonGradient";
import Benefits from "@/components/Benefits";
import Collaboration from "@/components/Collaboration";
import Footer from "@/components/Footer copy";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Roadmap from "@/components/Roadmap";
import Services from "@/components/Services";

const Home = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden w-full px-24 text-white">
        <Header />
        <Hero />
        <Benefits />
        <Collaboration />
        <Services />
        <Pricing />
        <Roadmap />
        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

export default Home;
