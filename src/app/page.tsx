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
  Mail,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "./components/navbar";
import Products from "./components/products";
import FAQs from "./components/FAQs";
import { RiScrollToBottomLine } from "react-icons/ri";
import Footer from "./components/footer";

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
      <Footer />
    </div>
  );
}
