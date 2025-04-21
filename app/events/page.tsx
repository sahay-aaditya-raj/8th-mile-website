"use client";

import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { EventCard, EventType } from "@/components/ui/3d-event-card";
import { motion, AnimatePresence } from "framer-motion";

export default function EventsPage() {
  // State to track scroll position for parallax effect
  const [scrollY, setScrollY] = useState(0);
  
  // Update scroll position for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const events: EventType[] = [
    {
      id: 1,
      title: "Hackathon",
      date: "September 15-17",
      description:
        "A 48-hour coding marathon with exciting challenges and prizes.",
      category: "Technical",
      image: "/images/image1.jpeg",
    },
    {
      id: 2,
      title: "Tech Talks",
      date: "September 18-19",
      description:
        "Industry experts sharing insights on the latest technology trends.",
      category: "Technical",
      image: "/images/image2.jpeg",
    },
    {
      id: 3,
      title: "Cultural Night",
      date: "September 20",
      description: "An evening of music, dance, and cultural performances.",
      category: "Cultural",
      image: "/images/image3.jpeg",
    },
  ];

  const categories = [...new Set(events.map((event) => event.category))];

  const MotionGrid = ({
    children,
    keyId,
  }: {
    children: React.ReactNode;
    keyId: string;
  }) => (
    <AnimatePresence mode="wait">
      <motion.div
        key={keyId}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section with Parallax and Centered Text */}
      <section className="relative">
        <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden relative">
          {/* Semi-transparent overlay with subtle parallax */}
          <div className="absolute inset-0 bg-black/50 z-10" />
          
          {/* Hero Image with parallax effect */}
          <div 
            className="absolute inset-0 h-full w-full"
            style={{
              transform: `translateY(${scrollY * 0.2}px) scale(${1 + scrollY * 0.0005})`,
              transition: "transform 0.05s linear",
            }}
          >
            <img
              src="/images/eventshero.png"
              alt="Event concert"
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          {/* Hero Content with centered text */}
          <div className="absolute inset-0 z-20 flex items-center justify-center px-6 md:px-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl text-center"
              style={{
                transform: `translateY(${-scrollY * 0.1}px)`,
                transition: "transform 0.05s linear",
              }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                Upcoming Events
              </h1>
              <p className="text-sm md:text-base text-white/90 max-w-lg mx-auto">
                Experience our exciting lineup of technical competitions and cultural celebrations
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Events Section with subtle parallax on cards */}
      <section className="py-8 px-6 md:px-20">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            <MotionGrid keyId="all">
              {events.map((event, index) => (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  style={{
                    transform: `translateY(${Math.max(0, scrollY - 300) * 0.05 * (index % 3 + 1)}px)`,
                    transition: "transform 0.1s ease-out",
                  }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </MotionGrid>
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <MotionGrid keyId={category}>
                {events
                  .filter((event) => event.category === category)
                  .map((event, index) => (
                    <motion.div 
                      key={event.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      style={{
                        transform: `translateY(${Math.max(0, scrollY - 300) * 0.05 * (index % 3 + 1)}px)`,
                        transition: "transform 0.1s ease-out",
                      }}
                    >
                      <EventCard event={event} />
                    </motion.div>
                  ))}
              </MotionGrid>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  );
}