"use client";
import { ReactNode } from "react";
import PlausibleProvider from "next-plausible";
import { DefaultSeo } from "next-seo";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <PlausibleProvider domain="kurunzinews.com">
      <DefaultSeo
        titleTemplate="%s | Kurunzi News"
        defaultTitle="Kurunzi News"
        description="Independent Kenyan news, politics, and sports."
        openGraph={{
          type: "website",
          locale: "en_KE",
          site_name: "Kurunzi News",
          url: "https://kurunzinews.co.ke",
          images: [
            {
              url: "/og-image.jpg",
              width: 1200,
              height: 630,
              alt: "Kurunzi News",
            },
          ],
        }}
        twitter={{
          handle: "@KurunziNews",
          site: "@KurunziNews",
          cardType: "summary_large_image",
        }}
      />
      {children}
    </PlausibleProvider>
  );
}
