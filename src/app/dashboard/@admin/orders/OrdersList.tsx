"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  CheckIcon,
  XIcon,
  MoreHorizontalIcon,
  UserIcon,
  ServerIcon,
  PackageIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Order } from "@prisma/client";
import { title } from "process";
import { useToast } from "@/hooks/use-toast";

export default function OrderList({
  initialOrders,
}: {
  initialOrders: Order[];
}) {
  const [orders, setOrders] = useState(initialOrders);
  const router = useRouter();

  const { toast } = useToast();

  const handleAccept = async (orderId: number): Promise<void> => {
    try {
      // In a real application, you would call an API to update the order status
      const response = await fetch(`/api/orders/${orderId}/accept`, {
        method: "POST",
      });
      if (response.ok) {
        setOrders(
          orders.map((order) =>
            order.id === orderId ? { ...order, status: "accepted" } : order
          )
        );
        toast({ title: "Order accepted successfully" });
        // router.reload();
      } else {
        throw new Error("Failed to accept order");
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Failed to accept order", variant: "destructive" });
    }
  };

  const handleReject = async (orderId: number) => {
    // In a real application, you would call an API to update the order status
    const response = await fetch(`/api/orders/${orderId}/reject`, {
      method: "POST",
    });
    if (response.ok) {
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: "rejected" } : order
        )
      );
      router.refresh();
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>User ID</TableHead>
          <TableHead>Product ID</TableHead>
          <TableHead>Sever ID</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.userId}</TableCell>
            <TableCell>{order.productId}</TableCell>
            <TableCell>{order.serverId}</TableCell>
            <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
            <TableCell>
              <Badge>{order.status}</Badge>
            </TableCell>
            <TableCell className="flex items-center gap-3">
              {order.status === "pending" && (
                <div className="flex space-x-2">
                  <Button size="sm" onClick={() => handleAccept(order.id)}>
                    <CheckIcon className="w-4 h-4 mr-1" /> Accept
                  </Button>
                  {/* <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleReject(order.id)}
                  >
                    <XIcon className="w-4 h-4 mr-1" /> Reject
                  </Button> */}
                </div>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontalIcon className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/dashboard/users/${order.userId}`)
                    }
                  >
                    <UserIcon className="w-4 h-4 mr-2" /> View User
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/dashboard/servers/${order.serverId}`)
                    }
                  >
                    <ServerIcon className="w-4 h-4 mr-2" /> View Server
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/dashboard/products/${order.productId}`)
                    }
                  >
                    <PackageIcon className="w-4 h-4 mr-2" /> View Product
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
