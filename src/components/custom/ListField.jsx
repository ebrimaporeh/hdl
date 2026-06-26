import { Plus, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

/**
 * Editable list of short text items — one input row per item, with add/remove.
 *
 * @param value        string[] of items
 * @param onChange     (next: string[]) => void
 * @param placeholder  placeholder for each row
 * @param addLabel     label for the "add" button
 */
export function ListField({ value = [], onChange, placeholder, addLabel = 'Add item' }) {
  const items = value.length ? value : ['']

  function update(index, text) {
    onChange(items.map((item, i) => (i === index ? text : item)))
  }

  function remove(index) {
    const next = items.filter((_, i) => i !== index)
    onChange(next.length ? next : [''])
  }

  function add() {
    onChange([...items, ''])
  }

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-semibold text-muted-foreground">
            {index + 1}
          </span>
          <Input
            value={item}
            onChange={(e) => update(index, e.target.value)}
            placeholder={placeholder}
            className="h-11"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => remove(index)}
            disabled={items.length === 1 && !item}
            aria-label={`Remove item ${index + 1}`}
            className="shrink-0 text-muted-foreground hover:text-destructive-emphasis"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={add} className="gap-1.5">
        <Plus className="h-4 w-4" />
        {addLabel}
      </Button>
    </div>
  )
}
