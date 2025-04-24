"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Map custom types to allowed badge variants
const badgeVariantMap: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  basic: "secondary",
  standard: "default",
  premium: "destructive"
};

export default function PassesPage() {
  const passes = [
    {
      id: 1,
      title: "Day Pass",
      description: "Access to all events on a single day",
      price: "50",
      features: ["Entry to all events", "Lunch and refreshments", "Digital badge"],
      type: "basic"
    },
    {
      id: 2,
      title: "Full Pass",
      description: "Unlimited access to all three days",
      price: "120",
      features: ["Entry to all events", "Daily lunch and refreshments", "Physical badge", "Exclusive merchandise"],
      type: "standard"
    },
    {
      id: 3,
      title: "VIP Pass",
      description: "Premium experience across all three days",
      price: "250",
      features: ["Priority access to all events", "VIP lounges", "Special networking events", "Exclusive merchandise", "Dinner with speakers"],
      type: "premium"
    }
  ];

  return (
    <div className="bg-background text-foreground mt-20">
      <section className="py-10 px-6 md:px-20">
        <h1 className="text-4xl font-bold mb-10">Event Passes</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {passes.map(pass => (
            <Card key={pass.id} className="border-2 border-muted/20">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant={badgeVariantMap[pass.type]}>{pass.type}</Badge>
                  <span className="text-2xl font-bold text-primary samarkan">₹{pass.price}</span>
                </div>
                <CardTitle>{pass.title}</CardTitle>
                <CardContent className="text-muted-foreground">
                  {pass.description}
                </CardContent>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-3 pl-4 text-muted-foreground">
                  {pass.features.map((feature, index) => (
                    <li key={index} className="list-disc">{feature}</li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="mt-6">
                <Button variant="default" className="w-full">Get {pass.title}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
