import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getServerById } from "@/lib/getters/serverData";
import { Server } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import {
  ServerIcon,
  CpuIcon,
  MemoryStickIcon,
  HardDriveIcon,
  CalendarIcon,
  RefreshCwIcon,
  PackageIcon,
  GlobeIcon,
  Info,
} from "lucide-react";
import ServerControls from "./serverControls";
import Link from "next/link";

const ServerPage = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);
  const serverData = await getServerById(id, true);
  if (!serverData) return <div>Server not found</div>;

  return (
    <>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Server Information</h1>
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl mb-2">
                  {serverData.name}
                  {/* server id */}
                  <span className="ms-2 text-sm font-medium text-muted-foreground">
                    {" "}
                    #{serverData.id}
                  </span>
                </CardTitle>
                <CardDescription>
                  <div className="flex items-center space-x-2">
                    <GlobeIcon className="h-4 w-4" />
                    <span className="font-medium">IPv4:</span>
                    <span>{serverData.ip4}</span>
                  </div>
                  {serverData.ip6 && (
                    <div className="flex items-center space-x-2 mt-1">
                      <GlobeIcon className="h-4 w-4" />
                      <span className="font-medium">IPv6:</span>
                      <span className="text-xs sm:text-sm break-all">
                        {serverData.ip6}
                      </span>
                    </div>
                  )}
                </CardDescription>
              </div>
              <Badge
                variant="secondary"
                className={`${
                  serverData.status == "pending" && "text-yellow-400"
                }`}
              >
                {serverData.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <InfoItem
                  icon={<CpuIcon className="mr-2 h-4 w-4" />}
                  label="CPU"
                  value={serverData.cpu}
                />

                {serverData.type === "vps" ? (
                  <InfoItem
                    icon={
                      <Badge variant="outline" className="mr-2">
                        {serverData.cores}
                      </Badge>
                    }
                    label="Cores"
                    value={`${serverData.cores} Cores`}
                  />
                ) : (
                  ""
                )}
                <InfoItem
                  icon={<MemoryStickIcon className="mr-2 h-4 w-4" />}
                  label="RAM"
                  value={serverData.ram}
                />
                <InfoItem
                  icon={<HardDriveIcon className="mr-2 h-4 w-4" />}
                  label="Storage"
                  value={serverData.storage}
                />
                <InfoItem
                  icon={<PackageIcon className="mr-2 h-4 w-4" />}
                  label="Internet Speed"
                  value={serverData.type === "vps" ? "1 Gbps" : "10 Gbps"}
                />
              </div>
              <div className="space-y-4">
                <InfoItem
                  icon={<ServerIcon className="mr-2 h-4 w-4" />}
                  label="Location"
                  value={"Germany"}
                />
                <InfoItem
                  icon={<CalendarIcon className="mr-2 h-4 w-4" />}
                  label="Created On"
                  value={new Date(serverData.createdAt).toDateString()}
                />
                {serverData.expiresAt && (
                  <InfoItem
                    icon={<RefreshCwIcon className="mr-2 h-4 w-4" />}
                    label="Next Recharge"
                    value={new Date(serverData.expiresAt).toDateString()}
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        {serverData.type === "vps" && serverData.status != "pending" && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Server Controls</h2>
            <ServerControls server={serverData} />
          </div>
        )}
        {serverData.status == "pending" && (
          <div className="mt-6">
            <p className="flex gap-2 ">
              <Info className="w-5 h-5" />
              Your server is currently under review and will be activated
              shortly.
            </p>
          </div>
        )}
      </div>
    </>
  );
};
function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: any;
}) {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

export default ServerPage;
