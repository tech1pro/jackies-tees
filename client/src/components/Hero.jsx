import { Link } from 'react-router-dom';

export default function Hero({ headline, subcopy }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50 py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          {headline}
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto mb-10">
          {subcopy}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/request-order"
            className="px-8 py-4 bg-hot-pink text-white rounded-xl font-bold text-lg hover:bg-pink-600 transition-all shadow-lg hover:shadow-xl"
          >
            Request a Custom Order
          </Link>
          <Link
            to="/request-quote"
            className="px-8 py-4 bg-electric-blue text-white rounded-xl font-bold text-lg hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
