import { RESULT_TYPES } from '@/constants'
import { PanelResultFields } from './PanelResultFields'
import { FlatPanelResultFields } from './FlatPanelResultFields'
import { QualitativeListResultFields } from './QualitativeListResultFields'
import { NarrativeResultFields } from './NarrativeResultFields'

const STRATEGIES = {
  [RESULT_TYPES.PANEL]: PanelResultFields,
  [RESULT_TYPES.FLAT_PANEL]: FlatPanelResultFields,
  [RESULT_TYPES.QUALITATIVE_LIST]: QualitativeListResultFields,
  [RESULT_TYPES.NARRATIVE]: NarrativeResultFields,
}

// Schema-driven result renderer: given a TestType (from src/data/testTypes.js)
// it renders the matching field strategy, editable or read-only. Used for
// both the staff result-entry workspace and the printed report preview, so
// the two are always structurally identical.
export function DynamicResultForm({ testType, values, onChange, readOnly = false, gender }) {
  const Strategy = STRATEGIES[testType.resultType]
  if (!Strategy) return null

  const handleFieldChange = (key, value) => onChange({ ...values, [key]: value })

  return (
    <Strategy
      testType={testType}
      values={values}
      onFieldChange={handleFieldChange}
      readOnly={readOnly}
      gender={gender}
    />
  )
}
