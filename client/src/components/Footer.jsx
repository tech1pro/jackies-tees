import { Link } from 'react-router-dom';
import { BUSINESS } from '../lib/constants';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Jackie's Tees & Custom Apparel</h3>
            <p className="text-sm mb-2">{BUSINESS.address}</p>
            <p className="text-sm">
              <a href={`tel:${BUSINESS.phone.replace(/\D/g, '')}`} className="hover:text-hot-pink transition-colors">
                {BUSINESS.phone}
              </a>
            </p>
            <p className="text-sm">
              <a href={`mailto:${BUSINESS.email}`} className="hover:text-hot-pink transition-colors">
                {BUSINESS.email}
              </a>
            </p>
            <p className="text-sm mt-2">Hours: {BUSINESS.hours}</p>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="hover:text-hot-pink transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-hot-pink transition-colors">Gallery</Link>
              </li>
              <li>
                <Link to="/request-order" className="hover:text-hot-pink transition-colors">Request Order</Link>
              </li>
              <li>
                <Link to="/request-quote" className="hover:text-hot-pink transition-colors">Get a Quote</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-hot-pink transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Local • Nationwide</h3>
            <p className="text-sm">
              Local pickup in Beverly • Nationwide shipping available
            </p>
            <p className="text-sm mt-2 text-bright-yellow">
              Walk-ins welcome!
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} Jackie's Tees & Custom Apparel. Beverly, MA.</p>
        </div>
      </div>
    </footer>
  );
}
