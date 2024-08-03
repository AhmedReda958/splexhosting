import React from "react";
import { HiOutlineBell } from "react-icons/hi2";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-dark dark:mx-6 dark:xl:mx-8 dark:mt-6 dark:rounded-xl transition-all duration-500 h-14 md:h-16 xl:h-20 dark:h-16 flex items-center justify-between px-4 pe-8 drop-shadow-sm">
      <div className="flex items-center gap-8">
        <Link href="/notifications" className=" relative">
          <HiOutlineBell className="w-6 h-6 text-darkText2 hover:text-darkText" />
          <span className="absolute -top-1 -end-1 w-4 h-4 bg-blue-400 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
