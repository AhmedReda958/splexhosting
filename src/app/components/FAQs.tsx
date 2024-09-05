import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What is the difference between VPS and dedicated servers?",
    answer:
      "A VPS (Virtual Private Server) is a virtualized server that shares hardware with other VPS instances, while providing dedicated resources and isolation. A dedicated server is an entire physical machine reserved for a single user, offering maximum performance and control.",
  },
  {
    question: "How do I choose between VPS and dedicated servers?",
    answer:
      "Choose a VPS if you need more resources than shared hosting but don't require an entire server. Opt for a dedicated server if you need maximum performance, have high traffic websites, or require complete control over the server environment.",
  },
  {
    question: "What operating systems do you support?",
    answer:
      "We support a wide range of operating systems, including various Linux distributions (such as Ubuntu, CentOS, and Debian) and Windows Server editions. The exact options may vary between VPS and dedicated server offerings.",
  },
  {
    question: "Do you offer managed services?",
    answer:
      "Yes, we offer managed services for both VPS and dedicated servers. Our team can handle tasks such as security updates, performance optimization, and troubleshooting, allowing you to focus on your core business.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "We offer 24/7 technical support via ticket system, live chat, and phone. Our support team can assist with server-related issues, network problems, and general inquiries about our services.",
  },
  {
    question: "How quickly can I get my server set up?",
    answer:
      "VPS instances are typically provisioned within minutes of order confirmation. Dedicated servers may take a few hours to set up, depending on the specific hardware configuration and any custom requirements.",
  },
  {
    question: "Can I upgrade my server resources later?",
    answer:
      "Yes, VPS resources can usually be upgraded with minimal downtime. For dedicated servers, upgrades may require scheduling maintenance windows, especially for hardware changes.",
  },
  {
    question: "What about data backups?",
    answer:
      "We offer automated backup solutions for both VPS and dedicated servers. However, we always recommend maintaining your own backups as an additional precaution.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-20">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h1>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto"
        >
          {faqItems.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
