"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LogOutIcon, MenuIcon, User2Icon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const navLinks = [
  { title: "Home", href: "/" },
  { title: "Services", href: "/#services" },  
  { title: "Hardware", href: "/hardware" },
  {
    title: "Discord",
    href: "https://discord.gg/xArPtPPsvY",
  },
];

export default function Navbar() {
  const session = useSession();
  const user = session.data?.user;

  const handleSignOut = () => {
    signOut({
      callbackUrl: "/", // Redirect to homepage or any other page after sign out
    });
  };

  return (
    <header className="flex h-16 w-full items-center bg-background ">
      <div className="container mx-auto flex w-full items-center px-4 md:px-6">
        <Link href="#" className="mr-6 flex items-center" prefetch={false}>
          <Image src="/favicon.ico" alt="VenixHosting" width={32} height={32} />
          <h1 className="ml-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            VenixHosting
          </h1>
        </Link>
        <nav className="hidden lg:flex flex-1 items-center justify-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-sm font-medium hover:underline underline-offset-4 "
              prefetch={true}
            >
              <Button variant="ghost" size="sm">
                {link.title}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          {!user ? (
            <div className="flex gap-2 items-center">
              <DarkModeToggle />
              <Button
                variant={"outline"}
                size={"sm"}
                className="hidden lg:block"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button size={"sm"} className="hidden lg:block">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          ) : (
            <>
              <DarkModeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                  >
                    <Avatar>
                      <AvatarImage src={user.image} alt={user.firstName} />
                      <AvatarFallback>
                        <User2Icon className="h-7 w-7 text-muted-foreground" />
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
            </>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="grid gap-6 p-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="text-sm font-medium hover:underline underline-offset-4"
                    prefetch={true}
                  >
                    <Button variant="ghost" size="sm">
                      {link.title}
                    </Button>
                  </Link>
                ))}
                {!user && (
                  <>
                    {" "}
                    <Button size={"sm"}>
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                    <Button variant={"outline"} size={"sm"}>
                      <Link href="/login">Login</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}