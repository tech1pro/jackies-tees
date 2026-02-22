import { Link } from 'react-router-dom';

export default function CTASection({ primaryText = 'Request a Custom Order', secondaryText = 'Get a Free Quote' }) {
  return (
    <section className="py-12 bg-gradient-to-r from-hot-pink to-electric-blue rounded-2xl my-12">
      <div className="container mx-auto px-4 text-center text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to get started?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/request-order"
            className="px-6 py-3 bg-white text-hot-pink rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            {primaryText}
          </Link>
          <Link
            to="/request-quote"
            className="px-6 py-3 bg-bright-yellow text-gray-900 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
          >
            {secondaryText}
          </Link>
        </div>
      </div>
    </section>
  );
}
