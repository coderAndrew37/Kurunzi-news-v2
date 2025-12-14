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
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Placeholder.configure({ placeholder }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-red-600 underline hover:text-red-800" },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: { class: "rounded-lg max-w-full h-auto my-4" },
      }),
      CharacterCount.configure({ limit: wordLimit * 6 }),
    ],
    content: content ?? null,
    onUpdate: ({ editor }) => {
      if (!readOnly) {
        onChange(editor.getJSON() || null);
      }
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

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      try {
        // Convert to base64 for immediate preview
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
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-3">
        <div className="flex flex-wrap items-center gap-1 mb-2">
          {/* Text Formatting */}
          <div className="flex items-center border-r border-gray-300 pr-2 mr-2">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded ${editor.isActive("bold") ? "bg-gray-200" : "hover:bg-gray-100"}`}
              title="Bold (Ctrl+B)"
            >
              <Bold className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 rounded ${editor.isActive("italic") ? "bg-gray-200" : "hover:bg-gray-100"}`}
              title="Italic (Ctrl+I)"
            >
              <Italic className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-2 rounded ${editor.isActive("underline") ? "bg-gray-200" : "hover:bg-gray-100"}`}
              title="Underline (Ctrl+U)"
            >
              <UnderlineIcon className="h-4 w-4" />
            </button>
          </div>

          {/* Headings */}
          <div className="flex items-center border-r border-gray-300 pr-2 mr-2">
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={`p-2 rounded ${editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : "hover:bg-gray-100"}`}
              title="Heading 2"
            >
              <Heading2 className="h-4 w-4" />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={`p-2 rounded ${editor.isActive("heading", { level: 3 }) ? "bg-gray-200" : "hover:bg-gray-100"}`}
              title="Heading 3"
            >
              <Heading3 className="h-4 w-4" />
            </button>
          </div>

          {/* Lists */}
          <div className="flex items-center border-r border-gray-300 pr-2 mr-2">
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 rounded ${editor.isActive("bulletList") ? "bg-gray-200" : "hover:bg-gray-100"}`}
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-2 rounded ${editor.isActive("orderedList") ? "bg-gray-200" : "hover:bg-gray-100"}`}
              title="Numbered List"
            >
              <ListOrdered className="h-4 w-4" />
            </button>
          </div>

          {/* Block Elements */}
          <div className="flex items-center border-r border-gray-300 pr-2 mr-2">
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`p-2 rounded ${editor.isActive("blockquote") ? "bg-gray-200" : "hover:bg-gray-100"}`}
              title="Quote"
            >
              <Quote className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`p-2 rounded ${editor.isActive("codeBlock") ? "bg-gray-200" : "hover:bg-gray-100"}`}
              title="Code Block"
            >
              <Code className="h-4 w-4" />
            </button>
          </div>

          {/* Media */}
          <div className="flex items-center">
            <button
              onClick={() => setShowLinkInput(!showLinkInput)}
              className={`p-2 rounded ${editor.isActive("link") ? "bg-gray-200" : "hover:bg-gray-100"}`}
              title="Add Link"
            >
              <LinkIcon className="h-4 w-4" />
            </button>
            <label
              className="p-2 rounded hover:bg-gray-100 cursor-pointer"
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
          <div className="flex items-center border-l border-gray-300 pl-2 ml-2">
            <button
              onClick={() => editor.chain().focus().undo().run()}
              className="p-2 rounded hover:bg-gray-100"
              title="Undo (Ctrl+Z)"
            >
              <Undo className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              className="p-2 rounded hover:bg-gray-100"
              title="Redo (Ctrl+Y)"
            >
              <Redo className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Link Input */}
        {showLinkInput && (
          <div className="mt-2 p-2 bg-white border border-gray-300 rounded">
            <div className="flex items-center space-x-2">
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm"
                onKeyPress={(e) => e.key === "Enter" && addLink()}
              />
              <button
                onClick={addLink}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                Apply
              </button>
              <button
                onClick={() => {
                  setShowLinkInput(false);
                  setLinkUrl("");
                }}
                className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
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
      <div className="bg-gray-50 border-t border-gray-300 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{wordCount}</span> words
            <span className="mx-2">•</span>
            <span className="font-medium">
              {editor.storage.characterCount.characters()}
            </span>{" "}
            characters
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-32">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Progress</span>
                <span>
                  {Math.min(wordCount, wordLimit)}/{wordLimit}
                </span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    progress >= 100
                      ? "bg-red-600"
                      : progress >= 80
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>

            <div className="text-sm text-gray-600">
              {wordCount >= wordLimit ? (
                <span className="text-red-600 font-medium">
                  Word limit reached
                </span>
              ) : (
                <span>{wordLimit - wordCount} words remaining</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
