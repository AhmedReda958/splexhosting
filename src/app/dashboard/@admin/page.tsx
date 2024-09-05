import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { BiSupport } from "react-icons/bi";
import { LuCreditCard, LuPackage, LuServer, LuUsers2 } from "react-icons/lu";
import { VscTools } from "react-icons/vsc";
import Link from "next/link";

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="col-span-full">
      <h1 className="text-lg mb-6">Wellcome {session?.user.firstName}</h1>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-5">
        <Card className=" cursor-pointer">
          <CardContent className="p-6 pb-8 flex flex-col items-center justify-end font-bold ">
            <BiSupport className="w-24 h-24 dark:text-blue-400 opacity-50" />
            <CardTitle className="mt-4">(6) Open Tickets</CardTitle>
          </CardContent>
        </Card>
        <Card className=" cursor-pointer">
          <Link href="/dashboard/users">
            <CardContent className="p-6 pb-8 flex flex-col items-center justify-end font-bold ">
              <LuUsers2 className="w-24 h-24 dark:text-blue-400 opacity-50" />
              <CardTitle className="mt-4">All Users</CardTitle>
            </CardContent>
          </Link>
        </Card>
        <Card className=" cursor-pointer">
          <Link href="/dashboard/servers">
            <CardContent className="p-6 pb-8 flex flex-col items-center justify-end font-bold ">
              <LuServer className="w-24 h-24 dark:text-blue-400 opacity-50" />
              <CardTitle className="mt-4">All Servers</CardTitle>
            </CardContent>
          </Link>
        </Card>
        <Card className=" cursor-pointer">
          <Link href="/dashboard/products">
            <CardContent className="p-6 pb-8 flex flex-col items-center justify-end font-bold ">
              <LuPackage className="w-24 h-24 dark:text-blue-400 opacity-50" />
              <CardTitle className="mt-4">Products</CardTitle>
            </CardContent>
          </Link>
        </Card>
        <Card className=" cursor-pointer">
          <CardContent className="p-6 pb-8 flex flex-col items-center justify-end font-bold ">
            <LuCreditCard className="w-24 h-24 dark:text-blue-400 opacity-50" />
            <CardTitle className="mt-4">Billing</CardTitle>
          </CardContent>
        </Card>
        <Card className=" cursor-pointer">
          <CardContent className="p-6 pb-8 flex flex-col items-center justify-end font-bold ">
            <VscTools className="w-24 h-24 dark:text-blue-400 opacity-50" />
            <CardTitle className="mt-4">Tools</CardTitle>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default HomePage;
