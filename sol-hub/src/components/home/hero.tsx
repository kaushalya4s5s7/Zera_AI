import { ArrowRight, ShieldCheck, Code, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gradient leading-tight">
              Secure Your{" "}
              <span className="text-gradient-purple">Smart Contracts</span> with
              SolHub
            </h1>

            <p className="text-xl md:text-2xl text-white/80 max-w-lg font-medium">
              All-in-one platform for Web3 contract auditing, testing, and
              deployment. Protect your blockchain projects from vulnerabilities
              with advanced security tools.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button className="bg-gradient-to-r from-purple to-orange text-white text-lg px-8 py-6 rounded-lg hover:opacity-90 font-bold">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                className="border-white/20 hover:bg-white/5 text-white text-lg px-8 py-6 rounded-lg font-bold"
              >
                Book Demo
              </Button>
            </div>

            <div className="pt-4">
              <p className="text-white/60 mb-3 font-medium">
                Trusted by leading Web3 companies
              </p>
              <div className="flex flex-wrap items-center gap-8">
                <div className="text-white/80 font-bold text-lg">
                  CryptoFirm
                </div>
                <div className="text-white/80 font-bold text-lg">
                  BlockSecure
                </div>
                <div className="text-white/80 font-bold text-lg">
                  ChainGuard
                </div>
              </div>
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            <div className="bg-black border-6 border-white/100 rounded-2xl p-6 md:p-8 relative z-10 shadow-xl">
              <div className="bg-gradient-radial border-6 border-white/100 from-purple/20 to-transparent absolute inset-0 rounded-2xl z-0"></div>
              <div className="relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-3xl font-extrabold text-gradient-purple">
                      99.8%
                    </div>
                    <div className="text-white/70 text-sm mt-2 font-medium">
                      Success Rate
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-3xl font-extrabold text-gradient-orange">
                      1500+
                    </div>
                    <div className="text-white/70 text-sm mt-2 font-medium">
                      Audits Done
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-3xl font-extrabold text-gradient-purple">
                      $2B+
                    </div>
                    <div className="text-white/70 text-sm mt-2 font-medium">
                      Value Secured
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                    <ShieldCheck className="text-purple mt-1" size={24} />
                    <div>
                      <h3 className="font-bold text-white">
                        Comprehensive Auditing
                      </h3>
                      <p className="text-white/70 font-medium">
                        Detect vulnerabilities before they become exploits
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                    <Code className="text-orange mt-1" size={24} />
                    <div>
                      <h3 className="font-bold text-white">Smart Testing</h3>
                      <p className="text-white/70 font-medium">
                        Automated and manual tests for maximum security
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                    <Zap className="text-purple mt-1" size={24} />
                    <div>
                      <h3 className="font-bold text-white">
                        Secure Deployment
                      </h3>
                      <p className="text-white/70 font-medium">
                        Deploy with confidence across multiple blockchains
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-purple/30 animate-float blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-orange/30 animate-float-slow blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
