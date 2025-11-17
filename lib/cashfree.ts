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
