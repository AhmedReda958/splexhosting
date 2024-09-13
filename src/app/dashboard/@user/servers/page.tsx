import { LuServer, LuServerOff } from "react-icons/lu";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Server } from "@prisma/client";
import { getCurrentUserServers } from "@/lib/getters/serverData";

const ServerCard = ({ server }: { server: Server }) => {
  return (
    <Link href={`servers/${server.id}`}>
      <Card>
        <CardContent className="p-4  shadow-md rounded-lg flex gap-6">
          <div className="flex-shrink-0">
            {server.status === "active" ? (
              <LuServer className="w-16 h-16 text-green-600 dark:text-green-400 " />
            ) : server.status === "pending" ? (
              <LuServerOff className="w-16 h-16 text-yellow-500 dark:text-yellow-400" />
            ) : (
              <LuServerOff className="w-16 h-16 text-gray-600" />
            )}
          </div>
          <div className="flex-1 ">
            <h3 className="text-lg font-semibold">Server {server.id}</h3>
            <p className="text-sm">IP: {server.ip4}</p>
            <p className="text-sm">CPU: {server.cores}</p>
            <p className="text-sm">Memory: {server.ram}</p>
            <p className="text-sm">Storage: {server.storage}</p>
            <p className="text-sm ">
              Status:{" "}
              {server.status === "active" ? (
                <span className="font-bold text-green-500 dark:text-green-400">
                  Online
                </span>
              ) : server.status === "pending" ? (
                <span className="font-bold text-yellow-500 dark:text-yellow-400">
                  Pending
                </span>
              ) : (
                <span className="font-bold text-red-500 dark:text-red-400">
                  Offline
                </span>
              )}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const Servers = async () => {
  const servers = await getCurrentUserServers();
  return (
    <div className="col-span-full">
      <h2 className="mb-6">Servers</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {servers?.map((server: Server) => (
          <ServerCard key={server.id} server={server} />
        ))}

        {/* add new server */}
        <Link
          href="https://splexhosting.com/shrefre/vps-hosting"
          className="p-4 h-28  rounded-lg flex items-center justify-center border-2 border-dashed border-textColor dark:border-gray-700"
        >
          <FaPlus className="w-6 h-6 " />
          <span className="ms-2 font-bold">Add new server</span>
        </Link>
      </div>
    </div>
  );
};

export default Servers;
