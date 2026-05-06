import { useNavigate, useSearchParams } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import OrderForm from '../components/OrderForm';
import PageMeta from '../components/PageMeta';
import { ITEM_TYPES } from '../lib/constants';

const API_BASE = import.meta.env.VITE_API_BASE || '';

export default function OrderRequest() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestedItemType = searchParams.get('itemType');
  const requestedInterest = searchParams.get('interest');
  const initialItemType = ITEM_TYPES.some((item) => item.value === requestedItemType)
    ? requestedItemType
    : '';
  const initialDesignDescription = requestedInterest
    ? `I'm interested in ${requestedInterest}.`
    : '';

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
      <PageMeta
        title="Request a Custom Apparel Order | Jackie's Tees"
        description="Request custom t-shirts, team gear, embroidery, rhinestones, or event apparel from Jackie's Tees in Beverly, MA. Tell us quantity, timeline, design, and pickup or shipping — we'll follow up promptly."
      />
      <SectionHeader
        title="Request a Custom Order"
        titleAs="h1"
        subtitle="Tell us about your order and we'll get back to you shortly."
      />
      <p className="max-w-2xl mx-auto text-gray-700 text-lg text-center mb-10">
        Use this form to start screen-printed tees, sweatshirts, bags, bulk team orders, and more. We serve Beverly and the North Shore with in-shop design help, local pickup, and nationwide shipping when you need it.
      </p>
      <OrderForm
        onSubmit={handleSubmit}
        submitLabel="Submit Order Request"
        isQuote={false}
        initialValues={{
          itemType: initialItemType,
          designDescription: initialDesignDescription,
        }}
      />
    </section>
  );
}
