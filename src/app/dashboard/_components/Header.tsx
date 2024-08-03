"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import DarkModeToggle from "@/components/DarkModeToggle";

const Header = () => {
  const pathname = usePathname();
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
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <LuPackage2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href="/dashboard"
              className={`flex items-center gap-4 px-2.5  hover:text-foreground ${
                pathname === "/dashboard"
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <LuHome className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/servers"
              className={`flex items-center gap-4 px-2.5 hover:text-foreground ${
                pathname === "/dashboard/servers"
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <LuServer className="h-5 w-5" />
              Servers
            </Link>
            <Link
              href="/dashboard/products"
              className={`flex items-center gap-4 px-2.5  hover:text-foreground ${
                pathname === "/dashboard/products"
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <LuPackage className="h-5 w-5" />
              Products
            </Link>
            <Link
              href="/dashboard/customers"
              className={`flex items-center gap-4 px-2.5  hover:text-foreground ${
                pathname === "/dashboard/customers"
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <LuUsers2 className="h-5 w-5" />
              Customers
            </Link>
            <Link
              href="/dashboard/settings"
              className={`flex items-center gap-4 px-2.5  hover:text-foreground ${
                pathname === "/dashboard/settings"
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <LuLineChart className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumb className="hidden md:flex">
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
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
        <LuSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="Search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <DarkModeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Image
              src="/placeholder-user.jpg"
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
