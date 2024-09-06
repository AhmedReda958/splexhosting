import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Component() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <ScrollArea className="h-[600px] rounded-md border p-4">
        <Accordion type="multiple" defaultValue={["general-terms", "hosting-terms", "servers-terms"]} className="w-full">
          <AccordionItem value="general-terms">
            <AccordionTrigger>General Terms</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>VenixHosting will suspend any server running a website with copyrighted content or any pornography content.</li>
                <li>This agreement is made between the client and VenixHosting, and the agreement must be read in its entirety, including all its terms. Signing the contract or booking the service implies full acceptance of everything stated in this agreement, including all its terms.</li>
                <li>VenixHosting does not monitor content, but it has the right to suspend or inspect the service contents if any illegal activity is detected or by order of local or international authorities.</li>
                <li>VenixHosting has the right to suspend any service participating in a DOS/DDOS attack until necessary actions are taken.</li>
                <li>VenixHosting will not provide any compensation or refunds for services suspended due to participation in a DOS/DDOS attack.</li>
                <li>VenixHosting will not be liable for any material or moral damages resulting from the suspension/cancellation of the service due to participation in a DOS/DDOS attack.</li>
                <li>Installing any unlicensed software or violating intellectual property rights authorizes VenixHosting to suspend the service in case of a formal complaint against the service if no action is taken by the client after being notified.</li>
                <li>VenixHosting has the right to suspend the service in case of a formal complaint about sending large quantities of spam from the service.</li>
                <li>VenixHosting has the right to suspend the service without consulting the client in case of a formal complaint against the service for executing attacks on other sites or if the service is under attack.</li>
                <li>VenixHosting has the right to suspend the service without consulting the client in case of a formal complaint against the service for containing and distributing malicious software, pornographic information, hacking tools, or any programs used for malicious purposes.</li>
                <li>VenixHosting has the right to inspect the service contents when violating any of the existing laws.</li>
                <li>If the data transfer rate (Traffic Bandwidth) exceeds the specified limit agreed upon at the time of the request, the site will be automatically suspended until the beginning of the next month.</li>
                <li>All paid amounts are service fees and are non-refundable or applicable to other services.</li>
                <li>VenixHosting will send an email to the client reminding them of the invoice due date 5 days before the invoice due date if the billing cycle is monthly.</li>
                <li>VenixHosting will send an email to the client reminding them of the invoice due date 10 days before the invoice due date if the billing cycle is quarterly.</li>
                <li>VenixHosting will send an email to the client reminding them of the invoice due date 15 days before the invoice due date if the billing cycle is semi-annual.</li>
                <li>VenixHosting will send an email to the client reminding them of the invoice due date one month before the invoice due date if the billing cycle is annual.</li>
                <li>VenixHosting has the right to temporarily suspend the service if the client is late in paying the due invoice, and the service will not be restored until the invoice is paid.</li>
                <li>VenixHosting has the right to cancel the service and delete all data and backups if the client is late in paying the due invoice. The client has no right to claim any data from the service after that.</li>
                <li>All expenses related to the service are considered prepaid by the client, and the company is not responsible for any damage or loss resulting from the cancellation of the service or the site after the service period has ended if the client has not paid the renewal fees.</li>
                <li>VenixHosting reserves the right to refuse to provide service to any person, group, or company without giving reasons, and it also has the right to terminate the service in case of repeated complaints against the same client.</li>
                <li>The client has the right to request service data once the payment is confirmed or once an official receipt is sent from the transferring company.</li>
                <li>All paid amounts are non-refundable, and a service that has been paid for cannot be exchanged for another service.</li>
                <li>The company will deliver the service data to the client upon service activation, and the client is responsible for keeping this information confidential and not leaking it. The company is not responsible for any damage that may occur to the client due to leaking this data.</li>
                <li>The company undertakes not to disclose the clients information unless requested by official authorities.</li>
                <li>Anyone who requests our service is considered to release the company from any legal prosecution, damage, or loss caused by their service, and they are considered to agree to bear full legal, financial, and ethical responsibility for any damage they cause. The company is not responsible for compensating its clients for any form of loss resulting from implementing a decision issued by official authorities (local or international) against any of the clients.</li>
                <li>The company has the right to change or add any clause or provision of this agreement at any time, and the client must always be aware of these changes even if no notification is received.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="hosting-terms">
            <AccordionTrigger>Hosting Terms</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>The company assumes that all content of the hosted sites is legal, and any complaint about the content of any site authorizes the company to suspend the site and contact the client to resolve the issue. The site will not be reopened until the problem is resolved.</li>
                <li>The site contains any images or phrases that are immoral and contrary to our beliefs and Islamic religion.</li>
                <li>Unauthorized attempts to access other sites on the server.</li>
                <li>The presence of confidential or prohibited materials.</li>
                <li>The site contains anything protected under international trade laws.</li>
                <li>Anything that causes harm or threatens a particular person or group.</li>
                <li>Providing services or materials deceptively.</li>
                <li>Spreading viruses or any form of harmful software over the network.</li>
                <li>Anything related to hacking (Hackers) or links to sites containing spyware or hacking programs to access others computers and information.</li>
                <li>Uploading scripts that affect the servers performance, such as proxy scripts or shell breaking scripts, and the company has the right to permanently close the site if they are found in any of the sites.</li>
                <li>Any pages or sites that conduct fraud on users.</li>
                <li>The company reserves the right to delete all or part of the information on its servers that it considers undesirable or in conflict with the hosting agreement.</li>
                <li>Consuming server resources more than the allowed limit exposes your site to closure, and attempting to hack the server exposes you to legal accountability.</li>
                <li>Complying with sending a maximum of 1000 emails per day, and any excess will be blocked.</li>
                <li>Technical support for hosting does not include anything related to site hacks or software, only the server itself.</li>
                <li>If the clients site is hacked, VenixHosting is not responsible for solving the hacking problem or determining its causes unless the hacking is from the server itself.</li>
                <li>The company makes daily, weekly, and monthly backups of all sites. VenixHosting does not guarantee the validity of the backup content unless previously agreed. The client has the right to request the restoration of any backup by opening a ticket to the technical support department.</li>
                <li>The client has the right to request technical support for the space or domain only. Any support request for scripts or programs installed on the site will be ignored unless previously agreed with the company.</li>
                <li>The client has the right to request a backup of the site if they wish to transfer their site to another company, provided that there are no outstanding financial dues.</li>
                <li>If the client transfers their site to another company, they have the right to request the backup again within a week from the date of the first backup requested to transfer their site. After this period, the entire backup will be deleted from the companys servers, and the client has no right to claim any data after this period.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="servers-terms">
            <AccordionTrigger>Servers Terms</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>VenixHosting guarantees continuous connection to the global network for servers located in its data center in Germany, excluding outages caused by the clients misconduct or general failures beyond the data centers control. This also includes downtime resulting from network maintenance or hardware updates, for which the client is notified in advance of the time and duration. A server is considered connected to the global network if it responds to a Ping command, regardless of the status of the programs on the server.</li>
                <li>VenixHosting guarantees continuous power sources for servers located in its data center in Germany, excluding outages caused by the clients misconduct.</li>
                <li>VenixHosting guarantees the replacement of any part of servers located in its data center in Germany within two days of the client reporting the faulty part by opening a ticket with the technical support department. The time for replacing faulty parts does not include the time required to reinstall any new software or operating systems.</li>
                <li>All IP addresses provided with the servers are the exclusive property of VenixHosting and are non-transferable or ownable by the client. Any use of an IP not assigned to the client with the server is a violation of the service terms and exposes the client to accountability.</li>
                <li>The laws and regulations in Egypt prohibit hosting VPN servers. Therefore, using or merely installing it will expose the client to suspension.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
    </div>
  )
}