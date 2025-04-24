"use client";
import React from "react";
import { HeroParallax } from "../../components/ui/hero-parallax";


const products = [
    {
        title: "Card 1",
        link: "https://gomoonbeam.com",
        thumbnail: "/cards/1.png",
    },
    {
        title: "Card 2",
        link: "https://ui.aceternity.com",
        thumbnail: "/8thmile/8.png",
    },
    {
        title: "Card 3",
        link: "https://cursor.so",
        thumbnail: "/cards/2.png",
    },
    {
        title: "Card 4",
        link: "https://ui.aceternity.com",
        thumbnail: "/8thmile/7.png",
    },
    {
        title: "Card 5",
        link: "https://userogue.com",
        thumbnail: "/cards/3.png",
    },
    {
        title: "Card 6",
        link: "https://ui.aceternity.com",
        thumbnail: "/8thmile/6.png",
    },
    {
        title: "Card 7",
        link: "https://editorially.org",
        thumbnail: "/cards/4.png",
    },
    {
        title: "Card 8",
        link: "https://ui.aceternity.com",
        thumbnail: "/8thmile/5.png",
    },
    {
        title: "Card 9",
        link: "https://editrix.ai",
        thumbnail: "/cards/5.png",
    },
    {
        title: "Card 10",
        link: "https://ui.aceternity.com",
        thumbnail: "/8thmile/4.png",
    },
    {
        title: "Card 11",
        link: "https://app.pixelperfect.quest",
        thumbnail: "/cards/6.png",
    },
    {
        title: "Card 12",
        link: "https://ui.aceternity.com",
        thumbnail: "/8thmile/3.png",
    },
    {
        title: "Card 13",
        link: "https://algochurn.com",
        thumbnail: "/cards/7.png",
    },
    {
        title: "Card 14",
        link: "https://ui.aceternity.com",
        thumbnail: "/8thmile/2.png",
    },
    {
        title: "Card 15",
        link: "https://ui.aceternity.com",
        thumbnail: "/cards/8.png",
    },
    {
        title: "Card 16",
        link: "https://ui.aceternity.com",
        thumbnail: "/8thmile/1.png",
    },
];


export default function HeroParallaxPage() {
    return <div>
    <HeroParallax products={products} />
    </div>;
  }
  