"use client";

import React, { useState } from "react";
import { CheckCircle, AlertTriangle, X } from "lucide-react";

export default function ContactPage() {
  const contactInfo = [
    {
      id: 1,
      title: "General Inquiries",
      email: "events_8thmile@rvce.edu.in",
      phone: "9686782196",
      contactPerson: "Milaap Kreations",
      color: "#000000", // green
    },
    {
      id: 2,
      title: "Technical Support",
      email: "8thmile.team@gmail.com",
      phone: "8092811097",
      contactPerson: "Aaditya Raj",
      color: "#000000", // orange
    },
    {
      id: 3,
      title: "Sponsorship",
      email: "partnerships_8thmile@rvce.edu.in",
      phone: "6265673155",
      contactPerson: "Pranjal Agrawal",
      color: "#000000", // pink
    },
  ];

  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="white-spotted-bg text-black min-h-screen py-32 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">

        {/* Main Heading */}
        <p className="text-6xl seasons text-center mb-16 tracking-tight"
          style={{ color: "black" }}>
          Get In Touch
        </p>

        <div className="grid md:grid-cols-2 gap-16">

          {/* CONTACT INFORMATION */}
          <div>
            <p className="text-3xl sora font-extrabold mb-8"
              style={{ color: "#007dc9" }}>
              Contact Information
            </p>
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div
                  key={info.id}
                  className="rounded-xl p-6 border border-gray-300 shadow-sm hover:shadow-md transition duration-300 bg-white"
                >
                  <p
                    className="text-2xl font-semibold mb-4"
                    style={{ color: info.color }}
                  >
                    {info.title}
                  </p>

                  <div className="space-y-2 text-black text-sm">
                    <p>
                      <span className="font-semibold" style={{ color: info.color }}>
                        Email:
                      </span>{" "}
                      {info.email}
                    </p>
                    <p>
                      <span className="font-semibold" style={{ color: info.color }}>
                        Phone:
                      </span>{" "}
                      {info.phone}
                    </p>
                    <p>
                      <span className="font-semibold" style={{ color: info.color }}>
                        Contact Person:
                      </span>{" "}
                      {info.contactPerson}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CONTACT FORM */}
          <div>
            <p className="text-3xl sora font-extrabold mb-8"
              style={{ color: "#007dc9" }}>
              Send us a message
            </p>

            {alert && (
              <div
                className={`p-4 rounded-lg mb-6 flex items-start gap-2 border relative ${alert.type === "success"
                    ? "bg-green-100 border-green-400 text-green-800"
                    : "bg-red-100 border-red-400 text-red-800"
                  }`}
              >
                {alert.type === "success" ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertTriangle className="w-5 h-5" />
                )}

                <div>
                  <strong>{alert.type === "success" ? "Success:" : "Error:"}</strong>{" "}
                  {alert.message}
                </div>

                <button
                  onClick={() => setAlert(null)}
                  className="absolute top-2 right-2 hover:opacity-60"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name */}
              <div>
                <label className="block text-sm mb-1 uppercase tracking-wider font-semibold">
                  Name
                </label>
                <input
                  name="name"
                  required
                  placeholder="Enter your name"
                  className="w-full bg-white border border-gray-300 px-4 py-3 rounded-md focus:outline-blue-400"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm mb-1 uppercase tracking-wider font-semibold">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full bg-white border border-gray-300 px-4 py-3 rounded-md focus:outline-blue-400"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm mb-1 uppercase tracking-wider font-semibold">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Your message here..."
                  className="w-full bg-white border border-gray-300 px-4 py-3 rounded-md focus:outline-blue-400"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 text-lg font-semibold rounded-md shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{
                  backgroundColor: "#007dc9",
                  color: "white",
                }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
