// emailPool.ts
export const emailAccounts = [
  { user: process.env.APP_EMAIL_1, pass: process.env.APP_PASSWORD_1 },
];

export const emailCounters = new Array(emailAccounts.length).fill(0);
export const DAILY_LIMIT = 500;
