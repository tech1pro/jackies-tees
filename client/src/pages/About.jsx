import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import CTASection from '../components/CTASection';
import { BUSINESS } from '../lib/constants';

export default function About() {
  return (
    <>
      <section className="py-16 container mx-auto px-4">
        <SectionHeader
          title="Our Story"
          subtitle="A Beverly favorite for custom apparel."
        />
        <div className="max-w-2xl mx-auto space-y-6 text-gray-700 text-lg">
          <p>
            <strong>Jackie's Tees & Custom Apparel</strong> has been a trusted name in Beverly for custom t-shirts and apparel. In 2022, <strong>{BUSINESS.owners}</strong> took over the shop from Jackie, bringing the same warm, community-focused spirit and dedication to quality that made the store a local favorite.
          </p>
          <p>
            We're proud to serve Beverly, the North Shore, and beyond. Whether you're stopping in for a walk-in design at our in-store design station or placing a bulk order for your school, team, or business — we're here to help bring your ideas to life.
          </p>
          <p>
            We offer nationwide shipping and local pickup, so no matter where you are, we can get your custom gear to you. Walk-ins are always welcome — come say hello on Rantoul Street!
          </p>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Visit Us"
            subtitle={`${BUSINESS.address} • ${BUSINESS.hours}`}
          />
          <div className="text-center">
            <Link
              to="/request-order"
              className="inline-block px-6 py-3 bg-hot-pink text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors mr-2"
            >
              Request an Order
            </Link>
            <Link
              to="/contact"
              className="inline-block px-6 py-3 bg-electric-blue text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      <section className="pb-16 container mx-auto px-4">
        <CTASection />
      </section>
    </>
  );
}
