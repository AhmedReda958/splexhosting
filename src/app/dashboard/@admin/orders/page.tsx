import prisma from "@/lib/prisma";
import OrderList from "./OrdersList";

const getOrders = async () => {
  const orders = await prisma.order.findMany({
    where: {
      status: "pending",
    },
    include: {
      user: true,
    },
  });
  return orders;
};

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Server Orders</h1>
      <OrderList initialOrders={orders} />
    </div>
  );
}
