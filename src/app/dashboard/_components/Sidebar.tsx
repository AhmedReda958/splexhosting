"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  LuHome,
  LuLineChart,
  LuPackage,
  LuServer,
  LuSettings,
  LuUsers2,
} from "react-icons/lu";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { BiSupport } from "react-icons/bi";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Link
            href="https://splexhosting.com/"
            className="h-9 w-9 text-center"
          >
            <Image
              src={"/favicon.ico"}
              alt="Splexhosting"
              width={32}
              height={32}
              className="ps-1 hover:scale-110 transition-transform"
            />
            <span className="sr-only">SplexHosting</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/servers"
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  pathname === "/dashboard/servers"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                } transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <LuServer className="h-5 w-5" />
                <span className="sr-only">Servers</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Servers</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  pathname === "/dashboard/invoices"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                } transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <LiaFileInvoiceDollarSolid className="h-5 w-5" />
                <span className="sr-only">Invoices</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Invoices</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  pathname === "/dashboard/products"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                } transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <LuPackage className="h-5 w-5" />
                <span className="sr-only">Products</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Products</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <div className="flex-1 flex items-center justify-center">
        <span className="-rotate-90 origin-center text-xl text-muted-foreground tracking-widest select-none opacity-60">
          VenixHosting
        </span>
      </div>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  pathname === "/dashboard/support"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                } transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <BiSupport className="h-5 w-5" />
                <span className="sr-only">Support</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Support</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  pathname === "/dashboard/settings"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                } transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <LuSettings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default Sidebar;
