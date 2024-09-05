"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuEye, LuFileEdit, LuTrash } from "react-icons/lu";
import { DataTableColumnHeader } from "@/components/tables/DataTableColumnHeader";
import { Server } from "@prisma/client";
import Link from "next/link";

export const columns: ColumnDef<Server>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
  },
  {
    accessorKey: "user.email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Owner" />;
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Type" />;
    },
  },
  {
    accessorKey: "cores",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Cores" />;
    },
  },
  {
    accessorKey: "ram",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Memory" />;
    },
  },
  {
    accessorKey: "storage",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Storage" />;
    },
  },

  // {
  //   accessorKey: "status",
  //   header: ({ column }) => {
  //     return <DataTableColumnHeader column={column} title="Status" />;
  //   },
  // },
  // {
  //   accessorKey: "createdAt",
  //   accessorFn: (row) => new Date(row.createdAt).toLocaleDateString(),
  //   header: ({ column }) => {
  //     return <DataTableColumnHeader column={column} title="Created At" />;
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const server = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`/dashboard/servers/${server.id}`}>
              <DropdownMenuItem>
                <LuEye className="w-4 h-4 mr-2" />
                View Server
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <LuFileEdit className="w-4 h-4 mr-2" />
              Update Server
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-400">
              <LuTrash className="w-4 h-4 mr-2" />
              Delete Server
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
