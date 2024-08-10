import { getServerSession } from "next-auth";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

async function Dashboard({ children }: { children: React.ReactNode }) {
  // redirect if user role is not admin
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    redirect("/dashboard");
  }
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          {children}
        </main>
      </div>
    </div>
  );
}
export default Dashboard;
