"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  ArrowLeft,
  ServerIcon,
  Users,
  Search,
  Loader2,
  LoaderIcon,
} from "lucide-react";
import { DServer, User } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type ServerDetails = {
  name: string;
  ip4: string;
  cpu: string;
  ram: number | "custom";
  customRam: number;
  storage: number | "custom";
  customStorage: number;
  notes: string;
  userId: number;
};

const fetchUsers = async (page = 1, limit = 10, search = "") => {
  // Simulated user data
  const allUsers: User[] = await fetch("/api/users").then((res) => res.json());
  console.log("All users", allUsers);

  const filteredUsers: User[] = allUsers.filter(
    (user: User) =>
      user.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

  return {
    users: paginatedUsers,
    totalPages: Math.ceil(filteredUsers.length / limit),
  };
};

export default function AddServerPage({
  searchParams,
}: {
  searchParams: { userId: string };
}) {
  const { userId } = searchParams;
  const { toast } = useToast();
  const router = useRouter();

  const [serverDetails, setServerDetails] = useState<ServerDetails>({
    name: "",
    ip4: "",
    cpu: "",
    ram: 0,
    customRam: 0,
    storage: 0,
    customStorage: 0,
    notes: "",
  });
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { users, totalPages } = await fetchUsers(
        currentPage,
        10,
        searchTerm
      );
      setUsers(users);
      setTotalPages(totalPages);
    } catch (err) {
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm]);

  const getUser = useCallback(
    async (userId: string) => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      return user;
    },
    [userId]
  );

  useEffect(() => {
    loadUsers();
    getUser(userId).then((user) => setSelectedUser(user));
  }, [loadUsers, getUser, userId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setServerDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    console.log(name, value);
    setServerDetails((prev) => ({
      ...prev,
      [name]: value,
      [`custom${name.charAt(0).toUpperCase() + name.slice(1)}`]:
        value === "custom"
          ? (prev as any)[
              `custom${name.charAt(0).toUpperCase() + name.slice(1)}`
            ]
          : 0,
    }));
    console.log(serverDetails);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const serverData = {
        ...serverDetails,
        ram:
          serverDetails.ram === "custom"
            ? Number(serverDetails.customRam)
            : Number(serverDetails.ram),
        storage:
          serverDetails.storage === "custom"
            ? Number(serverDetails.customStorage)
            : Number(serverDetails.storage),
        userId: selectedUser?.id || Number(userId),
      };
      console.log(serverData);

      const response = await fetch("/api/dserver/new", {
        method: "POST",
        body: JSON.stringify(serverData),
      });
      const data = await response.json();

      toast({
        title: "Success",
        description: data.message,
      });
      console.log("New server data:", data);
      alert("server Created successfully");
      router.push(`/dashboard/servers/${data.server.id}`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create server. Please try again.",
      });
      alert("Failed to create server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsUserModalOpen(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="col-span-full container mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" asChild>
            <Link href={`/dashboard/users/${selectedUser?.id || ""}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to User
            </Link>
          </Button>
          <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Choose Another User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Select User</DialogTitle>
                <DialogDescription>
                  Choose a user to add a server for.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-8"
                  />
                </div>
                <ScrollArea className="h-[300px] mt-4">
                  {loading ? (
                    <div className="flex justify-center items-center h-full">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                  ) : (
                    users.map((user: User) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between py-2 px-4 hover:bg-accent cursor-pointer"
                        onClick={() => handleUserSelect(user)}
                      >
                        <div>
                          <p className="font-medium">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                        {selectedUser?.id === user.id && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                    ))
                  )}
                </ScrollArea>
                {!loading && !error && (
                  <div className="flex justify-between items-center mt-4">
                    <Button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <span>{`Page ${currentPage} of ${totalPages}`}</span>
                    <Button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <h1 className="text-3xl font-bold">
          Add New Server for{" "}
          {selectedUser ? (
            selectedUser.firstName + " " + selectedUser.lastName
          ) : (
            <span className="text-muted-foreground">not selected</span>
          )}
        </h1>
        <p className="text-muted-foreground">
          Configure and deploy a new VPS instance
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Server Configuration</CardTitle>
            <CardDescription>
              Specify the details for the new server instance.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Server Name</Label>
              <Input
                id="name"
                name="name"
                value={serverDetails.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e)
                }
                placeholder="Enter a name for this server"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">User Email</Label>
              <Input
                id="email"
                name="email"
                value={selectedUser?.email || " "}
                required
                placeholder="No user selected"
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">IPv4</Label>
              <Input
                id="ip4"
                name="ip4"
                value={serverDetails.ip4}
                onChange={handleInputChange}
                required
                placeholder="256.256.256.256"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cpu">CPU (vCPU)</Label>
                <Select
                  name="cpu"
                  onValueChange={(value) => handleSelectChange("cpu", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select CPU" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 vCPU</SelectItem>
                    <SelectItem value="2">2 vCPU</SelectItem>
                    <SelectItem value="4">4 vCPU</SelectItem>
                    <SelectItem value="8">8 vCPU</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ram">RAM</Label>
                <Select
                  name="ram"
                  onValueChange={(value) => handleSelectChange("ram", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select RAM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 GB</SelectItem>
                    <SelectItem value="4">4 GB</SelectItem>
                    <SelectItem value="8">8 GB</SelectItem>
                    <SelectItem value="16">16 GB</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                {serverDetails.ram === "custom" && (
                  <Input
                    id="customRam"
                    name="customRam"
                    onChange={handleInputChange}
                    placeholder="Enter custom RAM"
                    className="mt-2"
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="storage">Storage</Label>
                <Select
                  name="storage"
                  onValueChange={(value) =>
                    handleSelectChange("storage", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Storage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20">20 GB SSD</SelectItem>
                    <SelectItem value="40">40 GB SSD</SelectItem>
                    <SelectItem value="80">80 GB SSD</SelectItem>
                    <SelectItem value="160">160 GB SSD</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                {serverDetails.storage === "custom" && (
                  <Input
                    id="customStorage"
                    name="customStorage"
                    onChange={handleInputChange}
                    placeholder="Enter custom storage"
                    className="mt-2"
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={serverDetails.notes}
                onChange={handleInputChange}
                placeholder="Enter any additional notes or requirements"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={!selectedUser || loading}
            >
              {loading ? (
                <LoaderIcon className="mr-2 h-4 w-4" />
              ) : (
                <ServerIcon className="mr-2 h-4 w-4" />
              )}
              {loading ? "Loading..." : "Create Server"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
