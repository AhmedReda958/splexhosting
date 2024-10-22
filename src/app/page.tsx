import Image from "next/image";
import {
  ChevronRight,
  Server,
  Shield,
  Zap,
  Clock,
  Star,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BoxReveal } from "@/components/ui/box-reveal";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
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
            <BoxReveal boxColor={"#5046e6"} duration={0.5}>
              <h1 className="text-4xl md:text-4xl font-bold  mb-4 ">
                Powerful VPS and Dedicated Servers
              </h1>
            </BoxReveal>
            <BoxReveal boxColor={"#5046e6"} duration={0.5}>
              <p className="text-xl mb-10 text-muted-foreground">
                Experience lightning-fast performance and unmatched reliability
                for your applications.
              </p>
            </BoxReveal>
            <BoxReveal boxColor={"#5046e6"} duration={0.5}>
              <Link href={"/signup"}>
                <Button size="lg" className="flex items-center">
                  Get Server Now
                  <ChevronRight className="ml-2" />
                </Button>
              </Link>
            </BoxReveal>
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
                title: "Self-developed Webinterface",
                description:
                  "Manage all your services in our self-developed web interface.",
              },
              {
                icon: <Shield className="h-8 w-8 text-primary" />,
                title: "Strong connectivity",
                description:
                  "VenixHosting's network is internally redundant and offers sufficient capacity for your projects.",
              },
              {
                icon: <Clock className="h-8 w-8 text-primary" />,
                title: "Several Payment Methods",
                description:
                  "There are several payment methods available to charge your balance: PayPal, Paysafecard, Sofort, Giropay, Creditcard",
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

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose VenixHosting
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="h-8 w-8 text-primary" />,
                title: "99.8% Uptime",
                description:
                  "We guarantee maximum availability for your services.",
              },
              {
                icon: <Zap className="h-8 w-8 text-primary" />,
                title: "High quality hardware",
                description:
                  "VenixHosting exclusively uses hardware of renowned brand manufacturers (Intel, AMD, Juniper, Arista, ...).",
              },
              {
                icon: <Shield className="h-8 w-8 text-primary" />,
                title: "DDoS Protection",
                description:
                  "We rely on parallel operation of the protection solution from Arbor Networks and the protection from combahton - talk to us about it, we'll be happy to advise you!",
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
                title: "100% Prepaid",
                description:
                  "All our services run on a prepaid basis and without contract periods. All without hidden fees.",
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
      <section className="py-20 bg-primary relative overflow-hidden h-[300px]">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.3}
          duration={1}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,black)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 z-0"
          )}
        />

        <div className="container mx-auto px-4 text-center absolute z-10">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Experience the power of VenixHosting&#39;s VPS and dedicated servers
            today!
          </p>
          <Link href={"/signup"}>
            <Button variant="secondary" size="lg">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>
      {/* FAQs */}
      <FAQs />
      <Footer />
    </div>
  );
}
