import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import CTASection from '../components/CTASection';
import PageMeta from '../components/PageMeta';
import BusinessHours from '../components/BusinessHours';
import { BUSINESS } from '../lib/constants';

export default function About() {
  return (
    <>
      <PageMeta
        title="Our Story | Jackie's Tees & Custom Apparel"
        description="Meet Jackie's Tees in Beverly, MA — local custom screen printing, embroidery, walk-in designs, and nationwide shipping. Family-run on Rantoul Street since 2022."
      />
      <section className="py-16 container mx-auto px-4">
        <SectionHeader
          title="Our Story"
          titleAs="h1"
          subtitle="A Beverly favorite for custom apparel."
        />
        <p className="max-w-2xl mx-auto text-gray-700 text-lg text-center mb-8">
          Learn how we carry on a neighborhood tradition of quality custom shirts, team spirit wear, rhinestone lettering, and friendly in-person help — serving the North Shore and customers who ship nationwide.
        </p>
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
          <SectionHeader title="Visit Us" subtitle={BUSINESS.address} />
          <div className="max-w-md mx-auto mb-8">
            <h3 className="text-center text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
              Hours
            </h3>
            <BusinessHours listClassName="space-y-1 text-sm text-center list-none" />
          </div>
          <div className="cta-group flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
            <Link
              to="/request-order"
              className="inline-block px-6 py-3 bg-hot-pink text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors text-center"
            >
              Request an Order
            </Link>
            <Link
              to="/contact"
              className="inline-block px-6 py-3 bg-electric-blue text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors text-center"
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
