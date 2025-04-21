"use client";
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { ParallaxProvider } from 'react-scroll-parallax';
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ParallaxProvider>
      <Navbar />
      <Sidebar />
      
      <div>
        {children}
      </div>
    </ParallaxProvider>
  );
}