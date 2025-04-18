import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="glass-morphism rounded-2xl p-8 md:p-16 relative">
          {/* Background elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-purple/20 animate-float blur-xl"></div>
          <div className="absolute -bottom-20 -right-10 w-40 h-40 rounded-full bg-orange/20 animate-float-slow blur-xl"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient">
              Ready to Secure Your Web3 Projects?
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Join hundreds of successful Web3 projects that trust AuraAudit for
              their smart contract security needs.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-gradient-to-r from-purple to-orange text-white text-lg px-8 py-6 rounded-lg hover:opacity-90">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                className="border-white/20 hover:bg-white/5 text-white text-lg px-8 py-6 rounded-lg"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
