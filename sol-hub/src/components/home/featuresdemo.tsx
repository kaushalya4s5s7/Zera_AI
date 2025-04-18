import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";
import Link from "next/link";

const FeaturesSectionDemo = () => {
  const features = [
    {
      title: "Get your Audit register on chain",
      description:
        "Securely record and access your audit logs on the blockchain, ensuring transparency, immutability, and easy traceability of all your project activities.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: "Enterprise-Grade Security",
      description:
        "AI analysis that identifies risks and suggests hardening measures",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
    },
    // {
    //   title: "Watch our AI on YouTube",
    //   description:
    //     "Whether its you or Tyler Durden, you can get to know about our product on YouTube",
    //   skeleton: <SkeletonThree />,
    //   className:
    //     "col-span-1 lg:col-span-3 lg:border-r  dark:border-neutral-800",
    // },
    // {
    //   title: "Generate Contract in seconds",
    //   description: " ",
    //   skeleton: <SkeletonFour />,
    //   className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    // },
  ];
  return (
    <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
      <div className="px-8">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-white dark:text-black">
          Generate ,Test, Analyse and Audit
        </h4>

        <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          Our end-to-end solution transforms requirements into secure,
          production-ready smart contracts - complete with automated
          documentation, comprehensive test suites, and professional-grade
          security audits.
        </p>
      </div>

      <div className="relative ">
        <div className="grid grid-cols-1 text-white dark:text-black lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className=" h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className=" max-w-5xl mx-auto text-left tracking-tight text-white dark:text-black text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base  max-w-4xl text-left mx-auto",
        "text-neutral-500 text-center font-normal dark:text-neutral-300",
        "text-left max-w-sm mx-0 md:text-sm my-2"
      )}
    >
      {children}
    </p>
  );
};

export const SkeletonOne = () => {
  return (
    <div className="relative flex py-8 px-2 gap-10 h-full">
      <div className="w-full  p-5  mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2  ">
          {/* TODO */}
          <Image
            src="/codeblock.PNG"
            alt="header"
            width={800}
            height={800}
            className="h-full w-full aspect-square object-cover object-left-top rounded-sm"
          />
        </div>
      </div>

      <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-black dark:from-black via-black dark:via-black to-transparent w-full pointer-events-none" />
      <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-black dark:from-black via-transparent to-transparent w-full pointer-events-none" />
    </div>
  );
};

export const SkeletonThree = () => {
  return (
    <Link
      href="https://www.youtube.com/watch?v=RPa3_AD1_Vs"
      target="__blank"
      className="relative flex gap-10  h-full group/image"
    >
      <div className="w-full  mx-auto bg-transparent dark:bg-transparent group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2  relative">
          {/* TODO */}
          <IconBrandYoutubeFilled className="h-20 w-20 absolute z-10 inset-0 text-red-500 m-auto " />
          <Image
            src="https://assets.aceternity.com/fireship.jpg"
            alt="header"
            width={800}
            height={800}
            className="h-full w-full aspect-square object-cover object-center rounded-sm blur-none group-hover/image:blur-md transition-all duration-200"
          />
        </div>
      </div>
    </Link>
  );
};

export const SkeletonTwo = () => {
  // Pre-defined rotation values instead of random
  const rotationValues = [
    1.04,
    3.2,
    -4.02,
    -6.58,
    1.09, // First row
    3.2,
    -2.26,
    -3.16,
    -0.82,
    8.86, // Second row
  ];

  const images = [
    "/cyber.png",
    "/matrix-hacker-background.jpg",
    "/peter-conrad-UA8PwPht1Vw-unsplash.jpg",
    "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=2581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  };

  return (
    <div className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden">
      <div className="flex flex-row -ml-20">
        {images.map((image, idx) => (
          <motion.div
            variants={imageVariants}
            key={`images-first-${idx}`}
            style={{
              marginRight: "-1rem",
              marginTop: "1rem",
              zIndex: 10 - idx,
            }}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            <div
              className="rounded-xl -mr-4 mt-4 p-1 bg-black dark:bg-neutral-800 dark:border-neutral-700/50"
              style={{
                transform: `rotate(${rotationValues[idx]}deg)`,
              }}
            >
              <Image
                src={image}
                alt="thumbnail"
                height="100"
                width="200"
                className="rounded-lg h-28 object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-row">
        {images.map((image, idx) => (
          <motion.div
            variants={imageVariants}
            key={`images-second-${idx}`}
            style={{
              marginRight: "-1rem",
              marginTop: "1rem",
              zIndex: 10 - idx,
            }}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            <div
              className="rounded-xl -mr-4 mt-4 p-1 bg-black dark:bg-neutral-800 dark:border-neutral-700/50"
              style={{
                transform: `rotate(${rotationValues[idx + 5]}deg)`,
              }}
            >
              <Image
                src={image}
                alt="thumbnail"
                height="100"
                width="200"
                className="rounded-lg h-28 object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-black dark:from-black to-transparent h-full pointer-events-none" />
      <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-black dark:from-black to-transparent h-full pointer-events-none" />
    </div>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="h-60 md:h-60 flex flex-col items-center relative bg-transparent dark:bg-transparent mt-37">
      <Image
        src="/cyber.png"
        alt="Feature illustration"
        width={700}
        height={700}
        className="absolute -right-10 md:-right-10 -bottom-98 md:-bottom-98 max-w-full h-auto" // Changed bottom values
      />
    </div>
  );
};

export default FeaturesSectionDemo;
