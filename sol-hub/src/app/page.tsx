// app/page.tsx
"use client";

import AnimatedParticles from "@/components/home/AnimatedParticles";
import AnimatedBalloons from "@/components/home/AnimatedBalloons";
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import MovingStrip from "@/components/home/MovingStripe";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonial";
import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";

const HomePage = () => {
  const movingStripItems = [
    { text: "SMART CONTRACT AUDIT", color: "text-purple-light" },
    { text: "VULNERABILITY DETECTION", color: "text-orange-light" },
    { text: "SECURE DEPLOYMENT", color: "text-purple" },
    { text: "GAS OPTIMIZATION", color: "text-orange" },
    { text: "BLOCKCHAIN SECURITY", color: "text-purple-light" },
    { text: "DEFI PROTECTION", color: "text-orange-light" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AnimatedParticles />
      <AnimatedBalloons />
      <Navbar />
      <main>
        <Hero />
        <MovingStrip items={movingStripItems} speed="normal" />
        <Features />
        <MovingStrip
          items={[
            { text: "24/7 MONITORING", color: "text-orange" },
            { text: "AI VULNERABILITY SCANNER", color: "text-purple" },
            { text: "MULTI-CHAIN SUPPORT", color: "text-orange-light" },
            { text: "EXPERT AUDIT TEAM", color: "text-purple-light" },
          ]}
          direction="right"
          speed="fast"
        />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
