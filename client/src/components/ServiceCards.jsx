import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Custom T-Shirts',
    description: 'One-off or bulk orders — perfect for events, teams, and personal style.',
    icon: '👕',
    accent: 'hot-pink',
  },
  {
    title: 'Sweatshirts & Hoodies',
    description: 'Custom sweatshirts, hoodies, and jackets for cozy branding.',
    icon: '🧥',
    accent: 'electric-blue',
  },
  {
    title: 'Tote Bags',
    description: 'Rhinestone lettering and custom designs on durable tote bags.',
    icon: '👜',
    accent: 'bright-yellow',
  },
  {
    title: 'School & Team Orders',
    description: 'Jerseys, spirit wear, and group orders for schools and teams.',
    icon: '🏫',
    accent: 'electric-blue',
  },
  {
    title: 'Corporate & Events',
    description: 'Corporate branding, weddings, birthdays, reunions, and fundraisers.',
    icon: '🎉',
    accent: 'hot-pink',
  },
  {
    title: 'Walk-in Design',
    description: 'Use our in-store design station — walk-ins welcome!',
    icon: '✨',
    accent: 'bright-yellow',
  },
];

export default function ServiceCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((s) => (
        <div
          key={s.title}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
        >
          <span className="text-4xl mb-4 block">{s.icon}</span>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
          <p className="text-gray-600 mb-4">{s.description}</p>
          <Link
            to="/request-order"
            className={`inline-block px-4 py-2 rounded-lg font-semibold text-white bg-${s.accent} hover:opacity-90 transition-opacity`}
            style={{
              backgroundColor: s.accent === 'hot-pink' ? '#ec4899' : s.accent === 'electric-blue' ? '#3b82f6' : '#fbbf24',
            }}
          >
            Start Order
          </Link>
        </div>
      ))}
    </div>
  );
}
