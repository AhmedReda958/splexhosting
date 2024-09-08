"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CreditCard, DollarSign } from "lucide-react";
import { useState } from "react";
import PaypalPayButtons from "@/components/PaypalPayButtons";

export default function BalancePage() {
  const [amount, setAmount] = useState(0);

  return (
    <div className="col-span-full">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Charge Credits</CardTitle>
          <CardDescription>
            Add credits to your account using PayPal
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-secondary rounded-lg">
            <CreditCard className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm font-medium">Current Balance</p>
              <p className="text-2xl font-bold">100 credits</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount to add {amount}EUR</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                id="amount"
                type="number"
                value={amount}
                placeholder="Enter amount"
                className="pl-10"
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="block">
          <PaypalPayButtons amount={amount} />
        </CardFooter>
      </Card>
      <div id="paypal-button-container" className="mt-4"></div>
    </div>
  );
}
