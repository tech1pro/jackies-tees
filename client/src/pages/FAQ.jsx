import SectionHeader from '../components/SectionHeader';
import FAQAccordion from '../components/FAQAccordion';
import CTASection from '../components/CTASection';

export default function FAQ() {
  return (
    <>
      <section className="py-16 container mx-auto px-4">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about ordering custom apparel."
        />
        <div className="max-w-2xl mx-auto">
          <FAQAccordion />
        </div>
      </section>
      <section className="pb-16 container mx-auto px-4">
        <CTASection />
      </section>
    </>
  );
}
