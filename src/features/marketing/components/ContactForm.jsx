import { useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const SUBJECTS = ['General enquiry', 'Test results', 'Booking a test', 'Billing', 'Other']

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 600)
  }

  if (status === 'sent') {
    return (
      <div className="flex items-start gap-3 rounded-lg border border-success/20 bg-success-subtle p-4">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
        <div>
          <p className="font-semibold text-success-emphasis">Thanks, {form.name.split(' ')[0] || 'there'}!</p>
          <p className="mt-1 text-sm text-muted-foreground">
            We&apos;ve received your message and will get back to you within one business day.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            required
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="h-12"
            placeholder="Your full name"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contact-phone">
            Phone <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="contact-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="h-12"
            placeholder="+220 …"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          type="email"
          required
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="h-12"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-subject">Reason for contact</Label>
        <Select value={form.subject} onValueChange={(v) => handleChange('subject', v)}>
          <SelectTrigger id="contact-subject" className="h-12">
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent>
            {SUBJECTS.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder="How can we help?"
        />
      </div>

      <Button type="submit" size="lg" className="h-12 w-full gap-2" disabled={status === 'sending'}>
        <Send className="h-4 w-4" />
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  )
}
