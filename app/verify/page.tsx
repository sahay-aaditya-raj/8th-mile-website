'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import PassVerification from '@/components/PassVerification';
import EventVerification from '@/components/EventVerification';

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
    return <Loader />;
  }

  const isPass = data.data.type === 'pass';
  const isEvent = data.data.type === 'event';
  
  // Choose gradient based on type
  const gradient = isPass
    ? 'bg-gradient-to-br from-[#1c1c1c] via-[#1e2b1c] to-[#314329]'
    : 'bg-gradient-to-br from-[#1b0020] via-purple-950 to-[#1b0020]';

  return (
    <div className={`min-h-screen ${gradient} text-white pt-32 px-4`}>
      {isPass ? (
        <PassVerification data={data.data} />
      ) : isEvent ? (
        <EventVerification data={data.data} />
      ) : (
        <div className="max-w-6xl mx-auto text-center py-12">
          <h2 className="text-2xl font-bold">Unknown verification type</h2>
          <p className="mt-4">The verification type &apos;{data.data.type}&apos; is not recognized.</p>
        </div>
      )}
    </div>
  );
}