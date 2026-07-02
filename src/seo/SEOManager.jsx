import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSeoForPath } from "./seoConfig";

const upsertMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const upsertCanonical = (href) => {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
};

const upsertStructuredData = (schema) => {
  let element = document.getElementById("page-structured-data");

  if (!element) {
    element = document.createElement("script");
    element.id = "page-structured-data";
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(schema);
};

const SEOManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getSeoForPath(pathname);

    document.title = seo.title;
    upsertMeta('meta[name="description"]', {
      name: "description",
      content: seo.description,
    });
    upsertCanonical(seo.url);

    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: seo.title,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: seo.description,
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: seo.image,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: seo.url,
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: seo.type,
    });

    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: seo.twitterCard,
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: seo.title,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: seo.description,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: seo.image,
    });

    upsertStructuredData(seo.schema);
  }, [pathname]);

  return null;
};

export default SEOManager;
