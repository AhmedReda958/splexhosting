"use client";
import { useState, useEffect, useCallback } from "react";
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
import { ArrowLeft, ServerIcon, Users, Search, Loader2 } from "lucide-react";

// Simulated API call
const fetchUsers = async (page = 1, limit = 10, search = "") => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulated user data
  const allUsers = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
  }));

  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

  return {
    users: paginatedUsers,
    totalPages: Math.ceil(filteredUsers.length / limit),
  };
};

export default function AddServerPage() {
  const [serverDetails, setServerDetails] = useState({
    name: "",
    cpu: "",
    customCpu: "",
    ram: "",
    customRam: "",
    storage: "",
    customStorage: "",
    notes: "",
  });
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServerDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setServerDetails((prev) => ({
      ...prev,
      [name]: value,
      [`custom${name.charAt(0).toUpperCase() + name.slice(1)}`]:
        value === "custom"
          ? prev[`custom${name.charAt(0).toUpperCase() + name.slice(1)}`]
          : "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New server details:", serverDetails);
    // Here you would typically send this data to your backend
    // Reset form or redirect user after successful submission
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsUserModalOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="col-span-full container mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to User
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
                    users.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between py-2 px-4 hover:bg-accent cursor-pointer"
                        onClick={() => handleUserSelect(user)}
                      >
                        <div>
                          <p className="font-medium">{user.name}</p>
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
          {selectedUser ? selectedUser.name : "Select a User"}
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
                onChange={handleInputChange}
                placeholder="Enter a name for this server"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cpu">CPU (vCPU)</Label>
                <Select
                  name="cpu"
                  onValueChange={(value) => handleSelectChange("cpu", value)}
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
                {serverDetails.cpu === "custom" && (
                  <Input
                    id="customCpu"
                    name="customCpu"
                    value={serverDetails.customCpu}
                    onChange={handleInputChange}
                    placeholder="Enter custom CPU"
                    className="mt-2"
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ram">RAM</Label>
                <Select
                  name="ram"
                  onValueChange={(value) => handleSelectChange("ram", value)}
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
                    value={serverDetails.customRam}
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
                    value={serverDetails.customStorage}
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
            <Button type="submit" className="w-full" disabled={!selectedUser}>
              <ServerIcon className="mr-2 h-4 w-4" />
              Deploy Server
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
