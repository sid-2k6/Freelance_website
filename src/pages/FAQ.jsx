import AnimatedBackground from '../components/ui/AnimatedBackground';
import SectionHeading from '../components/ui/SectionHeading';
import FAQAccordion from '../components/sections/FAQAccordion';
import CTASection from '../components/sections/CTASection';
import { faqs } from '../data/faq';

export default function FAQ() {
  return (
    <div>
      <section className="relative section-pad">
        <AnimatedBackground variant="minimal" />
        <div className="container-wide">
          <SectionHeading
            eyebrow="Help center"
            title="Frequently asked questions"
            subtitle="Can't find what you're looking for? Reach out via the contact page and we'll be happy to help."
          />
          <div className="mt-14">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>
      <CTASection title="Still have questions?" subtitle="Our team is a message away and typically replies within one business day." />
    </div>
  );
}
