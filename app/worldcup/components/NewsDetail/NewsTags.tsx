interface NewsTagsProps {
  tags: string[];
}

export default function NewsTags({ tags }: NewsTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition cursor-pointer"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
