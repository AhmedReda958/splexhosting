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
import { dedicatedPlans, Plan, vpsPlans } from "@/data";
import { Check, Server } from "lucide-react";

export default function Component() {
  return (
    <div className="container mx-auto px-4 py-8">
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
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="vps">VPS Hosting</TabsTrigger>
          <TabsTrigger value="dedicated">Dedicated Servers</TabsTrigger>
        </TabsList>
        <TabsContent value="vps">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vpsPlans.map((plan) => (
              <ServerPlanCard key={plan.name} plan={plan} type="VPS" />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="dedicated">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dedicatedPlans.map((plan) => (
              <ServerPlanCard key={plan.name} plan={plan} type="Dedicated" />
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
        <Button size="lg">Contact Sales</Button>
      </section>
    </div>
  );
}

function ServerPlanCard({ plan, type }: { plan: Plan; type: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold mb-4">
          ${plan.price}
          <span className="text-sm font-normal">/mo</span>
        </div>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
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
