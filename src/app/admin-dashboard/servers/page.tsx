import { User } from "@prisma/client";
import { columns } from "./columns";
import { DataTable } from "./servers-tables";
import prisma from "@/lib/prisma";

async function getData(): Promise<User[]> {
  try {
    const users = await prisma.user.findMany();

    return users;
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
      <DataTable columns={columns} data={data} />
    </div>
  );
}
