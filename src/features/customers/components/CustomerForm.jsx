import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { GENDER_OPTIONS } from '@/constants'

const EMPTY_FORM = { fullName: '', phone: '', email: '', gender: '', dob: '', address: '' }

export function CustomerForm({ onSubmit, isSubmitting }) {
  const [form, setForm] = useState(EMPTY_FORM)

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          required
          value={form.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          className="h-12"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+220 7xx xxxx"
            className="h-12"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="h-12"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="gender">Gender</Label>
          <Select value={form.gender} onValueChange={(v) => handleChange('gender', v)} required>
            <SelectTrigger id="gender" className="h-12">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              {GENDER_OPTIONS.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            type="date"
            required
            value={form.dob}
            onChange={(e) => handleChange('dob', e.target.value)}
            className="h-12"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          required
          value={form.address}
          onChange={(e) => handleChange('address', e.target.value)}
          className="h-12"
        />
      </div>

      <Button type="submit" size="lg" className="h-12 w-full" disabled={isSubmitting || !form.gender}>
        {isSubmitting ? 'Registering…' : 'Register Customer'}
      </Button>
    </form>
  )
}
