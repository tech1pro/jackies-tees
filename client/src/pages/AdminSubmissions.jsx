import { useState, useEffect } from 'react';
import PageMeta from '../components/PageMeta';

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
  const [savedToken, setSavedToken] = useState(() => localStorage.getItem('adminToken') || '');
  const [tokenInput, setTokenInput] = useState(() => localStorage.getItem('adminToken') || '');

  useEffect(() => {
    if (!savedToken) {
      setLoading(false);
      setData(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/api/requests/recent?type=${type}&limit=50`, {
      headers: { 'x-admin-token': savedToken }
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((json) => {
            throw new Error(json.message || 'Failed to load');
          });
        }
        return res.json();
      })
      .then((json) => {
        if (json.success) setData(json);
        else setError(json.message || 'Failed to load');
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [type, savedToken]);

  function saveTokenAndLoad() {
    const trimmed = tokenInput.trim();
    if (!trimmed) return;
    localStorage.setItem('adminToken', trimmed);
    setSavedToken(trimmed);
  }

  function clearToken() {
    localStorage.removeItem('adminToken');
    setSavedToken('');
    setTokenInput('');
    setData(null);
    setError(null);
  }

  return (
    <section className="py-16 container mx-auto px-4">
      <PageMeta
        title="Submissions | Jackie's Tees Admin"
        description="Administrative view for recent order and quote submissions."
        robots="noindex, nofollow"
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Recent Submissions</h1>
      <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="admin-token">
          Admin Access Token
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            id="admin-token"
            type="password"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="Enter ADMIN_TOKEN"
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
          />
          <button
            type="button"
            onClick={saveTokenAndLoad}
            className="px-4 py-2 rounded-lg bg-hot-pink text-white font-semibold"
          >
            Save
          </button>
          <button
            type="button"
            onClick={clearToken}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold"
          >
            Clear
          </button>
        </div>
      </div>
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

      {!savedToken && <p className="text-gray-500">Enter the admin token to view submissions.</p>}
      {loading && savedToken && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && savedToken && !error && data && (
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
