// src/app/payment/failed/page.tsx
import Link from 'next/link';

export default function FailedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full bg-card p-8 shadow-lg rounded-lg border-2 border-muted/20">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-red-100 rounded-full mb-4">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground">Payment Failed</h2>
          <p className="text-muted-foreground mt-1">
            We couldn&apos;t process your payment
          </p>
        </div>

        <div className="bg-muted/20 p-4 rounded my-4">
          <p className="text-foreground">
            If any amount was deducted from your account, it will be returned within 5-7 business days.
            For further queries, please contact our support team.
          </p>
        </div>

        <div className="text-center mt-6 space-y-3">
          <Link
            href="/passes"
            className="inline-block w-full py-2 px-4 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Try Again
          </Link>
          
          <Link
            href="/contact"
            className="inline-block w-full py-2 px-4 border border-border rounded hover:bg-muted/20"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}