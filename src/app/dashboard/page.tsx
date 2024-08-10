import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div>
      <h1 className="">Wellcome {session?.user.firstName}</h1>
    </div>
  );
};
export default HomePage;
