import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, MailWarning, Send } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useSendReports } from '@/hooks/useSendReports'
import { APP_SETTINGS } from '@/settings'

export function SendReportsWidget() {
  const [email, setEmail] = useState('')
  const sendReports = useSendReports()

  function handleSubmit(e) {
    e.preventDefault()
    sendReports.mutate(email)
  }

  function handleTryAgain() {
    sendReports.reset()
  }

  return (
    <section id="send-reports" className="border-b bg-card">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Send Me My Reports
            </CardTitle>
            <CardDescription className="leading-relaxed">
              Enter the email address on file with us and we&apos;ll send you all of your available lab reports.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait" initial={false}>
              {sendReports.isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-start gap-3 rounded-lg bg-success/10 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <div>
                    <p className="font-medium text-success">
                      We&apos;ve sent {sendReports.data.reportCount}{' '}
                      {sendReports.data.reportCount === 1 ? 'report' : 'reports'} to {email}.
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Please check your inbox in a few minutes. Didn&apos;t get it?{' '}
                      <button onClick={handleTryAgain} className="font-medium text-primary hover:underline">
                        Try another email
                      </button>
                      .
                    </p>
                  </div>
                </motion.div>
              ) : sendReports.isError ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-3"
                >
                  <div className="flex items-start gap-3 rounded-lg bg-destructive/10 p-4">
                    <MailWarning className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                    <div>
                      <p className="font-medium text-destructive">
                        We couldn&apos;t find any reports for that email address.
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Please double-check the email you used when visiting us, or contact us at{' '}
                        {APP_SETTINGS.branding.email} / {APP_SETTINGS.branding.phones[0]}.
                      </p>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                    <Input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@gmail.com"
                      className="h-12"
                    />
                    <Button type="submit" size="lg" className="h-12 gap-2" disabled={sendReports.isPending}>
                      <Send className="h-4 w-4" />
                      Try Again
                    </Button>
                  </form>
                </motion.div>
              ) : (
                <motion.form
                  key="idle"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@gmail.com"
                    className="h-12"
                  />
                  <Button type="submit" size="lg" className="h-12 gap-2" disabled={sendReports.isPending}>
                    <Send className="h-4 w-4" />
                    {sendReports.isPending ? 'Sending…' : 'Send Reports'}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
