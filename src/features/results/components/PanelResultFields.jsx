import { Input } from '@/components/ui/input'
import { resolveRange, flagValue } from '@/utils/rangeFlag'
import { cn } from '@/utils/cn'

export function PanelResultFields({ testType, values, onFieldChange, readOnly, gender }) {
  return (
    <div className="space-y-6">
      {testType.groups.map((group) => (
        <div key={group.group} className="overflow-hidden rounded-lg border">
          <div className="bg-muted px-4 py-2 text-sm font-semibold">{group.group}</div>
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-2 text-left">Parameter</th>
                <th className="px-4 py-2 text-left">Result</th>
                <th className="px-4 py-2 text-left">Range</th>
              </tr>
            </thead>
            <tbody>
              {group.fields.map((field) => {
                const range = resolveRange(field.range, gender)
                const value = values[field.key] ?? ''
                const flag = flagValue(value, range)
                return (
                  <tr key={field.key} className="border-b last:border-0">
                    <td className="px-4 py-2.5 font-medium">{field.label}</td>
                    <td className="px-4 py-2.5">
                      {readOnly ? (
                        <span
                          className={cn(
                            'font-medium',
                            flag === 'high' && 'text-destructive',
                            flag === 'low' && 'text-warning-foreground',
                          )}
                        >
                          {value || '—'} {value && field.unit}
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Input
                            value={value}
                            onChange={(e) => onFieldChange(field.key, e.target.value)}
                            inputMode="decimal"
                            className="h-10 w-28"
                          />
                          <span className="text-xs text-muted-foreground">{field.unit}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {range} {field.unit}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ))}
      {testType.footnote && <p className="text-xs text-muted-foreground">{testType.footnote}</p>}
    </div>
  )
}
