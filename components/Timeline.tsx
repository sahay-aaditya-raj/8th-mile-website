import React from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Calendar, Music, MapPin, Users } from 'lucide-react';

// Sample events data for the college fest timeline
const festEvents = [
  {
    date: 'April 25, 2025',
    title: 'Inauguration Ceremony',
    description: 'Kick off the fest with our chief guest and performances.',
    icon: Calendar,
  },
  {
    date: 'April 26, 2025',
    title: 'Coding Challenge',
    description: 'Compete in teams to solve real-world coding problems.',
    icon: Users,
  },
  {
    date: 'April 27, 2025',
    title: 'Treasure Hunt',
    description: 'Explore the campus in our grand treasure hunt.',
    icon: MapPin,
  },
  {
    date: 'April 28, 2025',
    title: 'Concert Night',
    description: 'Enjoy live performances by college bands and DJs.',
    icon: Music,
  },
];

export default function FestTimeline() {
  return (
    <ParallaxProvider>
      <div className="max-w-3xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">College Fest Timeline</h2>
        <div className="relative before:absolute before:left-1/2 before:w-[2px] before:bg-gray-200 before:h-full">
          {festEvents.map((event, idx) => {
            const isLeft = idx % 2 === 0;
            const Icon = event.icon;
            return (
              <Parallax
                key={idx}
                translateX={isLeft ? [-50, 0] : [50, 0]}
                opacity={[0, 1]}
                className="relative mb-16 flex justify-between items-center w-full"
              >
                <div
                  className={`w-1/2 ${isLeft ? 'pr-8 text-right' : 'pl-8'} `}
                >
                  <Card className="inline-block">
                    <CardHeader className="flex items-center space-x-2">
                      <Icon className="h-6 w-6 text-blue-500" />
                      <CardTitle className="text-lg font-semibold">
                        {event.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{event.description}</CardDescription>
                      <time className="text-sm text-gray-500">{event.date}</time>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-1/2 top-4 w-4 h-4 bg-blue-500 rounded-full" />
                <div className="w-1/2" />
              </Parallax>
            );
          })}
        </div>
      </div>
    </ParallaxProvider>
  );
}
