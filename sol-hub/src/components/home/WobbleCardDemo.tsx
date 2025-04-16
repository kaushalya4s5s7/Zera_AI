"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "../ui/wobble-card";
const WobbleCardDemo = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            From idea to deployed contract at the speed of AI
          </h2>
          <p className="mt-4 text-left text-base/6 text-neutral-200">
            Join 100,000+ builders who use our AI to generate, audit, and
            optimize smart contracts with a single prompt.
          </p>
        </div>
        <Image
          src="/codeblock.png"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Generate tests in seconds—Foundry, Hardhat, or Truffle
        </h2>
        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
          Just paste your contract, and our AI auto-generates comprehensive test
          suites— no setup, no boilerplate, just deploy-ready code.
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Audit your contracts before the hackers do AI-powered security for
            Web3
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            With $3B+ lost to exploits this year, our AI auditor detects
            vulnerabilities that humans miss - get enterprise-grade security in
            seconds.
          </p>
        </div>
        <Image
          src="/codeblock.png"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
};

export default WobbleCardDemo;
