import {
  CheckCircle2,
  FileCode2,
  Shield,
  Zap,
  ArrowDownCircle,
} from "lucide-react";

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
            How AuraAudit Works
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Our streamlined process makes contract auditing and security simple
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connected line */}
          <div className="absolute left-1/2 top-12 bottom-12 w-0.5 bg-gradient-to-b from-purple via-white/30 to-orange hidden md:block"></div>

          {/* Step 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
            <div className="order-2 md:order-1 animate-slide-in-left">
              <div className="glass-morphism p-6 rounded-xl relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-orange/30 animate-float-slow blur-lg"></div>
                <h3 className="text-2xl font-semibold mb-4 text-gradient-purple">
                  Upload Your Code
                </h3>
                <p className="text-white/80 mb-4">
                  Simply upload your smart contract code through our intuitive
                  interface. We support Solidity, Vyper, and other major Web3
                  development languages.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-purple" />
                    <span className="text-white/70">GitHub integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-purple" />
                    <span className="text-white/70">Drag & drop files</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-purple" />
                    <span className="text-white/70">Direct code input</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center animate-float">
              <div className="bg-gradient-to-br from-purple/20 to-transparent p-1 rounded-full">
                <div className="glass-morphism rounded-full h-24 w-24 flex items-center justify-center">
                  <FileCode2 className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
            <div className="flex justify-center animate-float-slow">
              <div className="bg-gradient-to-br from-orange/20 to-transparent p-1 rounded-full">
                <div className="glass-morphism rounded-full h-24 w-24 flex items-center justify-center">
                  <Shield className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>
            <div className="animate-slide-in-right">
              <div className="glass-morphism p-6 rounded-xl relative">
                <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-purple/30 animate-float blur-lg"></div>
                <h3 className="text-2xl font-semibold mb-4 text-gradient-orange">
                  Automated Analysis
                </h3>
                <p className="text-white/80 mb-4">
                  Our advanced AI-powered tools scan your code for
                  vulnerabilities, security flaws, and potential optimizations.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-orange" />
                    <span className="text-white/70">Static code analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-orange" />
                    <span className="text-white/70">
                      Gas optimization check
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-orange" />
                    <span className="text-white/70">
                      Vulnerability scanning
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Center arrow */}
          <div className="flex justify-center my-8 hidden md:flex">
            <ArrowDownCircle className="h-10 w-10 text-white/60 animate-pulse" />
          </div>

          {/* Step 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 animate-slide-in-left">
              <div className="glass-morphism p-6 rounded-xl relative">
                <div className="absolute -bottom-6 -left-6 w-14 h-14 rounded-full bg-orange/20 animate-float blur-lg"></div>
                <h3 className="text-2xl font-semibold mb-4 text-gradient-purple">
                  Deploy Securely
                </h3>
                <p className="text-white/80 mb-4">
                  After comprehensive testing and auditing, deploy your smart
                  contracts with confidence using our secure deployment tools.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-purple" />
                    <span className="text-white/70">
                      Multi-chain deployment
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-purple" />
                    <span className="text-white/70">
                      Pre-deployment verification
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-purple" />
                    <span className="text-white/70">
                      Post-deployment monitoring
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center animate-float">
              <div className="bg-gradient-to-br from-purple/20 to-transparent p-1 rounded-full">
                <div className="glass-morphism rounded-full h-24 w-24 flex items-center justify-center">
                  <Zap className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
