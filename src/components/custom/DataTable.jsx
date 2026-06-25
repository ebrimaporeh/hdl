import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table'
import { EmptyState } from '@/components/custom/EmptyState'
import { LoadingSpinner } from '@/components/custom/LoadingSpinner'
import { cn } from '@/utils/cn'

export function DataTable({ columns, rows, isLoading, emptyTitle = 'No results', emptyDescription, onRowClick }) {
  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card py-16">
        <LoadingSpinner />
      </div>
    )
  }

  if (!rows?.length) {
    return (
      <div className="rounded-lg border bg-card">
        <EmptyState title={emptyTitle} description={emptyDescription} />
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key} className={col.headClassName}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              onClick={() => onRowClick?.(row)}
              className={cn(onRowClick && 'cursor-pointer')}
            >
              {columns.map((col) => (
                <TableCell key={col.key} className={col.cellClassName}>
                  {col.render ? col.render(row) : row[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
