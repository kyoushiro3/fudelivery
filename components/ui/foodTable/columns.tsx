"use client";

import { foodData } from "@/types/props";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import RemoveBtn from "../removeBtn";

export const columns: ColumnDef<foodData>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpIcon className="ml-2 h-4 2-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "description",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "img",
    header: "Image",
  },
  {
    accessorKey: "isAvailable",
    header: "isAvailable",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const food = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              ...
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                food._id && navigator.clipboard.writeText(food._id)
              }
            >
              View
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Food</DropdownMenuItem>
            <DropdownMenuItem>
              <RemoveBtn id={food._id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },

  //   _id?: string;
  //   name: string;
  //   description: string;
  //   price: number;
  //   category: string;
  //   img: string;
  //   isAvailable: boolean;
];
