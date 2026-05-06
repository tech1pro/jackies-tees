import { useState } from 'react';
import { BUSINESS } from '../lib/constants';

const faqs = [
  {
    q: 'What are your minimum order quantities?',
    a: 'We offer both single-item and bulk orders. For screen printing, minimums typically start around 6–12 pieces depending on the design. One-offs and small runs are welcome — especially for our heat-press and rhinestone work.',
  },
  {
    q: 'How long does turnaround take?',
    a: 'Standard orders usually ship or are ready for pickup within 1–2 weeks. Rush orders are available for an additional fee — contact us with your deadline and we’ll do our best to accommodate.',
  },
  {
    q: 'How do I submit my artwork?',
    getA: () =>
      `You can email your design to ${BUSINESS.email}, bring a file on a USB when you visit, or create your design at our in-store design station. We’ll review and confirm before printing.`,
  },
  {
    q: 'What file formats do you accept?',
    a: 'We prefer vector formats (AI, EPS, SVG) or high-resolution PNG/PDF. Minimum 300 DPI for raster images. If you’re unsure, bring what you have and we’ll help.',
  },
  {
    q: 'Do you offer rush orders?',
    a: 'Yes! Rush service is available for an extra fee. Let us know your deadline when you request a quote or submit an order, and we’ll provide options.',
  },
  {
    q: 'Do you ship nationwide or offer local pickup?',
    a: 'Both! We ship nationwide and offer free local pickup at our Beverly location. Choose your preference when placing your order.',
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          <button
            type="button"
            className="w-full px-6 py-4 text-left font-semibold text-gray-900 flex justify-between items-center hover:bg-gray-50 focus:ring-2 focus:ring-hot-pink focus:ring-inset"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            aria-controls={`faq-answer-${i}`}
            id={`faq-question-${i}`}
          >
            {faq.q}
            <span className={`transform transition-transform ${open === i ? 'rotate-180' : ''}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          <div
            id={`faq-answer-${i}`}
            role="region"
            aria-labelledby={`faq-question-${i}`}
            className={`overflow-hidden transition-all ${open === i ? 'max-h-96' : 'max-h-0'}`}
          >
            <div className="px-6 pb-4 text-gray-600">{faq.getA ? faq.getA() : faq.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
