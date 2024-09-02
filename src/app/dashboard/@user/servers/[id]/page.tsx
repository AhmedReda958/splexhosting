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

const ServerControls = ({ server }: { server: (typeof data)[0] }) => {
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

const ServerInfo = ({ server }: { server: Server }) => {
  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Server {server.id}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <LuCopy className="h-3 w-3" />
              <span className="sr-only">Copy Order ID</span>
            </Button>
          </CardTitle>
          <CardDescription>
            Ordered at: {server.createdAt.toDateString()}
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <LuMoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Trash</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Server Details</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Service IP</span>
              <span className="group underline">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 me-2 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <LuCopy className="h-3 w-3" />
                  <span className="sr-only">Copy Server Ip</span>
                </Button>
                {server.ip4}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Service expires At</span>
              <span>{server.createdAt.toDateString()}</span>
            </li>

            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Status</span>
              {true ? (
                <span className="font-bold text-green-500 dark:text-green-400">
                  Online
                </span>
              ) : (
                <span className="font-bold text-red-500 dark:text-red-400">
                  Offline
                </span>
              )}
            </li>
          </ul>
          <Separator className="my-2" />
          <div className="font-semibold">System Info</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">CPU</span>
              <span>{server.cores} cores</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Memory</span>
              <span>{server.ram} GB</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Disk</span>
              <span>{server.storage} GB</span>
            </li>
          </ul>
          <Separator className="my-2" />
          {/* <div className="font-semibold">Resource Usage</div>
          <ul className="gird gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">CPU</span>
              <span>{server.cores}%</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Memory</span>
              <span>
                {Math.floor(server.curr_memory / 1024)}GB /{" "}
                {Math.floor(server.memory / 1024)}GB
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Disk</span>
              <span>
                {Math.floor(server.disk_used)}GB /{" "}
                {Math.floor(server.disk_size)}GB
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Traffic</span>
              <span>
                {Math.floor(server.curr_traffic)}GB /{" "}
                {Math.floor(server.traffic)}GB
              </span>
            </li>
          </ul> */}
          {/* <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>$299.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Management</span>
              <span>$5.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>$25.00</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>$329.00</span>
            </li>
          </ul>*/}
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <div className="font-semibold">Server Name</div>
            <address className="grid gap-0.5 not-italic text-muted-foreground">
              <span>{server.name}</span>
            </address>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Billing Plan</div>
            <div className="text-muted-foreground">Yearly</div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Customer Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Customer</dt>
              <dd>Liam Johnson</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Email</dt>
              <dd>
                <a href="mailto:">liam@example.com</a>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Phone</dt>
              <dd>
                <a href="tel:">+1 234 567 890</a>
              </dd>
            </div>
          </dl>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated <time dateTime="2023-11-23">November 23, 2023</time>
        </div>
      </CardFooter>
    </Card>
  );
};

const ServerPage = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);
  const realserver = await getServerById(id, true);
  if (!realserver) return <div>realServer not found</div>;

  const server = data[0];
  return (
    <>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div>
          <h2 className="mb-4">Server {params.id}</h2>

          {/* percentages */}
          <div className="mb-6 grid md:grid-cols-2 xl:grid-cols-3 gap-4 ">
            <Card className="relative overflow-hidden">
              <LuCpu className=" absolute -bottom-5 -left-5 rotate-12 opacity-20 dark:opacity-25 w-36 h-36 text-blue-500 " />
              <CardHeader className="pb-2">
                <CardDescription>CPU Usage</CardDescription>
                <CardTitle className="text-4xl">{server.cpu_pc}%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {server.cpu_pc >= 80 ? (
                    <span className="text-red-400 font-bold">High Usage</span>
                  ) : (
                    "Normal Usage"
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={server.cpu_pc} />
              </CardFooter>
            </Card>
            <Card className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <LuMemoryStick className=" absolute -bottom-5 -left-5 rotate-12 opacity-20 dark:opacity-25 w-36 h-36 text-blue-500 transition-all " />
                <CardDescription>Memory Usage</CardDescription>
                <CardTitle className="text-4xl">
                  {Math.floor(server.curr_memory / 1024)}GB/
                  {Math.floor(server.memory / 1024)}GB
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {(server.curr_memory / server.memory) * 100 >= 80 ? (
                    <span className="text-red-400 font-bold">High Usage</span>
                  ) : (
                    "Normal Usage"
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={(server.curr_memory / server.memory) * 100} />
              </CardFooter>
            </Card>
            <Card className="relative overflow-hidden">
              <LuDatabase className=" absolute -bottom-5 -left-5 rotate-12 opacity-20 dark:opacity-25 w-36 h-36 text-blue-500 transition-all " />
              <CardHeader className="pb-2">
                <CardDescription>Disk Usage</CardDescription>
                <CardTitle className="text-4xl">
                  {Math.floor(server.disk_used)}GB/
                  {Math.floor(server.disk_size)}GB
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {(server.disk_used / server.disk_size) * 100 >= 80 ? (
                    <span className="text-red-400 font-bold">High Usage</span>
                  ) : (
                    "Normal Usage"
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={(server.disk_used / server.disk_size) * 100} />
              </CardFooter>
            </Card>
          </div>

          {/* server controls */}
          <div className="mt-6">
            <h4 className="mb-4">Server Controls</h4>
            <ServerControls server={server} />
          </div>
        </div>
      </div>
      <ServerInfo server={realserver} />
    </>
  );
};

export default ServerPage;
