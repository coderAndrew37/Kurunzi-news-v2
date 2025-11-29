// app/legal/page.tsx
import { Button } from "@/components/ui/button";
import { AlertTriangle, Scale, Shield } from "lucide-react";
import Link from "next/link";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-neutral-900 mb-8 text-center">
          Legal Information
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link href="/legal/privacy" className="group">
            <div className="border border-neutral-200 rounded-lg p-6 text-center hover:border-blue-600 hover:shadow-md transition-all">
              <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                Privacy Policy
              </h2>
              <p className="text-neutral-600 text-sm">
                Learn how we collect, use, and protect your personal
                information.
              </p>
            </div>
          </Link>

          <Link href="/legal/terms" className="group">
            <div className="border border-neutral-200 rounded-lg p-6 text-center hover:border-blue-600 hover:shadow-md transition-all">
              <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                Terms of Service
              </h2>
              <p className="text-neutral-600 text-sm">
                Understand the rules and guidelines for using our website and
                services.
              </p>
            </div>
          </Link>

          <Link href="/legal/disclaimer" className="group">
            <div className="border border-neutral-200 rounded-lg p-6 text-center hover:border-blue-600 hover:shadow-md transition-all">
              <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                Disclaimer
              </h2>
              <p className="text-neutral-600 text-sm">
                Read about the limitations of liability and content accuracy.
              </p>
            </div>
          </Link>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Need Legal Assistance?</h2>
          <p className="text-neutral-700 mb-4">
            If you have questions about our legal policies or need to contact
            our legal team, please reach out to us.
          </p>
          <Button asChild>
            <Link href="/contact">Contact Legal Department</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
