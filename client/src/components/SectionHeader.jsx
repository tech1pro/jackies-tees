export default function SectionHeader({ title, subtitle, accentColor = 'hot-pink', titleAs: TitleTag = 'h2' }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <TitleTag className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4`}>
        {title}
      </TitleTag>
      {subtitle && (
        <p className={`text-lg text-gray-600`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
