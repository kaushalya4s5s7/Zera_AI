import React from "react";

interface MovingStripProps {
  items: {
    text: string;
    color: string;
  }[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
}

const MovingStrip = ({
  items,
  direction = "left",
  speed = "normal",
}: MovingStripProps) => {
  // Determine animation speed
  const speedClass = {
    slow: "animate-[scroll_80s_linear_infinite]",
    normal: "animate-[scroll_50s_linear_infinite]",
    fast: "animate-[scroll_30s_linear_infinite]",
  }[speed];

  // Determine direction
  const directionClass =
    direction === "right" ? "animate-direction-reverse" : "";

  return (
    <div className="w-full overflow-hidden bg-black py-4 relative z-10">
      {/* Background blur */}
      <div className="absolute inset-0 border-4 border-white bg-black/30 backdrop-blur-sm z-0"></div>

      {/* Purple and orange blobs */}

      <div className="relative z-10">
        <div
          className={`inline-flex whitespace-nowrap ${speedClass} ${directionClass}`}
        >
          {/* Double the items to create seamless loop */}
          {[...items, ...items].map((item, index) => (
            <div key={index} className="mx-6 flex items-center">
              <span
                className={`text-2xl md:text-5xl font-extrabold ${item.color}`}
              >
                {item.text}
              </span>
              <span className="mx-4 text-white opacity-50">//</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovingStrip;
