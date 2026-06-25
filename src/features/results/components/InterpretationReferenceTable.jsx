export function InterpretationReferenceTable({ table }) {
  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Interpretation Reference
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              {table.columns.map((c) => (
                <th key={c} className="whitespace-nowrap px-2 py-1.5">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i} className="border-b last:border-0">
                {row.map((cell, j) => (
                  <td key={j} className="px-2 py-1.5">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.footnote && <p className="mt-2 text-[11px] leading-snug text-muted-foreground">{table.footnote}</p>}
    </div>
  )
}
