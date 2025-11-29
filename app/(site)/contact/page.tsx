// app/contact/page.tsx
import { Button } from "@/components/ui/button";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-neutral-900 mb-2 text-center">
          Contact Us
        </h1>
        <p className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
          We&apos;d love to hear from you. Reach out to our team with questions,
          comments, or news tips.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Get in Touch
            </h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Email Us</h3>
                  <p className="text-neutral-600">editor@kurunzinews.com</p>
                  <p className="text-neutral-600">news@kurunzinews.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Call Us</h3>
                  <p className="text-neutral-600">
                    +254 700 123 456 (Editorial)
                  </p>
                  <p className="text-neutral-600">+254 733 987 654 (General)</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Visit Us</h3>
                  <p className="text-neutral-600">Kurunzi News Centre</p>
                  <p className="text-neutral-600">Nairobi, Kenya</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">
                    Office Hours
                  </h3>
                  <p className="text-neutral-600">
                    Monday - Friday: 8:00 AM - 6:00 PM
                  </p>
                  <p className="text-neutral-600">
                    Saturday: 9:00 AM - 1:00 PM
                  </p>
                  <p className="text-neutral-600">Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200">
              <h3 className="font-semibold text-neutral-900 mb-4">
                For Specific Inquiries
              </h3>
              <ul className="space-y-2">
                <li>
                  <span className="font-medium">News Tips:</span>{" "}
                  tips@kurunzinews.com
                </li>
                <li>
                  <span className="font-medium">Press Inquiries:</span>{" "}
                  press@kurunzinews.com
                </li>
                <li>
                  <span className="font-medium">Advertising:</span>{" "}
                  advertise@kurunzinews.com
                </li>
                <li>
                  <span className="font-medium">Careers:</span>{" "}
                  careers@kurunzinews.com
                </li>
                <li>
                  <span className="font-medium">Legal:</span>{" "}
                  legal@kurunzinews.com
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Send a Message
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-neutral-700 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-neutral-700 mb-1"
                >
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a department</option>
                  <option value="editorial">Editorial</option>
                  <option value="advertising">Advertising</option>
                  <option value="careers">Careers</option>
                  <option value="technical">Technical Support</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-neutral-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
