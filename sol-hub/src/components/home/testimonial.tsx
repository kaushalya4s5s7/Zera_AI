import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CheckCircle, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "CTO at BlockChainTech",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80",
    content:
      "AuraAudit helped us identify critical vulnerabilities in our smart contracts before deployment. Their platform saved us from a potential disaster.",
    rating: 5,
  },
  {
    name: "Samantha Lee",
    role: "Lead Developer at CryptoSafe",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80",
    content:
      "The continuous monitoring tools are exceptional. We get real-time alerts and can respond to potential threats immediately.",
    rating: 5,
  },
  {
    name: "Michael Wei",
    role: "Founder of DeFi Protocol",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80",
    content:
      "After switching to AuraAudit, we've had zero security incidents. Their comprehensive approach to smart contract security is unmatched.",
    rating: 4,
  },
  {
    name: "Olivia Chen",
    role: "Security Lead at TokenVault",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80",
    content:
      "The automated testing suite is incredible. It catches vulnerabilities that would take days to find manually.",
    rating: 5,
  },
  {
    name: "David Kumar",
    role: "CEO at Web3 Ventures",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80",
    content:
      "We've tried several auditing solutions, but AuraAudit's platform is by far the most comprehensive and user-friendly.",
    rating: 5,
  },
];

// Duplicate testimonials for continuous scroll effect
const duplicatedTestimonials = [
  ...testimonials,
  ...testimonials,
  ...testimonials,
];

const caseStudies = [
  {
    company: "DeFi Exchange Protocol",
    image:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&h=600&q=80",
    title: "Prevented $4.2M Exploit",
    description:
      "Identified critical vulnerabilities in liquidity pool contracts before deployment",
  },
  {
    company: "NFT Marketplace",
    image:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&h=600&q=80",
    title: "Optimized Gas by 65%",
    description:
      "Refactored smart contracts for significant cost savings and better user experience",
  },
  {
    company: "DAO Governance Platform",
    image:
      "https://images.unsplash.com/photo-1642232941362-89332befbda4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&h=600&q=80",
    title: "Seamless Multi-Chain Integration",
    description:
      "Ensured secure cross-chain voting mechanisms across 5 major blockchains",
  },
];

// Duplicate case studies for continuous scroll effect
const duplicatedCaseStudies = [...caseStudies, ...caseStudies, ...caseStudies];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
            Trusted by Web3 Leaders
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            See how AuraAudit has helped secure the future of blockchain
            projects worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/50 to-transparent z-10 pointer-events-none"></div>

          {/* First Column - Moving Upward */}
          <div className="relative h-[600px] overflow-hidden">
            {/* Top fade effect */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/50 to-transparent z-10 pointer-events-none"></div>

            {/* Vertically scrolling content */}
            <div className="absolute inset-0 flex flex-col animate-scroll-up">
              {duplicatedTestimonials.map((testimonial, index) => (
                <div
                  key={`col1-${index}`}
                  className="glass-morphism  p-6 rounded-xl mb-6 min-h-[280px] flex flex-col"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border border-white/20"
                    />
                    <div>
                      <h3 className="font-semibold text-white">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-white/70">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "text-orange fill-orange"
                            : "text-white/30"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-white/80 flex-grow">
                    {testimonial.content}
                  </p>
                  <div className="mt-4 flex items-center text-purple text-sm">
                    <CheckCircle className="w-4 h-4 mr-2" /> Verified Client
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom fade effect */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/30 to-transparent z-10 pointer-events-none"></div>
          </div>

          {/* Second Column - Moving Downward */}
          <div className="relative h-[600px] overflow-hidden">
            {/* Top fade effect */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/50 to-transparent z-10 pointer-events-none"></div>

            {/* Vertically scrolling content */}
            <div className="absolute inset-0 flex flex-col animate-scroll-down">
              {duplicatedCaseStudies.map((study, index) => (
                <div
                  key={`col2-${index}`}
                  className="glass-morphism rounded-xl overflow-hidden mb-6 min-h-[320px]"
                >
                  <div className="relative h-36">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 px-3 py-1 rounded-full text-xs text-white">
                      {study.company}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-white">
                      {study.title}
                    </h3>
                    <p className="text-white/70 text-sm">{study.description}</p>
                    <button className="mt-3 text-purple flex items-center text-sm font-medium">
                      View Case Study
                      <svg
                        className="ml-1 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom fade effect */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10"></div>
          </div>

          {/* Third Column - Moving Upward */}
          <div className="relative h-[600px] overflow-hidden">
            {/* Top fade effect */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/50 to-transparent z-10 pointer-events-none"></div>

            {/* Vertically scrolling content */}
            <div className="absolute inset-0 flex flex-col animate-scroll-up-slow">
              {duplicatedTestimonials.map((testimonial, index) => (
                <div
                  key={`col3-${index}`}
                  className="glass-morphism p-6 rounded-xl mb-6 min-h-[280px] flex flex-col"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border border-white/20"
                    />
                    <div>
                      <h3 className="font-semibold text-white">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-white/70">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "text-orange fill-orange"
                            : "text-white/30"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-white/80 flex-grow">
                    {testimonial.content}
                  </p>
                  <div className="mt-4 flex items-center text-purple text-sm">
                    <CheckCircle className="w-4 h-4 mr-2" /> Verified Client
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom fade effect */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
