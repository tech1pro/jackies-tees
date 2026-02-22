import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { getDataDir } from './utils.js';

const dataDir = getDataDir();
const ordersPath = join(dataDir, 'orders.json');
const quotesPath = join(dataDir, 'quotes.json');

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

export function insertOrderRequest(itemType, quantity, colors, designDescription, eventDeadline, fulfillment, name, email, phone) {
  ensureFile(ordersPath);
  const orders = readJson(ordersPath, []);
  const id = nextId(orders);
  const record = { id, ...row(itemType, quantity, colors, designDescription, eventDeadline, fulfillment, name, email, phone) };
  orders.push(record);
  writeJson(ordersPath, orders);
  return { lastInsertRowid: id };
}

export function insertQuoteRequest(itemType, quantity, colors, designDescription, eventDeadline, fulfillment, name, email, phone) {
  ensureFile(quotesPath);
  const quotes = readJson(quotesPath, []);
  const id = nextId(quotes);
  const record = { id, ...row(itemType, quantity, colors, designDescription, eventDeadline, fulfillment, name, email, phone) };
  quotes.push(record);
  writeJson(quotesPath, quotes);
  return { lastInsertRowid: id };
}

export function getRecentOrderRequests(limit) {
  ensureFile(ordersPath);
  const orders = readJson(ordersPath, []);
  return [...orders]
    .sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''))
    .slice(0, limit);
}

export function getRecentQuoteRequests(limit) {
  ensureFile(quotesPath);
  const quotes = readJson(quotesPath, []);
  return [...quotes]
    .sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''))
    .slice(0, limit);
}
