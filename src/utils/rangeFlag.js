// Resolves a field's reference range to a display string, picking the
// sex-specific variant when the template defines one (e.g. Uric Acid, ALT, AST).
export function resolveRange(range, gender) {
  if (!range) return null
  if (typeof range === 'string') return range
  if (gender === 'Male') return range.male
  if (gender === 'Female') return range.female
  return range.male ?? range.female ?? null
}

// Compares a numeric result against a reference range string and flags it as
// 'low' | 'high' | 'normal'. Returns null when either side isn't a plain
// number (qualitative results, unparseable ranges) — those simply aren't flagged.
export function flagValue(value, rangeStr) {
  if (value === '' || value === null || value === undefined || !rangeStr) return null
  const num = parseFloat(value)
  if (Number.isNaN(num)) return null

  let m = rangeStr.match(/(-?\d+(?:\.\d+)?)\s*-\s*(-?\d+(?:\.\d+)?)/)
  if (m) {
    const [min, max] = [parseFloat(m[1]), parseFloat(m[2])]
    if (num < min) return 'low'
    if (num > max) return 'high'
    return 'normal'
  }

  m = rangeStr.match(/[<≤]=?\s*(-?\d+(?:\.\d+)?)/)
  if (m) return num <= parseFloat(m[1]) ? 'normal' : 'high'

  m = rangeStr.match(/[>≥]=?\s*(-?\d+(?:\.\d+)?)/)
  if (m) return num >= parseFloat(m[1]) ? 'normal' : 'low'

  return null
}
