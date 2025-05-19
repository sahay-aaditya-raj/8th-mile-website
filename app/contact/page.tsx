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
    },
    {
      id: 2,
      title: "Technical Support",
      email: "8thmile.team@gmail.com",
      phone: "8092811097",
      contactPerson: "Aaditya Raj",
    },
    {
      id: 3,
      title: "Sponsorship",
      email: "partnerships_8thmile@rvce.edu.in",
      phone: "6265673155",
      contactPerson: "Pranjal Agrawal",
    },
  ];

  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    }
  };

  return (
    <div className="bg-black text-[#f9dd9c] min-h-screen py-32 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <p className="text-5xl font-bold text-center mb-16 tracking-tight delagothic">Get In Touch</p>
        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <p className="text-3xl font-semibold mb-8">Contact Information</p>
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div key={info.id} className="border border-[#f9dd9c] rounded-xl p-6 hover:shadow-xl transition duration-300">
                  <p className="text-2xl font-semibold mb-4 text-white">{info.title}</p>
                  <div className="space-y-3 text-white text-sm">
                    <p><span className="font-semibold text-[#f9dd9c]">Email:</span> {info.email}</p>
                    <p><span className="font-semibold text-[#f9dd9c]">Phone:</span> {info.phone}</p>
                    <p><span className="font-semibold text-[#f9dd9c]">Contact Person:</span> {info.contactPerson}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <p className="text-3xl font-semibold mb-8">Send us a message</p>

            {alert && (
              <div className={`p-4 rounded-lg mb-6 border relative ${
                alert.type === "success"
                  ? "bg-green-900/20 border-green-400"
                  : "bg-red-900/20 border-red-500"
              }`}>
                {alert.type === "success" ? (
                  <CheckCircle className="inline w-5 h-5 mr-2 text-green-400" />
                ) : (
                  <AlertTriangle className="inline w-5 h-5 mr-2 text-red-500" />
                )}
                <strong className="mr-2">{alert.type === "success" ? "Success:" : "Error:"}</strong>
                {alert.message}
                <button onClick={() => setAlert(null)} className="absolute top-2 right-2 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm mb-1 uppercase tracking-wider">Name</label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Enter your name"
                  className="w-full bg-[#1a1a1a] border border-[#f9dd9c] text-[#f9dd9c] px-4 py-3 rounded-md placeholder-[#f9dd9c]/60 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm mb-1 uppercase tracking-wider">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full bg-[#1a1a1a] border border-[#f9dd9c] text-[#f9dd9c] px-4 py-3 rounded-md placeholder-[#f9dd9c]/60 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm mb-1 uppercase tracking-wider">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  placeholder="Your message here..."
                  className="w-full bg-[#1a1a1a] border border-[#f9dd9c] text-[#f9dd9c] px-4 py-3 rounded-md placeholder-[#f9dd9c]/60 focus:outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#f9dd9c] text-black font-semibold py-3 text-lg rounded-md hover:bg-[#f5d87e] transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
