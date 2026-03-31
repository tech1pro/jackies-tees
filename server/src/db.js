import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import pg from 'pg';
import { getDataDir } from './utils.js';

const dataDir = getDataDir();
const ordersPath = join(dataDir, 'orders.json');
const quotesPath = join(dataDir, 'quotes.json');
const { Pool } = pg;
const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);
const pool = hasDatabaseUrl
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      family: Number(process.env.DATABASE_FAMILY || 4),
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined
    })
  : null;

function readJson(path, defaultVal) {
  if (!existsSync(path)) return defaultVal;
  try {
    const raw = readFileSync(path, 'utf8');
    return raw.trim() ? JSON.parse(raw) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function writeJson(path, data) {
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
}

function ensureFile(path, defaultVal = []) {
  if (!existsSync(path)) writeJson(path, defaultVal);
}

function nextId(items) {
  if (items.length === 0) return 1;
  const ids = items.map((x) => x.id).filter((x) => typeof x === 'number');
  return Math.max(0, ...ids) + 1;
}

function row(itemType, quantity, colors, designDescription, eventDeadline, fulfillment, name, email, phone) {
  return {
    item_type: itemType,
    quantity,
    colors,
    design_description: designDescription,
    event_deadline: eventDeadline,
    fulfillment,
    name,
    email,
    phone,
    created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
  };
}

export async function initDb() {
  if (!pool) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS requests (
      id BIGSERIAL PRIMARY KEY,
      request_type TEXT NOT NULL CHECK (request_type IN ('order', 'quote')),
      item_type TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      colors TEXT NOT NULL,
      design_description TEXT NOT NULL,
      event_deadline TEXT,
      fulfillment TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function queryPostgres(sql, params) {
  if (!pool) return null;
  try {
    return await pool.query(sql, params);
  } catch (err) {
    console.error('Postgres query failed, using file fallback:', err.message);
    return null;
  }
}

export async function getDbHealth() {
  if (!pool) {
    return { configured: false, healthy: true, mode: 'file-fallback' };
  }
  try {
    await pool.query('SELECT 1');
    return { configured: true, healthy: true, mode: 'postgres' };
  } catch {
    return { configured: true, healthy: false, mode: 'postgres' };
  }
}

export async function insertOrderRequest(itemType, quantity, colors, designDescription, eventDeadline, fulfillment, name, email, phone) {
  if (pool) {
    const result = await queryPostgres(
      `
      INSERT INTO requests (
        request_type, item_type, quantity, colors, design_description,
        event_deadline, fulfillment, name, email, phone
      )
      VALUES ('order', $1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id;
      `,
      [itemType, quantity, colors, designDescription, eventDeadline, fulfillment, name, email, phone]
    );
    if (result?.rows?.[0]?.id) {
      return { lastInsertRowid: Number(result.rows[0].id) };
    }
  }

  ensureFile(ordersPath);
  const orders = readJson(ordersPath, []);
  const id = nextId(orders);
  const record = { id, ...row(itemType, quantity, colors, designDescription, eventDeadline, fulfillment, name, email, phone) };
  orders.push(record);
  writeJson(ordersPath, orders);
  return { lastInsertRowid: id };
}

export async function insertQuoteRequest(itemType, quantity, colors, designDescription, eventDeadline, fulfillment, name, email, phone) {
  if (pool) {
    const result = await queryPostgres(
      `
      INSERT INTO requests (
        request_type, item_type, quantity, colors, design_description,
        event_deadline, fulfillment, name, email, phone
      )
      VALUES ('quote', $1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id;
      `,
      [itemType, quantity, colors, designDescription, eventDeadline, fulfillment, name, email, phone]
    );
    if (result?.rows?.[0]?.id) {
      return { lastInsertRowid: Number(result.rows[0].id) };
    }
  }

  ensureFile(quotesPath);
  const quotes = readJson(quotesPath, []);
  const id = nextId(quotes);
  const record = { id, ...row(itemType, quantity, colors, designDescription, eventDeadline, fulfillment, name, email, phone) };
  quotes.push(record);
  writeJson(quotesPath, quotes);
  return { lastInsertRowid: id };
}

export async function getRecentOrderRequests(limit) {
  if (pool) {
    const result = await queryPostgres(
      `
      SELECT
        id,
        item_type,
        quantity,
        colors,
        design_description,
        event_deadline,
        fulfillment,
        name,
        email,
        phone,
        TO_CHAR(created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS') AS created_at
      FROM requests
      WHERE request_type = 'order'
      ORDER BY created_at DESC
      LIMIT $1;
      `,
      [limit]
    );
    if (result?.rows) return result.rows;
  }

  ensureFile(ordersPath);
  const orders = readJson(ordersPath, []);
  return [...orders]
    .sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''))
    .slice(0, limit);
}

export async function getRecentQuoteRequests(limit) {
  if (pool) {
    const result = await queryPostgres(
      `
      SELECT
        id,
        item_type,
        quantity,
        colors,
        design_description,
        event_deadline,
        fulfillment,
        name,
        email,
        phone,
        TO_CHAR(created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS') AS created_at
      FROM requests
      WHERE request_type = 'quote'
      ORDER BY created_at DESC
      LIMIT $1;
      `,
      [limit]
    );
    if (result?.rows) return result.rows;
  }

  ensureFile(quotesPath);
  const quotes = readJson(quotesPath, []);
  return [...quotes]
    .sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''))
    .slice(0, limit);
}
