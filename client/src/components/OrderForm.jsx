import { useState } from 'react';
import { ITEM_TYPES } from '../lib/constants';

export default function OrderForm({ onSubmit, submitLabel = 'Submit Order Request', isQuote = false }) {
  const [form, setForm] = useState({
    itemType: '',
    quantity: '',
    colors: '',
    designDescription: '',
    eventDeadline: '',
    fulfillment: 'pickup',
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.itemType) e.itemType = 'Select an item type';
    if (!form.quantity) e.quantity = 'Enter quantity';
    else if (form.quantity < 1 || form.quantity > 1000) e.quantity = 'Quantity must be 1–1000';
    if (!form.colors.trim()) e.colors = 'Enter color(s)';
    if (!form.designDescription.trim()) e.designDescription = 'Describe your design';
    if (!form.name.trim()) e.name = 'Enter your name';
    if (!form.email.trim()) e.email = 'Enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.phone.trim()) e.phone = 'Enter your phone';
    else if (form.phone.replace(/\D/g, '').length < 7) e.phone = 'Enter a valid phone number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    if (!validate()) return;
    setLoading(true);
    try {
      await onSubmit({
        itemType: form.itemType,
        quantity: parseInt(form.quantity, 10),
        colors: form.colors.trim(),
        designDescription: form.designDescription.trim(),
        eventDeadline: form.eventDeadline.trim() || undefined,
        fulfillment: form.fulfillment,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      });
    } catch (err) {
      setApiError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <div>
        <label htmlFor="itemType" className="block font-semibold text-gray-900 mb-1">
          Item Type <span className="text-red-500">*</span>
        </label>
        <select
          id="itemType"
          name="itemType"
          value={form.itemType}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.itemType ? 'border-red-500' : 'border-gray-300'}`}
          aria-invalid={!!errors.itemType}
          aria-describedby={errors.itemType ? 'itemType-error' : undefined}
        >
          <option value="">Select...</option>
          {ITEM_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.itemType && (
          <p id="itemType-error" className="text-red-500 text-sm mt-1" role="alert">
            {errors.itemType}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="quantity" className="block font-semibold text-gray-900 mb-1">
          Quantity <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min={1}
          max={1000}
          value={form.quantity}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.quantity ? 'border-red-500' : 'border-gray-300'}`}
          aria-invalid={!!errors.quantity}
        />
        {errors.quantity && (
          <p className="text-red-500 text-sm mt-1" role="alert">
            {errors.quantity}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="colors" className="block font-semibold text-gray-900 mb-1">
          Colors <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="colors"
          name="colors"
          value={form.colors}
          onChange={handleChange}
          placeholder="e.g. Navy blue, white"
          className={`w-full px-4 py-2 border rounded-lg ${errors.colors ? 'border-red-500' : 'border-gray-300'}`}
          aria-invalid={!!errors.colors}
        />
        {errors.colors && (
          <p className="text-red-500 text-sm mt-1" role="alert">
            {errors.colors}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="designDescription" className="block font-semibold text-gray-900 mb-1">
          Design Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="designDescription"
          name="designDescription"
          rows={4}
          value={form.designDescription}
          onChange={handleChange}
          placeholder="Describe your design, logos, text, placement..."
          className={`w-full px-4 py-2 border rounded-lg ${errors.designDescription ? 'border-red-500' : 'border-gray-300'}`}
          aria-invalid={!!errors.designDescription}
        />
        {errors.designDescription && (
          <p className="text-red-500 text-sm mt-1" role="alert">
            {errors.designDescription}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="eventDeadline" className="block font-semibold text-gray-900 mb-1">
          Event / Deadline Date
        </label>
        <input
          type="text"
          id="eventDeadline"
          name="eventDeadline"
          value={form.eventDeadline}
          onChange={handleChange}
          placeholder="e.g. March 15, 2025 or ASAP"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-900 mb-2">
          Fulfillment <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="fulfillment"
              value="pickup"
              checked={form.fulfillment === 'pickup'}
              onChange={handleChange}
            />
            Local Pickup
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="fulfillment"
              value="shipping"
              checked={form.fulfillment === 'shipping'}
              onChange={handleChange}
            />
            Nationwide Shipping
          </label>
        </div>
      </div>

      <div className="border-t pt-6 space-y-4">
        <h3 className="font-bold text-gray-900">Contact Info</h3>
        <div>
          <label htmlFor="name" className="block font-semibold text-gray-900 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1" role="alert">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block font-semibold text-gray-900 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1" role="alert">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block font-semibold text-gray-900 mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1" role="alert">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      {apiError && (
        <p className="text-red-500 text-sm" role="alert">
          {apiError}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-hot-pink text-white rounded-xl font-bold text-lg hover:bg-pink-600 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Submitting...' : submitLabel}
      </button>
    </form>
  );
}
