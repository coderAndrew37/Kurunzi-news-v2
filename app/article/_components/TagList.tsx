"use client";

export default function TagsList({ tags }: { tags?: string[] }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="text-sm font-medium text-neutral-700 mb-2">Tags:</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
