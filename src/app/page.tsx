import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl  text-center">
        <h3 className="mt-110">This will Be the landing Page</h3>
        <Link href="/dashboard" className="text-blue-600 underline">
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
