import { useNavigate } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import OrderForm from '../components/OrderForm';

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
      <SectionHeader
        title="Get a Free Quote"
        subtitle="Share your project details and we'll send you a quote — no obligation."
      />
      <OrderForm
        onSubmit={handleSubmit}
        submitLabel="Request Free Quote"
        isQuote={true}
      />
    </section>
  );
}
