/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

export default function ContactPage() {
  const contactInfo = [
    {
      id: 1,
      title: "General Inquiries",
      email: "events_8thmile@rvce.edu.in",
      phone: "9686782196",
      contactPerson: "Milaap Kreations",
      color: "#000000",
    },
    {
      id: 2,
      title: "Technical Support",
      email: "8thmile.team@gmail.com",
      phone: "8092811097",
      contactPerson: "Aaditya Raj",
      color: "#000000",
    },
    {
      id: 3,
      title: "Sponsorship",
      email: "partnerships_8thmile@rvce.edu.in",
      phone: "6265673155",
      contactPerson: "Pranjal Agrawal",
      color: "#000000",
    },
  ];

  const formUrl = "https://forms.gle/a8D5GvEDTEhSN9p58";

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

          {/* CONTACT FORM SECTION - NOW WITH QR CODE */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl sora font-extrabold mb-8 text-center"
              style={{ color: "#007dc9" }}>
              Send us a message
            </p>

            {/* QR Code */}
            <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-md mb-6">
              <img 
                src="/contactusform.png"
                alt="Contact Form QR Code"
                className="w-48 h-48 md:w-64 md:h-64 object-contain"
              />
            </div>

            {/* URL Link */}
            <div className="text-center">
              <p className="text-sm font-semibold mb-3 text-gray-700">
                Scan the QR code or click the link below:
              </p>
              <a
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 text-lg font-semibold rounded-md shadow-sm transition hover:opacity-90 break-all"
                style={{
                  backgroundColor: "#007dc9",
                  color: "white",
                }}
              >
                Open Contact Form
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
