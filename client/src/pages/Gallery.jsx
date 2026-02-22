import SectionHeader from '../components/SectionHeader';
import GalleryGrid from '../components/GalleryGrid';

export default function Gallery() {
  return (
    <section className="py-16 container mx-auto px-4">
      <SectionHeader
        title="Design Gallery"
        subtitle="Explore our work across birthdays, teams, weddings, corporate branding, and more."
      />
      <GalleryGrid showAll={true} />
    </section>
  );
}
