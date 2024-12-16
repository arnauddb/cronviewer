import {
  ColumnDef
} from "@tanstack/react-table"
import cronstrue from 'cronstrue';
import { Button } from '../../components/Button';
import { Checkbox } from '../../components/Checkbox';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
 } from '../../components/Dropdown';
import {
  MoreHorizontal
} from "lucide-react"

import { CronJob } from '../../types/CronJob'

const columns = ({deleteJobs, setEditingJob}: {deleteJobs: (ids: string[]) => void, setEditingJob: (job: CronJob) => void}): ColumnDef<CronJob>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div>{row.getValue("name")}</div>
    ),
  },
  {
    id: "schedule",
    accessorKey: "schedule",
    header: "CRON",
    cell: ({ row }) => (
      <div>{row.getValue("schedule")}</div>
    ),
  },
  {
    id: "schedule-human",
    accessorKey: "schedule",
    header: "Schedule",
    cell: ({ row }) => {
      const schedule = row.getValue("schedule") as string;
      try {
        const humanReadable = cronstrue.toString(schedule);
        return (
          <div title={schedule}>
            {humanReadable}
          </div>
        );
      } catch (error) {
        return <div className="text-red-500">Wrong CRON format</div>;
      }
    }
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div>{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div>{row.getValue("description")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
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
              <DropdownMenuItem
                onClick={() => setEditingJob(row.original)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deleteJobs([row.original.id])}>
                Delete
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default columns