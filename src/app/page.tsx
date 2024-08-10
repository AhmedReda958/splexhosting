import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log(session);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl  text-center">
        <h3 className="mt-110">This will Be the landing Page</h3>
        <Link href="/dashboard" className="text-blue-600 underline">
          Go to Dashboard
        </Link>
        {!session ? (
          <p>
            your are not logged in
            <Link href="/login" className="text-blue-600 underline">
              Login In
            </Link>
          </p>
        ) : (
          <p>Welcome, {session.user?.email}</p>
        )}
      </div>
    </main>
  );
}
