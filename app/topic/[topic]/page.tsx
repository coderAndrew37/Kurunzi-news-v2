import Image from "next/image";
import Link from "next/link";
import { generateSlug } from "../../components/generateSlug";

// Define types
interface Topic {
  id: number;
  name: string;
  description: string;
  articleCount: number;
  trendDirection: "up" | "down" | "neutral";
  trendPercentage: number;
}

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

// Dummy data for topics
const topicsData: Record<string, Topic> = {
  "artificial-intelligence": {
    id: 1,
    name: "Artificial Intelligence",
    description:
      "Latest developments in AI and machine learning, including breakthroughs in natural language processing, computer vision, and ethical considerations of AI technology.",
    articleCount: 247,
    trendDirection: "up",
    trendPercentage: 32,
  },
  "climate-change": {
    id: 2,
    name: "Climate Change",
    description:
      "Environmental news and climate action updates, covering international agreements, renewable energy transitions, and impacts of global warming on ecosystems and communities.",
    articleCount: 189,
    trendDirection: "up",
    trendPercentage: 18,
  },
  cryptocurrency: {
    id: 3,
    name: "Cryptocurrency",
    description:
      "Digital currencies and blockchain technology, including market trends, regulatory developments, and innovations in decentralized finance and Web3 applications.",
    articleCount: 156,
    trendDirection: "down",
    trendPercentage: 12,
  },
  // More topics would be added here
};

// Dummy data for articles by topic
const articlesByTopic: Record<string, Article[]> = {
  "artificial-intelligence": [
    {
      id: 1,
      title:
        "New AI Model Can Generate Realistic Images from Text Descriptions",
      img: "https://images.unsplash.com/photo-1677442135135-416f8aa26a5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "Technology",
      date: "3 hours ago",
      excerpt:
        "Breakthrough AI system creates photorealistic images from simple text prompts, raising both excitement and ethical concerns about the future of digital content creation.",
      readTime: 6,
      author: "Emma Roberts",
    },
    {
      id: 2,
      title:
        "AI Assistants Now Capable of Understanding Complex Human Emotions",
      img: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "Technology",
      date: "1 day ago",
      excerpt:
        "New emotional intelligence algorithms allow AI systems to respond more appropriately to human emotional states, revolutionizing customer service and mental health applications.",
      readTime: 5,
      author: "James Taylor",
    },
    {
      id: 3,
      title: "Ethical Guidelines Proposed for AI Development and Deployment",
      img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "Technology",
      date: "2 days ago",
      excerpt:
        "International consortium releases framework for responsible AI development, addressing concerns about bias, privacy, and autonomous decision-making.",
      readTime: 7,
      author: "Dr. Lisa Chen",
    },
    {
      id: 4,
      title:
        "AI-Powered Medical Diagnostics Show Promising Results in Early Trials",
      img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "Health Tech",
      date: "3 days ago",
      excerpt:
        "New algorithm demonstrates 95% accuracy in detecting early-stage diseases from medical imaging, potentially revolutionizing diagnostic medicine.",
      readTime: 8,
      author: "Dr. Michael Rodriguez",
    },
  ],
  "climate-change": [
    {
      id: 5,
      title: "Global Summit Addresses Climate Change Emergency",
      img: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "Environment",
      date: "2 hours ago",
      excerpt:
        "World leaders gather to discuss urgent action on climate change as temperatures continue to rise globally, with new commitments expected from major economies.",
      readTime: 8,
      author: "Sarah Johnson",
    },
    {
      id: 6,
      title: "Record Ice Melt in Arctic Raises Alarm Among Scientists",
      img: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "Environment",
      date: "1 day ago",
      excerpt:
        "New satellite data shows accelerated ice melt in polar regions, exceeding previous predictions and raising concerns about sea level rise.",
      readTime: 7,
      author: "Michael Chen",
    },
    {
      id: 7,
      title: "Renewable Energy Investments Reach Record High in 2023",
      img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "Energy",
      date: "2 days ago",
      excerpt:
        "Global investments in solar, wind, and other renewable sources surpass $500 billion as countries accelerate transition away from fossil fuels.",
      readTime: 6,
      author: "Robert Williams",
    },
  ],
  // More topics would be added here
};

// Popular articles across all topics
const popularArticles: Article[] = [
  {
    id: 8,
    title: "Stock Markets Reach All-Time High",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Finance",
    date: "1 day ago",
    excerpt:
      "Major indices surge as investor confidence grows amid positive economic indicators and strong corporate earnings reports.",
    readTime: 4,
    author: "Robert Williams",
  },
  {
    id: 9,
    title: "New Breakthrough in Cancer Treatment Research",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Health",
    date: "3 hours ago",
    excerpt:
      "Scientists discover promising new approach that could significantly improve cancer treatment outcomes with fewer side effects.",
    readTime: 8,
    author: "Dr. Lisa Parker",
  },
];

interface TopicPageProps {
  params: {
    topic: string;
  };
}

export default function TopicPage({ params }: TopicPageProps) {
  const { topic } = params;
  const topicData = topicsData[topic];
  const articles = articlesByTopic[topic] || [];

  if (!topicData) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            Topic Not Found
          </h1>
          <p className="text-neutral-600 mb-6">
            The topic you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/trending-topics"
            className="text-blue-600 hover:underline"
          >
            Browse trending topics
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Topic Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <span className="text-sm text-neutral-500">
              <Link href="/trending-topics" className="hover:text-blue-600">
                Trending Topics
              </Link>
              <span className="mx-2">/</span>
            </span>
            <span className="text-sm text-neutral-900 font-medium">
              #{topicData.name}
            </span>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                #{topicData.name}
              </h1>
              <p className="text-neutral-600 max-w-3xl">
                {topicData.description}
              </p>
            </div>
            <div className="flex items-center bg-neutral-100 px-3 py-2 rounded-lg">
              <span
                className={`text-sm font-medium ${
                  topicData.trendDirection === "up"
                    ? "text-green-600"
                    : topicData.trendDirection === "down"
                    ? "text-red-600"
                    : "text-neutral-600"
                }`}
              >
                {topicData.trendDirection === "up" ? (
                  <svg
                    className="w-4 h-4 inline mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                ) : topicData.trendDirection === "down" ? (
                  <svg
                    className="w-4 h-4 inline mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 inline mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
                {topicData.trendPercentage}% {topicData.trendDirection}
              </span>
            </div>
          </div>

          <div className="flex items-center mt-4 text-sm text-neutral-500">
            <span>{topicData.articleCount} articles</span>
            <span className="mx-2">•</span>
            <span>Updated 2 hours ago</span>
          </div>
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

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Follow Topic */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                Follow this Topic
              </h3>
              <p className="text-neutral-600 text-sm mb-4">
                Get notified when new articles are published about #
                {topicData.name}
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                Follow Topic
              </button>
            </div>

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

            {/* Related Topics */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                Related Topics
              </h3>
              <div className="space-y-3">
                {Object.entries(topicsData)
                  .filter(([key]) => key !== topic)
                  .slice(0, 5)
                  .map(([key, relatedTopic]) => (
                    <Link key={relatedTopic.id} href={`/topic/${key}`}>
                      <div className="flex items-center justify-between py-2 group">
                        <div>
                          <h4 className="font-medium text-neutral-900 text-sm group-hover:text-blue-600 transition-colors">
                            #{relatedTopic.name}
                          </h4>
                          <p className="text-xs text-neutral-500">
                            {relatedTopic.articleCount} articles
                          </p>
                        </div>
                        <span
                          className={`text-xs font-medium ${
                            relatedTopic.trendDirection === "up"
                              ? "text-green-600"
                              : relatedTopic.trendDirection === "down"
                              ? "text-red-600"
                              : "text-neutral-600"
                          }`}
                        >
                          {relatedTopic.trendDirection === "up"
                            ? "↑"
                            : relatedTopic.trendDirection === "down"
                            ? "↓"
                            : "→"}{" "}
                          {relatedTopic.trendPercentage}%
                        </span>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Stay informed
              </h3>
              <p className="text-neutral-600 mb-4">
                Get the latest articles about #{topicData.name} delivered to
                your inbox
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Advertisement */}
            <div className="bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl border border-neutral-300 p-6 flex flex-col items-center justify-center text-neutral-500">
              <div className="text-sm font-medium mb-1">Advertisement</div>
              <div className="text-xs text-center mb-3">Ad Slot (300x250)</div>
              <button className="text-xs text-blue-600 hover:text-blue-800">
                Hide this ad
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Next.js functions for static generation
export async function generateStaticParams() {
  return Object.keys(topicsData).map((topic) => ({
    topic,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { topic: string };
}) {
  const { topic } = params;
  const topicData = topicsData[topic];

  if (!topicData) {
    return {
      title: "Topic Not Found",
    };
  }

  return {
    title: `#${topicData.name} - Trending Topic | NewsPortal`,
    description: topicData.description,
  };
}
