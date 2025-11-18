/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { getPass } from '@/data/passes';
import { load } from '@cashfreepayments/cashfree-js';
import type { CashfreeInstance, CashfreeCheckoutOptions } from '@cashfreepayments/cashfree-js';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const passId = searchParams.get('passId');

  const [pass, setPass] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form fields
  const [validationError, setValidationError] = useState<string | null>(null);  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const DAYS = ["4 December", "5 December", "6 December"];
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const cashfreeRef = useRef<CashfreeInstance | null>(null);
  const cashfreeMode = process.env.NEXT_PUBLIC_CASHFREE_MODE === 'production' ? 'production' : 'sandbox';

  const toggleDay = (day: string) => {
    // One Day Pass -> allow only 1
    if (pass.id === "one-day-pass") {
      setSelectedDays([day]);
      return;
    }

    // Two Day Pass -> allow max 2
    if (pass.id === "two-day-pass") {
      if (selectedDays.includes(day)) {
        setSelectedDays(selectedDays.filter(d => d !== day));
      } else {
        if (selectedDays.length < 2) {
          setSelectedDays([...selectedDays, day]);
        }
      }
      return;
    }

    // Three Day Pass -> always fixed
    if (pass.id === "three-day-pass") {
      setSelectedDays(["4 December", "5 December", "6 December"]);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 10) {
      setPhone(value);
      if (value.length === 10) {
        if (value.startsWith('0')) {
          setPhoneError('Phone number cannot start with 0');
        } else {
          setPhoneError('');
        }
      } else if (value.length > 0) {
        setPhoneError('Phone number must be exactly 10 digits');
      } else {
        setPhoneError('');
      }
    }
  };



  useEffect(() => {
    // Check if returning from Cashfree with error
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('order_id');
    if (orderId) {
      // Redirected from Cashfree after payment attempt
      window.location.href = `/api/verify?payment_id=${orderId}`;
      return;
    }

    if (!passId) {
      setError('No pass selected');
      setLoading(false);
      return;
    }

    const passData = getPass(passId);
    if (!passData) {
      setError('Invalid pass');
      setLoading(false);
      return;
    }

    setPass(passData);

    if (passData.id === "three-day-pass") {
      setSelectedDays(["4 December", "5 December", "6 December"]);
    }


    setLoading(false);
  }, [passId]);

  useEffect(() => {
    let mounted = true;

    load({ mode: cashfreeMode })
      .then((instance: CashfreeInstance | null) => {
        if (mounted) {
          cashfreeRef.current = instance;
        }
      })
      .catch((sdkError: unknown) => {
        console.error('Failed to initialise Cashfree SDK', sdkError);
        if (mounted) {
          setError((prev) => prev || 'Unable to initialise the payment gateway. Please refresh the page and try again.');
        }
      });

    return () => {
      mounted = false;
    };
  }, [cashfreeMode]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      if (!pass) {
        throw new Error('No pass selected.');
      }

      if (phone.length !== 10) {
        setValidationError("Phone number must be exactly 10 digits.");
        setIsProcessing(false);
        return;
      }

      if (phone.startsWith('0')) {
        setValidationError("Phone number cannot start with 0.");
        setIsProcessing(false);
        return;
      }

      if (pass.id === "one-day-pass" && selectedDays.length !== 1) {
        setValidationError("Please select exactly 1 day for the One Day Pass.");
        setIsProcessing(false);
        return;
      }

      if (pass.id === "two-day-pass" && selectedDays.length !== 2) {
        setValidationError("Please select exactly 2 days for the Two Day Pass.");
        setIsProcessing(false);
        return;

      }


      const merchantOrderId = `8THMILE_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

      // Create a data object with all the collected information
      const paymentData = {
        type: 'pass',
        data: {
          passId: pass.id,
          name,
          email,
          phone,
          selectedDays,   // <-- add this
          merchantOrderId
        }
      };


      // Call the Cashfree order creation endpoint
      const response = await fetch('/api/cashfree-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create payment order');
      }

      const { paymentSessionId } = data as { paymentSessionId: string };
      if (!paymentSessionId) {
        throw new Error('Payment session was not generated. Please try again.');
      }

      let cashfree = cashfreeRef.current;
      if (!cashfree) {
        cashfree = await load({ mode: cashfreeMode });
        if (!cashfree) {
          throw new Error('Cashfree SDK not loaded. Please refresh and try again.');
        }
        cashfreeRef.current = cashfree;
      }

      const checkoutOptions: CashfreeCheckoutOptions = {
        paymentSessionId,
        redirectTarget: '_self',
      };

      // This will redirect the user to Cashfree's hosted payment page
      // After payment, Cashfree will redirect back to the returnUrl configured in the order (/api/verify)
      setIsRedirecting(true);
      cashfree.checkout(checkoutOptions);

    } catch (err: any) {
      setError(err.message || 'Failed to process payment');
      console.error(err);
      setIsRedirecting(false);
      setIsProcessing(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-800 bg-white">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500 bg-white">{error}</div>;
  if (!pass) return <div className="p-8 text-center text-gray-800 bg-white">No pass selected</div>;

  return (
    <div className="min-h-screen bg-white text-black pt-32">
      <div className="seasons text-6xl mb-10 text-center text-black">
        Checkout
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">

        {/* Pass Details Section */}
        <div>
          <Card className="bg-white p-6 rounded-xl shadow-md border border-gray-300">
            <CardContent className="p-0 pt-6">

              <p className="text-3xl seasons font-extrabold text-[#007dc9] mb-4">
                {pass.name}
              </p>

              <p className="text-gray-700 sora mb-4">{pass.description}</p>

              <Separator className="my-4 bg-gray-300" />

              <div className="space-y-3">
                <p className="font-semibold sora text-gray-700">Includes:</p>

                <ul className="list-disc pl-5 space-y-1 text-gray-600 sora">
                  {pass.features?.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <Separator className="my-4 bg-gray-300" />

            </CardContent>
          </Card>
        </div>

        {/* Form Section */}
        <div>
          <Card className="bg-white p-6 rounded-xl shadow-md border border-gray-300">
            <CardContent className="p-0 pt-6">

              <p className="text-2xl seasons font-extrabold mb-4 text-[#007dc9]">
                Personal Information
              </p>

              <form onSubmit={handlePayment} className="space-y-4 text-black sora">

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="sora font-semibold text-gray-700">
                    Name<span className="text-red-500"> *</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-white border border-gray-400 text-black placeholder-gray-500 focus:ring-[#f9dd9c] focus:border-[#f9dd9c]"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="sora font-semibold text-gray-700">
                    Email<span className="text-red-500"> *</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white border border-gray-400 text-black placeholder-gray-500 focus:ring-[#f9dd9c] focus:border-[#f9dd9c]"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="sora font-semibold text-gray-700">
                    Phone<span className="text-red-500"> *</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter 10 digit phone number"
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                    maxLength={10}
                    pattern="[0-9]{10}"
                    className="bg-white border border-gray-400 text-black placeholder-gray-500 focus:ring-[#f9dd9c] focus:border-[#f9dd9c]"
                  />
                  {phoneError && <p className="text-red-500 text-xs sora">{phoneError}</p>}
                </div>

                <p className="text-sm text-red-600 text-right sora">* Required</p>

                {/* Date Selection */}
                <div className="space-y-2">
                  <Label className="sora font-semibold text-gray-700">
                    Select Days <span className="text-red-500">*</span>
                  </Label>

                  {/* ONE DAY PASS */}
                  {pass.id === "one-day-pass" && (
                    <div className="flex gap-4">
                      {DAYS.map(day => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleDay(day)}
                          className={`px-4 py-2 rounded-md border sora text-sm ${selectedDays.includes(day)
                            ? "bg-[#007dc9] text-white border-[#007dc9]"
                            : "bg-white border-gray-400 text-gray-700"
                            }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* TWO DAY PASS */}
                  {pass.id === "two-day-pass" && (
                    <div className="flex gap-4 flex-wrap">
                      {DAYS.map(day => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleDay(day)}
                          disabled={
                            !selectedDays.includes(day) && selectedDays.length >= 2
                          }
                          className={`px-4 py-2 rounded-md border sora text-sm ${selectedDays.includes(day)
                            ? "bg-[#007dc9] text-white border-[#007dc9]"
                            : "bg-white border-gray-400 text-gray-700"
                            } ${!selectedDays.includes(day) && selectedDays.length >= 2
                              ? "opacity-40 cursor-not-allowed"
                              : ""
                            }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* THREE DAY PASS */}
                  {pass.id === "three-day-pass" && (
                    <div className="text-gray-700 sora">
                      Pass includes all days:
                      <div className="mt-2 flex gap-3">
                        {DAYS.map(day => (
                          <span
                            key={day}
                            className="px-3 py-2 bg-[#007dc9] text-white rounded-md sora text-sm"
                          >
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>


                {/* PAY BUTTON */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-[#f9dd9c] text-black font-bold sora hover:bg-[#ffe9a9] transition"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : `Pay ₹${pass.price}`}
                  </Button>
                </div>

                {/* Note Box */}
                <div className="flex-col border border-gray-300 rounded-md p-3 bg-gray-50">
                  <div className="text-gray-700 font-semibold sora mb-1">Note</div>
                  <div className="text-gray-600 text-xs sora leading-relaxed">
                    Take a screenshot of the payment page and keep it for reference. If you do not find the email, please check the spam folder as well.
                  </div>
                </div>

              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Validation Error Modal */}
      {validationError && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-2xl border border-gray-300 text-center">

            <h2 className="text-2xl sora font-extrabold text-[#be1e2d] mb-3">
              Action Required
            </h2>

            <p className="text-gray-700 sora mb-6">{validationError}</p>

            <Button
              onClick={() => setValidationError(null)}
              className="w-full bg-[#007dc9] text-white sora font-bold hover:bg-[#0060a0]"
            >
              Okay
            </Button>

          </div>
        </div>
      )}

      {/* Processing Overlay */}
      {(isProcessing || isRedirecting) && (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-md border border-gray-300">

            {/* Loader spinner */}
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f9dd9c] mx-auto mb-4"></div>

            <p className="text-xl text-black sora font-extrabold mb-2">
              {isRedirecting ? "Completing Purchase..." : "Processing Payment..."}
            </p>

            <p className="text-gray-600 sora leading-relaxed">
              {isRedirecting
                ? "Please wait while we verify your payment and finalize your purchase."
                : "Please complete the payment in the popup window."}
            </p>
          </div>
        </div>
      )}

    </div>

  );

}