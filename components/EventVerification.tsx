import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { useRef } from 'react';
import jsPDF from 'jspdf';
interface EventVerificationProps {
  data: {
    _id: string;
    orderId: string;
    name: string;
    email: string;
    phone: string;
    amount: string;
    classId: string;
    noOfParticipants?: number;
    participantsData?: Array<{
      name: string;
      arrived: boolean;
    }>;
  };
}

export default function EventVerification({ data }: EventVerificationProps) {
  const isTeamEvent = data.noOfParticipants && data.noOfParticipants > 1;
  const cardRef = useRef<HTMLDivElement>(null);


const downloadAsPDF = async () => {
  const { _id, name, email, phone, amount, orderId, participantsData = [], noOfParticipants } = data;
  const isTeamEvent = noOfParticipants && noOfParticipants > 1;

  // Create jsPDF instance
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Background color (#f9dd9c)
  pdf.setFillColor(249, 221, 156);
  pdf.rect(0, 0, 210, 297, 'F'); // Fill entire page

  // Load and add logo image (must be base64 or accessible URL)
  const logoBase64 = await loadImageAsBase64('/png-ashtrang-cropped.png'); // replace with your actual path or base64 string
  if (logoBase64) {
    pdf.addImage(logoBase64, 'PNG', 80, 15, 50, 15); // centered horizontally approx
  }

  // Text color black
  pdf.setTextColor(0, 0, 0);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(16);
  pdf.text('Event Pass', 105, 40, { align: 'center' });

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Registration #: ${_id.substring(0, 8).toUpperCase()}`, 105, 47, { align: 'center' });

  // Starting Y position for details
  let y = 60;

  // Helper to draw label-value pairs (like table rows)
  const drawRow = (label: string, value: string, yPos: number) => {
    pdf.setFont('helvetica', 'bold');
    pdf.text(label, 20, yPos);
    pdf.setFont('helvetica', 'normal');
    pdf.text(value, 90, yPos);
  };

  // Draw Registrant Details header
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.text('Registrant Details', 20, y);
  y += 8;

  pdf.setFontSize(10);
  drawRow('Name:', name, y); y += 7;
  drawRow('Email:', email, y); y += 7;
  drawRow('Phone:', phone, y); y += 10;

  // Draw a horizontal line
  pdf.setDrawColor(0);
  pdf.setLineWidth(0.5);
  pdf.line(15, y, 195, y);
  y += 10;

  // Team Members (if any)
  if (isTeamEvent && participantsData.length) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text('Team Members', 20, y);
    y += 8;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    participantsData.forEach((p, i) => {
      const label = i === 0 ? '(Team Leader)' : '';
      pdf.text(`${p.name} ${label}`, 25, y);
      y += 7;
    });

    y += 5;
    pdf.line(15, y, 195, y);
    y += 10;
  }

  // Payment Details header
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.text('Payment Details', 20, y);
  y += 8;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  drawRow('Amount Paid:', `₹${amount}`, y); y += 7;
  drawRow('Payment ID:', _id, y); y += 7;
  drawRow('Order ID:', `${orderId.substring(0, 12)}...`, y);

  // Save PDF with filename
  pdf.save(`Event_Pass_${_id.substring(0, 8)}.pdf`);
};


// Helper to load image as base64 string
const loadImageAsBase64 = (url: string): Promise<string | null> => {
  return new Promise((resolve) => {
    const img = typeof window !== "undefined" ? new window.Image() : document.createElement('img');
    img.crossOrigin = 'Anonymous';
    img.src = url;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = () => resolve(null);
  });
};

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <p className="text-xl md:text-3xl font-bold text-[#f9dd9c] drop-shadow">Event Registration Verified</p>
        <p className="mt-2 text-gray-300 text-sm sm:text-base">Your registration has been successfully confirmed!</p>
      </div>

      <Card ref={cardRef} className="bg-black border border-gray-700 shadow-2xl rounded-3xl overflow-hidden">
        <div className="p-3 sm:p-6">

          {/* Header with logo */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="relative h-16 w-32 md:w-48">
              <Image src="/png-ashtrang-cropped.png" alt="8th Mile Logo" fill className="object-contain" />
            </div>
            <div className="text-right">
              <div className="text-xl md:text-2xl font-bold text-white">🎫 Event Pass</div>
              <div className="text-xs md:text-sm text-[#f9dd9c] tracking-wider">
                Registration #{data._id.substring(0, 8).toUpperCase()}
              </div>
            </div>
          </div>

          {/* Registration info */}
          <div className="space-y-6">

            {/* Registrant Details */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 rounded-xl border border-gray-700/30 shadow-inner">
              <p className="text-lg font-semibold mb-3 text-[#f9dd9c]">Registrant Details</p>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between text-sm text-white">
                  <span className="text-gray-400">Name:</span>
                  <span className="font-medium">{data.name}</span>
                </div>
                <div className="flex justify-between text-sm text-white">
                  <span className="text-gray-400">Email:</span>
                  <span className="font-medium">{data.email}</span>
                </div>
                <div className="flex justify-between text-sm text-white">
                  <span className="text-gray-400">Phone:</span>
                  <span className="font-medium">{data.phone}</span>
                </div>
              </div>
            </div>

            {/* Team Members */}
            {isTeamEvent && data.participantsData && (
              <div className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-950 p-4 rounded-xl border border-[#f9dd9c]/20">
                <p className="text-lg font-semibold mb-3 text-[#f9dd9c]">Team Members</p>
                <ul className="space-y-3 text-sm">
                  {data.participantsData.map((participant, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span className={index === 0 ? "text-[#f9dd9c] font-medium" : "text-white"}>
                        {participant.name} {index === 0 ? "(Team Leader)" : ""}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full font-semibold border ${participant.arrived
                        ? 'bg-green-900/40 text-green-300 border-green-700'
                        : 'bg-gray-800 text-gray-400 border-gray-600'
                        }`}>
                        {participant.arrived ? 'Checked In' : 'Not Arrived'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Payment Details */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900  p-4 rounded-xl border border-gray-700">
              <p className="text-lg font-semibold mb-3 text-[#f9dd9c]">Payment Details</p>
              <div className="grid grid-cols-1 gap-3 text-sm text-white">
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount Paid:</span>
                  <span className="font-medium">₹{data.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Payment ID:</span>
                  <span className="font-medium">{data._id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Order ID:</span>
                  <span className="font-medium">{data.orderId.substring(0, 12)}...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="mt-8 flex md:flex-row flex-col justify-center gap-6">
            <div className="bg-green-800/30 text-green-300 px-5 py-2 rounded-full font-bold inline-flex items-center justify-center gap-2 shadow-md border border-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>VERIFIED</span>
            </div>
            <button
              onClick={downloadAsPDF}
              className="bg-[#f9dd9c] hover:bg-yellow-300 text-black font-semibold px-6 py-2 rounded-full shadow transition-colors duration-200 border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              Download Confirmation
            </button>
          </div>
        </div>
      </Card>
    </div>

  );
}