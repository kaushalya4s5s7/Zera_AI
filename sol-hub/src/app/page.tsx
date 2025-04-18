"use client";

import Navbar from "@/components/home/navbar";
import Hero from "@/components/home/hero";
import Features from "@/components/home/Features";
import CTA from "@/components/home/CTA";
import WobbleCardDemo from "@/components/home/WobbleCardDemo";
import Footer from "@/components/home/footer";
import FeaturesSectionDemo from "@/components/home/featuresdemo";

const HomePage = () => {
  // const movingStripItems = [
  //   { text: "SMART CONTRACT AUDIT", color: "text-purple-light" },
  //   { text: "VULNERABILITY DETECTION", color: "text-orange-light" },
  //   { text: "SECURE DEPLOYMENT", color: "text-purple" },
  //   { text: "GAS OPTIMIZATION", color: "text-orange" },
  //   { text: "BLOCKCHAIN SECURITY", color: "text-purple-light" },
  //   { text: "DEFI PROTECTION", color: "text-orange-light" },
  // ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <WobbleCardDemo />
        <FeaturesSectionDemo />
        <Features />
        {/* <FeatureCarousel
          title="How SexAudit Works"
          description="All in one Solution"
          image={{
            step1light1:
              "https://img.freepik.com/free-vector/www-internet-globe-grid_78370-2008.jpg?t=st=1744798138~exp=1744801738~hmac=5ef7077648da04c0840864405aa2cadb9fe5f9b9d6a433916c35314631516ca9&w=900",
            step1light2:
              "https://img.freepik.com/free-vector/cyber-security-concept_23-2148543851.jpg?t=st=1744798200~exp=1744801800~hmac=3f19249dd5f49c30e99c41f28336e601c50051410eb03e3e937a97bfa9ea00f4&w=900",
            step2light1:
              "https://img.freepik.com/free-vector/gradient-international-internet-day-illustration_23-2150741460.jpg?t=st=1744798250~exp=1744801850~hmac=1d7b41959c6ae267760d68bb0135a6e4c601b31483865524da3d7c65c8ccc9f2&w=900",
            step2light2:
              "https://img.freepik.com/free-vector/gradient-international-internet-day-illustration_23-2150741460.jpg?t=st=1744798250~exp=1744801850~hmac=1d7b41959c6ae267760d68bb0135a6e4c601b31483865524da3d7c65c8ccc9f2&w=900",
            step3light:
              "https://img.freepik.com/free-vector/gradient-international-internet-day-illustration_23-2150741460.jpg?t=st=1744798250~exp=1744801850~hmac=1d7b41959c6ae267760d68bb0135a6e4c601b31483865524da3d7c65c8ccc9f2&w=900",
            step4light:
              "https://img.freepik.com/free-vector/gradient-international-internet-day-illustration_23-2150741460.jpg?t=st=1744798250~exp=1744801850~hmac=1d7b41959c6ae267760d68bb0135a6e4c601b31483865524da3d7c65c8ccc9f2&w=900",
            alt: "Feature showcase",
          }}
        /> */}
        {/* <Testimonials /> */}
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
