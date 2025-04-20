import React from "react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export type EventType = {
  id: number;
  title: string;
  date: string;
  description: string;
  category: string;
  image: string;
};

export const EventCard = ({ event }: { event: EventType }) => (
  <CardContainer className="inter-var">
    <CardBody className="bg-card text-card-foreground relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] border border-border w-full h-auto rounded-xl p-6 max-w-sm mx-auto">

      {/* Title and badge */}
      <div className="flex items-center justify-between mb-3">
        <CardItem
          translateZ="60"
          className="text-2xl font-extrabold"
        >
          {event.title}
        </CardItem>
        <CardItem
          translateZ="60"
          className="text-base font-semibold"
        >
          <Badge variant="outline" className="text-sm px-2 py-1">{event.category}</Badge>
        </CardItem>
      </div>

      {/* Image */}
      <CardItem translateZ="100" className="w-full mb-5">
        <Image
          src={event.image}
          alt={event.title}
          width={1000}
          height={1000}
          className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
        />
      </CardItem>

      {/* Description */}
      <CardItem
        as="p"
        translateZ="40"
        className="text-base mt-3 text-muted-foreground leading-relaxed"
      >
        {event.description}
      </CardItem>

      {/* Date */}
      <div className="flex justify-end mt-6">
        <CardItem
          translateZ="20"
          className="text-sm font-medium text-muted-foreground"
        >
          {event.date}
        </CardItem>
      </div>
    </CardBody>
  </CardContainer>
);
