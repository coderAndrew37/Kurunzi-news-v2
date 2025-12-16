// app/writer/_components/Footer.tsx
import Link from "next/link";

export default function WriterFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Kurunzi Writer<span className="text-blue-600">Hub</span>
            </h3>
            <p className="text-gray-600 text-sm">
              Your platform for creating amazing content and reaching your
              audience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/writer/articles/new"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                >
                  Write New Article
                </Link>
              </li>
              <li>
                <Link
                  href="/writer/drafts"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                >
                  My Drafts
                </Link>
              </li>
              <li>
                <Link
                  href="/writer/analytics"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                >
                  Analytics
                </Link>
              </li>
              <li>
                <Link
                  href="/writer/help"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/writer/guidelines"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                >
                  Writing Guidelines
                </Link>
              </li>
              <li>
                <Link
                  href="/writer/templates"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                >
                  Article Templates
                </Link>
              </li>
              <li>
                <Link
                  href="/writer/style-guide"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                >
                  Style Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/writer/faq"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm">support@Kurunzinews.com</li>
              <li className="text-gray-600 text-sm">+1 (555) 123-4567</li>
              <li className="text-gray-600 text-sm">Mon-Fri, 9AM-6PM EST</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Kurunzi News. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
