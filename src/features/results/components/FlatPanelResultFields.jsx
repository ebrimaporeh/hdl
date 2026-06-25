import { Input } from '@/components/ui/input'
import { ConclusionField } from './ConclusionField'
import { InterpretationReferenceTable } from './InterpretationReferenceTable'
import { resolveRange, flagValue } from '@/utils/rangeFlag'
import { cn } from '@/utils/cn'

export function FlatPanelResultFields({ testType, values, onFieldChange, readOnly, gender }) {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-lg border">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-2 text-left">Parameter</th>
              <th className="px-4 py-2 text-left">Result</th>
              <th className="px-4 py-2 text-left">Unit</th>
              <th className="px-4 py-2 text-left">Range</th>
            </tr>
          </thead>
          <tbody>
            {testType.fields.map((field) => {
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
                        {value || '—'}
                      </span>
                    ) : (
                      <Input
                        value={value}
                        onChange={(e) => onFieldChange(field.key, e.target.value)}
                        inputMode="decimal"
                        className="h-10 w-28"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">{field.unit}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{range}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {testType.conclusionFields?.map((field) => (
        <ConclusionField
          key={field.key}
          field={field}
          value={values[field.key]}
          onChange={(v) => onFieldChange(field.key, v)}
          readOnly={readOnly}
        />
      ))}

      {testType.interpretationTable && <InterpretationReferenceTable table={testType.interpretationTable} />}
    </div>
  )
}
