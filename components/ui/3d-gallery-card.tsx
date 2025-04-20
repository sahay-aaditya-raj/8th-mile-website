import React from "react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";

export type GalleryItem = {
  id: number;
  image: string;
  caption: string;
  description: string;
};

export const GalleryCard = ({ item }: { item: GalleryItem }) => (
  <CardContainer className="inter-var">
    <CardBody className="bg-card text-card-foreground relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] border border-border w-full h-auto rounded-xl max-w-sm mx-auto">

      {/* Image */}
      <CardItem translateZ="100" className="w-full mb-4">
        <Image
          src={item.image}
          alt={item.caption}
          width={1000}
          height={1000}
          className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl border border-gray-600"
        />
      </CardItem>

      {/* Caption */}
      <CardItem
        as="p"
        translateZ="40"
        className="text-xl font-semibold text-foreground px-5 py-2"
      >
        {item.caption}
      </CardItem>

      {/* Description */}
      <CardItem
        as="p"
        translateZ="20"
        className="text-base text-muted-foreground px-5 py-2"
      >
        {item.description}
      </CardItem>
      
    </CardBody>
  </CardContainer>
);
