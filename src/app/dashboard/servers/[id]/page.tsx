import data from "@/data";
import {
  LuServer,
  LuServerOff,
  LuCpu,
  LuMemoryStick,
  LuLineChart,
  LuDatabase,
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

const ServerControls: React.FC<{ server: (typeof data)[0] }> = ({ server }) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6  gap-4 text-nowrap">
      <div className="relative col-span-3 h-36 bg-white dark:bg-dark shadow-md rounded-lg p-3 flex flex-col items-center justify-end font-bold cursor-pointer">
        <span
          className={`absolute top-4 end-4 h-3 w-3 rounded-full ${
            server.online ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>

        {server.online ? (
          <>
            <RiStopCircleLine className="w-24 h-24 text-black opacity-40" />
            <span>Stop</span>
          </>
        ) : (
          <>
            <RiPlayCircleLine className="w-24 h-24 text-black opacity-40" />
            <span>Start</span>
          </>
        )}
      </div>
      <div className="col-span-2 h-36 bg-white dark:bg-dark shadow-md rounded-lg p-3 flex flex-col items-center justify-end font-bold cursor-pointer">
        <RiUploadCloudLine className="w-24 h-24 text-black opacity-40" />
        <span>Backup</span>
      </div>
      <div className="h-36 bg-white dark:bg-dark shadow-md rounded-lg p-3 flex flex-col items-center justify-end font-bold cursor-pointer">
        <RiInstallLine className="w-24 h-24 text-black opacity-40" />
        <span>Reinstall</span>
      </div>

      <div className="col-span-full md:col-span-2 h-36 bg-white dark:bg-dark shadow-md rounded-lg p-3 flex flex-col items-center justify-end font-bold cursor-pointer">
        <RiShutDownLine className="w-24 h-24 text-black opacity-40" />
        <span>Shut Down</span>
      </div>
      <div className="col-span-full md:col-span-2 h-36 bg-white dark:bg-dark shadow-md rounded-lg p-3 flex flex-col items-center justify-end font-bold cursor-pointer">
        <RiRestartLine className="w-24 h-24 text-black opacity-40" />
        <span>Restart</span>
      </div>

      <div className="col-span-full md:col-span-2 h-36 bg-white dark:bg-dark shadow-md rounded-lg p-3 flex flex-col items-center justify-end font-bold cursor-pointer">
        <RiLockPasswordLine className="w-24 h-24 text-black opacity-40" />
        <span>Change Password</span>
      </div>
    </div>
  );
};

const ServerPage = ({ params }: { params: { id: string } }) => {
  const server = data.find((server) => server.id === Number(params.id));
  return (
    <>
      {server ? (
        <>
          <h2 className="mb-4">Server {params.id}</h2>

          {/* percentages */}
          <div className="mb-6 grid md:grid-cols-2 xl:grid-cols-4 gap-6 ">
            {/* cpu */}
            <div className="relative overflow-hidden p-6 pb-8 bg-white dark:bg-dark shadow-md rounded-lg text-center ">
              <LuCpu className=" absolute -bottom-5 -left-5 rotate-12 opacity-5 dark:opacity-15 w-36 h-36 text-primary dark:text-primary " />
              <div className="text-3xl font-bold mt-2 mb-2 text-primary text-nowrap">
                80%
              </div>
              <h5 className="mt-2">CPU</h5>
              <p className="text-sm">
                {server.cpu_pc >= 80 ? (
                  <span className="text-red-400 font-bold">High Usage</span>
                ) : (
                  "Normal Usage"
                )}
              </p>
            </div>

            {/* memory */}
            <div className="relative overflow-hidden p-6 pb-8 bg-white dark:bg-dark shadow-md rounded-lg text-center">
              <LuMemoryStick className=" absolute -bottom-5 -left-5 rotate-12 opacity-5 dark:opacity-15 w-36 h-36 text-primary dark:text-primary transition-all " />
              <div className="text-3xl font-bold mt-2 mb-2 text-primary text-nowrap">
                {Math.floor(server.curr_memory / 1024)}GB /
                <span className="text-xl">
                  {Math.floor(server.memory / 1024)}GB
                </span>
              </div>
              <h5 className="mt-2">Memory Usage</h5>
              <p className="text-sm">
                {(server.curr_memory / server.memory) * 100 >= 80 ? (
                  <span className="text-red-400 font-bold">High Usage</span>
                ) : (
                  "Normal Usage"
                )}
              </p>
            </div>

            {/* disk space */}
            <div className="relative overflow-hidden p-6 pb-8 bg-white dark:bg-dark shadow-md rounded-lg text-center">
              <LuDatabase className=" absolute -bottom-5 -left-5 rotate-12 opacity-5 dark:opacity-15 w-36 h-36 text-primary dark:text-primary transition-all " />
              <div className="text-3xl font-bold mt-2 mb-2 text-primary text-nowrap">
                {Math.floor(server.disk_used)}GB /
                <span className="text-xl">
                  {Math.floor(server.disk_size)}GB
                </span>
              </div>
              <h5 className="mt-2">Disk Usage</h5>
              <p className="text-sm">
                {(server.disk_used / server.disk_size) * 100 >= 80 ? (
                  <span className="text-red-400 font-bold">High Usage</span>
                ) : (
                  "Normal Usage"
                )}
              </p>
            </div>

            {/* traffic */}
            <div className="relative overflow-hidden p-6 pb-8 bg-white dark:bg-dark shadow-md rounded-lg text-center">
              <LuLineChart className=" absolute -bottom-5 -left-5 rotate-12 opacity-5 dark:opacity-15 w-36 h-36 text-primary dark:text-primary transition-all " />
              <div className="text-3xl font-bold mt-2 mb-2 text-primary text-nowrap">
                {Math.floor(server.curr_traffic)}GB /
                <span className="text-xl">{Math.floor(server.traffic)}GB</span>
              </div>
              <h5 className="mt-2">Traffic</h5>
              <p className="text-sm">
                {(server.curr_traffic / server.traffic) * 100 >= 80 ? (
                  <span className="text-red-400 font-bold">High Usage</span>
                ) : (
                  "Normal Usage"
                )}
              </p>
            </div>
          </div>

          {/* server overview */}
          <div className="relative overflow-hidden p-10 pt-6 lg:text-lg text-darktext font-semibold bg-white dark:bg-dark shadow-md rounded-lg flex flex-col md:flex-row justify-evenly gap-5 lg:gap-20">
            <div className="absolute -bottom-15 -start-5 opacity-5 dark:opacity-15 rotate-12">
              {server.online ? (
                <LuServer className=" w-96 h-96 md:w-72 md:h-72  text-green-500 dark:text-green-400" />
              ) : (
                <LuServerOff className="w-96 h-96 md:w-72 md:h-72  text-gray-600" />
              )}
            </div>

            {/* overview */}
            <div className="pe-10 flex-1 md:border-e border-gray-200 dark:border-gray-700 *:grid *:grid-cols-2 *:lg:gap-10 text-nowrap">
              <h5 className="mb-2">Overview {server.product_name}</h5>
              <div>
                Service ID: <span>{server.service_id}</span>
              </div>
              <div>
                Service Ordered At: <span>{server.service_ordered_at}</span>
              </div>
              <div>
                Expire At: <span>{server.expire_at}</span>
              </div>
              <div>
                Product Name: <span>{server.product_name}</span>
              </div>
              <div>
                Installed: <span>{server.installed ? "Yes" : "No"}</span>
              </div>
              <div>
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
              </div>
            </div>
            {/* system info */}
            <div className="pe-10 flex-1 *m:mb-1 *:grid *:grid-cols-2 *:lg:gap-10 text-nowrap">
              <h5 className="mb-2">System Info</h5>
              <p>
                IP:{" "}
                <span className=" underline underline-offset-2 cursor-pointer">
                  {server.addresses[0].ip}
                </span>
              </p>
              <p>
                RDNS:{" "}
                <span className=" underline underline-offset-2 cursor-pointer">
                  {server.addresses[0].rdns}
                </span>
              </p>
              <p>
                Memory: <span>{server.memory / 1024} GB</span>
              </p>
              <p>
                CPU: <span>{server.cores} cores</span>
              </p>
              <p>
                Disk: <span>{server.disk_size} GB</span>
              </p>
            </div>
          </div>

          {/* server controls */}
          <div className="mt-6">
            <h4 className="mb-4">Server Controls</h4>
            <ServerControls server={server} />
          </div>
        </>
      ) : (
        <h1>Server not found</h1>
      )}
    </>
  );
};

export default ServerPage;
