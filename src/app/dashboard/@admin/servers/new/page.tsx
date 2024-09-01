import { Button } from "@/components/ui/button";
import NewServerForm from "./newServerForm";
import { ArrowLeft } from "lucide-react";
import UsersMenu from "./usersMenu";
import { getAllUsers } from "@/lib/getters/userData";

export default async function AddServerPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const users = await getAllUsers();
  return (
    <div className="col-span-full container mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to User
          </Button>
          <UsersMenu users={users} />
        </div>
        <h1 className="text-3xl font-bold">Add New Server for</h1>
        <p className="text-muted-foreground">
          Configure and deploy a new VPS instance
        </p>
      </div>
      <NewServerForm />
    </div>
  );
}
