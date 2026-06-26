import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { ListField } from '@/components/custom/ListField'
import { APP_SETTINGS } from '@/settings'

const toList = (arr) => (Array.isArray(arr) && arr.length ? arr : [''])
const cleanList = (arr) => arr.map((item) => item.trim()).filter(Boolean)

function toFormState(testType) {
  return {
    name: testType?.name ?? '',
    shortName: testType?.shortName ?? '',
    code: testType?.code ?? '',
    category: testType?.category ?? '',
    sampleType: testType?.sampleType ?? '',
    method: testType?.method ?? '',
    description: testType?.description ?? '',
    overview: testType?.overview ?? '',
    turnaround: testType?.turnaround ?? '',
    fasting: Boolean(testType?.fasting),
    image: testType?.image ?? '',
    preparation: toList(testType?.preparation),
    procedure: toList(testType?.procedure),
    whoFor: testType?.whoFor ?? '',
    clinicalInfo: testType?.clinicalInfo ?? '',
  }
}

export function ServiceForm({ testType, onSubmit, isSubmitting, submitLabel = 'Save service' }) {
  const [form, setForm] = useState(() => toFormState(testType))
  const categories = APP_SETTINGS.reportTypes.categories

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({
      name: form.name.trim(),
      shortName: form.shortName.trim() || form.name.trim(),
      code: form.code.trim().toUpperCase(),
      category: form.category,
      sampleType: form.sampleType.trim(),
      method: form.method.trim() || null,
      description: form.description.trim(),
      overview: form.overview.trim(),
      turnaround: form.turnaround.trim(),
      fasting: form.fasting,
      image: form.image.trim(),
      preparation: cleanList(form.preparation),
      procedure: cleanList(form.procedure),
      whoFor: form.whoFor.trim(),
      clinicalInfo: form.clinicalInfo.trim(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basics */}
      <fieldset className="space-y-5">
        <legend className="text-sm font-semibold tracking-tight text-foreground">Basics</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Test name" htmlFor="svc-name">
            <Input id="svc-name" required value={form.name} onChange={(e) => handleChange('name', e.target.value)} className="h-12" />
          </Field>
          <Field label="Short name" htmlFor="svc-short">
            <Input id="svc-short" value={form.shortName} onChange={(e) => handleChange('shortName', e.target.value)} className="h-12" />
          </Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Code" htmlFor="svc-code">
            <Input id="svc-code" required value={form.code} onChange={(e) => handleChange('code', e.target.value)} className="h-12" placeholder="e.g. CHEM" />
          </Field>
          <Field label="Category" htmlFor="svc-category">
            <Select value={form.category} onValueChange={(v) => handleChange('category', v)} required>
              <SelectTrigger id="svc-category" className="h-12">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Sample type" htmlFor="svc-sample">
            <Input id="svc-sample" value={form.sampleType} onChange={(e) => handleChange('sampleType', e.target.value)} className="h-12" placeholder="e.g. Serum" />
          </Field>
        </div>
        <Field label="Method" htmlFor="svc-method" hint="Optional — the assay or technique used.">
          <Input id="svc-method" value={form.method} onChange={(e) => handleChange('method', e.target.value)} className="h-12" />
        </Field>
        <Field label="Short description" htmlFor="svc-desc" hint="Shown on service cards.">
          <Textarea id="svc-desc" required rows={2} value={form.description} onChange={(e) => handleChange('description', e.target.value)} />
        </Field>
        <Field label="Overview" htmlFor="svc-overview" hint="Longer intro shown at the top of the detail page.">
          <Textarea id="svc-overview" rows={3} value={form.overview} onChange={(e) => handleChange('overview', e.target.value)} />
        </Field>
      </fieldset>

      {/* Logistics */}
      <fieldset className="space-y-5">
        <legend className="text-sm font-semibold tracking-tight text-foreground">Logistics</legend>
        <Field label="Turnaround" htmlFor="svc-turnaround">
          <Input id="svc-turnaround" value={form.turnaround} onChange={(e) => handleChange('turnaround', e.target.value)} className="h-12" placeholder="e.g. Same day" />
        </Field>
        <Field label="Image ID" htmlFor="svc-image" hint="Unsplash photo ID (e.g. 1532187863486-abf9dbad1b69). Leave blank to use the category default.">
          <Input id="svc-image" value={form.image} onChange={(e) => handleChange('image', e.target.value)} className="h-12" />
        </Field>
        <Checkbox
          checked={form.fasting}
          onChange={(e) => handleChange('fasting', e.target.checked)}
          label="Fasting required"
          description="Patients must fast before this test."
        />
      </fieldset>

      {/* Detail content */}
      <fieldset className="space-y-5">
        <legend className="text-sm font-semibold tracking-tight text-foreground">Detail page content</legend>
        <Field label="How to prepare" hint="Preparation instructions for the patient.">
          <ListField
            value={form.preparation}
            onChange={(v) => handleChange('preparation', v)}
            placeholder="e.g. Fast for 8–12 hours before your sample is taken."
            addLabel="Add instruction"
          />
        </Field>
        <Field label="What to expect (procedure)" hint="The steps of how the test is carried out.">
          <ListField
            value={form.procedure}
            onChange={(v) => handleChange('procedure', v)}
            placeholder="e.g. A small blood sample is drawn from a vein in your arm."
            addLabel="Add step"
          />
        </Field>
        <Field label="Why it matters" htmlFor="svc-clinical" hint="Clinical significance / what it screens for.">
          <Textarea id="svc-clinical" rows={3} value={form.clinicalInfo} onChange={(e) => handleChange('clinicalInfo', e.target.value)} />
        </Field>
        <Field label="Who it’s for" htmlFor="svc-whofor">
          <Textarea id="svc-whofor" rows={2} value={form.whoFor} onChange={(e) => handleChange('whoFor', e.target.value)} />
        </Field>
      </fieldset>

      <Button type="submit" size="lg" className="h-12 w-full" disabled={isSubmitting || !form.category}>
        {isSubmitting ? 'Saving…' : submitLabel}
      </Button>
    </form>
  )
}

function Field({ label, htmlFor, hint, children }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}
