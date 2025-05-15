"use client";

import Link from "next/link";
import Image from "next/image";

const Footer2 = () => {
  return (
    <footer className="bg-black text-white py-2 px-6 md:px-24 border-t border-slate-900">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        <div className="flex items-center space-x-2">
          <Image
            src="/8thmilelogocolour.png"
            alt="8th Mile Logo"
            width={60}
            height={60}
            className="object-contain rounded-full"
          />
          <Image
            src="/RVCE Corner Logo WHITE.png"
            alt="RVCE Logo"
            width={120}
            height={80}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 text-center md:text-left">
          
          {/* Copyright */}
          <p className="fraunces text-xs md:text-sm text-gray-400">
            &copy; 8<sup>th</sup> Mile 2025 •{" "}
            <Link
              href="https://www.rvce.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="fraunces hover:text-[#418b24] transition-colors duration-300"
            >
              RV College of Engineering
            </Link>
          </p>
          <p className="fraunces text-xs md:text-sm text-gray-400">
            Developed by{" "}
            <Link
              href="https://www.linkedin.com/company/coding-club-rvce/"
              target="_blank"
              rel="noopener noreferrer"
              className="fraunces hover:text-[#e90c00] transition-colors duration-300"
            >
              Coding Club RVCE
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
