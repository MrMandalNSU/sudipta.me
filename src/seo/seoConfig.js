export const SITE_URL = "https://sudipta.xyz";
export const SITE_NAME = "Sudipta Mandal";
export const DEFAULT_IMAGE = `${SITE_URL}/preview.webp`;
export const PROFILE_IMAGE = `${SITE_URL}/sudipta_dp.webp`;

const personSchema = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Sudipta Mandal",
  url: `${SITE_URL}/`,
  image: PROFILE_IMAGE,
  sameAs: [
    "https://github.com/MrMandalNSU",
    "https://www.linkedin.com/in/mrmandal/",
  ],
  jobTitle: "Senior Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Cargo Stream",
  },
  description:
    "A dedicated Software Engineer with five years of industrial experience in building scalable, high-performance web applications and backend systems, specializing in modern cloud architectures, complex data parsing, and backend development.",
};

const createGraph = (page) => {
  const pageId = `${page.url}#webpage`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema,
      {
        "@type": page.schemaType || "WebPage",
        "@id": pageId,
        url: page.url,
        name: page.title,
        description: page.description,
        image: page.image || DEFAULT_IMAGE,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: SITE_NAME,
          url: `${SITE_URL}/`,
        },
        author: {
          "@id": `${SITE_URL}/#person`,
        },
        about: page.about || {
          "@id": `${SITE_URL}/#person`,
        },
      },
    ],
  };
};

export const seoPages = [
  {
    path: "/",
    title: "Sudipta Mandal | Software Engineer & Researcher",
    description:
      "Portfolio of Sudipta Mandal, a Software Engineer specializing in building scalable, high-performance web applications and backend systems.",
    type: "website",
    schemaType: "ProfilePage",
    priority: "1.0",
    lastmod: "2026-07-02",
  },
  {
    path: "/projects/valodash",
    title: "ValoDash - SaaS Valorant Analytics Platform | Sudipta Mandal",
    description:
      "Detailed breakdown of ValoDash: A high-density Valorant analytics platform featuring Next.js BFF API routes, HttpOnly refresh sessions, CSRF-protected mutations, scheduled syncs, and Riot API rate-limit queues.",
    schemaType: "SoftwareApplication",
    priority: "0.8",
    lastmod: "2026-07-02",
  },
  {
    path: "/projects/asksudipta",
    title: "AskSudipta - Conversational RAG Intelligence | Sudipta Mandal",
    description:
      "Detailed breakdown of AskSudipta: the React chatbot frontend and TypeScript, Express, Gemini, and Supabase pgvector RAG backend powering Sudipta Mandal's portfolio assistant.",
    schemaType: "SoftwareApplication",
    priority: "0.8",
    lastmod: "2026-07-02",
  },
  {
    path: "/projects/colorcuddle",
    title: "Color Cuddle - Interactive Web Game & UI State System | Sudipta Mandal",
    description:
      "Detailed breakdown of Color Cuddle: An interactive, low-latency color permutation puzzle web game built on Next.js 15, React 19, and Tailwind CSS v4, featuring glassmorphism overlays and streaks caching.",
    schemaType: "SoftwareApplication",
    priority: "0.8",
    lastmod: "2026-07-02",
  },
  {
    path: "/projects/textanalyzer",
    title: "Text Analyzer - Lexical Metric Caching & Utilities | Sudipta Mandal",
    description:
      "Detailed breakdown of Text Analyzer: A full-stack lexical metrics engine built with React, Vite, Express, TypeScript, and MongoDB Atlas. Features anonymous session-based workspace sandboxes, regex word parsing, clean text formatting filters, and live JSON tree editors.",
    schemaType: "SoftwareApplication",
    priority: "0.8",
    lastmod: "2026-07-02",
  },
  {
    path: "/projects/dseops",
    title: "DSE Ops - Secure DSE SME Analytics & Ticker History Platform | Sudipta Mandal",
    description:
      "Detailed breakdown of DSE Ops: a secure DSE SME analytics platform featuring ticker history charts, NodeCache-backed reads, Next.js API proxying, cron scrapes, Supabase PostgreSQL, S3 archives, and CSV exports.",
    schemaType: "SoftwareApplication",
    priority: "0.8",
    lastmod: "2026-07-02",
  },
  {
    path: "/research/social-media-opinion-mining",
    title: "Bangla Social Media Opinion Mining Research | Sudipta Mandal",
    description:
      "Detailed overview of Sudipta Mandal's ICCIT 2021 research on Bangla social media opinion mining, annotated Facebook comments, TF-IDF features, and machine learning classification.",
    schemaType: "ScholarlyArticle",
    priority: "0.8",
    lastmod: "2026-07-02",
    about: {
      "@type": "Thing",
      name: "Bangla social media opinion mining",
    },
  },
  {
    path: "/experiences/cargostream",
    title: "Cargo Stream - Senior SWE Document Pipelines | Sudipta Mandal",
    description:
      "Architectural breakdown of Sudipta Mandal's work at Cargo Stream: building a format-agnostic document ingestion pipeline with Laravel, pattern recognition, and agentic AI multilingual mapping.",
    schemaType: "ProfessionalService",
    priority: "0.8",
    lastmod: "2026-07-02",
  },
  {
    path: "/experiences/sportsfixtures",
    title: "Sports Fixtures - Scalable CMS Backend & WebSocket Flows | Sudipta Mandal",
    description:
      "Architectural breakdown of Sudipta Mandal's work at Sports Fixtures: building a real-time Strapi v5 backend, PostgreSQL database schemas, node-cache/Redis queues, and Socket.io broadcasts.",
    schemaType: "ProfessionalService",
    priority: "0.8",
    lastmod: "2026-07-02",
  },
  {
    path: "/experiences/eucaps",
    title: "Eucaps - Software Engineer Financial Integrations & AI Systems | Sudipta Mandal",
    description:
      "Architectural breakdown of Sudipta Mandal's work at Eucaps AB: building S&P financial data pipelines with AWS Lambda, Trulioo KYC compliance, Stripe payments, and OpenAI image processing.",
    schemaType: "ProfessionalService",
    priority: "0.8",
    lastmod: "2026-07-02",
  },
  {
    path: "/experiences/nsups",
    title: "NSUPS - Junior Software Engineer Bootcamp Crawler & Backend | Sudipta Mandal",
    description:
      "Architectural breakdown of Sudipta Mandal's work at NSUPS: building bootcamp management APIs, online judge crawler workflows, leaderboard aggregation, and relational backend services.",
    schemaType: "ProfessionalService",
    priority: "0.8",
    lastmod: "2026-07-02",
  },
];

export const normalizePath = (path = "/") => {
  const cleanPath = path.split("?")[0].split("#")[0] || "/";
  if (cleanPath === "/") return "/";
  return cleanPath.endsWith("/") ? cleanPath.slice(0, -1) : cleanPath;
};

export const getSeoForPath = (path = "/") => {
  const normalizedPath = normalizePath(path);
  const page = seoPages.find((item) => item.path === normalizedPath) || seoPages[0];
  const url = page.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${page.path}`;
  const image = page.image || DEFAULT_IMAGE;

  return {
    ...page,
    url,
    image,
    type: page.type || "article",
    twitterCard: page.twitterCard || "summary_large_image",
    schema: page.schema || createGraph({ ...page, url, image }),
  };
};

export const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const renderSeoTags = (path = "/") => {
  const seo = getSeoForPath(path);
  const schema = JSON.stringify(seo.schema, null, 2).replace(/</g, "\\u003c");

  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<link rel="canonical" href="${escapeHtml(seo.url)}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:image" content="${escapeHtml(seo.image)}" />`,
    `<meta property="og:url" content="${escapeHtml(seo.url)}" />`,
    `<meta property="og:type" content="${escapeHtml(seo.type)}" />`,
    `<meta name="twitter:card" content="${escapeHtml(seo.twitterCard)}" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(seo.image)}" />`,
    `<script id="page-structured-data" type="application/ld+json">${schema}</script>`,
  ].join("\n  ");
};

export const renderSitemap = () => {
  const urls = seoPages
    .map((page) => {
      const seo = getSeoForPath(page.path);
      return [
        "  <url>",
        `    <loc>${seo.url}</loc>`,
        `    <lastmod>${page.lastmod}</lastmod>`,
        "    <changefreq>monthly</changefreq>",
        `    <priority>${page.priority}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};
