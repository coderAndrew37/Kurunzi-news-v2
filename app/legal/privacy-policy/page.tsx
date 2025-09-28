// app/legal/privacy/page.tsx
import Link from "next/link";

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>
        <p className="text-neutral-600 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-lg max-w-none">
          <p className="lead">
            At Kurunzi News, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you visit our website.
          </p>

          <h2>1. Information We Collect</h2>

          <h3>Personal Information</h3>
          <p>
            We may collect personal information that you voluntarily provide to
            us when you:
          </p>
          <ul>
            <li>Register for an account</li>
            <li>Subscribe to our newsletter</li>
            <li>Submit comments or feedback</li>
            <li>Contact us through our website</li>
            <li>Participate in surveys or contests</li>
          </ul>
          <p>
            This information may include your name, email address, phone number,
            and any other details you choose to provide.
          </p>

          <h3>Automatically Collected Information</h3>
          <p>
            When you visit our website, we automatically collect certain
            information about your device and usage, including:
          </p>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Pages you visit on our site</li>
            <li>Time and date of your visit</li>
            <li>Time spent on those pages</li>
            <li>Other diagnostic data</li>
          </ul>

          <h3>Cookies and Tracking Technologies</h3>
          <p>
            We use cookies and similar tracking technologies to track activity
            on our website and store certain information. Cookies are files with
            a small amount of data that may include an anonymous unique
            identifier.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect in various ways, including to:
          </p>
          <ul>
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>
              Communicate with you, either directly or through one of our
              partners
            </li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
          </ul>

          <h2>3. Disclosure of Your Information</h2>
          <p>
            We may share information we have collected about you in certain
            situations. Your information may be disclosed as follows:
          </p>

          <h3>By Law or to Protect Rights</h3>
          <p>
            If we believe the release of information about you is necessary to
            respond to legal process, to investigate or remedy potential
            violations of our policies, or to protect the rights, property, and
            safety of others, we may share your information as permitted or
            required by any applicable law, rule, or regulation.
          </p>

          <h3>Third-Party Service Providers</h3>
          <p>
            We may share your information with third parties that perform
            services for us or on our behalf, including payment processing, data
            analysis, email delivery, hosting services, customer service, and
            marketing assistance.
          </p>

          <h2>4. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to
            help protect your personal information. While we have taken
            reasonable steps to secure the personal information you provide to
            us, please be aware that despite our efforts, no security measures
            are perfect or impenetrable, and no method of data transmission can
            be guaranteed against any interception or other type of misuse.
          </p>

          <h2>5. Your Rights</h2>
          <p>
            Depending on your location, you may have the following rights
            regarding your personal information:
          </p>
          <ul>
            <li>
              The right to access the personal information we hold about you
            </li>
            <li>
              The right to request that we correct any inaccurate personal
              information
            </li>
            <li>
              The right to request that we delete your personal information
            </li>
            <li>
              The right to object to our processing of your personal information
            </li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>

          <h2>6. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the &quot;Last updated&quot; date. You are advised to
            review this Privacy Policy periodically for any changes.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please
            contact us at:
          </p>
          <address className="not-italic">
            Kurunzi News
            <br />
            Email: privacy@kurunzinews.com
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
