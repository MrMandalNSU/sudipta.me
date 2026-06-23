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
