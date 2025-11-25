const API_VERSION = "2023-08-01";
const MODE = process.env.NEXT_PUBLIC_CASHFREE_MODE === "production" ? "production" : "sandbox";
const BASE_URL = MODE === "production" ? "https://api.cashfree.com/pg" : "https://sandbox.cashfree.com/pg";

const CLIENT_ID = process.env.NEXT_PUBLIC_CASHFREE_CLIENT_ID;
const CLIENT_SECRET = process.env.CASHFREE_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.warn("Cashfree client credentials are not fully configured.");
}

type CashfreeCustomerDetails = {
  customer_id: string;
  customer_name?: string;
  customer_email: string;
  customer_phone: string;
};

type CashfreeOrderMeta = {
  return_url: string;
  notify_url?: string;
};

export type CashfreeOrderRequest = {
  order_id: string;
  order_amount: number;
  order_currency?: string;
  customer_details: CashfreeCustomerDetails;
  order_meta?: CashfreeOrderMeta;
  order_note?: string;
};

export type CashfreeOrderResponse = {
  cf_order_id: string;
  order_id: string;
  order_amount: number;
  order_currency: string;
  payment_session_id: string;
  order_status: string;
  [key: string]: unknown;
};

function getHeaders() {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error("Cashfree credentials are missing. Please set NEXT_PUBLIC_CASHFREE_CLIENT_ID and CASHFREE_CLIENT_SECRET.");
  }

  return {
    accept: "application/json",
    "content-type": "application/json",
    "x-api-version": API_VERSION,
    "x-client-id": CLIENT_ID,
    "x-client-secret": CLIENT_SECRET,
  } satisfies Record<string, string>;
}

export async function createCashfreeOrder(payload: CashfreeOrderRequest, retries = 3): Promise<CashfreeOrderResponse> {
  const requestBody = {
    order_currency: "INR",
    ...payload,
    customer_details: payload.customer_details,
  };

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = (await response.json()) as CashfreeOrderResponse & { message?: string };

      if (!response.ok) {
        const message = data?.message ?? "Failed to create Cashfree order";
        throw new Error(message);
      }

      return data;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`Cashfree create attempt ${attempt}/${retries} failed:`, lastError.message);

      if (attempt < retries) {
        // Wait before retrying (exponential backoff)
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError ?? new Error("Failed to create Cashfree order after multiple attempts");
}

export async function fetchCashfreeOrder(orderId: string, retries = 3): Promise<CashfreeOrderResponse> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
        method: "GET",
        headers: getHeaders(),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = (await response.json()) as CashfreeOrderResponse & { message?: string };

      if (!response.ok) {
        const message = data?.message ?? "Failed to fetch Cashfree order";
        throw new Error(message);
      }

      return data;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`Cashfree fetch attempt ${attempt}/${retries} failed:`, lastError.message);

      if (attempt < retries) {
        // Wait before retrying (exponential backoff)
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError ?? new Error("Failed to fetch Cashfree order after multiple attempts");
}

export type CashfreePaymentStatus = "SUCCESS" | "NOT_ATTEMPTED" | "FAILED" | "USER_DROPPED" | "VOID" | "CANCELLED" | "PENDING";

export type CashfreePaymentDetails = {
  cf_payment_id: string;
  order_id: string;
  entity: string;
  payment_currency: string;
  payment_amount: number;
  payment_time: string;
  payment_completion_time?: string;
  payment_status: CashfreePaymentStatus;
  payment_message?: string;
  bank_reference?: string;
  auth_id?: string;
  payment_group?: string;
  payment_method?: Record<string, unknown>;
  error_details?: {
    error_code?: string;
    error_description?: string;
    error_reason?: string;
    error_source?: string;
  };
  [key: string]: unknown;
};

export async function fetchCashfreePaymentDetails(orderId: string, retries = 3): Promise<CashfreePaymentDetails[]> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(`${BASE_URL}/orders/${orderId}/payments`, {
        method: "GET",
        headers: getHeaders(),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = (await response.json()) as CashfreePaymentDetails[] & { message?: string };

      if (!response.ok) {
        const message = (data as { message?: string })?.message ?? "Failed to fetch Cashfree payment details";
        throw new Error(message);
      }

      return data as CashfreePaymentDetails[];
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`Cashfree payment fetch attempt ${attempt}/${retries} failed:`, lastError.message);

      if (attempt < retries) {
        // Wait before retrying (exponential backoff)
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError ?? new Error("Failed to fetch Cashfree payment details after multiple attempts");
}

export async function fetchCashfreePaymentStatus(orderId: string): Promise<CashfreePaymentStatus | null> {
  try {
    const payments = await fetchCashfreePaymentDetails(orderId);
    
    // Return the status of the most recent payment
    if (payments && payments.length > 0) {
      // Sort by payment_time to get the latest payment
      const latestPayment = payments.sort((a, b) => 
        new Date(b.payment_time).getTime() - new Date(a.payment_time).getTime()
      )[0];
      
      return latestPayment.payment_status;
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching payment status:", error);
    throw error;
  }
}
