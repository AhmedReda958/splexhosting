import React from "react";
import Image from "next/image";

const loading = () => {
  return (
    <div className="h-screen w-full flex items-center">
      <Image
        src="/imgs/big-data.gif"
        alt="loading"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
};

export default loading;
