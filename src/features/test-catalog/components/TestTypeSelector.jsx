import { Check } from 'lucide-react'
import { CATEGORY_ICONS } from '@/features/marketing/components/ServiceCard'
import { cn } from '@/utils/cn'

export function TestTypeSelector({ testTypes, selectedIds, onToggle }) {
  const byCategory = testTypes.reduce((acc, t) => {
    acc[t.category] ??= []
    acc[t.category].push(t)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      {Object.entries(byCategory).map(([category, types]) => (
        <div key={category}>
          <h3 className="mb-3 text-sm font-semibold text-muted-foreground">{category}</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {types.map((testType) => {
              const Icon = CATEGORY_ICONS[testType.category]
              const isSelected = selectedIds.includes(testType.id)
              return (
                <button
                  type="button"
                  key={testType.id}
                  onClick={() => onToggle(testType.id)}
                  className={cn(
                    'flex items-start gap-3 rounded-lg border p-4 text-left transition-colors',
                    isSelected ? 'border-primary bg-accent' : 'border-border hover:bg-muted/50',
                  )}
                >
                  <span
                    className={cn(
                      'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                      isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
                    )}
                  >
                    {isSelected ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{testType.name}</span>
                    <span className="block text-xs text-muted-foreground">{testType.sampleType}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
