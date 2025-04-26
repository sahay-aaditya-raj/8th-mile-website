// lib/schema.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const payments = sqliteTable('payments', {
  id: text('id').primaryKey(), // Razorpay Payment ID
  orderId: text('order_id').notNull(), // Razorpay Order ID
  signature: text('signature').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  amount: integer('amount').notNull(),
  passId: text('pass_id').notNull(), // Custom Pass ID
  basePrice: integer('base_price').notNull(),
  gstAmount: integer('gst_amount').notNull(),
  createdAt: text('created_at').default(new Date().toISOString()),
});
