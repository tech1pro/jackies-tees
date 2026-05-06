import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SectionHeader from '../components/SectionHeader';
import ServiceCards from '../components/ServiceCards';
import TestimonialCards from '../components/TestimonialCards';
import GalleryGrid from '../components/GalleryGrid';
import CTASection from '../components/CTASection';
import FAQAccordion from '../components/FAQAccordion';
import ContactCards from '../components/ContactCards';
import PageMeta from '../components/PageMeta';
import BusinessHours from '../components/BusinessHours';
import { BUSINESS } from '../lib/constants';

export default function Home() {
  return (
    <>
      <PageMeta
        title="Custom T-Shirts & Apparel in Beverly, MA | Jackie's Tees"
        description="Order custom tees, screen printing, embroidery, rhinestones, team gear, and more at Jackie's Tees on Rantoul Street. Walk-ins welcome; local pickup and nationwide shipping."
      />
      <Hero
        headline="Custom Apparel Made Easy in Beverly, MA"
        subcopy="From one-off shirts to large event orders, we help you create clean, high-quality designs with fast turnaround and friendly local service."
      />

      <section className="py-16 container mx-auto px-4">
        <SectionHeader
          title="What We Do"
          subtitle="Quality custom apparel for every occasion — local, friendly, and ready to bring your ideas to life."
        />
        <ServiceCards />
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Design Gallery"
            subtitle="See examples of what we've created for our community."
          />
          <GalleryGrid showAll={false} />
          <div className="text-center mt-6">
            <Link
              to="/gallery"
              className="text-hot-pink font-bold hover:underline"
            >
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <SectionHeader
          title="What People Say"
          subtitle="Customer feedback from Beverly and surrounding communities."
        />
        <TestimonialCards limit={4} />
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Find Us"
            subtitle="Stop by our Rantoul Street location in Beverly."
          />
          <ContactCards />
          <div className="text-center mt-6">
            <p className="text-gray-700 font-semibold">Hours</p>
            <BusinessHours className="text-gray-600" listClassName="mt-2 space-y-1 text-sm list-none inline-block text-left mx-auto" />
          </div>
          <div className="text-center mt-4">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-electric-blue text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Quick answers to common questions."
        />
        <div className="max-w-2xl mx-auto">
          <FAQAccordion />
        </div>
        <div className="text-center mt-8">
          <Link to="/faq" className="text-hot-pink font-bold hover:underline">
            View All FAQs →
          </Link>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <CTASection />
      </section>
    </>
  );
}
