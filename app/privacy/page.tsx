import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | Amplify',
  description: 'Amplify privacy policy — how we collect, use, and protect your data.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-gray-900 font-[family-name:var(--font-display)]">
            Amplify
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Back to home
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-display)]">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-400 mb-12">Last updated: March 24, 2026</p>

        <div className="prose prose-gray max-w-none [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_li]:leading-relaxed [&_ul]:mb-4 [&_ul]:pl-5 [&_ul]:list-disc">

          <h2>1. Introduction</h2>
          <p>
            Amplify (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) provides catalog management and
            synchronization tools for e-commerce businesses. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our platform and services.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We collect the following types of information:</p>
          <ul>
            <li>
              <strong>Account Information:</strong> Name, email address, and password when you create an account.
            </li>
            <li>
              <strong>Business Information:</strong> Store names, product catalog data, pricing, inventory
              levels, and order/return data that you connect to our platform.
            </li>
            <li>
              <strong>Third-Party Platform Credentials:</strong> OAuth tokens and API credentials for
              services you connect (e.g., Uber Eats, Shopify, Amazon). These are encrypted at rest
              using AES-256-GCM encryption.
            </li>
            <li>
              <strong>Usage Data:</strong> Log data, device information, and analytics about how you
              interact with our platform.
            </li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our catalog synchronization services</li>
            <li>Sync your product data across connected marketplace platforms</li>
            <li>Generate recommendations for product listing improvements</li>
            <li>Measure the impact of changes on return rates and other metrics</li>
            <li>Send you service-related communications</li>
            <li>Detect and prevent fraud or abuse</li>
          </ul>

          <h2>4. Third-Party Integrations</h2>
          <p>
            Our platform connects to third-party services including Uber Eats, Shopify, Amazon, and
            other marketplace platforms. When you authorize a connection:
          </p>
          <ul>
            <li>We access only the data and permissions you explicitly authorize</li>
            <li>API credentials are encrypted and stored securely</li>
            <li>We use your data solely to provide our synchronization and management services</li>
            <li>You can disconnect any integration at any time from your Settings page</li>
          </ul>
          <p>
            We do not sell, rent, or share your marketplace data with third parties for their own
            marketing or advertising purposes.
          </p>

          <h2>5. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data:
          </p>
          <ul>
            <li>All API tokens and credentials are encrypted using AES-256-GCM at rest</li>
            <li>Data in transit is encrypted using TLS/HTTPS</li>
            <li>Database access is restricted and monitored</li>
            <li>We conduct regular security reviews of our infrastructure</li>
          </ul>

          <h2>6. Data Retention</h2>
          <p>
            We retain your data for as long as your account is active. When you delete your account or
            disconnect an integration, we remove the associated data within 30 days. Aggregated,
            anonymized analytics data may be retained indefinitely.
          </p>

          <h2>7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Disconnect any third-party integration at any time</li>
            <li>Export your data in a machine-readable format</li>
          </ul>

          <h2>8. Cookies</h2>
          <p>
            We use essential cookies for authentication and session management. We do not use
            third-party tracking cookies or advertising cookies.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material
            changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our data practices, contact us at:{' '}
            <a href="mailto:privacy@gofrsh.com" className="text-gray-900 underline hover:text-lime-600 transition-colors">
              privacy@gofrsh.com
            </a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-between text-xs text-gray-400">
          <span>&copy; {new Date().getFullYear()} Amplify. All rights reserved.</span>
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        </div>
      </footer>
    </div>
  )
}
