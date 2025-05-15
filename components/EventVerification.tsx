import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';

interface EventData {
  type: string;
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
}

interface EventVerificationProps {
  data: EventData;
}

export default function EventVerification({ data }: EventVerificationProps) {
  const passRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const receiptRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  // Show participants section only if there's more than one participant
  const showParticipants = data.noOfParticipants && data.noOfParticipants > 1;

  useEffect(() => {
    const generateQRCode = async () => {
      if (typeof window !== 'undefined') {
        try {
          const currentUrl = window.location.href;
          const qrDataUrl = await QRCode.toDataURL(currentUrl, {
            errorCorrectionLevel: 'H',
            margin: 1,
            width: 200,
          });
          setQrCodeUrl(qrDataUrl);
        } catch (err) {
          console.error('Error generating QR code:', err);
        }
      }
    };

    generateQRCode();
  }, []);

  const downloadReceipt = async (ref: React.RefObject<HTMLDivElement>, fileName: string) => {
    if (!ref.current) return;

    const simplifiedContent = `
    <style>
    @media (max-width: 600px) {
      div[style*="max-width: 40%"] {
        max-width: 90% !important;
        padding: 8px !important;
        margin: 0 auto !important;
      }
      div[style*="display: flex; flex-direction: row; justify-content: space-between"] {
        flex-direction: column !important;
        align-items: center !important;
        gap: 8px !important;
        margin-bottom: 12px !important;
      }
      div[style*="display: flex; flex-direction: row; justify-content: space-between"] > p {
        font-size: 16px !important;
        margin: 0 !important;
        font-weight: 700 !important;
        color: #000000 !important;
      }
      div[style*="display: flex; flex-direction: row; justify-content: space-between"] > img {
        width: 100px !important;
        height: auto !important;
      }
      table {
        font-size: 12px !important;
      }
      th, td {
        padding: 6px 8px !important;
      }
      tr {
        border-bottom-width: 1px !important;
      }
      div[style*="margin-top: 1.5rem"] {
        margin-top: 12px !important;
        padding-top: 8px !important;
        font-size: 10px !important;
        color: #9CA3AF !important;
      }
    }
    </style>
      <div style="width: 100vw; min-height: 100vh; display: flex; align-items: flex-start; justify-content: center; padding-top: 40px; box-sizing: border-box; background: transparent;">
      <div
        style="
        width: 100%;
        max-width: 40%;
        padding: 1.5rem;
        border-radius: 1rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        background-color: white;
        backdrop-filter: blur(4px);
        border: 1px solid black;
        color: #1f2937;
        font-family: Arial, sans-serif;
        "
      >
        <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <p style="font-size: 32px; font-weight: bold; color: #000000; margin: 20px;">
          Payment Receipt
        </p>
        <img src="/png-ashtrang-cropped.png" width="250" height="50" alt="logo" />
        </div>

        <table
        style="
          width: 100%;
          text-align: left;
          border-collapse: collapse;
        "
        >
        <tbody>
          <tr style="border-bottom: 1px solid #D1D5DB;">
          <th
            style="
            padding: 0.5rem 1rem;
            color: black;
            font-weight: 600;
            border-right: 1px solid #D1D5DB;
            "
          >
            Name:
          </th>
          <td style="padding: 0.5rem 1rem;">${data.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #D1D5DB;">
          <th
            style="
            padding: 0.5rem 1rem;
            color: black;
            font-weight: 600;
            border-right: 1px solid #D1D5DB;
            "
          >
            Email:
          </th>
          <td style="padding: 0.5rem 1rem;">${data.email}</td>
          </tr>
          <tr style="border-bottom: 1px solid #Ddata.participantsData1D5DB;">
          <th
            style="
            padding: 0.5rem 1rem;
            color: black;
            font-weight: 600;
            border-right: 1px solid #D1D5DB;
            "
          >
            Phone:
          </th>
          <td style="padding: 0.5rem 1rem;">${data.phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #D1D5DB;">
          <th
            style="
            padding: 0.5rem 1rem;
            color: black;
            font-weight: 600;
            border-right: 1px solid #D1D5DB;
            "
          >
            Amount:
          </th>
          <td style="padding: 0.5rem 1rem;">₹${data.amount}</td>
          </tr>
          <tr style="border-bottom: 1px solid #D1D5DB;">
          <th
            style="
            padding: 0.5rem 1rem;
            color: black;
            font-weight: 600;
            border-right: 1px solid #D1D5DB;
            "
          >
            Order ID:
          </th>
          <td style="padding: 0.5rem 1rem;">${data.orderId}</td>
          </tr>
          <tr>
          <th
            style="
            padding: 0.5rem 1rem;
            color: black;
            font-weight: 600;
            border-right: 1px solid #D1D5DB;
            "
          >
            Payment ID:
          </th>
          <td style="padding: 0.5rem 1rem;">${data._id}</td>
          </tr>
        </tbody>
        </table>
        <div
        style="
          margin-top: 1.5rem;
          border-top: 1px solid #4B5563;
          padding-top: 1rem;
          font-size: 0.875rem;
          color: #9CA3AF;
        "
        >
        <p>This receipt confirms your payment and participation.</p>
        <p>Thank you for registering!</p>
        </div>
      </div>
      </div>
    `;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = simplifiedContent;
    document.body.appendChild(tempDiv);

    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
    });

    document.body.removeChild(tempDiv);

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    pdf.save(fileName);
  };

  const downloadAsPDF = async (ref: React.RefObject<HTMLDivElement>, fileName: string) => {
    if (!ref.current) return;

    const simplifiedContent = `
      <style>
      @media (max-width: 600px) {
      div[style*="padding: 24px"] {
        padding: 6px !important;
      }
      div[style*="border-radius: 1rem"] {
        padding: 6px !important;
      }
      div[style*="display: flex; flex-direction: row; justify-content: space-between"] {
        flex-direction: column !important;
        align-items: center !important;
        gap: 8px !important;
      }
      div[style*="display: flex; flex-direction: row; justify-content: space-between"] > p {
        font-size: 14px !important;
        margin: 0 !important;
        color: #f9dd9c !important;
        font-weight: 700 !important;
      }
      div[style*="display: flex; flex-direction: row; justify-content: space-between"] > img {
        width: 120px !important;
        height: auto !important;
      }
      div[style*="display: flex; flex-direction: row; gap: 24px"] {
        flex-direction: column !important;
        gap: 8px !important;
      }
      div[style*="flex: 1; width: 60%"] {
        width: 100% !important;
        margin-bottom: 8px !important;
      }
      table {
        font-size: 10px !important;
      }
      th, td {
        padding: 4px 8px !important;
      }
      div[style*="width:40%; flex-shrink: 0"] {
        width: 100% !important;
        align-items: center !important;
      }
      div[style*="width: 250px; height: 250px"] {
        width: 90px !important;
        height: 90px !important;
      }
      div[style*="width:40%; flex-shrink: 0"] > p {
        font-size: 12px !important;
        margin-bottom: 4px !important;
        color: #d1d5db !important;
      }
      }
      </style>
      <div style="padding: 24px;">
    <div style="padding: 24px; border-radius: 1rem; box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3); background: linear-gradient(to bottom right, #1a0020, #3b0764, #1a0020); backdrop-filter: blur(8px); border: 1px solid #d8b4fe; font-family: Arial, sans-serif; color: #f5f3ff;">
    
    <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <p style="font-size: 42px; font-weight: bold; color: #f9dd9c; margin: 20px;">
      Event Verification
      </p>
      <img src="/png-ashtrang-cropped.png" width="350" height="50" alt="logo" />
    </div>

    <div style="display: flex; flex-direction: row; gap: 24px; flex-wrap: wrap;">
      
      <!-- Table Section -->
      <div style="flex: 1; width: 60%;">
    <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 24px;">
    <tbody>
      <tr style="border-bottom: 1px solid #d8b4fe;">
      <th style="padding: 8px 16px 16px 16px; color: #cbd5e1; font-weight: 600; border-right: 1px solid #d8b4fe;">Payment ID:</th>
      <td style="padding: 8px 16px 16px 16px;">${data._id}</td>
      </tr>
      <tr style="border-bottom: 1px solid #d8b4fe;">
      <th style="padding: 8px 16px 16px 16px; color: #cbd5e1; font-weight: 600; border-right: 1px solid #d8b4fe;">Order ID:</th>
      <td style="padding: 8px 16px 16px 16px;">${data.orderId}</td>
      </tr>
      <tr style="border-bottom: 1px solid #d8b4fe;">
      <th style="padding: 8px 16px 16px 16px; color: #cbd5e1; font-weight: 600; border-right: 1px solid #d8b4fe;">Name:</th>
      <td style="padding: 8px 16px 16px 16px;">${data.name}</td>
      </tr>
      ${showParticipants ? `
      <tr style="border-bottom: 1px solid #d8b4fe;">
      <th style="padding: 8px 16px 16px 16px; color: #cbd5e1; font-weight: 600; border-right: 1px solid #d8b4fe; vertical-align: text-top;">Participants:</th>
      <td style="padding: 8px 16px 16px 16px;">
        ${data.participantsData && data.participantsData.length > 0 ? `
        <!-- Team Lead -->
        <div style="margin-bottom: 8px;">
          <span style="color: #f9dd9c; font-weight: 500;">
          ${data.participantsData[0].name} (Team Lead)
          </span>
        </div>
        
        <!-- Other Members -->
        ${data.participantsData.length > 1 ? `
          <div style="color: #cbd5e1; font-size: 20px; line-height: 1.4; word-break: break-word;">
          ${data.participantsData.slice(1).map((p, idx) => `<div key="${idx}">${p.name}</div>`).join("")}
          </div>
        ` : ''}
        ` : ''}
      </td>
      </tr>
      ` : ''}
      <tr style="border-bottom: 1px solid #d8b4fe;">
      <th style="padding: 8px 16px 16px 16px; color: #cbd5e1; font-weight: 600; border-right: 1px solid #d8b4fe;">Email:</th>
      <td style="padding: 8px 16px 16px 16px;">${data.email}</td>
      </tr>
      <tr style="border-bottom: 1px solid #d8b4fe;">
      <th style="padding: 8px 16px 16px 16px; color: #cbd5e1; font-weight: 600; border-right: 1px solid #d8b4fe;">Phone:</th>
      <td style="padding: 8px 16px 16px 16px;">${data.phone}</td>
      </tr>
      <tr>
      <th style="padding: 8px 16px 16px 16px; color: #cbd5e1; font-weight: 600; border-right: 1px solid #d8b4fe;">Class ID:</th>
      <td style="padding: 8px 16px 16px 16px;">${data.classId}</td>
      </tr>
    </tbody>
    </table>
  </div>


      <!-- QR Code Section -->
      <div style="width:40%; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;">

      <div style="width: 250px; height: 250px; border: 1px solid #4b5563; border-radius: 0.5rem; overflow: hidden; background-color: #1f2937; display: flex; align-items: center; justify-content: center;">
        <img src="${qrCodeUrl}" alt="QR Code" style="width: 100%; height: 100%; object-fit: contain;" />
      </div>
      </div>

    </div>
    </div>
  </div>

    `;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = simplifiedContent;
    document.body.appendChild(tempDiv);

    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
    });

    document.body.removeChild(tempDiv);

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    pdf.save(fileName);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 justify-center items-start">
      <div ref={passRef} className="flex flex-col w-full md:w-3/5">
        <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950 backdrop-blur border border-purple-300">
          <div className="flex flex-row items-center justify-between mb-6">
            <p className="text-2xl md:text-3xl font-bold text-[#f9dd9c]">
              Event Verification
            </p>
            <Image src={'/ashtrang-cropped.svg'} width={200} height={50} alt='logo' className='w-[150px] md:w-[200px]' />
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="flex-1">
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-purple-300">
                    <th className="py-2 px-4 text-gray-400 font-semibold border-r border-purple-300">Payment ID:</th>
                    <td className="py-2 px-4">{data._id}</td>
                  </tr>
                  <tr className="border-b border-purple-300">
                    <th className="py-2 px-4 text-gray-400 font-semibold border-r border-purple-300">Order ID:</th>
                    <td className="py-2 px-4">{data.orderId}</td>
                  </tr>
                  <tr className="border-b border-purple-300">
                    <th className="py-2 px-4 text-gray-400 font-semibold border-r border-purple-300">Name:</th>
                    <td className="py-2 px-4">{data.name}</td>
                  </tr>
                  {showParticipants && (
                    <tr className="border-b border-purple-300">
                      <th className="py-2 align-text-top px-4 text-gray-400 font-semibold border-r border-purple-300">Participants:</th>
                      <td className="py-2 px-4">
                        <div>
                          {/* Display team lead prominently */}
                          {data.participantsData && data.participantsData.length > 0 && (
                            <div className="mb-1">
                              <span className="text-yellow-300 font-medium">
                                {data.participantsData[0].name} (Team Lead)
                              </span>
                            </div>
                          )}
                          
                          {/* Display other participants as comma-separated list */}
                          {data.participantsData && data.participantsData.length > 1 && (
                            <div className="text-xs text-gray-300 leading-relaxed break-words">
                              <span className="text-gray-400">Members: </span>
                              {data.participantsData
                                .slice(1)
                                .map(p => p.name)
                                .join(", ")}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                  <tr className="border-b border-purple-300">
                    <th className="py-2 px-4 text-gray-400 font-semibold border-r border-purple-300">Email:</th>
                    <td className="py-2 px-4">{data.email}</td>
                  </tr>
                  <tr className="border-b border-purple-300">
                    <th className="py-2 px-4 text-gray-400 font-semibold border-r border-purple-300">Phone:</th>
                    <td className="py-2 px-4">{data.phone}</td>
                  </tr>
                  <tr className="">
                    <th className="py-2 px-4 text-gray-400 font-semibold border-r border-purple-300">Class ID:</th>
                    <td className="py-2 px-4">{data.classId}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center">
              <p className="text-lg font-semibold text-gray-300 mb-2">Verification QR</p>
              <div className="w-40 h-40 relative">
                {qrCodeUrl ? (
                  <Image
                    src={qrCodeUrl}
                    alt="QR Code"
                    fill
                    className="object-contain rounded-lg border border-gray-600"
                  />
                ) : (
                  <div className="w-40 h-40 flex items-center justify-center bg-gray-800 rounded-lg">
                    <p>Loading QR...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-6">
          <button
            onClick={() => downloadAsPDF(passRef, `event-pass-${data._id}.pdf`)}
            className="mt-8 w-1/2 px-6 py-3 rounded-lg font-semibold shadow-md bg-[#f9dd9c] text-black hover:bg-[#ffe9b8] transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Download Event Pass
          </button>
          <button
            onClick={() => downloadReceipt(receiptRef, `event-receipt-${data._id}.pdf`)}
            className="mt-8 w-1/2 rounded-md px-6 py-3 font-semibold shadow-md bg-[#f9dd9c] text-black hover:bg-[#ffe9b8] transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Download Receipt
          </button>
        </div>
      </div>
      <div ref={receiptRef} className="w-full md:w-2/5 p-6 rounded-2xl shadow-lg bg-white backdrop-blur border border-black text-gray-900">
        <p className="text-2xl md:text-3xl font-bold mb-6 text-black">Payment Receipt</p>
        <table className="w-full text-left border-collapse text-sm md:text-base">
          <tbody>
            <tr className="border-b border-gray-300">
              <th className="py-2 px-4 text-black font-semibold border-r border-gray-300">Name:</th>
              <td className="py-2 px-4">{data.name}</td>
            </tr>
            <tr className="border-b border-gray-300">
              <th className="py-2 px-4 text-black font-semibold border-r border-gray-300">Email:</th>
              <td className="py-2 px-4">{data.email}</td>
            </tr>
            <tr className="border-b border-gray-300">
              <th className="py-2 px-4 text-black font-semibold border-r border-gray-300">Phone:</th>
              <td className="py-2 px-4">{data.phone}</td>
            </tr>
            <tr className="border-b border-gray-300">
              <th className="py-2 px-4 text-black font-semibold border-r border-gray-300">Amount:</th>
              <td className="py-2 px-4">₹{data.amount}</td>
            </tr>
            <tr className="border-b border-gray-300">
              <th className="py-2 px-4 text-black font-semibold border-r border-gray-300">Order ID:</th>
              <td className="py-2 px-4">{data.orderId}</td>
            </tr>
            <tr>
              <th className="py-2 px-4 text-black font-semibold border-r border-gray-300">Payment ID:</th>
              <td className="py-2 px-4">{data._id}</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-6 border-t border-gray-600 pt-4 text-sm text-gray-400">
          <p>This receipt confirms your payment and participation.</p>
          <p>Thank you for registering!</p>
        </div>
      </div>
    </div>
  );
}