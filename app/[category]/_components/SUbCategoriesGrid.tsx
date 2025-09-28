import { Category } from "@/app/components/types";

interface SubcategoriesGridProps {
  category: Category;
}

export default function SubcategoriesGrid({
  category,
}: SubcategoriesGridProps) {
  if (!category.subcategories || category.subcategories.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Explore {category.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.subcategories.map((sub) => (
          <a
            key={sub._id}
            href={`/${category.slug}/${sub.slug}`}
            className="group block bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 mb-2 transition-colors">
              {sub.title}
            </h3>
            {sub.description && (
              <p className="text-gray-600 text-sm line-clamp-2">
                {sub.description}
              </p>
            )}
            <div className="flex items-center text-blue-600 text-sm font-medium mt-3 group-hover:translate-x-1 transition-transform">
              Browse articles
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
