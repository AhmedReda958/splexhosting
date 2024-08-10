import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="container py-5 flex items-center justify-between mb-20 lg:mb-32">
        <div className="flex items-center justify-center gap-1 text-xl font-bold ">
          <Image src="/favicon.ico" alt="Logo" width={30} height={30} />
          SplexHosting
        </div>
        {/* <Button as={Link}>home</Button> */}
      </div>
      {children}
    </div>
  );
}

export default AuthLayout;
