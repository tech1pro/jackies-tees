import { useLocation, Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import PageMeta from '../components/PageMeta';
import { ITEM_TYPES, BUSINESS } from '../lib/constants';

export default function ThankYou() {
  const { state } = useLocation();
  const type = state?.type || 'order';
  const data = state?.data;
  const id = state?.id;

  const itemLabel = data?.itemType
    ? ITEM_TYPES.find((t) => t.value === data.itemType)?.label || data.itemType
    : 'N/A';

  const pageTitle =
    type === 'quote' ? "Quote Request Received | Jackie's Tees" : "Order Request Received | Jackie's Tees";
  const pageDescription =
    type === 'quote'
      ? "Thanks — your quote request was submitted to Jackie's Tees. We will follow up shortly with pricing and details."
      : "Thanks — your custom order request was submitted to Jackie's Tees in Beverly, MA. Our team will be in touch soon.";

  return (
    <section className="py-16 container mx-auto px-4">
      <PageMeta title={pageTitle} description={pageDescription} robots="noindex, nofollow" />
      <div className="max-w-xl mx-auto text-center">
        <div className="mb-8">
          <span className="text-6xl">🎉</span>
        </div>
        <SectionHeader
          title={type === 'quote' ? 'Quote Request Received!' : 'Order Request Received!'}
          titleAs="h1"
          subtitle={
            type === 'quote'
              ? "We'll review your request and send you a quote soon."
              : "We've received your order request and will be in touch shortly."
          }
        />
        {data && (
          <div className="bg-gray-50 rounded-2xl p-6 text-left mb-8">
            <h3 className="font-bold text-gray-900 mb-4">Summary</h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Item:</strong> {itemLabel}</li>
              <li><strong>Quantity:</strong> {data.quantity}</li>
              <li><strong>Colors:</strong> {data.colors}</li>
              <li><strong>Design:</strong> {data.designDescription}</li>
              {data.eventDeadline && (
                <li><strong>Deadline:</strong> {data.eventDeadline}</li>
              )}
              <li><strong>Fulfillment:</strong> {data.fulfillment === 'shipping' ? 'Nationwide Shipping' : 'Local Pickup'}</li>
              <li><strong>Contact:</strong> {data.name} — {data.email}, {data.phone}</li>
            </ul>
          </div>
        )}
        <p className="text-gray-600 mb-6">
          Questions? Call us at {BUSINESS.phone} or email {BUSINESS.email}.
        </p>
        <div className="cta-group flex flex-col sm:flex-row flex-wrap gap-4 justify-center" role="group" aria-label="Continue browsing">
          <Link
            to="/"
            className="px-6 py-3 bg-hot-pink text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            to="/services"
            className="px-6 py-3 bg-electric-blue text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Browse Services
          </Link>
        </div>
      </div>
    </section>
  );
}
