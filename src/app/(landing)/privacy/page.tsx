import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Component() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <ScrollArea className="h-[600px] rounded-md border p-4">
        <Accordion type="multiple" defaultValue={["data-we-collect", "how-we-use-your-data", "data-retention", "your-rights"]} className="w-full">
          <AccordionItem value="data-we-collect">
            <AccordionTrigger>Data We Collect</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, and payment details when you sign up for our services.</li>
                <li><strong>Usage Data:</strong> Information on how you use our website and services, such as IP addresses and browser details.</li>
                <li><strong>Cookies:</strong> Small files stored on your device to enhance your browsing experience.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="how-we-use-your-data">
            <AccordionTrigger>How We Use Your Data</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Provision:</strong> To deliver the services you requested, process transactions, and provide customer support.</li>
                <li><strong>Improvement:</strong> To improve our website and services based on usage data and feedback.</li>
                <li><strong>Marketing:</strong> To send you promotional materials and updates about our services, with your consent.</li>
                <li><strong>Legal Compliance:</strong> To comply with legal obligations and protect our rights.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="data-retention">
            <AccordionTrigger>Data Retention</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Information:</strong> Retained as long as your account is active or as needed to provide services and comply with legal obligations.</li>
                <li><strong>Usage Data:</strong> Retained for a period necessary to fulfill the purposes outlined in this policy.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="your-rights">
            <AccordionTrigger>Your Rights</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> You have the right to access your personal data.</li>
                <li><strong>Correction:</strong> You can request corrections to your personal data.</li>
                <li><strong>Deletion:</strong> You can request the deletion of your personal data.</li>
                <li><strong>Objection:</strong> You can object to the processing of your personal data.</li>
                <li><strong>Portability:</strong> You can request a copy of your personal data in a structured, commonly used format.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
    </div>
  )
}