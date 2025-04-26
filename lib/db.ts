// lib/db.ts
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const sqlite = new Database('db.sqlite'); // creates local SQLite database
export const db = drizzle(sqlite);
