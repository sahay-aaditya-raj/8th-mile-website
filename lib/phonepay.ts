import { Env, StandardCheckoutClient } from "pg-sdk-node";

export const client = StandardCheckoutClient.getInstance(
  process.env.NEXT_PUBLIC_PHONEPE_ID as string,
  process.env.PHONEPE_KEY_SECRET as string,
    1,
  Env.PRODUCTION
);