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
    <div className="bg-background text-foreground mt-20">
      <section className="py-10 px-6 md:px-20">
        <h1 className="text-4xl font-bold mb-10">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Column - Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-8">
              {contactInfo.map((info) => (
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

          {/* Right Column - Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

            {alert && (
              <Alert
                variant={alert.type === "success" ? "default" : "destructive"}
                className="mb-4 relative"
              >
                {alert.type === "success" ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                )}
                <AlertTitle>
                  {alert.type === "success" ? "Success" : "Error"}
                </AlertTitle>
                <AlertDescription>{alert.message}</AlertDescription>
                <button
                  onClick={() => setAlert(null)}
                  className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </Alert>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name" className="mb-1">
                  Name
                </Label>
                <Input id="name" name="name" placeholder="Your name" required />
              </div>
              <div>
                <Label htmlFor="email" className="mb-1">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="message" className="mb-1">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Your message"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
