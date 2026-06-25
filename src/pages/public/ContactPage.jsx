import { MapPin, Phone, Mail } from 'lucide-react'
import { ContactForm } from '@/features/marketing/components/ContactForm'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { APP_SETTINGS } from '@/settings'

export function ContactPage() {
  const { branding } = APP_SETTINGS

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">Get In Touch</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">Contact Us</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        Questions about a test, a result, or visiting the lab? Send us a message or reach out directly.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold tracking-tight">Send a message</CardTitle>
            <CardDescription>We typically respond within one business day.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold tracking-tight">Visit or call</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-sm text-muted-foreground">{branding.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-medium">Phone</p>
                {branding.phones.map((phone) => (
                  <p key={phone} className="text-sm text-muted-foreground">
                    {phone}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{branding.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
