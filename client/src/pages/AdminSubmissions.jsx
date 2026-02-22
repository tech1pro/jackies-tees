import { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE || '';

const ITEM_LABELS = {
  't-shirts': 'T-Shirts',
  'sweatshirts-hoodies-jackets': 'Sweatshirts/Hoodies/Jackets',
  'tank-tops': 'Tank Tops',
  'tote-bags': 'Tote Bags',
  'school-team': 'School/Team',
  'corporate-business': 'Corporate/Business',
  'event-shirts': 'Event Shirts',
  'walk-in-design': 'Walk-in Design',
  'other': 'Other',
};

function Table({ rows, type }) {
  if (!rows?.length) return <p className="text-gray-500">No submissions.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left font-semibold">ID</th>
            <th className="px-4 py-2 text-left font-semibold">Date</th>
            <th className="px-4 py-2 text-left font-semibold">Name</th>
            <th className="px-4 py-2 text-left font-semibold">Item</th>
            <th className="px-4 py-2 text-left font-semibold">Qty</th>
            <th className="px-4 py-2 text-left font-semibold">Fulfillment</th>
            <th className="px-4 py-2 text-left font-semibold">Contact</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={`${type}-${r.id}`} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-2">{r.id}</td>
              <td className="px-4 py-2">{r.created_at}</td>
              <td className="px-4 py-2">{r.name}</td>
              <td className="px-4 py-2">{ITEM_LABELS[r.item_type] || r.item_type}</td>
              <td className="px-4 py-2">{r.quantity}</td>
              <td className="px-4 py-2">{r.fulfillment}</td>
              <td className="px-4 py-2">
                <a href={`mailto:${r.email}`} className="text-electric-blue hover:underline">{r.email}</a>
                <br />
                <a href={`tel:${r.phone?.replace(/\D/g, '')}`} className="text-electric-blue hover:underline">{r.phone}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminSubmissions() {
  const [type, setType] = useState('all');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/api/requests/recent?type=${type}&limit=50`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setData(json);
        else setError(json.message || 'Failed to load');
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [type]);

  return (
    <section className="py-16 container mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Recent Submissions</h1>
      <div className="flex gap-2 mb-6">
        {['all', 'order', 'quote'].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              type === t ? 'bg-hot-pink text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {t === 'all' ? 'All' : t === 'order' ? 'Orders' : 'Quotes'}
          </button>
        ))}
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && data && (
        <div className="space-y-8">
          {(type === 'all' || type === 'order') && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Requests</h2>
              <Table rows={type === 'all' ? data.orders : data.data} type="order" />
            </div>
          )}
          {(type === 'all' || type === 'quote') && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quote Requests</h2>
              <Table rows={type === 'all' ? data.quotes : data.data} type="quote" />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
