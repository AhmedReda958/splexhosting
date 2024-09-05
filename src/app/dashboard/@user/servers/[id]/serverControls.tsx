import {
  RiShutDownLine,
  RiRestartLine,
  RiStopCircleLine,
  RiUploadCloudLine,
  RiInstallLine,
  RiLockPasswordLine,
  RiPlayCircleLine,
} from "react-icons/ri";

import { Card, CardContent } from "@/components/ui/card";

import { Server } from "@prisma/client";

const ServerControls = ({ server }: { server: Server }) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6  gap-4 text-nowrap">
      <Card className="col-span-3">
        <CardContent className="relative  h-36  p-3 flex flex-col items-center justify-end font-bold ">
          <span
            className={`absolute top-4 end-4 h-3 w-3 rounded-full ${
              server.status == "active" ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>

          {server.status == "active" ? (
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

export default ServerControls;
