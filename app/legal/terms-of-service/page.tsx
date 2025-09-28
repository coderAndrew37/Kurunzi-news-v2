// app/legal/terms/page.tsx
import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/legal"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          &larr; Back to Legal Information
        </Link>

        <h1 className="text-4xl font-bold text-neutral-900 mb-2">
          Terms of Service
        </h1>
        <p className="text-neutral-600 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-lg max-w-none">
          <p className="lead">
            Welcome to Kurunzi News. These Terms of Service govern your use of
            our website and services. By accessing or using our website, you
            agree to be bound by these Terms.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using Kurunzi News, you acknowledge that you have
            read, understood, and agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use our website.
          </p>

          <h2>2. Intellectual Property Rights</h2>
          <p>
            Unless otherwise indicated, our website and all content and other
            materials therein, including, without limitation, our logo, and all
            designs, text, graphics, pictures, information, data, software, and
            other files are the proprietary property of Kurunzi News or our
            licensors or suppliers and are protected by copyright, trademark,
            and other intellectual property laws.
          </p>

          <h2>3. User Conduct</h2>
          <p>As a condition of your use of our website, you agree not to:</p>
          <ul>
            <li>
              Use the website for any illegal purpose or in violation of any
              local, state, national, or international law
            </li>
            <li>
              Harass, threaten, demean, embarrass, or otherwise harm any other
              user of the website
            </li>
            <li>
              Violate, or encourage others to violate, any right of a third
              party
            </li>
            <li>Interfere with security-related features of the website</li>
            <li>
              Interfere with the operation of the website or any user&#39;s
              enjoyment of the website
            </li>
            <li>Perform any fraudulent activity</li>
          </ul>

          <h2>4. User Contributions</h2>
          <p>
            Our website may contain comment sections, forums, or other
            interactive features that allow users to post, submit, publish,
            display, or transmit content or materials. You are responsible for
            any content you post, and you represent and warrant that you own or
            have the necessary rights to the content you post.
          </p>

          <h2>5. Copyright Policy</h2>
          <p>
            Kurunzi News respects the intellectual property rights of others. If
            you believe that any material on our website infringes upon any
            copyright which you own or control, you may file a notification of
            such infringement with our designated agent.
          </p>

          <h2>6. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites or services
            that are not owned or controlled by Kurunzi News. We have no control
            over, and assume no responsibility for, the content, privacy
            policies, or practices of any third-party websites or services.
          </p>

          <h2>7. Termination</h2>
          <p>
            We may terminate or suspend your access to our website immediately,
            without prior notice or liability, for any reason whatsoever,
            including without limitation if you breach the Terms. All provisions
            of the Terms which by their nature should survive termination shall
            survive termination.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            In no event shall Kurunzi News, nor its directors, employees,
            partners, agents, suppliers, or affiliates, be liable for any
            indirect, incidental, special, consequential or punitive damages,
            including without limitation, loss of profits, data, use, goodwill,
            or other intangible losses, resulting from your access to or use of
            or inability to access or use the website.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the
            laws of Kenya, without regard to its conflict of law provisions.
          </p>

          <h2>10. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. By continuing to access or use our website
            after those revisions become effective, you agree to be bound by the
            revised terms.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <address className="not-italic">
            Kurunzi News
            <br />
            Email: legal@kurunzinews.com
            <br />
            Phone: +254 700 123 456
            <br />
            Address: Nairobi, Kenya
          </address>
        </div>
      </div>
    </div>
  );
}
