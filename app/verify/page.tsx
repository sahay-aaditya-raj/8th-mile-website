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
                const response = await fetch(`/api/registration-data?payment_id=${paymentId}`,{
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
        return <div>Loading...</div>;
    }
    else if (data?.data.type === "pass") {
        return (
            <div>
                <h1>Pass Verification</h1>
                <p>Payment ID: {data.data._id}</p>
                <p>Order ID: {data.data.orderId}</p>
                <p>Name: {data.data.name}</p>
                <p>Email: {data.data.email}</p>
                <p>Phone: {data.data.phone}</p>
                <p>Amount: {data.data.amount}</p>
                <p>Class ID: {data.data.classId}</p>
            </div>
        );
    } else if (data?.data.type === "event") {
        return (
            <div>
                <h1>Event Verification</h1>
                <p>Payment ID: {data.data._id}</p>
                <p>Order ID: {data.data.orderId}</p>
                <p>Name: {data.data.name}</p>
                <p>Email: {data.data.email}</p>
                <p>Phone: {data.data.phone}</p>
                <p>Amount: {data.data.amount}</p>
                <p>Class ID: {data.data.classId}</p>
                <p>No of Participants: {data.data.noOfParticipants}</p>
                <h2>Participants:</h2>
                <ul>
                    {data.data.participantsData?.map((participant, index) => (
                        <li key={index}>
                            <p>Name: {participant.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}