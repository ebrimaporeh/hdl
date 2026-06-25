import { ConclusionField } from './ConclusionField'

export function NarrativeResultFields({ testType, values, onFieldChange, readOnly }) {
  return (
    <div className="space-y-5">
      {testType.fields.map((field) => (
        <ConclusionField
          key={field.key}
          field={{ ...field, type: 'textarea' }}
          value={values[field.key]}
          onChange={(v) => onFieldChange(field.key, v)}
          readOnly={readOnly}
        />
      ))}
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
