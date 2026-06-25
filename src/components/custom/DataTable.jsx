import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table'
import { EmptyState } from '@/components/custom/EmptyState'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/utils/cn'

/**
 * Enterprise data table.
 *
 * columns: [{ key, header, render?, headClassName?, cellClassName?, align? }]
 * Backwards compatible with prior API; adds skeleton loading, a footer slot,
 * and a toolbar slot rendered above the table.
 */
export function DataTable({
  columns,
  rows,
  isLoading,
  emptyTitle = 'No results',
  emptyDescription,
  emptyIcon,
  emptyAction,
  onRowClick,
  toolbar,
  footer,
  skeletonRows = 6,
  className,
}) {
  const alignClass = (align) =>
    align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'

  return (
    <div className={cn('overflow-hidden rounded-xl border bg-card shadow-sm', className)}>
      {toolbar && (
        <div className="flex flex-wrap items-center gap-3 border-b bg-muted/30 px-4 py-3">{toolbar}</div>
      )}

      {isLoading ? (
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key} className={cn(alignClass(col.align), col.headClassName)}>
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: skeletonRows }).map((_, r) => (
              <TableRow key={r} className="hover:bg-transparent">
                {columns.map((col) => (
                  <TableCell key={col.key} className={col.cellClassName}>
                    <Skeleton className="h-4" style={{ width: `${55 + ((r * 7 + col.key.length * 5) % 35)}%` }} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : !rows?.length ? (
        <EmptyState title={emptyTitle} description={emptyDescription} icon={emptyIcon} action={emptyAction} />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key} className={cn(alignClass(col.align), col.headClassName)}>
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
                tabIndex={onRowClick ? 0 : undefined}
                onKeyDown={
                  onRowClick
                    ? (e) => {
                        if (e.key === 'Enter') onRowClick(row)
                      }
                    : undefined
                }
                className={cn(
                  onRowClick &&
                    'cursor-pointer focus:bg-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40',
                )}
              >
                {columns.map((col) => (
                  <TableCell key={col.key} className={cn(alignClass(col.align), col.cellClassName)}>
                    {col.render ? col.render(row) : row[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {footer && !isLoading && rows?.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
          {footer}
        </div>
      )}
    </div>
  )
}
