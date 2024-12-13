import { useState } from 'react';
import { Trash, Plus, ChevronDown } from 'lucide-react';
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { 
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '../../components/Table';
import { Input } from '../../components/Input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
 } from '../../components/Dropdown';
import { CronJob } from '../../types/CronJob';
import { Button } from '../../components/Button';
import { EditJobModal } from './EditJobModal';
import { ImportJobs } from './ImportJobs';
import { EmptyState } from './EmptyState';
import columns from './columns';

interface CronListProps {
  jobs: CronJob[];
  updateJobs: (jobs: CronJob[]) => void;
}

export function CronList({ jobs, updateJobs }: CronListProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [editingJob, setEditingJob] = useState<CronJob | null>(null)

  const addJob = () => {
    const newJob: CronJob = {
      id: crypto.randomUUID(),
      name: "New Job",
      schedule: "0 0 * * *",
      description: "New Job",
      category: "New Job",
    }
    updateJobs([...jobs, newJob]);
  }

  const deleteJobs = (ids: string[]) => {
    const newJobs = jobs.filter(job => !ids.includes(job.id));
    updateJobs(newJobs);
    setRowSelection({});
  }

  const table = useReactTable({
    data: jobs,
    columns: columns({ deleteJobs, setEditingJob }),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return(
    <div className="w-full overflow-x-auto bg-white">
      <div className="p-4">
        <div className="mb-4 flex justify-end items-center">
          <div className='flex items-center space-x-2'>
            {(table.getFilteredSelectedRowModel().rows.length > 0) && (
              <Button
                variant="destructive"
                className="ml-4"
                onClick={() => deleteJobs(table.getFilteredSelectedRowModel().rows.map(r => r.original.id))}>
                <Trash className="mr-2 h-5 w-5" />
                Delete selected job{table.getFilteredSelectedRowModel().rows.length > 1 ? 's' : ''}
              </Button>
            )}
            <ImportJobs onImport={jobs => updateJobs(jobs)} />
            <Button
              variant="outline"
              onClick={addJob}>
              <Plus /> Add Job
            </Button>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {jobs.length == 0
            ? <EmptyState />
            : (
              <>
              <div className="flex items-center py-4">
                <Input
                  placeholder="Filter jobs..."
                  value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
                />
                <div className="flex-1" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      Columns <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => {
                        return (
                          <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                              column.toggleVisibility(!!value)
                            }
                          >
                            {column.id}
                          </DropdownMenuCheckboxItem>
                        )
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </TableHead>
                          )
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                  {table.getFilteredSelectedRowModel().rows.length} of{" "}
                  {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Next
                  </Button>
                </div>
              </div>
              </>
            )
          }
        </div>
      </div>
      {editingJob && (
        <EditJobModal
          job={editingJob}
          onUpdate={job => {
            const newJobs = [...jobs]
            const indexOfJob = newJobs.findIndex(j => j.id === job.id)
            if (indexOfJob !== -1) {
              newJobs[indexOfJob] = job
              updateJobs(newJobs)
            }
          }}
          onClose={() => setEditingJob(null)}
        />
      )}
    </div>
  )
}