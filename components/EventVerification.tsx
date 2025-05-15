import Image from 'next/image';
import { Card } from '@/components/ui/card';

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
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-yellow-300">Event Registration Verified</h2>
        <p className="mt-2 text-gray-300">Your registration has been successfully confirmed!</p>
      </div>
      
      <Card className="bg-black/50 border border-gray-700 shadow-lg rounded-xl overflow-hidden">
        <div className="p-6">
          {/* Header with logo */}
          <div className="flex items-center justify-between mb-6">
            <div className="relative h-16 w-16">
              <Image src="/8thmilelogocolour.png" alt="8th Mile Logo" fill className="object-contain" />
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-white">Event Pass</div>
              <div className="text-sm text-yellow-300">Registration #{data._id.substring(0, 8).toUpperCase()}</div>
            </div>
          </div>
          
          {/* Registration info */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 text-white">Registrant Details</h3>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="font-medium text-white">{data.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span className="font-medium text-white">{data.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Phone:</span>
                  <span className="font-medium text-white">{data.phone}</span>
                </div>
              </div>
            </div>
            
            {/* Team Members */}
            {isTeamEvent && data.participantsData && (
              <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 text-white">Team Members</h3>
                <ul className="space-y-2">
                  {data.participantsData.map((participant, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span className={index === 0 ? "text-yellow-300 font-medium" : "text-white"}>
                        {participant.name} {index === 0 ? "(Team Leader)" : ""}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded ${participant.arrived ? 'bg-green-900/50 text-green-300' : 'bg-gray-800 text-gray-400'}`}>
                        {participant.arrived ? 'Checked In' : 'Not Arrived'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Payment Details */}
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 text-white">Payment Details</h3>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount Paid:</span>
                  <span className="font-medium text-white">₹{data.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Payment ID:</span>
                  <span className="font-medium text-white">{data._id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Order ID:</span>
                  <span className="font-medium text-white">{data.orderId.substring(0, 12)}...</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className="mt-6 flex justify-center">
            <div className="bg-green-900/50 text-green-300 px-4 py-2 rounded-full font-bold inline-flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>VERIFIED</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}