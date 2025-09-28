// app/lib/sanity.portableText.tsx
import { urlFor } from "@/app/lib/sanity.image";
import Image from "next/image";
import type {
  PortableTextComponents,
  PortableTextBlockComponent,
  PortableTextMarkComponent,
} from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const ImageComponent: PortableTextBlockComponent = ({ value }) => {
  const imageValue = value as SanityImageSource & {
    alt?: string;
    caption?: string;
  };

  return (
    <div className="my-8">
      <Image
        src={urlFor(imageValue).url()}
        alt={imageValue.alt || " "}
        width={800}
        height={600}
        className="rounded-lg shadow-lg"
      />
      {imageValue.caption && (
        <p className="text-center text-sm text-gray-600 mt-2">
          {imageValue.caption}
        </p>
      )}
    </div>
  );
};

const Strong: PortableTextMarkComponent = ({ children }) => (
  <strong className="font-bold text-gray-900">{children}</strong>
);

const Emphasis: PortableTextMarkComponent = ({ children }) => (
  <em className="italic text-gray-700">{children}</em>
);

const H2: PortableTextBlockComponent = ({ children }) => (
  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>
);

const H3: PortableTextBlockComponent = ({ children }) => (
  <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">{children}</h3>
);

const Blockquote: PortableTextBlockComponent = ({ children }) => (
  <blockquote className="border-l-4 border-blue-600 pl-6 italic text-gray-700 my-6">
    {children}
  </blockquote>
);

const components: PortableTextComponents = {
  types: {
    image: ImageComponent,
  },
  marks: {
    strong: Strong,
    em: Emphasis,
  },
  block: {
    h2: H2,
    h3: H3,
    blockquote: Blockquote,
  },
};

export default components;
