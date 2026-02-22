import SectionHeader from '../components/SectionHeader';
import ContactCards from '../components/ContactCards';
import { BUSINESS } from '../lib/constants';

export default function Contact() {
  return (
    <section className="py-16 container mx-auto px-4">
      <SectionHeader
        title="Contact Us"
        subtitle="We'd love to hear from you. Stop by, call, or email."
      />
      <ContactCards />
      <div className="mt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Hours</h3>
        <p className="text-gray-600">{BUSINESS.hours}</p>
      </div>
      <div className="mt-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Find Us on the Map</h3>
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <iframe
            title="Jackie's Tees location map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2930.38!2d-70.8817!3d42.5511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e313857c99b77f%3A0x0!2s238%20Rantoul%20St%2C%20Beverly%2C%20MA%2001915!5e0!3m2!1sen!2sus!4v1"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
