import { useNavigate } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import OrderForm from '../components/OrderForm';

const API_BASE = import.meta.env.VITE_API_BASE || '';

export default function OrderRequest() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const res = await fetch(`${API_BASE}/api/requests/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();

    if (!res.ok) {
      if (json.errors) {
        throw new Error(Object.values(json.errors).flat().join(', '));
      }
      throw new Error(json.message || 'Failed to submit order');
    }

    navigate('/thank-you', {
      state: { type: 'order', data, id: json.id },
    });
  };

  return (
    <section className="py-16 container mx-auto px-4">
      <SectionHeader
        title="Request a Custom Order"
        subtitle="Tell us about your order and we'll get back to you shortly."
      />
      <OrderForm
        onSubmit={handleSubmit}
        submitLabel="Submit Order Request"
        isQuote={false}
      />
    </section>
  );
}
