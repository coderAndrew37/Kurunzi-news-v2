"use client";

import Link from "next/link";
import { useState } from "react";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Newsletter Signup Component
function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // In a real application, you would handle the subscription logic here
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="md:col-span-2 lg:col-span-1">
      <h3 className="text-lg font-semibold mb-3">Stay Informed</h3>
      {subscribed ? (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg">
          <p className="font-medium">Thank you for subscribing!</p>
          <p className="text-sm mt-1">
            You&#39;ll receive our latest news and updates.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <p className="text-sm text-neutral-400">
            Get the latest news delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 whitespace-nowrap"
            >
              <Mail className="h-4 w-4 mr-2" />
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-neutral-500">
            By subscribing, you agree to our Privacy Policy.
          </p>
        </form>
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-200 mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
                Kurunzi News
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-neutral-400 max-w-md">
              Kurunzi News is your trusted source for independent reporting,
              in-depth investigations, and analysis on politics, business,
              sports, and more. Bringing you the stories that matter.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                className="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-neutral-800">
              Categories
            </h3>
            <ul className="space-y-3">
              {[
                "Top Stories",
                "Politics",
                "Investigations",
                "Business",
                "Features",
                "Sports",
                "Opinion",
              ].map((category) => (
                <li key={category}>
                  <Link
                    href={`/${category.toLowerCase().replace(" ", "-")}`}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-neutral-800">
              Company
            </h3>
            <ul className="space-y-3">
              {[
                "About Us",
                "Contact",
                "Careers",
                "Advertise With Us",
                "Privacy Policy",
                "Terms of Service",
                "Accessibility",
              ].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase().replace(" ", "-")}`}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <NewsletterSignup />
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-neutral-500 text-center md:text-left">
              © {new Date().getFullYear()} Kurunzi News. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 mt-3 md:mt-0">
              <span className="text-sm text-neutral-500">Follow us:</span>
              <div className="flex space-x-3">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className="text-neutral-500 hover:text-blue-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  className="text-neutral-500 hover:text-blue-400 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  className="text-neutral-500 hover:text-pink-600 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </Link>
                <Link
                  href="https://youtube.com"
                  target="_blank"
                  className="text-neutral-500 hover:text-red-600 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
