import data from "@/data";
import {
  LuServer,
  LuServerOff,
  LuCpu,
  LuMemoryStick,
  LuLineChart,
  LuDatabase,
  LuChevronLeft,
  LuChevronRight,
  LuCopy,
  LuCreditCard,
  //   File,
  //   Home,
  //   LineChart,
  //   ListFilter,
  LuMoreVertical,
  //   Package,
  //   Package2,
  //   PanelLeft,
  //   Search,
  //   Settings,
  //   ShoppingCart,
  //   LuTruck,
  //   Users2,
} from "react-icons/lu";

import {
  RiShutDownLine,
  RiRestartLine,
  RiStopCircleLine,
  RiUploadCloudLine,
  RiInstallLine,
  RiLockPasswordLine,
  RiPlayCircleLine,
} from "react-icons/ri";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
} from "lucide-react";

const ServerControls = ({ server }: { server: Server }) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6  gap-4 text-nowrap">
      <Card className="col-span-3">
        <CardContent className="relative  h-36  p-3 flex flex-col items-center justify-end font-bold ">
          <span
            className={`absolute top-4 end-4 h-3 w-3 rounded-full ${
              server.online ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>

          {server.online ? (
            <>
              <RiStopCircleLine className="w-24 h-24 dark:text-blue-400 opacity-50" />
              <span>Stop</span>
            </>
          ) : (
            <>
              <RiPlayCircleLine className="w-24 h-24 dark:text-blue-400 opacity-50" />
              <span>Start</span>
            </>
          )}
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardContent className=" h-36  p-3 flex flex-col items-center justify-end font-bold ">
          <RiUploadCloudLine className="w-24 h-24 dark:text-blue-400 opacity-50" />
          <span>Backup</span>
        </CardContent>
      </Card>
      <Card className="">
        <CardContent className="h-36  p-3 flex flex-col items-center justify-end font-bold ">
          <RiInstallLine className="w-24 h-24 dark:text-blue-400 opacity-50" />
          <span>Reinstall</span>
        </CardContent>
      </Card>

      <Card className="col-span-full md:col-span-2">
        <CardContent className="h-36  p-3 flex flex-col items-center justify-end font-bold ">
          <RiShutDownLine className="w-24 h-24 dark:text-blue-400 opacity-50" />
          <span>Shut Down</span>
        </CardContent>
      </Card>
      <Card className="col-span-full md:col-span-2">
        <CardContent className="h-36  p-3 flex flex-col items-center justify-end font-bold ">
          <RiRestartLine className="w-24 h-24 dark:text-blue-400 opacity-50" />
          <span>Restart</span>
        </CardContent>
      </Card>

      <Card className="col-span-full md:col-span-2">
        <CardContent className="h-36  p-3 flex flex-col items-center justify-end font-bold ">
          <RiLockPasswordLine className="w-24 h-24 dark:text-blue-400 opacity-50" />
          <span>Change Password</span>
        </CardContent>
      </Card>
    </div>
  );
};

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
              <Badge variant="secondary" className="text-lg">
                {/* {serverData.plan ? serverData.plan :  */}
                Custom server
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
                  value={new Date(serverData.createdAt).toLocaleDateString()}
                />
                {serverData.expiresAt && (
                  <InfoItem
                    icon={<RefreshCwIcon className="mr-2 h-4 w-4" />}
                    label="Next Recharge"
                    value={new Date(serverData.expiresAt).toLocaleDateString()}
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Server Controls</h2>
          <ServerControls server={serverData} />
        </div>
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
