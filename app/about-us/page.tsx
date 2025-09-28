// app/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Users,
  Eye,
  Target,
  Award,
} from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "John Kamau",
      role: "Editor-in-Chief",
      bio: "Seasoned journalist with 15+ years of experience in investigative reporting.",
      image: "/team-1.jpg",
    },
    {
      name: "Sarah Atieno",
      role: "Senior Political Correspondent",
      bio: "Specializes in political analysis and governance issues across East Africa.",
      image: "/team-2.jpg",
    },
    {
      name: "David Ochieng",
      role: "Business Editor",
      bio: "Expert in economic trends and financial markets in the African continent.",
      image: "/team-3.jpg",
    },
    {
      name: "Grace Wambui",
      role: "Investigative Reporter",
      bio: "Award-winning journalist focused on corruption and accountability journalism.",
      image: "/team-4.jpg",
    },
  ];

  const values = [
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Transparency",
      description:
        "We believe in open, honest reporting and clear disclosure of our sources and methods.",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Accuracy",
      description:
        "Every story undergoes rigorous fact-checking to ensure we deliver truthful information.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community",
      description:
        "We serve the public interest and prioritize stories that matter to our communities.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description:
        "We strive for the highest journalistic standards in all our reporting.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 w-full">
        <Image
          src="/about-hero.jpg"
          alt="Kurunzi News Team"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About Kurunzi News
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Illuminating Africa with fearless, independent journalism
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
            Kurunzi News is committed to delivering accurate, unbiased news that
            empowers citizens, holds power to account, and tells the African
            story with integrity and depth. We shine a light on issues that
            matter to our communities across the continent.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value, index) => (
            <div
              key={index}
              className="text-center p-6 bg-neutral-50 rounded-lg"
            >
              <div className="text-blue-600 mb-4 flex justify-center">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-neutral-600">{value.description}</p>
            </div>
          ))}
        </div>

        {/* History */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-8">
            Our Story
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Image
                src="/about-history.jpg"
                alt="Kurunzi News History"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <p className="text-neutral-700 mb-4">
                Founded in 2010, Kurunzi News began as a small independent news
                outlet focused on investigative journalism in Kenya. The name
                &quot;Kurunzi&quot; means &quot;lantern&quot; in Swahili,
                representing our mission to illuminate truth and transparency.
              </p>
              <p className="text-neutral-700 mb-4">
                Over the years, we&#39;ve grown into a pan-African news
                organization with correspondents across the continent, but
                we&#39;ve never lost sight of our core mission: to deliver
                journalism that makes a difference.
              </p>
              <p className="text-neutral-700">
                Today, Kurunzi News reaches millions of readers each month and
                has been recognized with numerous awards for our investigative
                work and commitment to press freedom.
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-8">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative h-64 w-64 mx-auto mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-blue-600 mb-2">{member.role}</p>
                <p className="text-neutral-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-blue-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-8">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-neutral-700">editor@kurunzinews.com</p>
              <p className="text-neutral-700">info@kurunzinews.com</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-neutral-700">+254 700 123 456</p>
              <p className="text-neutral-700">+254 733 987 654</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <p className="text-neutral-700">Kurunzi News Centre</p>
              <p className="text-neutral-700">Nairobi, Kenya</p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Follow Us
          </h2>
          <div className="flex justify-center space-x-4">
            <Link
              href="https://facebook.com/kurunzinews"
              className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
            >
              <Facebook className="h-6 w-6" />
            </Link>
            <Link
              href="https://twitter.com/kurunzinews"
              className="h-12 w-12 rounded-full bg-blue-400 flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
            >
              <Twitter className="h-6 w-6" />
            </Link>
            <Link
              href="https://instagram.com/kurunzinews"
              className="h-12 w-12 rounded-full bg-pink-600 flex items-center justify-center text-white hover:bg-pink-700 transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </Link>
            <Link
              href="https://youtube.com/kurunzinews"
              className="h-12 w-12 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-colors"
            >
              <Youtube className="h-6 w-6" />
            </Link>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Support Independent Journalism
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Your support helps us continue our mission of delivering fearless,
            independent journalism across Africa. Consider subscribing to our
            premium content or making a donation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-neutral-100"
            >
              Subscribe Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
            >
              Make a Donation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
