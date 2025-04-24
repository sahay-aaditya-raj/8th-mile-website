/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { EventCard, EventType } from "@/components/ui/3d-event-card";
import { motion, AnimatePresence, useViewportScroll, useTransform } from "framer-motion";

export default function EventsPage() {
  // Framer Motion hooks for smooth, hardware-accelerated scroll-based MotionValues
  const { scrollY } = useViewportScroll();
  
  // Hero parallax: image translate and scale, text translate
  const heroImgY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.25]);
  const heroTextY = useTransform(scrollY, [0, 500], [0, -50]);

  // Card parallax translate
  const cardParallax = useTransform(scrollY, [0, 500], [0, 50]);

  const events: EventType[] = [
    {
      id: 1,
      title: "Hackathon",
      date: "September 15-17",
      description: "A 48-hour coding marathon with exciting challenges and prizes.",
      category: "Technical",
      image: "/images/image1.jpeg",
    },
    {
      id: 2,
      title: "Tech Talks",
      date: "September 18-19",
      description: "Industry experts sharing insights on the latest technology trends.",
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

  const categories = Array.from(new Set(events.map((e) => e.category)));

  const MotionGrid = ({ children, keyId }: { children: React.ReactNode; keyId: string }) => (
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
    <div className="bg-background text-foreground pb-12 md:pb-24 mt-20">
      {/* Hero Section with Framer Motion parallax */}
      <section className="relative">
        <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden relative">
          <div className="absolute inset-0 bg-black/50 z-10" />
          
          <motion.div
            className="absolute inset-0 h-full w-full"
            style={{ y: heroImgY, scale: heroScale }}
            transition={{ ease: 'linear' }}
          >
            <img
              src="/images/eventshero.png"
              alt="Event concert"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
          
          <div className="absolute inset-0 z-20 flex items-center justify-center px-6 md:px-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl text-center"
              style={{ y: heroTextY }}
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

      {/* Events Section with smooth card parallax */}
      <section className="py-8 px-6 md:px-20">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            <MotionGrid keyId="all">
              {events.map((event, idx) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  style={{ y: cardParallax }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </MotionGrid>
          </TabsContent>

          {categories.map((cat) => (
            <TabsContent key={cat} value={cat}>
              <MotionGrid keyId={cat}>
                {events
                  .filter((e) => e.category === cat)
                  .map((event, idx) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      style={{ y: cardParallax }}
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