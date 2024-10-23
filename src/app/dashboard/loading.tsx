import React from "react";
import Image from "next/image";

const loading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Image src="/imgs/big-data.gif" alt="loading" width={250} height={250} />
    </div>
  );
};

export default loading;
