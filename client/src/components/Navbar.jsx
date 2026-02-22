import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BUSINESS } from '../lib/constants';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/faq', label: 'FAQ' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 hover:text-hot-pink transition-colors"
            aria-label="Jackie's Tees - Home"
          >
            Jackie's Tees
          </Link>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-hot-pink"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <div
            className={`absolute md:static top-full left-0 right-0 md:flex md:items-center md:gap-2 bg-white md:bg-transparent shadow-lg md:shadow-none ${open ? 'block' : 'hidden'}`}
          >
            <ul className="flex flex-col md:flex-row md:items-center md:gap-1 p-4 md:p-0">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-lg font-medium transition-colors ${
                        isActive ? 'text-hot-pink bg-pink-50' : 'text-gray-700 hover:text-hot-pink hover:bg-pink-50'
                      }`
                    }
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="flex flex-col md:flex-row gap-2 p-4 md:p-0 md:ml-4">
              <Link
                to="/request-order"
                className="px-4 py-2 bg-hot-pink text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors text-center"
              >
                Request Order
              </Link>
              <Link
                to="/request-quote"
                className="px-4 py-2 bg-electric-blue text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors text-center"
              >
                Free Quote
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
