import { DServer } from "@prisma/client";
import { columns } from "./columns";
import { DataTable } from "./servers-tables";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData(): Promise<DServer[]> {
  try {
    const servers = await prisma.dServer.findMany({
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    return servers;
  } catch (error) {
    // Handle the error here
    console.error("Error fetching data:", error);
    return [];
  }
}

export default async function DemoPage() {
  const data = await getData();
  return (
    <div className="col-span-full container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">All Servers</h1>
        <Button asChild>
          <Link href="/dashboard/servers/new">Create Server +</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
