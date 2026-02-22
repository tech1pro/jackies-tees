import { Link } from 'react-router-dom';

const categories = [
  { label: 'Birthday Shirts', gradient: 'from-pink-400 to-purple-500', slug: 'birthday' },
  { label: 'Team Jerseys', gradient: 'from-blue-500 to-cyan-400', slug: 'team' },
  { label: 'Wedding Party Tees', gradient: 'from-rose-400 to-pink-500', slug: 'wedding' },
  { label: 'Corporate Logos', gradient: 'from-gray-600 to-gray-800', slug: 'corporate' },
  { label: 'School Spirit', gradient: 'from-green-500 to-emerald-600', slug: 'school' },
  { label: 'Fundraiser & Events', gradient: 'from-yellow-400 to-orange-500', slug: 'fundraiser' },
  { label: 'Tote Bags & Rhinestone', gradient: 'from-fuchsia-400 to-pink-500', slug: 'tote' },
  { label: 'Hoodies & Jackets', gradient: 'from-indigo-500 to-blue-600', slug: 'hoodies' },
];

export default function GalleryGrid({ showAll = false }) {
  const items = showAll ? categories : categories.slice(0, 4);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((cat) => (
        <Link
          key={cat.slug}
          to="/gallery"
          className={`aspect-square rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white font-bold text-center px-4 shadow-lg hover:scale-105 transition-transform`}
        >
          {cat.label}
        </Link>
      ))}
    </div>
  );
}
