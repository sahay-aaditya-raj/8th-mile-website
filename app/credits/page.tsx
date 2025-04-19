"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function CreditsPage() {
  const websiteContributors = [
    {
      id: 1,
      name: "Aaditya Raj",
      role: "Full-Stack Developer",
      image: "/images/team/aaditya.jpeg",
    },
    {
      id: 2,
      name: "Vijesh Shetty",
      role: "UI/UX Designer",
      image: "/images/team/vijesh.jpeg",
    },
  ];

  const eventContributors = [
    {
      id: 1,
      name: "Aaditya Raj",
      role: "Event Director",
      image: "/images/team/aaditya.jpeg",
    },
    {
      id: 2,
      name: "Vijesh Shetty",
      role: "Technical Head",
      image: "/images/team/vijesh.jpeg",
    },
  ];

  const sponsors = [
    {
      id: 1,
      name: "RV College of Engineering",
      role: "Host Institution",
      logo: "/images/logos/rvce-logo.jpeg",
      content: "The prestigious RV College of Engineering is the host institution for this event, providing both logistical and academic support.",
    },
    {
      id: 2,
      name: "Sponsor",
      role: "Platinum Sponsor",
      logo: "/images/logos/sponser.jpeg",
      content: "Our Platinum Sponsor has been an instrumental partner in making this event possible, offering significant resources and support.",
    },
  ];

  const clubs = [
    {
      id: 1,
      name: "Coding Club",
      role: "Technical Support",
      logo: "/images/logos/coding-club-logo.png",
      content: "The Coding Club offers technical expertise and assistance for all the tech-related aspects of the event, ensuring a smooth experience.",
    },
    {
      id: 2,
      name: "E-Cell",
      role: "Host Club",
      logo: "/images/logos/e-cell-logo.jpeg",
      content: "E-Cell is the host club of the event, responsible for coordinating all the operations, from planning to execution.",
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <section className="py-10 px-4 md:px-10 lg:px-20 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Credits</h1>

        {/* Website Contributors */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Website Contributors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {websiteContributors.map((person) => (
              <Card key={person.id} className="p-6">
                <CardHeader className="flex flex-col items-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={person.image} alt={person.name} />
                  </Avatar>
                  <CardTitle className="text-center">{person.name}</CardTitle>
                  <p className="text-muted-foreground text-center">{person.role}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Event Contributors */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Event Contributors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {eventContributors.map((person) => (
              <Card key={person.id} className="p-6">
                <CardHeader className="flex flex-col items-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={person.image} alt={person.name} />
                  </Avatar>
                  <CardTitle className="text-center">{person.name}</CardTitle>
                  <p className="text-muted-foreground text-center">{person.role}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Sponsors Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8">Sponsors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {sponsors.map((sponsor) => (
              <Card key={sponsor.id} className="p-6">
                <CardHeader className="flex flex-col items-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={sponsor.logo} alt={sponsor.name} />
                  </Avatar>
                  <CardTitle className="text-center">{sponsor.name}</CardTitle>
                  <p className="text-muted-foreground text-center">{sponsor.role}</p>
                </CardHeader>
                <CardContent className="text-center mt-4">
                  <p>{sponsor.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Clubs Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8">Clubs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {clubs.map((club) => (
              <Card key={club.id} className="p-6">
                <CardHeader className="flex flex-col items-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={club.logo} alt={club.name} />
                  </Avatar>
                  <CardTitle className="text-center">{club.name}</CardTitle>
                  <p className="text-muted-foreground text-center">{club.role}</p>
                </CardHeader>
                <CardContent className="text-center mt-4">
                  <p>{club.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
