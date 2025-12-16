import {
  HelpCircle,
  BookOpen,
  MessageSquare,
  Video,
  FileText,
  Mail,
  Phone,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function HelpPage() {
  const helpTopics = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Getting Started",
      description: "Learn the basics of using WriterHub",
      link: "#",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Writing Guide",
      description: "Best practices for creating great content",
      link: "#",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Editor Features",
      description: "Master the rich text editor",
      link: "#",
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "Video Tutorials",
      description: "Watch step-by-step tutorials",
      link: "#",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 bg-blue-100 rounded-full mb-4">
          <HelpCircle className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Get help with writing, publishing, and managing your articles
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="search"
            placeholder="Search for help articles..."
            className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Search
          </button>
        </div>
      </div>

      {/* Help Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {helpTopics.map((topic, index) => (
          <Link
            key={index}
            href={topic.link}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">
              {topic.icon}
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{topic.title}</h3>
            <p className="text-gray-600 text-sm">{topic.description}</p>
          </Link>
        ))}
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "How do I submit an article for review?",
              a: "After finishing your draft, click the 'Submit for Review' button in the editor. Our team will review it within 2-3 business days.",
            },
            {
              q: "What are the article requirements?",
              a: "Articles must be at least 100 words, have a clear title, and be properly categorized. Images and formatting are encouraged.",
            },
            {
              q: "How do I track my article's performance?",
              a: "Visit the Analytics page to see views, reads, and engagement metrics for all your published articles.",
            },
            {
              q: "Can I edit an article after submission?",
              a: "Once submitted, articles cannot be edited until they're either published or returned for revisions.",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="pb-6 border-b border-gray-100 last:border-0"
            >
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Still Need Help?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center text-blue-600 mx-auto mb-4">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600 text-sm">support@writerhub.com</p>
            <p className="text-gray-500 text-xs mt-1">
              Response time: 24 hours
            </p>
          </div>
          <div className="text-center">
            <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center text-blue-600 mx-auto mb-4">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
            <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
            <p className="text-gray-500 text-xs mt-1">Mon-Fri, 9AM-6PM EST</p>
          </div>
          <div className="text-center">
            <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center text-blue-600 mx-auto mb-4">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600 text-sm">Available 24/7</p>
            <p className="text-gray-500 text-xs mt-1">
              Click the chat icon below
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
