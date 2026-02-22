import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import CTASection from '../components/CTASection';

const services = [
  {
    title: 'Custom T-Shirts',
    description: 'One-off or bulk orders — screen printing, heat transfer, DTG, and more. Perfect for events, teams, and personal style.',
    cta: 'Start an Order',
  },
  {
    title: 'Sweatshirts, Hoodies & Jackets',
    description: 'Custom sweatshirts, hoodies, and jackets for cozy branding. Same great quality and variety as our tees.',
    cta: 'Start an Order',
  },
  {
    title: 'Tank Tops',
    description: 'Lightweight tanks for summer events, gyms, and casual wear. Available in multiple styles and colors.',
    cta: 'Start an Order',
  },
  {
    title: 'Tote Bags with Rhinestone Lettering',
    description: 'Add sparkle with rhinestone lettering on durable tote bags. Ideal for gifts, events, and personal branding.',
    cta: 'Start an Order',
  },
  {
    title: 'School & Team Orders',
    description: 'Jerseys, spirit wear, and group orders for schools and teams. We handle the logistics so you can focus on the season.',
    cta: 'Start an Order',
  },
  {
    title: 'Corporate & Business Orders',
    description: 'Professional apparel for your business — polos, tees, branded merchandise. Consistent quality for your brand.',
    cta: 'Start an Order',
  },
  {
    title: 'Event Shirts',
    description: 'Birthdays, weddings, reunions, fundraisers — we create memorable apparel for any occasion.',
    cta: 'Start an Order',
  },
  {
    title: 'Walk-in Design Station',
    description: 'Create your design on our in-store design station. Walk-ins welcome — no appointment needed!',
    cta: 'Visit Us',
  },
  {
    title: 'Nationwide Shipping & Local Pickup',
    description: 'We ship across the country and offer free local pickup at our Beverly location. Your choice.',
    cta: 'Get a Quote',
  },
];

export default function Services() {
  return (
    <>
      <section className="py-16 container mx-auto px-4">
        <SectionHeader
          title="Our Services & Products"
          subtitle="From custom tees to corporate apparel — we've got you covered."
        />
        <div className="space-y-8 max-w-3xl mx-auto">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-600 mb-4">{s.description}</p>
              <Link
                to={s.cta === 'Visit Us' ? '/contact' : s.cta === 'Get a Quote' ? '/request-quote' : '/request-order'}
                className="inline-block px-5 py-2 bg-hot-pink text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors"
              >
                {s.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className="pb-16 container mx-auto px-4">
        <CTASection />
      </section>
    </>
  );
}
