export default function SectionHeader({ title, subtitle, accentColor = 'hot-pink' }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg text-gray-600`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
