import { useNavigate } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import OrderForm from '../components/OrderForm';
import PageMeta from '../components/PageMeta';

const API_BASE = import.meta.env.VITE_API_BASE || '';

export default function QuoteRequest() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const res = await fetch(`${API_BASE}/api/requests/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();

    if (!res.ok) {
      if (json.errors) {
        throw new Error(Object.values(json.errors).flat().join(', '));
      }
      throw new Error(json.message || 'Failed to submit quote request');
    }

    navigate('/thank-you', {
      state: { type: 'quote', data, id: json.id },
    });
  };

  return (
    <section className="py-16 container mx-auto px-4">
      <PageMeta
        title="Get a Free Quote | Jackie's Tees"
        description="Share your custom apparel project for a free, no-obligation quote from Jackie's Tees in Beverly, MA. We handle tees, sweatshirts, teams, businesses, rhinestones, embroidery, and more."
      />
      <SectionHeader
        title="Get a Free Quote"
        titleAs="h1"
        subtitle="Share your project details and we'll send you a quote — no obligation."
      />
      <p className="max-w-2xl mx-auto text-gray-700 text-lg text-center mb-10">
        Not sure yet on quantities or timelines? Submit what you know — design ideas, garment type, deadline, pickup versus shipping — and we'll reply with pricing and next steps tailored to your order.
      </p>
      <OrderForm
        onSubmit={handleSubmit}
        submitLabel="Request Free Quote"
        isQuote={true}
      />
    </section>
  );
}
