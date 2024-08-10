import { LuServer, LuServerOff } from "react-icons/lu";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import data from "@/data";
import { Card, CardContent } from "@/components/ui/card";

const ServerCard: React.FC<{ server: (typeof data)[0] }> = ({ server }) => {
  return (
    <Link href={`servers/${server.id}`}>
      <Card>
        <CardContent className="p-4  shadow-md rounded-lg flex gap-6">
          <div className="flex-shrink-0">
            {server.online ? (
              <LuServer className="w-16 h-16 text-green-600 dark:text-green-400 " />
            ) : (
              <LuServerOff className="w-16 h-16 text-gray-600" />
            )}
          </div>
          <div className="flex-1 ">
            <h3 className="text-lg font-semibold">Server {server.id}</h3>
            <p className="text-sm">IP: {server.addresses[0].ip}</p>
            <p className="text-sm">
              CPU:{" "}
              <span
                className={server.cpu_pc >= 80 ? "text-red-400 font-bold" : ""}
              >
                {server.cpu_pc}%
              </span>
            </p>
            <p className="text-sm ">
              Status:{" "}
              {server.online ? (
                <span className="font-bold text-green-500 dark:text-green-400">
                  Online
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

const Servers: React.FC = () => {
  return (
    <div className="col-span-full">
      <h2 className="mb-6">Servers</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((server) => (
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
