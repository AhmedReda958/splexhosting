"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  LuWallet2,
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
import { useSession } from "next-auth/react";

type SidebarItem = {
  icon: React.ElementType;
  name: string;
  href: string;
  role: string;
  position: string;
};

export const sidebarItems: SidebarItem[] = [
  {
    icon: LuHome,
    name: "Dashboard",
    href: "/dashboard",
    role: "admin",
    position: "top",
  },
  {
    icon: LuServer,
    name: "Servers",
    href: "/dashboard/servers",
    role: "all",
    position: "top",
  },
  {
    icon: LuUsers2,
    name: "Users",
    href: "/dashboard/users",
    role: "admin",
    position: "top",
  },
  {
    icon: LuLineChart,
    name: "Analytics",
    href: "/dashboard/analytics",
    role: "admin",
    position: "top",
  },
  {
    icon: LiaFileInvoiceDollarSolid,
    name: "Invoices",
    href: "/dashboard/invoices",
    role: "user",
    position: "top",
  },
  {
    icon: LuPackage,
    name: "Products",
    href: "/dashboard/products",
    role: "all",
    position: "top",
  },
  {
    icon: LuWallet2,
    name: "Balance",
    href: "/dashboard/balance",
    role: "user",
    position: "top",
  },
  {
    icon: BiSupport,
    name: "Support",
    href: "https://discord.com/channels/1279394173635657801/1279399742094442569",
    role: "user",
    position: "bottom",
  },
  // {
  //   icon: LuSettings,
  //   name: "Settings",
  //   href: "/dashboard/settings",
  //   role: "all",
  //   position: "bottom",
  // },
];

const SidebarItem = ({ item }: { item: SidebarItem }) => {
  const pathname = usePathname();
  const session = useSession();

  if (session.data?.user.role == item.role || item.role === "all") {
    return (
      <Tooltip key={item.href}>
        <TooltipTrigger asChild>
          <Link
            href={item.href}
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
              pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            } transition-colors hover:text-foreground md:h-8 md:w-8`}
          >
            <item.icon className="h-5 w-5" />
            <span className="sr-only">{item.name}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{item.name}</TooltipContent>
      </Tooltip>
    );
  }
  return null;
};

const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link href="/" className="h-9 w-9 text-center">
            <Image
              src={"/favicon.ico"}
              alt="VenixHosting"
              width={32}
              height={32}
              className="ps-1 hover:scale-110 transition-transform"
            />
            <span className="sr-only">VenixHosting</span>
          </Link>
          {sidebarItems
            .filter((item) => item.position === "top")
            .map((item) => (
              <SidebarItem key={item.href} item={item} />
            ))}
        </nav>
        <div className="flex-1 flex items-center justify-center">
          <span className="-rotate-90 origin-center text-xl text-muted-foreground tracking-widest select-none opacity-60">
            VenixHosting
          </span>
        </div>

        {/* bottom items */}
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          {sidebarItems
            .filter((item) => item.position === "bottom")
            .map((item) => (
              <SidebarItem key={item.href} item={item} />
            ))}
        </nav>
      </TooltipProvider>
    </aside>
  );
};

export default Sidebar;
