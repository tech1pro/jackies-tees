import { BUSINESS } from '../lib/constants';

export default function ContactCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <a
        href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS.address)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-2">Address</h3>
        <p className="text-gray-600">{BUSINESS.address}</p>
        <p className="text-hot-pink font-semibold mt-2">Get Directions →</p>
      </a>
      <a
        href={`tel:${BUSINESS.phone.replace(/\D/g, '')}`}
        className="block p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-2">Phone</h3>
        <p className="text-gray-600">{BUSINESS.phone}</p>
        <p className="text-hot-pink font-semibold mt-2">Click to Call →</p>
      </a>
      <a
        href={`mailto:${BUSINESS.email}`}
        className="block p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
        <p className="text-gray-600">{BUSINESS.email}</p>
        <p className="text-hot-pink font-semibold mt-2">Send Email →</p>
      </a>
    </div>
  );
}
