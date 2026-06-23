const SOURCE_ROUTE_MAP = {
  "knowledge/profile/work-experience.md": "/#experience",
  "knowledge/profile/education.md": "/#education",
  "knowledge/profile/competitive-programming.md": "/#cp",
  "knowledge/resume/resume-overview.md": "/Resume_Sudipta_Mandal.pdf",
};

/**
 * Maps a RAG source file path to the corresponding platform route or anchor.
 * @param {string} sourceFile - The source file path (e.g. "knowledge/experiences/cargostream.md")
 * @returns {string|null} - The target route/anchor (e.g. "/experiences/cargostream") or null if unmappable.
 */
export const mapSourceFileToRoute = (sourceFile) => {
  if (!sourceFile) return null;

  // Normalize path separators to standard URL format
  const cleanPath = sourceFile.replace(/\\/g, "/");

  // 1. Check exact match in dictionary first
  if (SOURCE_ROUTE_MAP[cleanPath]) {
    return SOURCE_ROUTE_MAP[cleanPath];
  }

  // 2. Dynamic experience folder mapping
  if (cleanPath.startsWith("knowledge/experiences/")) {
    const slug = cleanPath.replace("knowledge/experiences/", "").replace(".md", "");
    return `/experiences/${slug}`;
  }

  // 3. Dynamic projects folder mapping
  if (cleanPath.startsWith("knowledge/projects/")) {
    const slug = cleanPath.replace("knowledge/projects/", "").replace(".md", "");
    return `/projects/${slug}`;
  }

  // 4. Dynamic research folder mapping
  if (cleanPath.startsWith("knowledge/research/")) {
    const slug = cleanPath.replace("knowledge/research/", "").replace(".md", "");
    return `/research/${slug}`;
  }

  // 5. Fallback for generic profile files
  if (cleanPath.startsWith("knowledge/profile/")) {
    return "/#intro";
  }

  return null;
};

/**
 * Maps a RAG source file path to a user-friendly display name.
 * @param {string} sourceFile - The source file path (e.g. "knowledge/experiences/cargostream.md")
 * @returns {string} - The display name (e.g. "Cargo Stream")
 */
export const mapSourceFileToName = (sourceFile) => {
  if (!sourceFile) return "";
  const cleanPath = sourceFile.replace(/\\/g, "/");

  const staticNames = {
    "knowledge/profile/work-experience.md": "Work Experience",
    "knowledge/profile/education.md": "Education",
    "knowledge/profile/competitive-programming.md": "Competitive Programming",
    "knowledge/resume/resume-overview.md": "Resume",
  };

  if (staticNames[cleanPath]) {
    return staticNames[cleanPath];
  }

  // Dynamic experience names
  if (cleanPath.startsWith("knowledge/experiences/")) {
    const slug = cleanPath.replace("knowledge/experiences/", "").replace(".md", "");
    if (slug === "cargostream") return "Cargo Stream";
    if (slug === "sportsfixtures") return "Sports Fixtures";
    if (slug === "eucaps") return "Eucaps";
    if (slug === "nsups") return "NSUPS";
    return slug.charAt(0).toUpperCase() + slug.slice(1);
  }

  // Dynamic project names
  if (cleanPath.startsWith("knowledge/projects/")) {
    const slug = cleanPath.replace("knowledge/projects/", "").replace(".md", "");
    if (slug === "valodash") return "ValoDash";
    if (slug === "colorcuddle") return "ColorCuddle";
    if (slug === "dseops") return "DseOps";
    if (slug === "textanalyzer") return "TextAnalyzer";
    if (slug === "nsups") return "NSUPS";
    if (slug === "sportsfixtures") return "Sports Fixtures";
    return slug.charAt(0).toUpperCase() + slug.slice(1);
  }

  // Dynamic research names
  if (cleanPath.startsWith("knowledge/research/")) {
    const slug = cleanPath.replace("knowledge/research/", "").replace(".md", "");
    if (slug === "social-media-opinion-mining") return "Social Media Opinion Mining";
    return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }

  if (cleanPath.startsWith("knowledge/profile/")) {
    return "Profile";
  }

  const fileName = cleanPath.split("/").pop();
  return fileName.replace(".md", "");
};

