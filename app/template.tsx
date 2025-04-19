"use client";
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Sidebar />
      
      <div className="mt-4">
        {children}
      </div>
    </>
  );
}