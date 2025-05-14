'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, } from 'react';
import Image from 'next/image';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Loader from '@/components/Loader';

export default function VerifyPage() {
    const searchParams = useSearchParams();
    const paymentId = searchParams.get('payment_id');

    const passRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
    const receiptRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

    interface RegistrationData {
        data: {
            type: string;
            _id: string;
            orderId: string;
            name: string;
            email: string;
            phone: string;
            amount: string;
            classId: string;
            noOfParticipants?: number;
            participantsData?: [{
                name: string;
                arrived: boolean;
            }];
        };
    }

    const downloadAsPDF = async (ref: React.RefObject<HTMLDivElement>, fileName: string) => {
        if (!ref.current) return;

        // Simplified content for the PDF
        const simplifiedContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #ffffff; color: #000;">
            <h2 style="text-align: center;">${isPass ? 'Pass Verification' : 'Event Verification'}</h2>
            <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
                <tbody>
                    <tr>
                        <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Payment ID</th>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data?.data._id}</td>
                    </tr>
                    <tr>
                        <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Order ID</th>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data?.data.orderId}</td>
                    </tr>
                    <tr>
                        <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Name</th>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data?.data.name}</td>
                    </tr>
                    <tr>
                        <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Email</th>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data?.data.email}</td>
                    </tr>
                    <tr>
                        <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Phone</th>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data?.data.phone}</td>
                    </tr>
                    <tr>
                        <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Class ID</th>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data?.data.classId}</td>
                    </tr>
                    ${isEvent ? `
                    <tr>
                        <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">No of Participants</th>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data?.data.noOfParticipants}</td>
                    </tr>` : ''}
                </tbody>
            </table>
            <div style="text-align: center; margin-top: 20px;">
                <h3>Verification QR Code</h3>
                <img src="/path-to-qr.png" alt="QR Code" style="width: 150px; height: 150px; margin-top: 10px;" />
            </div>
        </div>
    `;

        // Create a temporary div to render the simplified HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = simplifiedContent;
        document.body.appendChild(tempDiv);

        // Use html2canvas to capture the content
        const canvas = await html2canvas(tempDiv, {
            scale: 2,
            useCORS: true,
        });

        // Clean up temporary div after capturing
        document.body.removeChild(tempDiv);

        // Convert the canvas to a PDF
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        // Save the PDF
        pdf.save(fileName);
    };


    const [data, setData] = useState<RegistrationData | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/registration-data?payment_id=${paymentId}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [paymentId]);


    if (!data) {
        return (
            <Loader />
        );
    }

    const isPass = data?.data.type === 'pass';
    const isEvent = data?.data.type === 'event';

    const gradient = isPass
        ? 'bg-gradient-to-br from-[#1c1c1c] via-[#1e2b1c] to-[#314329]'
        : 'bg-gradient-to-br from-[#1a1a2e] via-[#2a2a40] to-[#3e3e5c]';

    const headerColor = isPass ? 'text-[#f9dd9c]' : 'text-[#d4b5ff]';

    return (
        <div className={`min-h-screen ${gradient} text-white pt-32 px-4`}>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 justify-center items-start">
                {/* Verification Card */}
                <div ref={passRef} className="flex flex-col -full md:w-3/5">
                    <div className="w p-6 rounded-2xl shadow-lg bg-gradient-to-br from-indigo-950 via-indigo-800 to-indigo-950 backdrop-blur border border-gray-700">
                        <div className="flex flex-row items-center justify-between mb-6">
                            <p className={`text-3xl font-bold mb-6 ${headerColor}`}>
                                {isPass ? 'Pass Verification' : 'Event Verification'}
                            </p>
                            <Image src={'/ashtrang-cropped.svg'} width={200} height={50} alt='logo' />
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            {/* Details Table */}
                            <div className="flex-1">
                                <table className="w-full text-left border-collapse">
                                    <tbody>
                                        <tr className="border-b border-gray-700">
                                            <th className="py-2 px-4 text-gray-400 font-semibold border-r border-gray-700">Payment ID:</th>
                                            <td className="py-2 px-4">{data.data._id}</td>
                                        </tr>
                                        <tr className="border-b border-gray-700">
                                            <th className="py-2 px-4 text-gray-400 font-semibold border-r border-gray-700">Order ID:</th>
                                            <td className="py-2 px-4">{data.data.orderId}</td>
                                        </tr>
                                        <tr className="border-b border-gray-700">
                                            <th className="py-2 px-4 text-gray-400 font-semibold border-r border-gray-700">Name:</th>
                                            <td className="py-2 px-4">{data.data.name}</td>
                                        </tr>
                                        <tr className="border-b border-gray-700">
                                            <th className="py-2 px-4 text-gray-400 font-semibold border-r border-gray-700">Email:</th>
                                            <td className="py-2 px-4">{data.data.email}</td>
                                        </tr>
                                        <tr className="border-b border-gray-700">
                                            <th className="py-2 px-4 text-gray-400 font-semibold border-r border-gray-700">Phone:</th>
                                            <td className="py-2 px-4">{data.data.phone}</td>
                                        </tr>
                                        <tr className="border-b border-gray-700">
                                            <th className="py-2 px-4 text-gray-400 font-semibold border-r border-gray-700">Class ID:</th>
                                            <td className="py-2 px-4">{data.data.classId}</td>
                                        </tr>
                                        {isEvent && (
                                            <>
                                                <tr className="border-b border-gray-700">
                                                    <th className="py-2 px-4 text-gray-400 font-semibold border-r border-gray-700">No of Participants:</th>
                                                    <td className="py-2 px-4">{data.data.noOfParticipants}</td>
                                                </tr>
                                                <tr>
                                                    <th className="py-2 px-4 text-gray-400 font-semibold border-r border-gray-700 align-top">Participants:</th>
                                                    <td className="py-2 px-4">
                                                        <ul className="space-y-2">
                                                            {data.data.participantsData?.map((participant, index) => (
                                                                <li key={index} className="border border-gray-600 p-2 rounded-lg bg-[#202020]">
                                                                    <span className="text-gray-400">Name:</span> {participant.name}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {/* QR Code */}
                            <div className="flex-shrink-0 flex flex-col items-center">
                                <p className="text-lg font-semibold text-gray-300 mb-2">Verification QR</p>
                                <div className="w-40 h-40 relative">
                                    <Image
                                        src="/path-to-qr.png" // Replace with dynamic QR path later
                                        alt="QR Code"
                                        fill
                                        className="object-contain rounded-lg border border-gray-600"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-6">
                        <button
                            onClick={() => downloadAsPDF(passRef, 'pass_verification.pdf')}
                            className={`mt-8 w-1/2 px-6 py-3 rounded-lg font-semibold shadow-md transition-colors duration-200 cursor-pointer
    ${isPass ? 'bg-[#f9dd9c] text-black hover:bg-[#ffe9b8]' : 'bg-[#d4b5ff] text-black hover:bg-[#e6d6ff]'}
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white`}
                        >
                            Download Pass
                        </button>
                        <button
                            onClick={() => downloadAsPDF(receiptRef, 'payment_receipt.pdf')}
                            className={`mt-8 w-1/2 rounded-md px-6 py-3 font-semibold shadow-md transition-colors duration-200 cursor-pointer
    ${isPass ? 'bg-[#f9dd9c] text-black hover:bg-[#ffe9b8]' : 'bg-[#d4b5ff] text-black hover:bg-[#e6d6ff]'}
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white`}
                        >
                            Download Receipt
                        </button>

                    </div>

                </div>
                {/* Receipt Card */}
                <div ref={receiptRef} className="w-full md:w-2/5 p-6 rounded-2xl shadow-lg bg-white backdrop-blur border border-black text-gray-900">
                    <p className={`text-3xl font-bold mb-6 text-black`}>Payment Receipt</p>
                    <table className="w-full text-left border-collapse">
                        <tbody>
                            <tr className="border-b border-gray-300">
                                <th className="py-2 px-4 text-black font-semibold border-r border-gray-300">Name:</th>
                                <td className="py-2 px-4">{data.data.name}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                                <th className="py-2 px-4 text-black font-semibold border-r border-gray-300">Email:</th>
                                <td className="py-2 px-4">{data.data.email}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                                <th className="py-2 px-4 text-black font-semibold border-r border-gray-300">Phone:</th>
                                <td className="py-2 px-4">{data.data.phone}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                                <th className="py-2 px-4 text-black font-semibold border-r border-gray-300">Amount:</th>
                                <td className="py-2 px-4">₹{data.data.amount}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                                <th className="py-2 px-4 text-black font-semibold border-r border-gray-300">Order ID:</th>
                                <td className="py-2 px-4">{data.data.orderId}</td>
                            </tr>
                            <tr>
                                <th className="py-2 px-4 text-black font-semibold border-r border-gray-300">Payment ID:</th>
                                <td className="py-2 px-4">{data.data._id}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="mt-6 border-t border-gray-600 pt-4 text-sm text-gray-400">
                        <p>This receipt confirms your payment and participation.</p>
                        <p>Thank you for registering!</p>
                    </div>
                </div>
            </div>
        </div>
    );


}