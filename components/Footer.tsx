import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-muted text-foreground py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-12">
          {/* Logos Section */}
          <div className="flex items-center justify-center space-x-8">
            <Image
              src="/images/logos/8thmile.jpeg"
              alt="8th Mile Logo"
              width={80}
              height={80}
              className="object-contain rounded-full"
            />
            <Image
              src="/images/logos/rvce-logo.jpeg"
              alt="RVCE Logo"
              width={80}
              height={80}
              className="object-contain rounded-full"
            />
          </div>

          {/* Copyright and Links Section */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            {/* Copyright Text */}
            <p className="text-sm md:text-base">
              <span className="inline-block">&copy; 8TH MILE 2023</span> <span className="inline-block">R.V. COLLEGE OF ENGINEERING</span>
            </p>

            {/* Developed By Section */}
            <p className="text-sm md:text-base">
            <span className="inline-block"> Developed and maintained by{' '}</span> <span className="inline-block"><Link
                href="https://www.linkedin.com/company/coding-club-rvce/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-2 hover:decoration-4 transition-all duration-300"
              >
                
                CODING CLUB OF RVCE
              </Link></span>
             
              
            </p>

            {/* Footer Links */}
            <div className="flex space-x-8">
              <Link
                href="/about-us"
                className="text-sm md:text-base hover:text-primary transition-all duration-300 whitespace-nowrap"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-sm md:text-base hover:text-primary transition-all duration-300 whitespace-nowrap"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
