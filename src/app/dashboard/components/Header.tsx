"use client";
import Link from "next/link";
import Image from "next/image";
import React, { use, useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  LuHome,
  LuLineChart,
  LuPackage,
  LuPackage2,
  LuPanelLeft,
  LuSearch,
  LuServer,
  LuUsers2,
} from "react-icons/lu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import DarkModeToggle from "@/components/DarkModeToggle";
import { signOut } from "next-auth/react";
import { Euro, LogOutIcon, User2Icon } from "lucide-react";
import { sidebarItems } from "./Sidebar";

const Header = () => {
  const [credits, setCredits] = useState(0);

  const pathname = usePathname();

  const session = useSession();
  const user = session.data?.user;

  const handleSignOut = () => {
    signOut({
      callbackUrl: "/", // Redirect to homepage or any other page after sign out
    });
  };

  const getCreditBalance = useCallback(() => {
    fetch("/api/user/credits")
      .then((res) => res.json())
      .then((data) => setCredits(data.credits));
  }, []);

  useEffect(() => {
    getCreditBalance();
  }, [getCreditBalance]);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <LuPanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="#" className="flex items-center gap-2 pt-3">
              <Image
                src="/favicon.ico"
                width={32}
                height={32}
                alt="VenixHosting"
              />
              VenixHosting
            </Link>

            {sidebarItems
              .filter((item) => item.position === "top")
              .map((item) => {
                if (
                  session.data?.user.role == item.role ||
                  item.role === "all"
                ) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-4 px-2.5  hover:text-foreground ${
                        pathname === "/dashboard"
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  );
                }
              })}
          </nav>
        </SheetContent>
      </Sheet>
      {/* <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Server</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb> */}
      <div className="flex-1 flex items-end">
        {user?.role == "user" && (
          <Link href="/dashboard/balance" className="flex gap-1">
            Balance: {credits} <Euro />
          </Link>
        )}
      </div>
      <DarkModeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Avatar>
              {user && <AvatarImage src={user.image} alt={user.firstName} />}
              <AvatarFallback>
                <User2Icon className="h-6 w-6 text-accent-foreground" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href="/dashboard/">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard/servers">My Servers</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard/settings">Settings</Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleSignOut}
            className="flex items-center gap-2"
          >
            <LogOutIcon className="h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
