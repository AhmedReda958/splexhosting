import prisma from "@/lib/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  HardDrive,
  Cpu,
  Mail,
  User,
  Shield,
  Phone,
} from "lucide-react";
import { PiMemoryLight } from "react-icons/pi";

const getUser = async (userId: Number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
    include: {
      servers: true,
    },
  });
  return user;
};

const UserPage = async ({ params }: { params: { userId: Number } }) => {
  const user = await getUser(params.userId);

  if (!user) return <div>User not found</div>;

  return (
    <div className="col-span-full">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder-user.jpg" alt="John Doe" />
              <AvatarFallback>
                {user.firstName?.charAt(0)?.toUpperCase() ?? ""}
                {user.lastName?.charAt(0)?.toUpperCase() ?? ""}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-muted-foreground">{user.role}</p>
            </div>
          </div>
          <div className="space-x-2">
            <Button variant="outline">Edit User</Button>
            <Button>Suspend User</Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              {user.phoneNumber && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{user.phoneNumber}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{user.createdAt.toDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span>Role: {user.role}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-800"
                >
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>VPS Instances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.servers.map((server, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-semibold">{server.name}</h3>
                      <Badge
                      // variant={
                      //   server.status === "active" ? "default" : "secondary"
                      // }
                      >
                        {/* {server.status} */}
                        Active
                      </Badge>
                    </div>
                    <div className="flex space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Cpu className="h-4 w-4 mr-1" />
                        {server.cores}
                      </div>
                      <div className="flex items-center">
                        <PiMemoryLight className="h-4 w-4 mr-1" />
                        {server.ram}
                      </div>
                      <div className="flex items-center">
                        <HardDrive className="h-4 w-4 mr-1" />
                        {server.storage}
                      </div>
                    </div>
                  </div>
                ))}
                {user.servers.length == 0 && (
                  <div className="flex flex-col items-center gap-5 p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">No servers found</h3>
                    </div>
                    <Button variant="outline">Add new server +</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "Created new VPS instance",
                    date: "2023-06-15 14:30",
                  },
                  {
                    action: "Updated billing information",
                    date: "2023-06-14 09:15",
                  },
                  {
                    action: "Increased storage on Web Server",
                    date: "2023-06-13 11:45",
                  },
                  {
                    action: "Logged in from new IP address",
                    date: "2023-06-12 18:20",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
