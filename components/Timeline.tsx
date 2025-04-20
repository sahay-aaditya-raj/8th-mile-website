"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Music, Film, Coffee, Users, Zap, Award } from 'lucide-react';
import LocomotiveScroll from 'locomotive-scroll';

interface FestEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const festEvents: FestEvent[] = [
  { id: 1, title: 'Opening Ceremony', date: 'Day 1 - 10:00 AM', location: 'Main Auditorium', description: 'Kick off our annual college fest with special performances and guest speakers.', icon: <Zap size={24} />, color: 'bg-primary bg-opacity-10 text-primary' },
  { id: 2, title: 'Battle of the Bands', date: 'Day 1 - 2:00 PM', location: 'Outdoor Stage', description: 'Student bands compete for the title of College Fest Champion with original compositions.', icon: <Music size={24} />, color: 'bg-chart-1 bg-opacity-10 text-chart-1' },
  { id: 3, title: 'Tech Exhibition', date: 'Day 1 - 4:00 PM', location: 'Engineering Block', description: 'Showcase of innovative projects and technologies developed by students.', icon: <Zap size={24} />, color: 'bg-chart-2 bg-opacity-10 text-chart-2' },
  { id: 4, title: 'Movie Night', date: 'Day 1 - 8:00 PM', location: 'Central Lawn', description: 'Open-air screening of award-winning films under the stars.', icon: <Film size={24} />, color: 'bg-chart-3 bg-opacity-10 text-chart-3' },
  { id: 5, title: 'Coffee with Alumni', date: 'Day 2 - 9:00 AM', location: 'College Cafeteria', description: 'Networking session with successful alumni from various industries.', icon: <Coffee size={24} />, color: 'bg-chart-4 bg-opacity-10 text-chart-4' },
  { id: 6, title: 'Debate Competition', date: 'Day 2 - 11:00 AM', location: 'Seminar Hall', description: 'Inter-college debate on contemporary social and political issues.', icon: <Users size={24} />, color: 'bg-destructive bg-opacity-10 text-destructive' },
  { id: 7, title: 'Cultural Performances', date: 'Day 2 - 3:00 PM', location: 'Main Stage', description: 'Traditional and contemporary dance, music, and theatrical performances.', icon: <Music size={24} />, color: 'bg-chart-5 bg-opacity-10 text-chart-5' },
  { id: 8, title: 'Closing Ceremony & DJ Night', date: 'Day 2 - 7:00 PM', location: 'College Grounds', description: 'Awards ceremony followed by a high-energy DJ night to conclude the fest.', icon: <Award size={24} />, color: 'bg-accent bg-opacity-10 text-accent-foreground' }
];

const CollegeFestTimeline: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeEvent, setActiveEvent] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Initialize LocomotiveScroll and handle resize
  useEffect(() => {
    if (!scrollRef.current) return;
    // Cast LocomotiveScroll to any to allow update/destroy
    const loco: unknown = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 0.8,
      lerp: 0.07,
      tablet: { smooth: true },
      smartphone: { smooth: true }
    });

    const loadTimer = setTimeout(() => setLoaded(true), 300);
    window.addEventListener('resize', () => loco.update());

    return () => {
      clearTimeout(loadTimer);
      loco.destroy();
    };
  }, []);

  // Scroll event callbacks for progress bars
  useEffect(() => {
    const onScrollCall = (e: CustomEvent) => {
      const { id, way, progress } = e.detail;
      if (id === 'scrollProgress') {
        const bar = document.querySelector('[data-scroll-call="scrollProgress"]') as HTMLElement;
        const pct = way === 'enter' ? Math.min(100, Math.max(0, progress * 100)) : 0;
        bar.style.width = `${pct}%`;
      }
      if (id === 'timeline-progress') {
        const line = document.querySelector('[data-scroll-call="timeline-progress"]') as HTMLElement;
        line.style.transform = `scaleY(${progress})`;
      }
    };

    window.addEventListener('scrollCall', onScrollCall as EventListener);
    return () => window.removeEventListener('scrollCall', onScrollCall as EventListener);
  }, []);

  const calculateProgress = (id: number) => id / festEvents.length;

  return (
    <div className="bg-background min-h-screen font-sans">
      <main ref={scrollRef} className="container mx-auto px-4 py-16 md:py-24" data-scroll-container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className={`mb-16 text-center transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-6'}`} data-scroll data-scroll-speed="0.5">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Event Timeline</h2>
            <p className="text-muted-foreground max-w-md mx-auto">Two days of excitement, performances, and activities</p>
          </div>

          <div className="relative">
            {/* Vertical progress line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border overflow-hidden">
              <div className="w-full bg-primary origin-top" style={{ transform: 'scaleY(0)', transformOrigin: 'top' }} data-scroll data-scroll-sticky data-scroll-target="main" data-scroll-call="timeline-progress" />
            </div>

            {/* Events */}
            {festEvents.map((evt, i) => {
              const isEven = i % 2 === 0;
              const progress = calculateProgress(evt.id);

              return (
                <div key={evt.id} className={`mb-16 md:mb-24 relative flex flex-col md:flex-row ${isEven ? '' : 'md:flex-row-reverse'}`} data-scroll data-scroll-offset="100">
                  {/* Central dot for md+ */}
                  <div className={`hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary border-4 border-background shadow-md rounded-full z-10 transition-all duration-500 ${activeEvent === evt.id ? 'scale-150 rotate-45' : ''}`} style={{ width: '1.5rem', height: '1.5rem' }} data-scroll data-scroll-class="timeline-dot-visible" />

                  {/* Mobile dot + title */}
                  <div className="flex items-center mb-4 md:hidden">
                    <div className={`w-6 h-6 rounded-full bg-primary border-4 border-background shadow-md mr-4 transition-transform duration-300 ${activeEvent === evt.id ? 'scale-125' : ''}`} />
                    <h3 className="text-lg font-semibold">{evt.title}</h3>
                  </div>

                  {/* Card container */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`} data-scroll data-scroll-speed={isEven ? '0.3' : '0.5'} data-scroll-delay={`${progress * 0.05}`}>
                    <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`} style={{ transitionDelay: `${evt.id * 100}ms` }}>
                      <Card onMouseEnter={() => setActiveEvent(evt.id)} onMouseLeave={() => setActiveEvent(null)} onTouchStart={() => setActiveEvent(evt.id)} onTouchEnd={() => setActiveEvent(null)} data-scroll data-scroll-class="card-visible" className={`shadow-lg hover:shadow-xl transition-transform duration-500 transform ${activeEvent === evt.id ? 'scale-105' : ''} border border-border hover:border-primary/30`}>
                        <CardHeader className={`${evt.color} rounded-t-lg transition-all duration-300`}>
                          <div className={`flex items-center justify-between ${isEven ? 'md:flex-row-reverse' : 'flex-row'}`}> 
                            <CardTitle className="text-xl font-bold">{evt.title}</CardTitle>
                            <div className="h-10 w-10 rounded-full bg-card flex items-center justify-center shadow-md transform transition-transform duration-500 hover:rotate-12" data-scroll data-scroll-speed="0.1">
                              {evt.icon}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <CardDescription className="text-base text-card-foreground">{evt.description}</CardDescription>
                          <div className={`mt-4 flex flex-col gap-2 ${isEven ? 'md:items-end' : 'items-start'}`}> 
                            <div className={`flex items-center gap-2 text-muted-foreground ${isEven ? 'md:flex-row-reverse' : 'flex-row'}`}> <Calendar size={16} /> <span className="text-sm">{evt.date}</span> </div>
                            <div className={`flex items-center gap-2 text-muted-foreground ${isEven ? 'md:flex-row-reverse' : 'flex-row'}`}> <MapPin size={16} /> <span className="text-sm">{evt.location}</span> </div>
                          </div>
                        </CardContent>
                        <CardFooter className={isEven ? 'md:justify-end' : 'justify-start'}>
                          <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">Add to calendar</Badge>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Scrolling progress bar */}
      <div className="fixed top-0 left-0 h-1 bg-primary z-50" style={{ width: '0%', transition: 'width 0.1s ease-out' }} data-scroll data-scroll-sticky data-scroll-target="main" data-scroll-call="scrollProgress" />

      <style jsx global>{`
        .card-visible { opacity: 1; transform: translateY(0); }
        .timeline-dot-visible { opacity: 1; transform: translateX(-50%) scale(1); }
        [data-scroll] { transition: opacity 0.6s, transform 0.6s; }
        @media (prefers-reduced-motion: reduce) { [data-scroll] { transition: none; } }
        html.has-scroll-smooth { overflow: hidden; }
        html.has-scroll-dragging { user-select: none; }
        .has-scroll-smooth body { overflow: hidden; }
        [data-scroll-container] { min-height: 100vh; }
      `}</style>
    </div>
  );
};

export default CollegeFestTimeline;
