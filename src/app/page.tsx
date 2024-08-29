import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  Cloud,
  Cpu,
  Globe,
  Lock,
  Zap,
  Server,
  Code,
  ShoppingCart,
  Gamepad,
} from "lucide-react";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Cloud className="h-6 w-6 mr-2" />
          <span className="font-bold">CloudVPS</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#categories"
          >
            Categories
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#pricing"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#contact"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  High-Performance VPS Hosting
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Scalable, secure, and lightning-fast virtual private servers
                  for your applications and websites.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Why Choose Our VPS
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Zap className="w-8 h-8 mb-2" />
                  <CardTitle>High Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Blazing fast SSD storage and the latest CPU technology for
                    optimal performance.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Lock className="w-8 h-8 mb-2" />
                  <CardTitle>Enhanced Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Advanced firewalls and DDoS protection to keep your data
                    safe and secure.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Globe className="w-8 h-8 mb-2" />
                  <CardTitle>Global Network</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Multiple data centers worldwide for low-latency access from
                    anywhere.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="categories" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              VPS Solutions for Every Need
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <Server className="w-8 h-8 mb-2" />
                  <CardTitle>General Purpose</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Balanced performance for a wide range of applications and
                    workloads.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <Code className="w-8 h-8 mb-2" />
                  <CardTitle>Developer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Optimized for coding, testing, and running development
                    environments.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <ShoppingCart className="w-8 h-8 mb-2" />
                  <CardTitle>E-Commerce</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    High availability and performance for online stores and
                    marketplaces.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <Gamepad className="w-8 h-8 mb-2" />
                  <CardTitle>Game Servers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Low-latency, high-performance servers for smooth gaming
                    experiences.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Flexible Pricing Plans
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">$10/mo</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" /> 1 vCPU
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" /> 2GB RAM
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" /> 20GB SSD
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" /> 1TB Transfer
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Choose Plan</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">$25/mo</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" /> 2 vCPU
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" /> 4GB RAM
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" /> 50GB SSD
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" /> 2TB Transfer
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Choose Plan</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">$50/mo</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" /> 4 vCPU
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" /> 8GB RAM
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" /> 100GB SSD
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" /> 5TB Transfer
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Choose Plan</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2023 CloudVPS Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
