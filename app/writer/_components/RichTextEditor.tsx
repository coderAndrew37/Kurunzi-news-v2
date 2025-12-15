// app/writer/_components/RichTextEditor.tsx
"use client";

import CharacterCount from "@tiptap/extension-character-count";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Code,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Redo,
  Underline as UnderlineIcon,
  Undo,
} from "lucide-react";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { JSONContent } from "@tiptap/react";

interface RichTextEditorProps {
  content: JSONContent | null;
  onChange: (content: JSONContent | null) => void;
  placeholder?: string;
  wordLimit?: number;
  readOnly?: boolean;
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = "Start writing your story...",
  wordLimit = 5000,
  readOnly = false,
}: RichTextEditorProps) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const editor = useEditor({
    immediatelyRender: false,
    editable: !readOnly,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        codeBlock: {
          HTMLAttributes: {
            class: "bg-gray-50 rounded-md p-4 font-mono text-sm",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: "border-l-4 border-gray-300 pl-4 italic text-gray-700",
          },
        },
      }),
      Placeholder.configure({ placeholder }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            "text-blue-600 underline hover:text-blue-800 transition-colors",
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto my-6 shadow-md",
        },
      }),
      CharacterCount.configure({ limit: wordLimit * 6 }),
    ],
    content: content ?? null,
    onUpdate: ({ editor }) => {
      if (!readOnly) {
        onChange(editor.getJSON() || null);
      }
    },
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none min-h-[300px] p-6",
      },
    },
  });

  const addLink = useCallback(() => {
    if (!editor) return;

    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl("");
      setShowLinkInput(false);
      toast.success("Link added");
    } else {
      editor.chain().focus().unsetLink().run();
    }
  }, [editor, linkUrl]);

  const addImage = useCallback(() => {
    if (!editor || !imageUrl) return;

    if (imageUrl.startsWith("http") || imageUrl.startsWith("data:")) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      toast.success("Image added");
    } else {
      toast.error("Please enter a valid image URL");
    }
  }, [editor, imageUrl]);

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target?.result as string;
          editor?.chain().focus().setImage({ src: base64 }).run();
          toast.success("Image uploaded successfully");
        };
        reader.readAsDataURL(file);
      } catch (error) {
        toast.error("Failed to upload image");
      }
    },
    [editor]
  );

  if (!editor) {
    return null;
  }

  const wordCount = Math.ceil(editor.storage.characterCount.characters() / 5);
  const progress = (wordCount / wordLimit) * 100;

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
      {/* Toolbar */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* Text Formatting */}
          <div className="flex items-center gap-1 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded-md transition-all ${
                editor.isActive("bold")
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              title="Bold (Ctrl+B)"
            >
              <Bold className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 rounded-md transition-all ${
                editor.isActive("italic")
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              title="Italic (Ctrl+I)"
            >
              <Italic className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-2 rounded-md transition-all ${
                editor.isActive("underline")
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              title="Underline (Ctrl+U)"
            >
              <UnderlineIcon className="h-4 w-4" />
            </button>
          </div>

          {/* Headings */}
          <div className="flex items-center gap-1 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={`p-2 rounded-md transition-all ${
                editor.isActive("heading", { level: 2 })
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              title="Heading 2"
            >
              <Heading2 className="h-4 w-4" />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={`p-2 rounded-md transition-all ${
                editor.isActive("heading", { level: 3 })
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              title="Heading 3"
            >
              <Heading3 className="h-4 w-4" />
            </button>
          </div>

          {/* Lists */}
          <div className="flex items-center gap-1 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 rounded-md transition-all ${
                editor.isActive("bulletList")
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-2 rounded-md transition-all ${
                editor.isActive("orderedList")
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              title="Numbered List"
            >
              <ListOrdered className="h-4 w-4" />
            </button>
          </div>

          {/* Block Elements */}
          <div className="flex items-center gap-1 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`p-2 rounded-md transition-all ${
                editor.isActive("blockquote")
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              title="Quote"
            >
              <Quote className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`p-2 rounded-md transition-all ${
                editor.isActive("codeBlock")
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              title="Code Block"
            >
              <Code className="h-4 w-4" />
            </button>
          </div>

          {/* Media */}
          <div className="flex items-center gap-1 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setShowLinkInput(!showLinkInput)}
              className={`p-2 rounded-md transition-all ${
                editor.isActive("link")
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              title="Add Link"
            >
              <LinkIcon className="h-4 w-4" />
            </button>
            <label
              className="p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-all text-gray-700"
              title="Upload Image"
            >
              <ImageIcon className="h-4 w-4" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                aria-label="Upload Image"
              />
            </label>
          </div>

          {/* History */}
          <div className="flex items-center gap-1 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => editor.chain().focus().undo().run()}
              className="p-2 rounded-md hover:bg-gray-100 transition-all text-gray-700"
              title="Undo (Ctrl+Z)"
            >
              <Undo className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              className="p-2 rounded-md hover:bg-gray-100 transition-all text-gray-700"
              title="Redo (Ctrl+Y)"
            >
              <Redo className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Link Input */}
        {showLinkInput && (
          <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && addLink()}
                autoFocus
              />
              <button
                onClick={addLink}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Apply
              </button>
              <button
                onClick={() => {
                  setShowLinkInput(false);
                  setLinkUrl("");
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Editor Content */}
      <div className="bg-white">
        <EditorContent editor={editor} />
      </div>

      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600 flex items-center gap-4">
            <span>
              <span className="font-semibold text-gray-800">{wordCount}</span>{" "}
              words
            </span>
            <span className="text-gray-300">•</span>
            <span>
              <span className="font-semibold text-gray-800">
                {editor.storage.characterCount.characters()}
              </span>{" "}
              characters
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <div className="w-full sm:w-48">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span className="font-medium">Progress</span>
                <span className="font-semibold text-gray-800">
                  {Math.min(wordCount, wordLimit)}/{wordLimit}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    progress >= 100
                      ? "bg-red-500"
                      : progress >= 80
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>

            <div className="text-sm">
              {wordCount >= wordLimit ? (
                <span className="text-red-600 font-semibold flex items-center gap-1">
                  <span className="h-2 w-2 bg-red-500 rounded-full"></span>
                  Word limit reached
                </span>
              ) : (
                <span className="text-gray-600">
                  <span className="font-semibold text-gray-800">
                    {wordLimit - wordCount}
                  </span>{" "}
                  words remaining
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
