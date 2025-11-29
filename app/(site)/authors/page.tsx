import Link from "next/link";
import Image from "next/image";
import { groq } from "next-sanity";
import { urlFor } from "@/app/lib/sanity.image";
import { Author } from "@/app/components/types";
import { PortableText } from "@portabletext/react";
import { serverClient } from "@/app/lib/sanity.server"; // ✅ server-only client
import { Metadata } from "next";

export const revalidate = 60; // ✅ ISR: revalidate every 60s

// 🔑 SEO metadata
export const metadata: Metadata = {
  title: "Our Authors | Kurunzi News",
  description:
    "Meet the Kurunzi News authors bringing you independent Kenyan news, politics, sports and more.",
  openGraph: {
    title: "Our Authors | Kurunzi News",
    description:
      "Discover the team of journalists and contributors behind Kurunzi News.",
    url: "https://kurunzinews.com/authors",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Our Authors | Kurunzi News",
    description:
      "Meet the Kurunzi News authors bringing you independent Kenyan news, politics, sports and more.",
  },
  alternates: {
    canonical: "https://kurunzinews.com/authors",
  },
};

export default async function AuthorsPage() {
  const authors: Author[] = await serverClient.fetch(
    groq`*[_type == "author"]{
      _id,
      name,
      role,
      bio,
      "slug": slug.current,
      image,
      bio[] // Ensure bio is returned as an array (Portable Text)
    } | order(name asc)`
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Our Authors</h1>

      {authors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {authors.map((author) => (
            <Link
              key={author.slug}
              href={`/authors/${author.slug}`}
              className="group flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition"
            >
              {author.image && (
                <Image
                  src={urlFor(author.image).width(120).height(120).url()}
                  alt={author.name}
                  width={120}
                  height={120}
                  className="rounded-full object-cover mb-4"
                />
              )}
              <h2 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600">
                {author.name}
              </h2>
              {author.role && (
                <p className="text-slate-500 text-sm mt-1">{author.role}</p>
              )}
              {author.bio && Array.isArray(author.bio) && (
                <div className="text-slate-700 text-sm mt-3 max-w-2xl prose">
                  <PortableText value={author.bio} />
                </div>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-slate-600">No authors found.</p>
      )}
    </div>
  );
}
