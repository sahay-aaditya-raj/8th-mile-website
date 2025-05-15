"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, X } from "lucide-react";

export default function ContactPage() {
  const contactInfo = [
    {
      id: 1,
      title: "General Inquiries",
      email: "info@event.com",
      phone: "+1 234 567 8900",
      contactPerson: "Sarah Johnson",
    },
    {
      id: 2,
      title: "Technical Support",
      email: "tech@event.com",
      phone: "+1 234 567 8901",
      contactPerson: "Michael Chen",
    },
    {
      id: 3,
      title: "Sponsorship",
      email: "sponsor@event.com",
      phone: "+1 234 567 8902",
      contactPerson: "David Wilson",
    },
  ];

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setAlert({ type: "success", message: data.message || "Message sent!" });
        form.reset();
      } else {
        setAlert({ type: "error", message: data.error || "Something went wrong." });
      }
    } catch (err) {
      setAlert({ type: "error", message: "Error sending message." });
      console.error(err);
    }
  };

  return (
    <div className="bg-black text-[#f9dd9c] min-h-screen mt-20">
  <section className="py-16 px-6 md:px-28 max-w-7xl mx-auto">
    <p className="text-5xl font-extrabold mb-16 text-center delagothic tracking-tight">
      Get in Touch
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
      {/* Left Column - Contact Info */}
      <div>
        <p className="text-3xl font-semibold mb-8">Contact Information</p>
        <div className="space-y-8">
          {contactInfo.map((info) => (
            <Card
              key={info.id}
              className="bg-[#1a1a1a] text-[#f9dd9c] transition-transform hover:scale-[1.03] hover:shadow-lg hover:border-[#f9dd9c]"
            >
              <CardHeader>
                <CardTitle className="text-white text-xl font-semibold">{info.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 text-sm md:text-base text-white">
                  <div className="flex items-center gap-3 ">
                    <Badge variant="outline" className="border-[#f9dd9c] ">Email</Badge>
                    <p>{info.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="border-[#f9dd9c] ">Phone</Badge>
                    <p>{info.phone}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="border-[#f9dd9c]">Contact</Badge>
                    <p>{info.contactPerson}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Column - Form */}
      <div>
        <p className="text-3xl font-semibold mb-8">Send us a message</p>

        {alert && (
          <Alert
            variant={alert.type === "success" ? "default" : "destructive"}
            className="mb-6 relative bg-[#1a1a1a] border border-[#f9dd9c]"
          >
            {alert.type === "success" ? (
              <CheckCircle className="h-5 w-5 text-green-400" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-500" />
            )}
            <AlertTitle className="text-lg font-semibold">
              {alert.type === "success" ? "Success" : "Error"}
            </AlertTitle>
            <AlertDescription className="text-sm">{alert.message}</AlertDescription>
            <button
              onClick={() => setAlert(null)}
              className="absolute top-2 right-2 text-[#f9dd9c]/60 hover:text-[#f9dd9c]"
            >
              <X className="w-4 h-4" />
            </button>
          </Alert>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm uppercase tracking-wide">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Your name"
              required
              className="bg-[#1a1a1a] border-[#f9dd9c] text-[#f9dd9c] placeholder-[#f9dd9c]/60 rounded-md py-2"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm uppercase tracking-wide">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Your email"
              required
              className="bg-[#1a1a1a] border-[#f9dd9c] text-[#f9dd9c] placeholder-[#f9dd9c]/60 rounded-md py-2"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm uppercase tracking-wide">Message</Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Your message"
              required
              className="bg-[#1a1a1a] border-[#f9dd9c] text-[#f9dd9c] placeholder-[#f9dd9c]/60 rounded-md"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#f9dd9c] text-black font-semibold py-3 text-lg rounded-md hover:bg-[#f5d87e] transition"
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
  </section>
</div>

  );
}
