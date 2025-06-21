import { LucideGithub, LucideLinkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#BFAEAE] py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-gray-800 font-medium">© 2025 ClassToCode. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="https://www.linkedin.com/in/manav-daga/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition-colors"
            aria-label="LinkedIn"
          >
            <LucideLinkedin className="w-6 h-6" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition-colors"
            aria-label="GitHub"
          >
            <LucideGithub className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
