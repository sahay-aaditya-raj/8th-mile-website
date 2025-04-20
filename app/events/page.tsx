"use client";

import React from "react";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { EventCard, EventType } from "@/components/ui/3d-event-card"; // Import your reusable 3D card
import { motion, AnimatePresence } from "framer-motion";

export default function EventsPage() {
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
      <section className="py-10 px-6 md:px-20">
        <h1 className="text-4xl font-bold mb-10">Upcoming Events</h1>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="all">All</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            <MotionGrid keyId="all">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </MotionGrid>
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <MotionGrid keyId={category}>
                {events
                  .filter((event) => event.category === category)
                  .map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
              </MotionGrid>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  );
}
