import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="pt-16 pb-8 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-1">
            <a
              href="/"
              className="text-2xl font-bold text-gradient mb-4 inline-block"
            >
              AuraAudit
            </a>
            <p className="text-white/70 mb-6">
              Secure your Web3 future with comprehensive smart contract
              auditing, testing, and deployment.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Solutions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Demo
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Knowledge Base
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Partners
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} AuraAudit. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-white/50 hover:text-white/80 transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-white/50 hover:text-white/80 transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-white/50 hover:text-white/80 transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
