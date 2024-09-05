import Image from "next/image";
import {
  ChevronRight,
  Server,
  Shield,
  Zap,
  Clock,
  Star,
  CheckCircle,
  Scroll,
  ScrollIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "./components/navbar";
import Products from "./components/products";
import FAQs from "./components/FAQs";
import { RiScrollToBottomLine } from "react-icons/ri";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <Navbar />
      {/* Hero Section */}
      <section className="pt-20 pb-20 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-4xl font-bold  mb-4 ">
              Powerful VPS and Dedicated Servers
            </h1>
            <p className="text-xl mb-10 text-muted-foreground">
              Experience lightning-fast performance and unmatched reliability
              for your applications.
            </p>
            <Link href={"/servers"}>
              <Button size="lg" className="flex items-center">
                Get Server Now
                <ChevronRight className="ml-2" />
              </Button>
            </Link>
          </div>
          <div className="md:w-1/2">
            <Image
              src={"/imgs/heroSection.svg"}
              alt="Server Illustration"
              className="w-full h-auto"
              width={300}
              height={250}
            />
          </div>
        </div>
        <div>
          <RiScrollToBottomLine className="w-6 h-6 text-accent mx-auto mt-8" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-accent" id="services">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8 text-primary" />,
                title: "Lightning Fast",
                description:
                  "Experience unparalleled speed with our optimized infrastructure.",
              },
              {
                icon: <Shield className="h-8 w-8 text-primary" />,
                title: "Robust Security",
                description:
                  "Advanced security measures to keep your data safe and secure.",
              },
              {
                icon: <Clock className="h-8 w-8 text-primary" />,
                title: "24/7 Support",
                description:
                  "Our expert team is always available to assist you.",
              },
              {
                icon: <Server className="h-8 w-8 text-primary" />,
                title: "Scalable Solutions",
                description: "Easily scale your resources as your needs grow.",
              },
            ].map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {feature.icon}
                    <span className="ml-2">{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="#products">
        <Products />
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "John Doe",
                role: "CEO, Tech Startup",
                content:
                  "ServerPro has been a game-changer for our business. The performance and reliability are unmatched.",
              },
              {
                name: "Jane Smith",
                role: "CTO, E-commerce Platform",
                content:
                  "The scalability of ServerPro's solutions has allowed us to grow without worrying about infrastructure.",
              },
              {
                name: "Mike Johnson",
                role: "Developer",
                content:
                  "As a developer, I appreciate the robust features and excellent support provided by ServerPro.",
              },
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <p className="text-gray-600 mb-4">{testimonial.content}</p>
                  <div className="flex items-center">
                    <Avatar className="mr-4">
                      <AvatarImage
                        src={`https://i.pravatar.cc/60?img=${index + 1}`}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose ServerPro
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="h-8 w-8 text-primary" />,
                title: "99.9% Uptime",
                description:
                  "We guarantee maximum availability for your services.",
              },
              {
                icon: <Zap className="h-8 w-8 text-primary" />,
                title: "High Performance",
                description:
                  "Cutting-edge hardware ensures blazing-fast performance.",
              },
              {
                icon: <Shield className="h-8 w-8 text-primary" />,
                title: "Advanced Security",
                description:
                  "Multi-layered security approach to protect your data.",
              },
              {
                icon: <Server className="h-8 w-8 text-primary" />,
                title: "Scalable Infrastructure",
                description: "Easily upgrade or downgrade based on your needs.",
              },
              {
                icon: <Clock className="h-8 w-8 text-primary" />,
                title: "24/7 Expert Support",
                description: "Our team is always ready to assist you.",
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-primary" />,
                title: "30-Day Money-Back",
                description: "Try our services risk-free with our guarantee.",
              },
            ].map((reason, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {reason.icon}
                    <span className="ml-2">{reason.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Experience the power of VenixHosting&#39;s VPS and dedicated servers
            today!
          </p>
          <Button variant="secondary" size="lg">
            Sign Up Now
          </Button>
        </div>
      </section>
      {/* FAQs */}
      <FAQs />
      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">VenixHosting</h3>
              <p className="text-gray-400">
                Empowering your digital infrastructure with cutting-edge VPS and
                dedicated server solutions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#services"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400">
                123 Server Street
                <br />
                Cloud City, CF 12345
                <br />
                contact@serverpro.com
                <br />
                +1 (555) 123-4567
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400">
              &copy; 2023 ServerPro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
