import { Router } from 'express';
import { orderRequestSchema, quoteRequestSchema } from '../validation.js';
import { insertOrderRequest, insertQuoteRequest, getRecentOrderRequests, getRecentQuoteRequests } from '../db.js';

const router = Router();

function validateBody(schema) {
  return (req, res, next) => {
    try {
      const parsed = schema.safeParse(req.body);
      if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        return res.status(400).json({ success: false, errors });
      }
      req.validated = parsed.data;
      next();
    } catch (e) {
      res.status(400).json({ success: false, message: 'Invalid request' });
    }
  };
}

router.post('/order', validateBody(orderRequestSchema), (req, res) => {
  const d = req.validated;
  try {
    const info = insertOrderRequest(
      d.itemType,
      d.quantity,
      d.colors.trim().slice(0, 200),
      d.designDescription,
      d.eventDeadline || null,
      d.fulfillment,
      d.name,
      d.email,
      d.phone
    );
    res.status(201).json({
      success: true,
      id: info.lastInsertRowid,
      message: 'Order request received successfully'
    });
  } catch (err) {
    console.error('Order insert error:', err);
    res.status(500).json({ success: false, message: 'Failed to save order request' });
  }
});

router.post('/quote', validateBody(quoteRequestSchema), (req, res) => {
  const d = req.validated;
  try {
    const info = insertQuoteRequest(
      d.itemType,
      d.quantity,
      d.colors.trim().slice(0, 200),
      d.designDescription,
      d.eventDeadline || null,
      d.fulfillment,
      d.name,
      d.email,
      d.phone
    );
    res.status(201).json({
      success: true,
      id: info.lastInsertRowid,
      message: 'Quote request received successfully'
    });
  } catch (err) {
    console.error('Quote insert error:', err);
    res.status(500).json({ success: false, message: 'Failed to save quote request' });
  }
});

router.get('/recent', (req, res) => {
  const type = req.query.type || 'all';
  const limit = Math.min(parseInt(req.query.limit || '50', 10) || 50, 100);

  try {
    if (type === 'order') {
      const rows = getRecentOrderRequests(limit);
      return res.json({ success: true, type: 'order', data: rows });
    }
    if (type === 'quote') {
      const rows = getRecentQuoteRequests(limit);
      return res.json({ success: true, type: 'quote', data: rows });
    }
    const orders = getRecentOrderRequests(limit);
    const quotes = getRecentQuoteRequests(limit);
    return res.json({
      success: true,
      type: 'all',
      orders,
      quotes
    });
  } catch (err) {
    console.error('Recent requests error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch submissions' });
  }
});

export default router;
