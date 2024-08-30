import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  redirect("/dashboard/servers");
  return (
    <div>
      <h1 className="">Wellcome {session?.user.firstName}</h1>
    </div>
  );
};
export default HomePage;
