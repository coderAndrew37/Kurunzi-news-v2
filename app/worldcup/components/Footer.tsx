import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-2xl font-bold text-white mb-4">
              WORLD CUP 2026
            </div>
            <p className="text-gray-400">
              Official website for the FIFA World Cup 2026 in USA, Canada &
              Mexico.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Tournament</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/matches" className="hover:text-white">
                  Matches
                </Link>
              </li>
              <li>
                <Link href="/teams" className="hover:text-white">
                  Teams
                </Link>
              </li>
              <li>
                <Link href="/groups" className="hover:text-white">
                  Groups
                </Link>
              </li>
              <li>
                <Link href="/stats" className="hover:text-white">
                  Statistics
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold mb-4">Information</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/tickets" className="hover:text-white">
                  Tickets
                </Link>
              </li>
              <li>
                <Link href="/hospitality" className="hover:text-white">
                  Hospitality
                </Link>
              </li>
              <li>
                <Link href="/volunteers" className="hover:text-white">
                  Volunteers
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; 2024 FIFA World Cup 2026. All rights reserved. Part of
            Kurunzi News Network.
          </p>
        </div>
      </div>
    </footer>
  );
}
