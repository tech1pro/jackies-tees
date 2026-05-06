import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import CTASection from '../components/CTASection';
import PageMeta from '../components/PageMeta';

const services = [
  {
    title: 'Custom T-Shirts',
    description: 'One-off or bulk orders — screen printing, heat transfer, DTG, and more. Perfect for events, teams, and personal style.',
    image: 'https://images.unsplash.com/photo-1716951884284-4d138f2c42b2?auto=format&fit=crop&w=1200&q=80',
    cta: 'Start an Order',
  },
  {
    title: 'Sweatshirts, Hoodies & Jackets',
    description: 'Custom sweatshirts, hoodies, and jackets for cozy branding. Same great quality and variety as our tees.',
    image: 'https://images.unsplash.com/photo-1719620293684-24c428bce8fb?auto=format&fit=crop&w=1200&q=80',
    cta: 'Start an Order',
  },
  {
    title: 'Tank Tops',
    description: 'Lightweight tanks for summer events, gyms, and casual wear. Available in multiple styles and colors.',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80',
    cta: 'Start an Order',
  },
  {
    title: 'Tote Bags with Rhinestone Lettering',
    description: 'Add sparkle with rhinestone lettering on durable tote bags. Ideal for gifts, events, and personal branding.',
    image: 'https://images.unsplash.com/photo-1763634708808-c56bf88021fd?auto=format&fit=crop&w=1200&q=80',
    cta: 'Start an Order',
  },
  {
    title: 'School & Team Orders',
    description: 'Jerseys, spirit wear, and group orders for schools and teams. We handle the logistics so you can focus on the season.',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80',
    cta: 'Start an Order',
  },
  {
    title: 'Corporate & Business Orders',
    description: 'Professional apparel for your business — polos, tees, branded merchandise. Consistent quality for your brand.',
    image: 'https://images.unsplash.com/photo-1610419993549-7429619cdbd1?auto=format&fit=crop&w=1200&q=80',
    cta: 'Start an Order',
  },
  {
    title: 'Event Shirts',
    description: 'Birthdays, weddings, reunions, fundraisers — we create memorable apparel for any occasion.',
    image: 'https://images.unsplash.com/photo-1560220604-1985ebfe28b1?auto=format&fit=crop&w=1200&q=80',
    cta: 'Start an Order',
  },
  {
    title: 'Walk-in Design Station',
    description: 'Create your design on our in-store design station. Walk-ins welcome — no appointment needed!',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    cta: 'Visit Us',
  },
  {
    title: 'Nationwide Shipping & Local Pickup',
    description: 'We ship across the country and offer free local pickup at our Beverly location. Your choice.',
    image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=1200&q=80',
    cta: 'Get a Quote',
  },
];

export default function Services() {
  return (
    <>
      <PageMeta
        title="Custom Apparel Services | Jackie's Tees"
        description="Screen printing, heat transfer, DTG, embroidery, rhinestone totes, school and team orders, events, and walk-in design — custom apparel services from Jackie's Tees in Beverly, MA."
      />
      <section className="py-16 container mx-auto px-4">
        <SectionHeader
          title="Our Services & Products"
          titleAs="h1"
          subtitle="From custom tees to corporate apparel — we've got you covered."
        />
        <p className="max-w-2xl mx-auto text-gray-700 text-lg text-center mb-12">
          Explore how we help with one-off shirts, bulk team and business orders, sweatshirts and jackets, event merch, and sparkly rhinestone lettering — with local pickup or shipping when your order is ready.
        </p>
        <div className="space-y-8 max-w-3xl mx-auto">
          {services.map((s) => (
            <div
              key={s.title}
              className="overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 md:flex"
            >
              <img
                src={s.image}
                alt={s.title}
                className="h-56 w-full object-cover md:h-auto md:w-64"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-600 mb-4">{s.description}</p>
                <Link
                  to={s.cta === 'Visit Us' ? '/contact' : s.cta === 'Get a Quote' ? '/request-quote' : '/request-order'}
                  className="inline-block px-5 py-2 bg-hot-pink text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors"
                >
                  {s.cta}
                </Link>
              </div>
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
