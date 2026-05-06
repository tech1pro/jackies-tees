import SectionHeader from '../components/SectionHeader';
import GalleryGrid from '../components/GalleryGrid';
import PageMeta from '../components/PageMeta';

export default function Gallery() {
  return (
    <section className="py-16 container mx-auto px-4">
      <PageMeta
        title="Design Gallery | Jackie's Tees"
        description="Photo gallery of custom tees, team wear, events, rhinestone bags, and embroidery from Jackie's Tees in Beverly, MA — inspiration for your next order."
      />
      <SectionHeader
        title="Design Gallery"
        titleAs="h1"
        subtitle="Explore our work across birthdays, teams, weddings, corporate branding, and more."
      />
      <p className="max-w-2xl mx-auto text-gray-700 text-lg text-center mb-12">
        Browse real projects we've produced for schools, businesses, families, and milestones. Every piece is a reminder of what&apos;s possible when you work with a local shop focused on quality and clean artwork.
      </p>
      <GalleryGrid showAll={true} />
    </section>
  );
}
