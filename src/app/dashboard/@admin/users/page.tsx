import { columns } from "./columns";
import { DataTable } from "./users-table";
import { getAllUsers } from "@/lib/getters/userData";

export default async function DemoPage() {
  const data = await getAllUsers();

  return (
    <div className="col-span-full container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
