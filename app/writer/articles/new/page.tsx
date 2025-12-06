// app/writer/articles/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  Send,
  X,
  Eye,
  Clock,
  Hash,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";
import RichTextEditor from "../../_components/RichTextEditor";
import toast from "react-hot-toast";

// Mock categories - replace with actual data from Sanity
const CATEGORIES = [
  { id: "1", name: "Politics", slug: "politics" },
  { id: "2", name: "Business", slug: "business" },
  { id: "3", name: "Technology", slug: "technology" },
  { id: "4", name: "Health", slug: "health" },
  { id: "5", name: "Sports", slug: "sports" },
  { id: "6", name: "Entertainment", slug: "entertainment" },
];

export default function NewArticlePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const [article, setArticle] = useState({
    title: "",
    subtitle: "",
    body: null,
    excerpt: "",
    category: "",
    tags: [] as string[],
    readTime: 0,
    featuredImage: "",
    status: "draft" as "draft" | "submitted",
  });

  const [newTag, setNewTag] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const calculateReadTime = () => {
    const readTime = Math.ceil(wordCount / 200); // 200 words per minute
    setArticle({ ...article, readTime });
  };

  const addTag = () => {
    if (newTag.trim() && !article.tags.includes(newTag.trim())) {
      setArticle({
        ...article,
        tags: [...article.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setArticle({
      ...article,
      tags: article.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const validateArticle = () => {
    const errors = [];

    if (!article.title.trim()) errors.push("Title is required");
    if (!article.body) errors.push("Article body is required");
    if (!article.category) errors.push("Category is required");
    if (wordCount < 100) errors.push("Article must be at least 100 words");

    return errors;
  };

  const handleSave = async (status: "draft" | "submitted") => {
    const validationErrors = validateArticle();

    if (validationErrors.length > 0 && status === "submitted") {
      setErrors(validationErrors);
      toast.error("Please fix the errors before submitting");
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      // Calculate read time if not set
      if (!article.readTime) {
        calculateReadTime();
      }

      const articleData = {
        ...article,
        status,
        wordCount,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Save to Sanity
      // await saveArticleToSanity(articleData);

      toast.success(
        status === "draft"
          ? "Draft saved successfully"
          : "Article submitted for review"
      );

      if (status === "submitted") {
        router.push("/writer/dashboard");
      }
    } catch (error) {
      console.error("Error saving article:", error);
      toast.error("Failed to save article");
    } finally {
      setLoading(false);
    }
  };

  const handleBodyChange = (content: any) => {
    setArticle({ ...article, body: content });

    // Calculate word count from content
    if (content && content.content) {
      const text = content.content
        .map(
          (block: any) =>
            block.content?.map((span: any) => span.text).join(" ") || ""
        )
        .join(" ");
      const words = text.trim().split(/\s+/).length;
      setWordCount(words);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Article
            </h1>
            <p className="text-gray-600 mt-2">Write your next story</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={() => {
                /* Preview logic */
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <Eye className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center mb-2">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <h3 className="font-semibold text-red-800">
              Please fix the following:
            </h3>
          </div>
          <ul className="list-disc list-inside text-red-700">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={article.title}
              onChange={(e) =>
                setArticle({ ...article, title: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-xl font-medium focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter a compelling title"
              maxLength={120}
            />
            <div className="text-sm text-gray-500 mt-1">
              {article.title.length}/120 characters
            </div>
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              value={article.subtitle}
              onChange={(e) =>
                setArticle({ ...article, subtitle: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Brief summary of your article"
              maxLength={200}
            />
            <div className="text-sm text-gray-500 mt-1">
              {article.subtitle.length}/200 characters
            </div>
          </div>

          {/* Body Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Article Body *
            </label>
            <RichTextEditor
              content={article.body}
              onChange={handleBodyChange}
              placeholder="Start writing your article here..."
              wordLimit={5000}
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt
            </label>
            <textarea
              value={article.excerpt}
              onChange={(e) =>
                setArticle({ ...article, excerpt: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="A brief excerpt that will appear in article listings"
              maxLength={300}
            />
            <div className="text-sm text-gray-500 mt-1">
              {article.excerpt.length}/300 characters
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Publication
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSave("draft")}
                    disabled={loading}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                      article.status === "draft"
                        ? "bg-gray-200 text-gray-800"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <Save className="h-5 w-5 mr-2" />
                      {loading ? "Saving..." : "Save Draft"}
                    </div>
                  </button>

                  <button
                    onClick={() => handleSave("submitted")}
                    disabled={loading}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    <div className="flex items-center justify-center">
                      <Send className="h-5 w-5 mr-2" />
                      {loading ? "Submitting..." : "Submit"}
                    </div>
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  <div className="flex justify-between mb-1">
                    <span>Word count:</span>
                    <span className="font-medium">{wordCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Read time:</span>
                    <span className="font-medium">
                      {article.readTime || Math.ceil(wordCount / 200)} min
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Hash className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">
                Category *
              </h3>
            </div>

            <select
              value={article.category}
              onChange={(e) =>
                setArticle({ ...article, category: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Hash className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
            </div>

            <div className="flex mb-3">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTag()}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Add a tag"
              />
              <button
                onClick={addTag}
                className="px-4 bg-gray-200 text-gray-700 rounded-r-lg hover:bg-gray-300"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <ImageIcon className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">
                Featured Image
              </h3>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              {article.featuredImage ? (
                <div className="relative h-40">
                  <img
                    src={article.featuredImage}
                    alt="Featured"
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    onClick={() =>
                      setArticle({ ...article, featuredImage: "" })
                    }
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    Drag & drop or click to upload
                  </p>
                  <label className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer">
                    Choose Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            setArticle({
                              ...article,
                              featuredImage: e.target?.result as string,
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
