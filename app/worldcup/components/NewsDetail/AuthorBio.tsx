import { NewsArticle } from "@/app/data/newsData";

interface AuthorBioProps {
  author: NewsArticle["author"];
}

export default function AuthorBio({ author }: AuthorBioProps) {
  return (
    <div className="mt-8 bg-gray-50 rounded-lg p-6 border">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-semibold">
            {author.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {author.name}
          </h3>
          <p className="text-gray-600 mb-2">{author.role}</p>
          <p className="text-gray-600">{author.bio}</p>
        </div>
      </div>
    </div>
  );
}
