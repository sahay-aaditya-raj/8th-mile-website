'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, } from 'react';

export default function VerifyPage() {
    const searchParams = useSearchParams();
    const paymentId = searchParams.get('payment_id');
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
        return <div className="min-h-screen p-8 flex justify-center items-center text-gray-200 bg-black">
            <div>Loading...</div>
        </div>;
    }
    else if (data?.data.type === "pass") {
        return (
            <div className="min-h-screen bg-black text-white p-4 md:p-8 space-y-4">
                <h1 className="text-3xl font-bold text-[#f9dd9c]">Pass Verification</h1>
                <p><span className="text-gray-400">Payment ID:</span> {data.data._id}</p>
                <p><span className="text-gray-400">Order ID:</span> {data.data.orderId}</p>
                <p><span className="text-gray-400">Name:</span> {data.data.name}</p>
                <p><span className="text-gray-400">Email:</span> {data.data.email}</p>
                <p><span className="text-gray-400">Phone:</span> {data.data.phone}</p>
                <p><span className="text-gray-400">Amount:</span> {data.data.amount}</p>
                <p><span className="text-gray-400">Class ID:</span> {data.data.classId}</p>
            </div>
        );
    } else if (data?.data.type === "event") {
        return (
            <div className="min-h-screen bg-black text-white p-4 md:p-8 space-y-4">
                <h1 className="text-3xl font-bold text-[#f9dd9c]">Event Verification</h1>
                <p><span className="text-gray-400">Payment ID:</span> {data.data._id}</p>
                <p><span className="text-gray-400">Order ID:</span> {data.data.orderId}</p>
                <p><span className="text-gray-400">Name:</span> {data.data.name}</p>
                <p><span className="text-gray-400">Email:</span> {data.data.email}</p>
                <p><span className="text-gray-400">Phone:</span> {data.data.phone}</p>
                <p><span className="text-gray-400">Amount:</span> {data.data.amount}</p>
                <p><span className="text-gray-400">Class ID:</span> {data.data.classId}</p>
                <p><span className="text-gray-400">No of Participants:</span> {data.data.noOfParticipants}</p>

                <h2 className="text-2xl font-semibold text-[#f9dd9c] mt-6">Participants:</h2>
                <ul className="space-y-2">
                    {data.data.participantsData?.map((participant, index) => (
                        <li key={index} className="border border-gray-700 p-3 rounded-lg bg-[#1a1a1a]">
                            <p><span className="text-gray-400">Name:</span> {participant.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

}