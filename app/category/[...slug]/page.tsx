import Image from "next/image";
import Link from "next/link";
import { generateSlug } from "../../components/generateSlug"; // note the path changes

// Define types
interface Article {
  id: number;
  title: string;
  img: string;
  category: string;
  date: string;
  excerpt?: string;
  readTime: number;
  author?: string;
}

// Dummy data (extend as needed)
const categoryData: Record<string, Article[]> = {
  "world-news": [
    {
      id: 1,
      title: "Global Summit Addresses Climate Change Emergency",
      img: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=600&q=80",
      category: "World News",
      date: "2 hours ago",
      excerpt:
        "World leaders gather to discuss urgent action on climate change as temperatures continue to rise globally.",
      readTime: 5,
      author: "Sarah Johnson",
    },
  ],
  technology: [
    {
      id: 2,
      title: "Tech Giant Unveils Revolutionary AI Assistant",
      img: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=600&q=80",
      category: "Technology",
      date: "5 hours ago",
      excerpt:
        "New AI assistant can understand and respond to complex human emotions and needs.",
      readTime: 6,
      author: "Emma Roberts",
    },
  ],
};

// Popular section (can stay the same)
const popularArticles: Article[] = [
  {
    id: 99,
    title: "Stock Markets Reach All-Time High",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
    category: "Finance",
    date: "1 day ago",
    excerpt: "Major indices surge as investor confidence grows.",
    readTime: 4,
    author: "Robert Williams",
  },
];

export default async function CategoryPage({
  params,
}: {
  params: { slug: string[] };
}) {
  // slug array e.g. ["sports","football","epl"]
  const slugArray = params.slug;
  const mainCategory = slugArray?.[0] || "";

  const breadcrumbs = slugArray.map((category, index) => {
    const href = `/${slugArray.slice(0, index + 1).join("/")}`;
    return (
      <Link key={href} href={href}>
        <a className="text-blue-600 hover:text-blue-700">
          {category.charAt(0).toUpperCase() +
            category.slice(1).replace("-", " ")}
        </a>
      </Link>
    );
  });

  // Find articles by main category
  const articles = categoryData[mainCategory] || [];

  const formattedCategory = slugArray
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).replace("-", " ")
    )
    .join(" → ");

  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            {formattedCategory}
          </h1>
          <p className="text-neutral-600">
            Latest news and updates about {formattedCategory.toLowerCase()}
          </p>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/">
                  <a className="text-blue-600 hover:text-blue-700">Home</a>
                </Link>
              </li>
              {breadcrumbs}
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Article */}
            {articles.length > 0 && (
              <div className="mb-8">
                <Link href={`/article/${generateSlug(articles[0].title)}`}>
                  <div className="relative w-full h-96 rounded-xl overflow-hidden mb-4">
                    <Image
                      src={articles[0].img}
                      alt={articles[0].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="text-blue-300 text-sm font-medium mb-2 block">
                        {articles[0].category}
                      </span>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {articles[0].title}
                      </h2>
                      {articles[0].excerpt && (
                        <p className="text-gray-200 text-sm line-clamp-2">
                          {articles[0].excerpt}
                        </p>
                      )}
                      <div className="flex items-center mt-3 text-sm text-gray-300">
                        <span>{articles[0].date}</span>
                        <span className="mx-2">•</span>
                        <span>{articles[0].readTime} min read</span>
                        {articles[0].author && (
                          <>
                            <span className="mx-2">•</span>
                            <span>By {articles[0].author}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {articles.slice(1).map((article) => {
                const slug = generateSlug(article.title);
                return (
                  <div
                    key={article.id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden group"
                  >
                    <Link href={`/article/${slug}`}>
                      <div className="relative w-full h-48">
                        <Image
                          src={article.img}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <span className="text-xs font-medium text-blue-700 mb-2 block">
                          {article.category}
                        </span>
                        <h3 className="font-semibold text-neutral-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        {article.excerpt && (
                          <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
                            {article.excerpt}
                          </p>
                        )}
                        <div className="flex items-center text-xs text-neutral-500">
                          <span>{article.date}</span>
                          <span className="mx-2">•</span>
                          <span>{article.readTime} min read</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center">
              <button className="px-6 py-3 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-medium rounded-full transition-colors">
                Load more articles
              </button>
            </div>
          </div>

          {/* Sidebar (unchanged) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Popular Articles */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                Popular Articles
              </h3>
              <div className="space-y-4">
                {popularArticles.map((article) => {
                  const slug = generateSlug(article.title);
                  return (
                    <Link key={article.id} href={`/article/${slug}`}>
                      <div className="group flex space-x-3">
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={article.img}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-neutral-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
                            {article.title}
                          </h4>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-neutral-500">
                              {article.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  // Only generate paths for top-level categories
  return Object.keys(categoryData).map((category) => ({
    slug: [category],
  }));
}
