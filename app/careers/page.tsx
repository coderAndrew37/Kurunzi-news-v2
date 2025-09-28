import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, Heart, Award, Clock, Mail } from "lucide-react";

export default function CareersPage() {
  const openPositions = [
    {
      title: "Senior Investigative Reporter",
      department: "Newsroom",
      location: "Nairobi, Kenya",
      type: "Full-time",
      experience: "5+ years",
    },
    {
      title: "Digital Content Editor",
      department: "Digital",
      location: "Nairobi, Kenya",
      type: "Full-time",
      experience: "3+ years",
    },
    {
      title: "Business Correspondent",
      department: "Business",
      location: "Nairobi, Kenya",
      type: "Full-time",
      experience: "4+ years",
    },
    {
      title: "Social Media Manager",
      department: "Digital",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
    },
    {
      title: "Data Journalist",
      department: "Newsroom",
      location: "Nairobi, Kenya",
      type: "Full-time",
      experience: "2+ years",
    },
    {
      title: "Graphics Designer",
      department: "Creative",
      location: "Nairobi, Kenya",
      type: "Contract",
      experience: "2+ years",
    },
  ];

  const benefits = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "Competitive Salary",
      description:
        "Industry-competitive compensation packages with performance bonuses",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Flexible Work",
      description:
        "Flexible working hours and remote work options for eligible positions",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Health Insurance",
      description: "Comprehensive health insurance for you and your family",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Professional Development",
      description: "Training opportunities and support for professional growth",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-neutral-900 mb-2 text-center">
          Careers at Kurunzi
        </h1>
        <p className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
          Join our team of dedicated journalists and professionals committed to
          delivering quality news across Africa.
        </p>

        {/* Why Work With Us */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
            Why Work With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p className="text-neutral-700">
                At Kurunzi News, we&#39;re committed to illuminating Africa with
                fearless, independent journalism. We believe in the power of
                information to transform societies and hold power to account.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Our Culture</h3>
              <p className="text-neutral-700">
                We foster a collaborative environment where innovation is
                encouraged, diversity is celebrated, and excellence in
                journalism is our shared goal. We value integrity, creativity,
                and dedication.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
            Employee Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6 border border-neutral-200 rounded-lg"
              >
                <div className="text-blue-600 mb-4 flex justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-neutral-600 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
            Open Positions
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="p-4 text-left font-semibold">Position</th>
                  <th className="p-4 text-left font-semibold">Department</th>
                  <th className="p-4 text-left font-semibold">Location</th>
                  <th className="p-4 text-left font-semibold">Type</th>
                  <th className="p-4 text-left font-semibold">Experience</th>
                  <th className="p-4 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {openPositions.map((position, index) => (
                  <tr
                    key={index}
                    className="border-b border-neutral-200 even:bg-neutral-50"
                  >
                    <td className="p-4 font-medium">{position.title}</td>
                    <td className="p-4">{position.department}</td>
                    <td className="p-4">{position.location}</td>
                    <td className="p-4">{position.type}</td>
                    <td className="p-4">{position.experience}</td>
                    <td className="p-4">
                      <Button size="sm" asChild>
                        <Link
                          href={`/careers/apply?position=${encodeURIComponent(
                            position.title
                          )}`}
                        >
                          Apply
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center mt-6 text-neutral-600">
            Don&#39;t see your perfect role?{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">
              Send us your CV
            </Link>{" "}
            for future opportunities.
          </p>
        </div>

        {/* Application Process */}
        <div className="bg-neutral-50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
            Application Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Application</h3>
              <p className="text-sm text-neutral-600">
                Submit your application online
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Screening</h3>
              <p className="text-sm text-neutral-600">
                Initial review by our HR team
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Interviews</h3>
              <p className="text-sm text-neutral-600">
                Meet with the hiring team
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">4</span>
              </div>
              <h3 className="font-semibold mb-2">Offer</h3>
              <p className="text-sm text-neutral-600">
                Receive and accept your offer
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Ready to contribute to independent journalism in Africa? Apply today
            and become part of our mission to inform and enlighten.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-neutral-100"
          >
            <Mail className="h-4 w-4 mr-2" />
            Send General Application
          </Button>
        </div>
      </div>
    </div>
  );
}
