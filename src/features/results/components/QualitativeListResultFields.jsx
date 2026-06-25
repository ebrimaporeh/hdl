import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { ConclusionField } from './ConclusionField'
import { cn } from '@/utils/cn'

export function QualitativeListResultFields({ testType, values, onFieldChange, readOnly }) {
  return (
    <div className="space-y-6">
      <div className="divide-y overflow-hidden rounded-lg border">
        {testType.fields.map((field) => {
          const value = values[field.key] ?? testType.options[0]
          const isPositive = value === 'Positive'
          return (
            <div key={field.key} className="flex items-center justify-between gap-4 px-4 py-3">
              <div>
                <p className="font-medium">{field.label}</p>
                {field.helpText && <p className="text-xs text-muted-foreground">{field.helpText}</p>}
              </div>
              {readOnly ? (
                <span className={cn('font-semibold', isPositive ? 'text-destructive' : 'text-success')}>
                  {value}
                </span>
              ) : (
                <Select value={value} onValueChange={(v) => onFieldChange(field.key, v)}>
                  <SelectTrigger className="h-10 w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {testType.options.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          )
        })}
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
    </div>
  )
}
