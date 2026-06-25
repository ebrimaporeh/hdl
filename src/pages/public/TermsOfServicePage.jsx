import { LegalPage } from '@/features/marketing/components/LegalPage'
import { APP_SETTINGS } from '@/settings'

export function TermsOfServicePage() {
  const { branding } = APP_SETTINGS

  const sections = [
    {
      id: 'acceptance',
      heading: 'Acceptance of terms',
      body: (
        <p>
          These Terms of Service (“Terms”) govern your use of the services, website, and customer portal provided by{' '}
          {branding.legalName} (“we”, “us”, or “the lab”). By using our services or accessing your results online, you
          agree to these Terms. If you do not agree, please do not use the service.
        </p>
      ),
    },
    {
      id: 'services',
      heading: 'Our services',
      body: (
        <p>
          We provide diagnostic laboratory testing across clinical chemistry, hematology, immunology, toxicology, and
          cytology. Results are reported on the lab’s own templates and made available to you, and where you direct, to
          your referring doctor or clinic.
        </p>
      ),
    },
    {
      id: 'not-medical-advice',
      heading: 'Results are not medical advice',
      body: (
        <p>
          <strong>Test results are provided for informational purposes and do not constitute medical advice,
          diagnosis, or treatment.</strong> Always consult a qualified healthcare professional to interpret your
          results and decide on any course of action. Never disregard or delay seeking professional advice because of
          information provided through our services.
        </p>
      ),
    },
    {
      id: 'accounts',
      heading: 'Accounts and portal access',
      body: (
        <>
          <p>If you are given access to the customer portal, you agree to:</p>
          <ul>
            <li>Provide accurate information and keep it up to date.</li>
            <li>Keep your login credentials confidential and not share them with others.</li>
            <li>Notify us promptly of any unauthorized use of your account.</li>
          </ul>
          <p>You are responsible for activity that occurs under your account.</p>
        </>
      ),
    },
    {
      id: 'acceptable-use',
      heading: 'Acceptable use',
      body: (
        <>
          <p>You agree not to:</p>
          <ul>
            <li>Use the service for any unlawful purpose or in violation of these Terms.</li>
            <li>Attempt to access accounts, data, or systems that do not belong to you.</li>
            <li>Interfere with, disrupt, or compromise the security or integrity of the service.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'accuracy',
      heading: 'Sample integrity and accuracy',
      body: (
        <p>
          The accuracy of results depends on proper sample collection and the information you provide. While we follow
          standardized methods and quality controls, you are responsible for supplying accurate details and for
          following any preparation instructions given before testing.
        </p>
      ),
    },
    {
      id: 'liability',
      heading: 'Limitation of liability',
      body: (
        <p>
          To the maximum extent permitted by law, {branding.legalName} is not liable for any indirect, incidental, or
          consequential damages arising from your use of the service or reliance on results without appropriate
          professional medical guidance. Nothing in these Terms limits liability that cannot be excluded under
          applicable law.
        </p>
      ),
    },
    {
      id: 'changes',
      heading: 'Changes to these terms',
      body: (
        <p>
          We may update these Terms from time to time. When we do, we will revise the “Last updated” date above.
          Continued use of the service after changes take effect constitutes acceptance of the updated Terms.
        </p>
      ),
    },
    {
      id: 'contact',
      heading: 'Contact us',
      body: (
        <p>
          Questions about these Terms? Contact us at <a href={`mailto:${branding.email}`}>{branding.email}</a> or call{' '}
          {branding.phones.join(' / ')}. You can also visit us at {branding.address}.
        </p>
      ),
    },
  ]

  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      updated="June 25, 2026"
      intro="Please read these terms carefully. They explain the rules for using our services and the customer portal."
      sections={sections}
    />
  )
}
