import SectionHeader from '../components/SectionHeader';
import ContactCards from '../components/ContactCards';
import { BUSINESS } from '../lib/constants';

export default function Contact() {
  return (
    <section className="py-16 container mx-auto px-4">
      <SectionHeader
        title="Contact Us"
        subtitle="We'd love to hear from you. Stop by, call, or email."
      />
      <ContactCards />
      <div className="mt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Hours</h3>
        <p className="text-gray-600">{BUSINESS.hours}</p>
      </div>
      <div className="mt-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Find Us on the Map</h3>
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <iframe
            title="Jackie's Tees location map"
            src={`https://www.google.com/maps?q=${encodeURIComponent(BUSINESS.address)}&output=embed`}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="text-sm text-gray-600 mt-3">
          Map not loading?{' '}
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-hot-pink font-semibold hover:underline"
          >
            Open in Google Maps
          </a>
          .
        </p>
      </div>
    </section>
  );
}
