import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-neutral-900 mb-2">
          Accessibility Statement
        </h1>
        <p className="text-neutral-600 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-lg max-w-none">
          <p className="lead">
            Kurunzi News is committed to ensuring digital accessibility for
            people with disabilities. We are continually improving the user
            experience for everyone and applying the relevant accessibility
            standards.
          </p>

          <h2>Our Commitment</h2>
          <p>
            We strive to ensure that our website is accessible to all visitors,
            including those with disabilities. We aim to comply with all
            applicable standards, including the Web Content Accessibility
            Guidelines (WCAG) 2.1 Level AA.
          </p>

          <h2>Measures to Support Accessibility</h2>
          <p>
            Kurunzi News takes the following measures to ensure accessibility of
            our website:
          </p>
          <ul>
            <li>Include accessibility as part of our mission statement</li>
            <li>Integrate accessibility into our procurement practices</li>
            <li>Appoint an accessibility officer and/or ombudsperson</li>
            <li>Provide continual accessibility training for our staff</li>
            <li>Assign clear accessibility targets and responsibilities</li>
          </ul>

          <h2>Conformance Status</h2>
          <p>
            The Web Content Accessibility Guidelines (WCAG) defines requirements
            for designers and developers to improve accessibility for people
            with disabilities. It defines three levels of conformance: Level A,
            Level AA, and Level AAA. Kurunzi News is partially conformant with
            WCAG 2.1 level AA. Partially conformant means that some parts of the
            content do not fully conform to the accessibility standard.
          </p>

          <h2>Feedback</h2>
          <p>
            We welcome your feedback on the accessibility of Kurunzi News.
            Please let us know if you encounter accessibility barriers on our
            website:
          </p>
          <ul>
            <li>E-mail: accessibility@kurunzinews.com</li>
            <li>Phone: +254 700 123 456</li>
            <li>Visitor address: Nairobi, Kenya</li>
            <li>Postal address: P.O. Box 12345-00100, Nairobi, Kenya</li>
          </ul>
          <p>We try to respond to feedback within 3-5 business days.</p>

          <h2>Technical Specifications</h2>
          <p>
            Accessibility of Kurunzi News relies on the following technologies
            to work with the particular combination of web browser and any
            assistive technologies or plugins installed on your computer:
          </p>
          <ul>
            <li>HTML</li>
            <li>WAI-ARIA</li>
            <li>CSS</li>
            <li>JavaScript</li>
          </ul>
          <p>
            These technologies are relied upon for conformance with the
            accessibility standards used.
          </p>

          <h2>Assessment Approach</h2>
          <p>
            Kurunzi News assessed the accessibility of our website by the
            following approaches:
          </p>
          <ul>
            <li>Self-evaluation</li>
            <li>External evaluation by accessibility experts</li>
            <li>
              Continuous testing with screen readers and other assistive
              technologies
            </li>
          </ul>

          <h2>Formal Approval of This Accessibility Statement</h2>
          <p>This Accessibility Statement is approved by:</p>
          <address className="not-italic">
            Kurunzi News Accessibility Team
            <br />
            Kurunzi News Centre
            <br />
            Nairobi, Kenya
          </address>

          <h2>Date</h2>
          <p>
            This statement was created on {new Date().toLocaleDateString()}.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Need Help?
          </h2>
          <p className="text-neutral-700 mb-4">
            If you are experiencing difficulty accessing any content on our
            website, please contact us and we will make all reasonable efforts
            to assist you.
          </p>
          <Button asChild>
            <Link href="/contact">Contact Accessibility Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
