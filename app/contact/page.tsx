/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

export default function ContactPage() {
  const contactInfo = [
    {
      id: 1,
      title: "General Inquiries",
      email: "events_8thmile@rvce.edu.in",
      phone: "7899645094",
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
      phone: "8310817359",
      contactPerson: "Sinchan Rai",
      color: "#000000", // pink
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
                <div
                  className="rounded-xl p-6 border border-gray-300 shadow-sm hover:shadow-md transition duration-300 bg-white"
                >
                  <p
                    className="text-2xl font-semibold mb-4"
                  >
                    General Inquiries
                  </p>

                  <div className="space-y-2 text-black text-sm">
                    <p>
                      <span className="font-semibold">
                        Email:
                      </span>{" "}
                      events_8thmile@rvce.edu.in
                    </p>
                    <p>
                      <span className="font-semibold">
                        Contact Person:
                      </span>{" "}
                        Milaap Kreations
                    </p>
                    <p>
                      <span className="font-semibold">
                        Phone:
                      </span>{" "}
                        Shiva Kumar - 9740867236
                    </p>
                    <p>
                      <span className="font-semibold">
                        Phone:
                      </span>{" "}
                        Vansh Goel - 7899645094
                    </p>
                  </div>
                </div>
                <div
                  className="rounded-xl p-6 border border-gray-300 shadow-sm hover:shadow-md transition duration-300 bg-white"
                >
                  <p
                    className="text-2xl font-semibold mb-4"
                  >
                    Technical Support
                  </p>

                  <div className="space-y-2 text-black text-sm">
                    <p>
                      <span className="font-semibold">
                        Email:
                      </span>{" "}
                      8thmile.team@gmail.com
                    </p>
                    <p>
                      <span className="font-semibold">
                        Contact Person:
                      </span>{" "}
                        Aaditya Raj
                    </p>
                    <p>
                      <span className="font-semibold">
                        Phone:
                      </span>{" "}
                        8092811097
                    </p>
                  </div>
                </div>
                <div
                  className="rounded-xl p-6 border border-gray-300 shadow-sm hover:shadow-md transition duration-300 bg-white"
                >
                  <p
                    className="text-2xl font-semibold mb-4"
                  >
                    Sponsorship
                  </p>

                  <div className="space-y-2 text-black text-sm">
                    <p>
                      <span className="font-semibold">
                        Email:
                      </span>{" "}
                      partnerships_8thmile@rvce.edu.in
                    </p>
                    <p>
                      <span className="font-semibold">
                        Contact Person:
                      </span>{" "}
                        Sinchan Rai
                    </p>
                    <p>
                      <span className="font-semibold">
                        Phone:
                      </span>{" "}
                        8310817359
                    </p>
                  </div>
                </div>
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
