import { useState } from "react";
import { ChevronDown, ChevronUp, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { get } from "http";
import { getSession } from "next-auth/react";

// get invoices from the database for the current user

export default async function UserInvoicesPage() {
  const session = await getSession();

  const invoices = await prisma.inovice.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Your Invoices</CardTitle>
          <CardDescription>
            Manage and view your invoice history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {invoices.map((invoice) => (
              <li key={invoice.id}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Inovice ID: #{invoice.id}
                    </CardTitle>
                    <Badge
                      variant={
                        invoice.status === "success"
                          ? "default"
                          : invoice.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {invoice.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${invoice.amount.toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {invoice.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      {invoice.createdAt.toDateString()}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
