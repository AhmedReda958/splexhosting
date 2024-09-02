import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function Dashboard({
  children,
  admin,
  user,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  user: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="p-4 sm:px-6 sm:py-0">
          {session?.user?.role == "admin" ? admin : user}
        </main>
      </div>
    </div>
  );
}
export default Dashboard;
