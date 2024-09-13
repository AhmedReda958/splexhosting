"use client";

import { useState, useEffect, useCallback, use } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, CreditCard, Lock, Server, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@prisma/client";
import { ProductCard } from "@/app/components/products";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import PaypalPayButtons from "@/components/PaypalPayButtons";

const steps = [
  { number: 1, title: "Auth" },
  { number: 2, title: "Review" },
  { number: 3, title: "Payment" },
  { number: 4, title: "Confirmation" },
];

export default function Component() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [productData, setProductData] = useState<Product | null>(null);
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const productId = searchParams.get("productId");
  const session = useSession();
  const user = session?.data?.user;

  const { toast } = useToast();

  const getProduct = useCallback(async () => {
    fetch(`/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProductData(data.product))
      .catch((error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      });
  }, [productId, toast]);

  useEffect(() => {
    if (user) {
      setStep(1); // review step
    } else {
      setStep(0); // Auth step
    }
  }, [searchParams, user]);

  useEffect(() => {
    if (productId) {
      getProduct();
    }
  }, [productId, toast, getProduct]);

  const handleNext = () =>
    setStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  const handleBack = () => setStep((prevStep) => Math.max(prevStep - 1, 0));

  const handleLoginRedirect = () => {
    // Simulate redirection to login page
    router.push(
      `/login?redirect=${encodeURIComponent(
        `/complete-server-order?productId=${productId}&step=${step + 1}`
      )}`
    );
  };

  const handleSignUpRedirect = () => {
    // Simulate redirection to sign up page
    router.push(
      `/signup?redirect=${encodeURIComponent(
        `/complete-server-order?productId=${productId}&step=${step + 1}`
      )}`
    );
  };

  if (!productId) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Invalid Product ID</CardTitle>
          <CardDescription>
            The product ID is missing. Please go back and try again.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/products" className="text-primary">
            Go Back to Products
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto mb-20 mt-16">
      <CardHeader>
        <CardTitle>Complete Your VPS Server Order</CardTitle>
        <CardDescription>
          Log in or create an account to proceed with your VPS order.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-8">
          {steps.map((s) => (
            <div key={s.number} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= s.number - 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {step > s.number - 1 ? <Check className="w-4 h-4" /> : s.number}
              </div>
              <span className="text-xs mt-1">{s.title}</span>
            </div>
          ))}
        </div>

        {step === 0 && (
          <div className="space-y-4">
            <Button onClick={handleLoginRedirect} className="w-full">
              <User className="mr-2 h-4 w-4" /> Login
            </Button>
            <Button
              onClick={handleSignUpRedirect}
              variant="outline"
              className="w-full"
            >
              <Lock className="mr-2 h-4 w-4" /> Create Account
            </Button>
          </div>
        )}

        {step === 1 && productData && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Your VPS Selection</h3>
            <Card className="space-y-2 ">
              <CardHeader className="pb-0">
                <CardTitle className="flex justify-between items-center">
                  {productData.name}
                  <Badge variant="secondary">
                    {productData.type === "vps" ? "VPS" : "Dedicated"}
                  </Badge>
                </CardTitle>
                <CardDescription>{productData.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-0">
                <ul>
                  {productData.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <div className="text-3xl font-bold mt-4">
                  ${productData.price}
                  <span className="text-sm font-normal">/mo</span>
                </div>
              </CardFooter>
            </Card>
            <div className="flex justify-end pt-4">
              <Button onClick={handleNext}>Proceed to payment</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <PayStep
            price={productData?.price || 0}
            productId={productId}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        )}

        {step === 3 && (
          <div className="space-y-4 text-center">
            <Check className="w-16 h-16 text-green-500 mx-auto" />
            <h3 className="text-xl font-semibold">Payment Successful!</h3>
            <p>Your VPS server is being set up and will be ready shortly.</p>
            <p>You will receive an email with further instructions.</p>
            <div className="flex justify-end mt-4">
              <Button onClick={() => router.push("/dashboard")}>
                Go to Dashboard
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// handle payment step
const PayStep = ({
  price,
  productId,
  handleBack,
  handleNext,
}: {
  price: number;
  productId: string;
  handleBack: () => void;
  handleNext: () => void;
}) => {
  const [credits, setCredits] = useState(0);
  const [showPaypal, setShowPaypal] = useState(false);

  const { toast } = useToast();

  const getCreditBalance = useCallback(() => {
    fetch("/api/user/credits")
      .then((res) => res.json())
      .then((data) => setCredits(data.credits))
      .catch((error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      });
  }, [toast]);

  useEffect(() => {
    getCreditBalance();
  }, [getCreditBalance]);

  useEffect(() => {
    if (credits < price) {
      setShowPaypal(true);
    }
  }, [credits, price]);

  const handleProductOrder = useCallback(() => {
    if (credits >= price) {
      fetch(`/api/products/new-order/${productId}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast({
              title: "Error",
              description: data.error,
              variant: "destructive",
            });
          } else {
            toast({
              title: "Success",
              description: "Your order has been placed.",
              // variant: "success",
            });
            handleNext();
          }
        });
    } else {
      setShowPaypal(true);
    }
  }, [credits, price, productId, toast, handleNext]);

  const chargeBalanceSuccess = useCallback(() => {
    getCreditBalance();
    setShowPaypal(false);
  }, [getCreditBalance]);

  return (
    <div className="space-y-4">
      <h2>Your Balance: {credits} EUR</h2>
      {showPaypal && (
        <div>
          <h2>Pay with Paypal</h2>
          <PaypalPayButtons
            amount={price}
            goToInvoice={false}
            callback={chargeBalanceSuccess}
          />
        </div>
      )}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button onClick={handleProductOrder} disabled={price > credits}>
          Pay {price.toFixed(2)} EUR
        </Button>
      </div>
    </div>
  );
};
