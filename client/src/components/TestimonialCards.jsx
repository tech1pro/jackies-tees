const testimonials = [
  {
    quote: "Rayshelle and Dante did an amazing job on our wedding party tees! The quality was incredible and everyone loved the design. True Beverly gems.",
    name: "Sarah M.",
    location: "Beverly, MA",
  },
  {
    quote: "Ordered 50 shirts for our charity fundraiser. Fast turnaround, great communication, and the prints came out vibrant. Highly recommend!",
    name: "Mike T.",
    location: "Danvers, MA",
  },
  {
    quote: "Walked in with an idea and left with a perfect custom hoodie. The design station is so much fun — my kids loved picking the colors!",
    name: "Jen L.",
    location: "Salem, MA",
  },
  {
    quote: "We've ordered team jerseys from Jackie's Tees for three seasons. Consistent quality, fair prices, and they always deliver on time.",
    name: "Coach Dave",
    location: "Peabody, MA",
  },
];

export default function TestimonialCards({ limit }) {
  const items = limit ? testimonials.slice(0, limit) : testimonials;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((t) => (
        <blockquote
          key={t.name}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <p className="text-gray-700 text-lg mb-4">"{t.quote}"</p>
          <footer>
            <cite className="not-italic font-bold text-gray-900">{t.name}</cite>
            <span className="text-gray-500 text-sm block">{t.location}</span>
          </footer>
        </blockquote>
      ))}
    </div>
  );
}
