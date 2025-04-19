"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ContactPage() {
  const contactInfo = [
    {
      id: 1,
      title: "General Inquiries",
      email: "info@event.com",
      phone: "+1 234 567 8900",
      contactPerson: "Sarah Johnson"
    },
    {
      id: 2,
      title: "Technical Support",
      email: "tech@event.com",
      phone: "+1 234 567 8901",
      contactPerson: "Michael Chen"
    },
    {
      id: 3,
      title: "Sponsorship",
      email: "sponsor@event.com",
      phone: "+1 234 567 8902",
      contactPerson: "David Wilson"
    }
  ];

  return (
    <div className="bg-background text-foreground">
      <section className="py-10 px-6 md:px-20">
        <h1 className="text-4xl font-bold mb-10">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-8">
              {contactInfo.map(info => (
                <Card key={info.id} className="p-6">
                  <CardHeader>
                    <CardTitle>{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Email</Badge>
                        <p>{info.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Phone</Badge>
                        <p>{info.phone}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Contact Person</Badge>
                        <p>{info.contactPerson}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name" className="mb-1">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div>
                <Label htmlFor="email"  className="mb-1">Email</Label>
                <Input id="email" type="email" placeholder="Your email" />
              </div>
              <div>
                <Label htmlFor="message" className="mb-1">Message</Label>
                <Textarea id="message" rows={4} placeholder="Your message" />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}