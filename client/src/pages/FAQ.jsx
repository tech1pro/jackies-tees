import SectionHeader from '../components/SectionHeader';
import FAQAccordion from '../components/FAQAccordion';
import CTASection from '../components/CTASection';
import PageMeta from '../components/PageMeta';

export default function FAQ() {
  return (
    <>
      <PageMeta
        title="FAQ | Ordering Custom Shirts at Jackie's Tees"
        description="Frequently asked questions about custom t-shirts and apparel orders at Jackie's Tees in Beverly, MA — turnaround, quantities, designs, sizing, pickup, and shipping."
      />
      <section className="py-16 container mx-auto px-4">
        <SectionHeader
          title="Frequently Asked Questions"
          titleAs="h1"
          subtitle="Everything you need to know about ordering custom apparel."
        />
        <p className="max-w-2xl mx-auto text-gray-700 text-lg text-center mb-10">
          Whether you need team shirts, event tees, embroidery, rhinestones, or a one-off design, these answers explain how ordering works at our Beverly shop and what to expect from quote to pickup or delivery.
        </p>
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
