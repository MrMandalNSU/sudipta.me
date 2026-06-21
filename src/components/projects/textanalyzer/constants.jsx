import React from "react";
import {
  PostAdd as PostAddIcon,
  QueryStats as QueryStatsIcon,
  AutoFixHigh as AutoFixHighIcon,
  DataObject as DataObjectIcon,
  Fingerprint as FingerprintIcon,
  Bolt as BoltIcon,
  Computer as ComputerIcon,
  SettingsSuggest as SettingsSuggestIcon,
  Storage as StorageIcon,
  Code as CodeIcon,
  Launch as LaunchIcon,
} from "@mui/icons-material";

export const features = [
  { icon: <PostAddIcon />, title: "Full text CRUD Operations", shortTitle: "CRUD", desc: "Allows users to create, view, modify, and delete texts dynamically within their active browser session." },
  { icon: <QueryStatsIcon />, title: "Lexical & Metric Counts", shortTitle: "Analysis", desc: "Computes character length, word counts, sentence delimiters, paragraph numbers, and locates the longest words." },
  { icon: <AutoFixHighIcon />, title: "Cleanup & Formatting workspace", shortTitle: "Formatter", desc: "Includes functional shortcuts to strip excess spacing, convert text case, erase numbers, and copy clean formats." },
  { icon: <DataObjectIcon />, title: "Interactive JSON Syntax Parser", shortTitle: "JSON Viewer", desc: "Validates and beautifies raw JSON payloads with collapsible tree nodes and syntax-highlighted code output." },
  { icon: <FingerprintIcon />, title: "Local Session Tracking", shortTitle: "Sessions", desc: "Generates semantic, anonymous IDs persisted in LocalStorage to separate user data without requiring user registrations." },
  { icon: <BoltIcon />, title: "On-demand Caching", shortTitle: "Performance", desc: "Caches calculated metrics to bypass heavy parsing overhead, automatically invalidating records when text is edited." },
];

export const systemNodes = {
  client: {
    title: "Client Frontend (React / Vite / Material UI)",
    shortTitle: "Frontend",
    icon: <ComputerIcon />,
    description: "Responsive Single Page Application. Features dynamic routing hash maps, integrated lexical processors, live formatter tools, and JSON editors.",
    role: "Manages local browser state, tracks localStorage session identities, and issues async fetch triggers.",
  },
  localstore: {
    title: "Local Storage (Browser Session)",
    shortTitle: "Session Storage",
    icon: <FingerprintIcon />,
    description: "Browser-based storage API used to persist the unique_user_id string. Isolates text lists per browser sandbox without requiring server-side login profiles.",
    role: "Identifies user session context locally and provides sandboxed CRUD tracking with zero registration friction.",
  },
  api: {
    title: "Backend API (Express.js / TypeScript)",
    shortTitle: "Backend API",
    icon: <SettingsSuggestIcon />,
    description: "RESTful server providing endpoints under /api/texts and /api/analysis. Standardizes route structures, configures CORS origins, and utilizes service abstractions.",
    role: "Validates incoming body schemas, controls CRUD operations, and coordinates analysis caching workflows.",
  },
  analyzer: {
    title: "Linguistic Regex Engine",
    shortTitle: "Regex Engine",
    icon: <BoltIcon />,
    description: "A processing module that executes synchronous string analytics using specialized regular expressions and delimiter rules (e.g., matching word boundaries, counting punctuation marks, paragraph lines).",
    role: "Computes numerical word count, character count, sentence count, paragraph count, and resolves longest words per paragraph.",
  },
  mongo: {
    title: "MongoDB Atlas (Mongoose ORM)",
    shortTitle: "NoSQL DB",
    icon: <StorageIcon />,
    description: "Cloud-hosted Document Database. Houses raw text entries and precomputed metric schemas, enforcing schema rules and properties via Mongoose models.",
    role: "Caches calculations and persists content with cascading cleanups upon text removals.",
  },
};

export const schemaTables = {
  userId: {
    description: "React state holding the active unique browser identification tag.",
    fields: [
      { name: "value", type: "String" },
      { name: "source", type: "localStorage" },
    ],
    relations: ["localStorage", "Text"],
  },
  texts: {
    description: "React state containing the array of raw user text entries populated from the database.",
    fields: [
      { name: "items", type: "Array[Text]" },
      { name: "loading", type: "Boolean" },
      { name: "error", type: "String | null" },
    ],
    relations: ["Text", "analysisResults"],
  },
  analysisResults: {
    description: "React state holding dynamic metrics for the selected active text card.",
    fields: [
      { name: "words", type: "Number | null" },
      { name: "characters", type: "Number | null" },
      { name: "sentences", type: "Number | null" },
      { name: "paragraphs", type: "Number | null" },
      { name: "longestWords", type: "Array[String] | null" },
    ],
    relations: ["Analysis", "texts"],
  },
  localStorage: {
    description: "Persistent browser storage API containing user and theme settings.",
    fields: [
      { name: "unique_user_id", type: "String", isKey: "Key" },
      { name: "app_theme", type: "String", isKey: "Key" },
    ],
    relations: ["userId", "themeMode"],
  },
  currentTab: {
    description: "React state controlling the active page tab routing (0 = Analyzer, 1 = Formatter, 2 = JSON Viewer).",
    fields: [
      { name: "activeTab", type: "Number (0 | 1 | 2)" },
      { name: "urlHash", type: "String (#/analyzer | #/formatter | #/json-viewer)" },
    ],
    relations: [],
  },
  themeMode: {
    description: "React state mapping the selected light/dark theme preference.",
    fields: [
      { name: "mode", type: "String ('light' | 'dark')" },
    ],
    relations: ["localStorage"],
  },
  Text: {
    description: "Represents raw text documents stored in MongoDB Atlas and referenced via Mongoose.",
    fields: [
      { name: "_id", type: "ObjectId", isKey: "PK" },
      { name: "userId", type: "String" },
      { name: "text", type: "String" },
      { name: "analysisId", type: "ObjectId?", isKey: "FK" },
      { name: "createdAt", type: "DateTime" },
      { name: "updatedAt", type: "DateTime" },
    ],
    relations: ["Analysis", "texts", "userId"],
  },
  Analysis: {
    description: "Represents calculated metrics cached for an associated text document in MongoDB Atlas.",
    fields: [
      { name: "_id", type: "ObjectId", isKey: "PK" },
      { name: "textId", type: "ObjectId", isKey: "FK" },
      { name: "wordCount", type: "Number" },
      { name: "charCount", type: "Number" },
      { name: "sentenceCount", type: "Number" },
      { name: "paragraphCount", type: "Number" },
      { name: "longestWords", type: "Array[String]" },
      { name: "createdAt", type: "DateTime" },
      { name: "updatedAt", type: "DateTime" },
    ],
    relations: ["Text", "analysisResults"],
  },
};

export const workflows = {
  session: {
    title: "Session Initialization Workflow",
    shortTitle: "Session",
    icon: <FingerprintIcon />,
    description: "Creates and saves unique, user-specific identities to isolate browser sandboxes.",
    steps: [
      { label: "Check LocalStorage", text: "The React application searches browser LocalStorage for an existing 'unique_user_id' token on startup." },
      { label: "Generate Unique Alias", text: "If missing, the client calls a semantic generator combining an adjective, a noun, and a 4-char UUID slice (e.g., 'curious-otter-a1b2')." },
      { label: "Persist User Identity", text: "The new user ID is saved into LocalStorage, establishing a unique session sandbox for all future data queries." },
      { label: "Fetch Profile Records", text: "The client queries backend endpoints sending the user ID as a query argument to load matching text histories." }
    ],
    payload: {
      localStorageKey: "unique_user_id",
      userId: "curious-otter-a1b2"
    },
    responsePayload: {
      status: "INITIALIZED",
      persistedTextsCount: 0
    }
  },
  ingestion: {
    title: "Text Creation & CRUD Flow",
    shortTitle: "CRUD",
    icon: <PostAddIcon />,
    description: "Saves raw user input into MongoDB while resetting cache references.",
    steps: [
      { label: "Submit Content", text: "The user types content in the dialogue form and clicks 'Save'." },
      { label: "REST Request Dispatch", text: "Frontend issues a POST fetch request to '/api/texts' containing the user ID and raw string in the payload." },
      { label: "Database Persistence", text: "The backend Mongoose service inserts a new Text document, setting analysisId: null, and returns the entity." },
      { label: "State Hydration", text: "The React application appends the newly returned Text record to the main list state, rendering a fresh text card." }
    ],
    payload: {
      userId: "curious-otter-a1b2",
      text: "Analyzing this raw string in real time..."
    },
    responsePayload: {
      _id: "647f1b2c...",
      userId: "curious-otter-a1b2",
      text: "Analyzing this raw string in real time...",
      analysisId: null
    }
  },
  analysis: {
    title: "Metric Calculation & Caching Workflow",
    shortTitle: "Analysis",
    icon: <QueryStatsIcon />,
    description: "Runs regex metrics calculations on-demand, saving the results in MongoDB to prevent duplicate processing.",
    steps: [
      { label: "Trigger Metric Query", text: "The user clicks 'Analyze Text' inside a text card, triggering asynchronous API requests for each metric." },
      { label: "Cache Checking", text: "The API endpoint evaluates if the target Text document already contains a populated 'analysisId' object." },
      { label: "Linguistic Evaluation", text: "If null, the backend runs the text through regex formulas (counting words, characters, sentences, paragraphs, and computing longest words)." },
      { label: "Save & Link Cache", text: "A new Analysis document is created in the database. The Text document is updated, saving the Analysis ID to the 'analysisId' field." },
      { label: "Render Results", text: "The API returns the calculated counts to the client, which updates its card state to render numeric metrics." }
    ],
    payload: {
      textId: "647f1b2c...",
      types: ["words", "characters", "sentences", "paragraphs", "longest-words"]
    },
    responsePayload: {
      wordCount: 7,
      charCount: 36,
      sentenceCount: 1,
      paragraphCount: 1,
      longestWords: ["analyzing"]
    }
  },
  invalidation: {
    title: "Cache Invalidation Flow",
    shortTitle: "Invalidation",
    icon: <BoltIcon />,
    description: "Discards outdated cache data when content is updated to ensure data consistency.",
    steps: [
      { label: "Submit Text Revision", text: "The user edits a text card's content and clicks 'Save Changes'." },
      { label: "REST Update Request", text: "The client dispatches a PUT request to '/api/texts/:textId' carrying the new text string." },
      { label: "Reset Reference Link", text: "The backend finds the Text document and sets its 'analysisId' to null, disconnecting the stale cache." },
      { label: "Clean Obsolete Cache", text: "If a prior analysis was active, the backend deletes the corresponding Analysis record from MongoDB." },
      { label: "Invalidate UI States", text: "The server returns the updated Text document. The React card updates its local metrics state back to null, displaying the 'Analyze' button again." }
    ],
    payload: {
      textId: "647f1b2c...",
      text: "Analyzing updated string content..."
    },
    responsePayload: {
      _id: "647f1b2c...",
      text: "Analyzing updated string content...",
      analysisId: null,
      updatedAt: "2026-06-21T06:41:00.000Z"
    }
  }
};

export const snapshotsList = [
  { type: "desktop", src: "/screenshots/projects/textanalyzer/ta (1).webp", title: "Text Analyzer Dashboard" },
  { type: "desktop", src: "/screenshots/projects/textanalyzer/ta (2).webp", title: "Create Text Dialogue" },
  { type: "desktop", src: "/screenshots/projects/textanalyzer/ta (3).webp", title: "Edit/Update Text Content" },
  { type: "desktop", src: "/screenshots/projects/textanalyzer/ta (4).webp", title: "Delete Confirmation Dialogue" },
  { type: "desktop", src: "/screenshots/projects/textanalyzer/ta (5).webp", title: "Lexical & Metric Analysis Panel" },
  { type: "desktop", src: "/screenshots/projects/textanalyzer/ta (6).webp", title: "Session-based User Tracking" },
  { type: "desktop", src: "/screenshots/projects/textanalyzer/ta (7).webp", title: "Integrated Text Formatter View" },
  { type: "desktop", src: "/screenshots/projects/textanalyzer/ta (8).webp", title: "Interactive JSON Syntax Parser" },
  { type: "desktop", src: "/screenshots/projects/textanalyzer/ta (9).webp", title: "Light Theme UI Layout" },
];
