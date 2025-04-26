"use client"; 
// app/pass/page.tsx

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CheckoutModal from "@/components/CheckoutModal";
import { eventPasses } from "@/data/passes";
import { Pass } from "@/types";

// Map custom types to allowed badge variants
const badgeVariantMap: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  basic: "secondary",
  standard: "default",
  premium: "destructive"
};

export default function PassesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPass, setSelectedPass] = useState<Pass | null>(null);
  
  // In a real application, you would likely fetch this from an environment variable
  const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  console.log('razorpayKeyId', razorpayKeyId);
  
  const handlePassSelect = (pass: Pass) => {
    setSelectedPass(pass);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-background text-foreground mt-20">
      <section className="py-10 px-6 md:px-20">
        <h1 className="text-4xl font-bold mb-10">Event Passes</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventPasses.map(pass => (
            <Card key={pass.id} className="border-2 border-muted/20">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant={badgeVariantMap[pass.type as string]}>{pass.type}</Badge>
                  <span className="text-2xl font-bold text-primary samarkan">₹{pass.price/100}</span>
                </div>
                <CardTitle>{pass.name}</CardTitle>
                <p className="text-muted-foreground">
                  {pass.description}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-3 pl-4 text-muted-foreground">
                  {pass.features?.map((feature, index) => (
                    <li key={index} className="list-disc">{feature}</li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="mt-6">
                <Button 
                  variant="default" 
                  className="w-full" 
                  onClick={() => handlePassSelect(pass)}
                >
                  Get {pass.name}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <CheckoutModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          selectedPass={selectedPass} 
          razorpayKeyId={razorpayKeyId} 
        />
      </section>
    </div>
  );
}