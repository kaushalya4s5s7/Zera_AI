import { useState, useEffect } from "react";
import { Shield, Search, Code2, Zap, Lock, Server } from "lucide-react";

// Feature interface for better type checking
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  animation: string;
  delay: string;
  color: string;
  hoverEffect: string;
}

const Features = () => {
  // Track which feature is being hovered
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  // Track which features should animate
  const [animatedFeatures, setAnimatedFeatures] = useState<boolean[]>(
    Array(6).fill(false)
  );

  // Staggered animation on mount
  useEffect(() => {
    const animateFeatures = () => {
      animatedFeatures.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedFeatures((prev) => {
            const newAnimated = [...prev];
            newAnimated[index] = true;
            return newAnimated;
          });
        }, index * 150);
      });
    };

    animateFeatures();
  }, []);

  const features: Feature[] = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Smart Contract Auditing",
      description:
        "Comprehensive security audits to identify vulnerabilities in your blockchain code.",
      animation: "animate-slide-in-left",
      delay: "delay-[0ms]",
      color: "text-purple",
      hoverEffect: "hover:shadow-[0_0_25px_rgba(155,135,245,0.4)]",
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Vulnerability Scanning",
      description:
        "Automated tools to detect common security flaws and potential exploits.",
      animation: "animate-slide-in-left",
      delay: "delay-[100ms]",
      color: "text-orange",
      hoverEffect: "hover:shadow-[0_0_25px_rgba(249,115,22,0.4)]",
    },
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "Code Optimization",
      description:
        "Improve gas efficiency and performance of your smart contracts.",
      animation: "animate-slide-in-right",
      delay: "delay-[200ms]",
      color: "text-purple",
      hoverEffect: "hover:shadow-[0_0_25px_rgba(155,135,245,0.4)]",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Automated Testing",
      description:
        "Robust test suites with simulation of various attack vectors.",
      animation: "animate-slide-in-right",
      delay: "delay-[300ms]",
      color: "text-orange",
      hoverEffect: "hover:shadow-[0_0_25px_rgba(249,115,22,0.4)]",
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Secure Deployment",
      description:
        "Safe deployment across multiple blockchains with pre-deployment checks.",
      animation: "animate-slide-in-left",
      delay: "delay-[400ms]",
      color: "text-purple",
      hoverEffect: "hover:shadow-[0_0_25px_rgba(155,135,245,0.4)]",
    },
    {
      icon: <Server className="h-8 w-8" />,
      title: "Continuous Monitoring",
      description:
        "Ongoing security checks and alerts for your deployed contracts.",
      animation: "animate-slide-in-right",
      delay: "delay-[500ms]",
      color: "text-orange",
      hoverEffect: "hover:shadow-[0_0_25px_rgba(249,115,22,0.4)]",
    },
  ];

  // 3D Model URLs (these would normally be local files, using placeholder URLs for example)
  const modelUrls = [
    "https://prod.spline.design/jLKkXn5BWAbHkDsF/scene.splinecode", // Shield
    "https://prod.spline.design/6QC6UhXwxF5mxsqk/scene.splinecode", // Magnifying Glass
    "https://prod.spline.design/6tPMYAiIYoSpRTZA/scene.splinecode", // Code
    "https://prod.spline.design/JgZTqXQLoHn5ioxF/scene.splinecode", // Lightning
    "https://prod.spline.design/arO3NejHyVhYjdVV/scene.splinecode", // Lock
    "https://prod.spline.design/w7ZyMBGfgvPki2XQ/scene.splinecode", // Server
  ];

  // Animation frames for icons
  const iconFrames = [
    "rotate-0 scale-100",
    "rotate-6 scale-110",
    "rotate-0 scale-105",
    "rotate-[-6deg] scale-110",
    "rotate-0 scale-100",
  ];

  // Function to animate icons
  const animateIcon = (index: number) => {
    if (hoveredFeature === index) {
      // Return a cycling animation frame based on current time
      const frameIndex = Math.floor((Date.now() / 300) % iconFrames.length);
      return iconFrames[frameIndex];
    }
    return "rotate-0 scale-100";
  };

  return (
    <section id="features" className="py-16 md:py-24 relative">
      {/* Decorative background elements */}
      <div className="absolute -top-40 right-0 w-80 h-80 bg-purple/10 rounded-full filter blur-[100px] opacity-50"></div>
      <div className="absolute -bottom-20 left-10 w-60 h-60 bg-orange/10 rounded-full filter blur-[80px] opacity-60"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-4 relative inline-block">
            Comprehensive Web3 Security Features
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple to-orange opacity-70"></div>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Our all-in-one platform provides everything you need to secure,
            test, and deploy your Web3 applications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`
                glass-morphism rounded-xl p-6 
                transition-all duration-500 transform
                ${
                  animatedFeatures[index]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }
                ${
                  hoveredFeature === index
                    ? "scale-105 " + feature.hoverEffect
                    : ""
                }
              `}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
              style={{
                animationDelay: `${index * 100}ms`,
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <div className="relative">
                <div
                  className={`
                  bg-white/5 rounded-full w-16 h-16 flex items-center justify-center mb-6
                  relative z-10 transition-transform duration-300
                  ${animateIcon(index)}
                `}
                >
                  <div className={`${feature.color}`}>{feature.icon}</div>
                </div>

                {/* Interactive particles around the icon */}
                {hoveredFeature === index && (
                  <>
                    <div className="absolute top-5 left-2 w-2 h-2 rounded-full bg-purple/50 animate-float"></div>
                    <div className="absolute top-2 left-8 w-3 h-3 rounded-full bg-orange/50 animate-float-slow"></div>
                    <div className="absolute top-8 left-14 w-2 h-2 rounded-full bg-purple/30 animate-float"></div>
                  </>
                )}
              </div>

              <h3
                className={`text-xl font-semibold mb-3 text-white ${
                  hoveredFeature === index ? feature.color : ""
                }`}
              >
                {feature.title}
              </h3>

              <p className="text-white/70">{feature.description}</p>

              {/* Interactive animation for hover state */}
              {hoveredFeature === index && (
                <div className="mt-4 flex items-center text-sm text-white/60 animate-fade-in">
                  <span
                    className={`mr-2 inline-block w-2 h-2 rounded-full ${feature.color.replace(
                      "text-",
                      "bg-"
                    )}`}
                  ></span>
                  Learn more about this feature
                </div>
              )}

              {/* Optional: Embed 3D Model (would typically use a proper 3D renderer like Three.js) */}
              {hoveredFeature === index && (
                <div className="absolute -bottom-4 -right-4 opacity-30 pointer-events-none">
                  <div className="w-20 h-20">
                    {/* This is a placeholder - in a real implementation, you would use Three.js or a similar library */}
                    {/* <Canvas>
                      <Model url={modelUrls[index]} />
                    </Canvas> */}
                    <div
                      className={`w-full h-full rounded-full ${feature.color.replace(
                        "text-",
                        "bg-"
                      )}/20 animate-pulse`}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
