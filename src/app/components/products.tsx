import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import { Product } from "@prisma/client";
import { Check } from "lucide-react";
import Link from "next/link";

async function getProducts() {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    // Handle the error here, e.g. show an error message to the user
    return [];
  }
}

export default async function Products() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-20">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Choose Your Perfect Server Solution
        </h1>
        <p className="text-xl text-muted-foreground">
          Whether you need the flexibility of a VPS or the power of a Dedicated
          Server, we&apos;ve got you covered.
        </p>
      </header>

      <Tabs defaultValue="vps" className="mb-12">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="vps">VPS Hosting</TabsTrigger>
          <TabsTrigger value="dedicated">Dedicated Servers</TabsTrigger>
        </TabsList>
        <TabsContent value="vps">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products
              .filter((product) => product.type == "vps")
              .map((product) => (
                <ProductCard key={product.id} product={product} type="VPS" />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="dedicated">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products
              .filter((product) => product.type == "dedicated")
              .map((product) => (
                <ProductCard key={product.id} product={product} type="Dedicated" />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <section className="text-center mt-16">
        <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
        <p className="text-xl text-muted-foreground mb-6">
          Our experts are here to help you find the perfect server solution for
          your needs.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact">Contact Sales</Link>
        </Button>
      </section>
    </div>
  );
}

function ProductCard({ product, type }: { product: Product; type: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold mb-4">
          ${product.price}
          <span className="text-sm font-normal">/mo</span>
        </div>
        <ul className="space-y-2">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Choose {type}</Button>
      </CardFooter>
    </Card>
  );
}
