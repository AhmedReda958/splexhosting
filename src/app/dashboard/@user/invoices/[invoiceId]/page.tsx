import { CalendarIcon, CheckCircleIcon, ClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function Invoice({
  params,
}: {
  params: { invoiceId: string };
}) {
  const invoice = await prisma.inovice.findUnique({
    where: {
      id: Number(params.invoiceId),
    },
  });
  if (!invoice) return <div>Invoice not found</div>;

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Invoice #{invoice.id}</CardTitle>
          <CardDescription>Balance Charge via PayPal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Amount</Label>
              <p className="text-2xl font-bold">${invoice.amount.toFixed(2)}</p>
            </div>
            <div className="space-y-1 text-right">
              <Label className="text-sm font-medium">Status</Label>
              <div className="flex items-center justify-end space-x-2">
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
                <span className="font-semibold text-green-500">
                  {invoice.status}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-sm font-medium">Description</Label>
            <p>{invoice.description}</p>
          </div>
          <div className="space-y-1">
            <Label className="text-sm font-medium">Created At</Label>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-4 h-4 text-gray-500" />
              <span>{invoice.createdAt.toDateString()}</span>
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-sm font-medium">PayPal Payment ID</Label>
            <p className="font-mono text-sm">{invoice.paymentId}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Download PDF</Button>
          <Button asChild>
            <Link href="/dashboard/invoices">
              <ClockIcon className="w-4 h-4 mr-2" />
              View Transaction History
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
