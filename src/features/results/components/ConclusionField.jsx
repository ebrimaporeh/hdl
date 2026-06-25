import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

export function ConclusionField({ field, value, onChange, readOnly }) {
  const displayValue = value || field.defaultValue || ''

  if (readOnly) {
    return (
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{field.label}</p>
        <p className="mt-1 whitespace-pre-wrap text-sm">{displayValue || '—'}</p>
      </div>
    )
  }

  return (
    <div className="space-y-1.5">
      <Label>{field.label}</Label>
      {field.type === 'textarea' ? (
        <Textarea value={displayValue} onChange={(e) => onChange(e.target.value)} rows={2} />
      ) : field.type === 'select' ? (
        <Select value={displayValue} onValueChange={onChange}>
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Select…" />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input value={displayValue} onChange={(e) => onChange(e.target.value)} className="h-11" />
      )}
    </div>
  )
}
