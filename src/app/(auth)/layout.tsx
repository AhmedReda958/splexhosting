import DarkModeToggle from "@/components/DarkModeToggle";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="container py-5 flex items-center justify-between mb-20 lg:mb-32">
        <Link
          href="/"
          className="flex items-center justify-center gap-1 text-xl font-bold "
        >
          <Image src="/favicon.ico" alt="Logo" width={30} height={30} />
          VenixHosting
        </Link>
        {/* <Button as={Link}>home</Button> */}
        <DarkModeToggle />
      </div>
      {children}
    </div>
  );
}

export default AuthLayout;
