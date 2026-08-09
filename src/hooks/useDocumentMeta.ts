import { useEffect } from "react";

interface DocumentMeta {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  tags?: string[];
}

const BASE_URL = "https://brush-to-blossom.lovable.app";

export function useDocumentMeta(meta: DocumentMeta | null) {
  useEffect(() => {
    if (!meta) return;

    const prev = document.title;
    document.title = `${meta.title} | Growthmates.ai`;

    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) ||
               document.querySelector(`meta[name="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        if (property.startsWith("og:") || property.startsWith("article:")) {
          el.setAttribute("property", property);
        } else {
          el.setAttribute("name", property);
        }
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const fullUrl = meta.url ? `${BASE_URL}${meta.url}` : BASE_URL;
    const image = meta.image || `${BASE_URL}/favicon.png`;

    // Open Graph
    setMeta("og:title", meta.title);
    setMeta("og:description", meta.description);
    setMeta("og:image", image);
    setMeta("og:url", fullUrl);
    setMeta("og:type", meta.type || "article");
    setMeta("og:site_name", "Growthmates.ai");

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", meta.title);
    setMeta("twitter:description", meta.description);
    setMeta("twitter:image", image);
    setMeta("twitter:site", "@growthmatesai");

    // Article-specific
    if (meta.publishedTime) {
      setMeta("article:published_time", meta.publishedTime);
    }
    if (meta.author) {
      setMeta("article:author", meta.author);
    }
    meta.tags?.forEach((tag, i) => {
      setMeta(`article:tag:${i}`, tag);
    });

    // Description
    setMeta("description", meta.description);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", fullUrl);

    return () => {
      document.title = prev;
    };
  }, [meta]);
}
