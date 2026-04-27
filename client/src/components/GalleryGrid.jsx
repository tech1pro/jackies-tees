import { Link } from 'react-router-dom';

const categories = [
  {
    label: 'Birthday Shirts',
    image: 'https://images.unsplash.com/photo-1760036120428-42742c16a23c?auto=format&fit=crop&w=900&q=80',
    itemType: 'event-shirts',
    slug: 'birthday',
  },
  {
    label: 'Team Jerseys',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=80',
    itemType: 'school-team',
    slug: 'team',
  },
  {
    label: 'Wedding Party Tees',
    image: 'https://images.unsplash.com/photo-1635369422552-5f60fcd64340?auto=format&fit=crop&w=900&q=80',
    itemType: 'event-shirts',
    slug: 'wedding',
  },
  {
    label: 'Corporate Logos',
    image: 'https://images.unsplash.com/photo-1610419993549-7429619cdbd1?auto=format&fit=crop&w=900&q=80',
    itemType: 'corporate-business',
    slug: 'corporate',
  },
  {
    label: 'School Spirit',
    image: 'https://images.unsplash.com/photo-1598863505577-74750d3b4475?auto=format&fit=crop&w=900&q=80',
    itemType: 'school-team',
    slug: 'school',
  },
  {
    label: 'Fundraiser & Events',
    image: 'https://images.unsplash.com/photo-1560220604-1985ebfe28b1?auto=format&fit=crop&w=900&q=80',
    itemType: 'event-shirts',
    slug: 'fundraiser',
  },
  {
    label: 'Tote Bags & Rhinestone',
    image: 'https://images.unsplash.com/photo-1763634708808-c56bf88021fd?auto=format&fit=crop&w=900&q=80',
    itemType: 'tote-bags',
    slug: 'tote',
  },
  {
    label: 'Hoodies & Jackets',
    image: 'https://images.unsplash.com/photo-1719620293684-24c428bce8fb?auto=format&fit=crop&w=900&q=80',
    itemType: 'sweatshirts-hoodies-jackets',
    slug: 'hoodies',
  },
];

export default function GalleryGrid({ showAll = false }) {
  const items = showAll ? categories : categories.slice(0, 4);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((cat) => (
        <div
          key={cat.slug}
          className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-900 shadow-lg"
        >
          <img
            src={cat.image}
            alt={cat.label}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/35 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
            <Link
              to={`/request-order?itemType=${cat.itemType}&interest=${encodeURIComponent(cat.label)}`}
              className="pointer-events-auto rounded-full bg-hot-pink px-4 py-2 text-sm font-bold text-white shadow-lg transition-colors hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-200 md:px-5 md:text-base"
            >
              Order Now
            </Link>
          </div>
          <span className="absolute inset-x-3 bottom-3 text-center text-lg font-bold text-white drop-shadow">
            {cat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
