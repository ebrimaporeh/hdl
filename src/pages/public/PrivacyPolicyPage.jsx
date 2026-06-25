import { LegalPage } from '@/features/marketing/components/LegalPage'
import { APP_SETTINGS } from '@/settings'

export function PrivacyPolicyPage() {
  const { branding } = APP_SETTINGS

  const sections = [
    {
      id: 'overview',
      heading: 'Overview',
      body: (
        <p>
          {branding.legalName} (“we”, “us”, or “the lab”) is committed to protecting the privacy and confidentiality
          of everyone who uses our services. This policy explains what information we collect, how we use it, and the
          choices you have. It applies to our website, customer portal, and in-lab services.
        </p>
      ),
    },
    {
      id: 'information-we-collect',
      heading: 'Information we collect',
      body: (
        <>
          <p>We collect only the information needed to provide accurate diagnostic services, including:</p>
          <ul>
            <li>
              <strong>Identity &amp; contact details</strong> — your name, date of birth, sex, phone number, and email
              address.
            </li>
            <li>
              <strong>Health &amp; test information</strong> — samples you provide, the tests requested, and the
              results generated.
            </li>
            <li>
              <strong>Account information</strong> — credentials used to access the customer portal to view your
              reports.
            </li>
            <li>
              <strong>Technical data</strong> — basic device and usage information collected automatically to keep the
              service secure and reliable.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'how-we-use',
      heading: 'How we use your information',
      body: (
        <>
          <p>Your information is used to:</p>
          <ul>
            <li>Process test requests and produce your diagnostic reports.</li>
            <li>Make your results available securely through the customer portal.</li>
            <li>Communicate with you about your tests, appointments, and results.</li>
            <li>Maintain accurate medical records as required by professional and legal standards.</li>
            <li>Protect the security and integrity of our systems.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'sharing',
      heading: 'How we share information',
      body: (
        <p>
          We do not sell your personal or health information. We share results only with you and, where you direct us,
          your referring doctor or clinic. We may disclose information when required by law or to qualified
          professionals involved in reviewing and reporting your results.
        </p>
      ),
    },
    {
      id: 'security',
      heading: 'Data security',
      body: (
        <p>
          We apply appropriate technical and organizational measures to protect your information against unauthorized
          access, loss, or disclosure. Access to health records is restricted to authorized staff, and portal access is
          protected by individual credentials. No system can be guaranteed perfectly secure, but we work continually to
          safeguard your data.
        </p>
      ),
    },
    {
      id: 'retention',
      heading: 'Data retention',
      body: (
        <p>
          We keep diagnostic records for as long as necessary to provide ongoing care and to comply with applicable
          medical record-keeping requirements. When information is no longer needed, it is securely deleted or
          anonymized.
        </p>
      ),
    },
    {
      id: 'your-rights',
      heading: 'Your rights',
      body: (
        <>
          <p>You may, subject to applicable law:</p>
          <ul>
            <li>Request a copy of the personal information we hold about you.</li>
            <li>Ask us to correct inaccurate or incomplete information.</li>
            <li>Request deletion of information that we are no longer required to keep.</li>
          </ul>
          <p>To exercise any of these rights, contact us using the details below.</p>
        </>
      ),
    },
    {
      id: 'contact',
      heading: 'Contact us',
      body: (
        <p>
          If you have questions about this policy or how your information is handled, contact us at{' '}
          <a href={`mailto:${branding.email}`}>{branding.email}</a> or call {branding.phones.join(' / ')}. You can also
          visit us at {branding.address}.
        </p>
      ),
    },
  ]

  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="June 25, 2026"
      intro="Your health information is sensitive, and we treat it that way. This policy describes how we collect, use, and protect the information you share with us."
      sections={sections}
    />
  )
}
