import { Button } from "@/components/ui/button";
import { BarChart, Mail, Target, Users } from "lucide-react";

export default function AdvertisePage() {
  const advertisingOptions = [
    {
      title: "Display Advertising",
      description:
        "Banner ads on our website with various sizes and placements to suit your campaign needs.",
      startingAt: "$500",
    },
    {
      title: "Sponsored Content",
      description:
        "Native advertising that matches our editorial style while clearly labeled as sponsored.",
      startingAt: "$1,200",
    },
    {
      title: "Newsletter Sponsorship",
      description:
        "Reach our engaged subscriber base with dedicated email newsletter placements.",
      startingAt: "$800",
    },
    {
      title: "Social Media Promotion",
      description:
        "Amplify your message across our social media channels with targeted campaigns.",
      startingAt: "$600",
    },
    {
      title: "Event Sponsorship",
      description:
        "Associate your brand with our industry events and conferences.",
      startingAt: "$2,500",
    },
    {
      title: "Custom Packages",
      description:
        "Tailored advertising solutions designed to meet your specific marketing objectives.",
      startingAt: "Custom Quote",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-neutral-900 mb-2 text-center">
          Advertise With Us
        </h1>
        <p className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
          Reach a engaged audience of informed readers with our targeted
          advertising solutions.
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-neutral-900">500,000+</h3>
            <p className="text-neutral-600">Monthly Readers</p>
          </div>

          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-neutral-900">75%</h3>
            <p className="text-neutral-600">Audience Engagement Rate</p>
          </div>

          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <BarChart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-neutral-900">2.5M</h3>
            <p className="text-neutral-600">Monthly Page Views</p>
          </div>
        </div>

        {/* Audience Demographics */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
            Our Audience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Demographics</h3>
              <ul className="space-y-2">
                <li>
                  <span className="font-medium">Age:</span> 25-54 (75%)
                </li>
                <li>
                  <span className="font-medium">Income:</span> $50K+ annually
                  (68%)
                </li>
                <li>
                  <span className="font-medium">Education:</span> College degree
                  or higher (82%)
                </li>
                <li>
                  <span className="font-medium">Location:</span> Kenya (65%),
                  East Africa (25%), International (10%)
                </li>
              </ul>
            </div>

            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Interests</h3>
              <ul className="space-y-2">
                <li>Politics & Current Affairs (85%)</li>
                <li>Business & Finance (78%)</li>
                <li>Technology & Innovation (62%)</li>
                <li>Health & Wellness (58%)</li>
                <li>Culture & Arts (45%)</li>
                <li>Sports (52%)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Advertising Options */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
            Advertising Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advertisingOptions.map((option, index) => (
              <div
                key={index}
                className="border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-neutral-600 mb-4">{option.description}</p>
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <p className="text-blue-600 font-semibold">
                    Starting at {option.startingAt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Advertise With Us?
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Contact our advertising team today to discuss how we can help you
            reach your target audience and achieve your marketing goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-neutral-100"
            >
              <Mail className="h-4 w-4 mr-2" />
              Request Media Kit
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
            >
              Contact Sales Team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
