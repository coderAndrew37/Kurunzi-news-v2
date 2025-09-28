import Link from "next/link";

export default function SitemapPage() {
  const siteSections = [
    {
      title: "News Categories",
      links: [
        { name: "Top Stories", href: "/top-stories" },
        { name: "Politics", href: "/politics" },
        { name: "Business", href: "/business" },
        { name: "Investigations", href: "/investigations" },
        { name: "Features", href: "/features" },
        { name: "Sports", href: "/sports" },
        { name: "Opinion", href: "/opinion" },
      ],
    },
    {
      title: "Company Information",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact Us", href: "/contact" },
        { name: "Advertise With Us", href: "/advertise" },
        { name: "Careers", href: "/careers" },
        { name: "Our Team", href: "/about#team" },
      ],
    },
    {
      title: "Legal Information",
      links: [
        { name: "Privacy Policy", href: "/legal/privacy" },
        { name: "Terms of Service", href: "/legal/terms" },
        { name: "Disclaimer", href: "/legal/disclaimer" },
        { name: "Accessibility Statement", href: "/accessibility" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Newsletter", href: "/newsletter" },
        { name: "Mobile Apps", href: "/apps" },
        { name: "Press Releases", href: "/press" },
        { name: "Events", href: "/events" },
        { name: "Subscribe", href: "/subscribe" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-neutral-900 mb-2 text-center">
          Sitemap
        </h1>
        <p className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
          Browse our website structure to find the content you&apos;re looking
          for.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {siteSections.map((section, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-blue-600 hover:underline hover:text-blue-700"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Search Our Website
          </h2>
          <p className="text-neutral-700 mb-4">
            Can&apos;t find what you&apos;re looking for? Use our search
            function to find specific content.
          </p>
          <div className="flex max-w-md">
            <input
              type="text"
              placeholder="Search articles, topics, and more..."
              className="flex-1 px-4 py-2 border border-neutral-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">
            XML Sitemap
          </h2>
          <p className="text-neutral-700 mb-4">
            For search engines and developers, we provide an XML sitemap to help
            index our content.
          </p>
          <Link
            href="/sitemap.xml"
            className="text-blue-600 hover:underline font-medium"
          >
            View XML Sitemap
          </Link>
        </div>
      </div>
    </div>
  );
}
