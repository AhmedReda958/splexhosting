import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, Database, HardDrive, Network, Server, Shield } from "lucide-react"

export default function HardwarePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">Our Hardware Infrastructure</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Server Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cpu className="mr-2 h-5 w-5" /> CPU
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Intel® Core™ i9-9900K Processors</li>
                <li>Up to 8 cores per server</li>
                <li>3.6 GHz base clock speed</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HardDrive className="mr-2 h-5 w-5" /> Storage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>NVMe SSD storage for maximum speed</li>
                <li>RAID 10 configuration for data redundancy</li>
                <li>Up to 4TB storage per VPS</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" /> RAM
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>ECC DDR4 RAM for reliability</li>
                <li>Up to 128GB per server</li>
                <li>High-speed memory channels</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Network className="mr-2 h-5 w-5" /> Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>40Gbps network interfaces</li>
                <li>Redundant network connections</li>
                <li>Low-latency routing</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Network Infrastructure</h2>
        <Card>
          <CardContent className="pt-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <Server className="mr-2 h-5 w-5 mt-1 flex-shrink-0" />
                <span>Multiple Tier-1 network providers for optimal routing and redundancy</span>
              </li>
              <li className="flex items-start">
                <Shield className="mr-2 h-5 w-5 mt-1 flex-shrink-0" />
                <span>Advanced DDoS protection with traffic scrubbing</span>
              </li>
              <li className="flex items-start">
                <Network className="mr-2 h-5 w-5 mt-1 flex-shrink-0" />
                <span>Global content delivery network (CDN) for faster content delivery</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Data Center Specifications</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Security</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>24/7 on-site security personnel</li>
                  <li>Biometric access controls</li>
                  <li>CCTV surveillance</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Power</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>N+1 power redundancy</li>
                  <li>Dual-power feeds</li>
                  <li>Backup diesel generators</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Cooling</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Advanced cooling systems</li>
                  <li>Hot/cold aisle configuration</li>
                  <li>Efficient air handling units</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Compliance</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>ISO 27001 certified</li>
                  <li>SSAE 16 / SOC 1 Type II compliant</li>
                  <li>PCI DSS compliant</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Our Hardware Commitment</h2>
        <p className="text-muted-foreground mb-4">
          We continuously invest in cutting-edge hardware to ensure our clients always have access to the best 
          performance and reliability in the industry.
        </p>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          99.98% Uptime Guarantee
        </Badge>
      </section>
    </div>
  )
}