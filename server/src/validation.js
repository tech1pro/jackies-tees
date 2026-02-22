import { z } from 'zod';

const itemTypeSchema = z.enum([
  't-shirts',
  'sweatshirts-hoodies-jackets',
  'tank-tops',
  'tote-bags',
  'school-team',
  'corporate-business',
  'event-shirts',
  'walk-in-design',
  'other'
]);

const fulfillmentSchema = z.enum(['shipping', 'pickup']);

export const orderRequestSchema = z.object({
  itemType: itemTypeSchema,
  quantity: z.number().int().min(1).max(1000),
  colors: z.string().min(1).max(200),
  designDescription: z.string().min(1).max(2000),
  eventDeadline: z.string().max(50).optional(),
  fulfillment: fulfillmentSchema,
  name: z.string().min(1).max(100).regex(/^[\p{L}\p{N}\s\-'.]+$/u),
  email: z.string().email().max(200),
  phone: z.string().min(7).max(20).regex(/^[\d\s\-\(\)\.\+]+$/)
});

export const quoteRequestSchema = orderRequestSchema;
