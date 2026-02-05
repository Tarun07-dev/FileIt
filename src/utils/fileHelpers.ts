export type FileType = "pdf" | "image" | "doc" | "video";

export const getFileType = (mimeType?: string): FileType => {
  if (!mimeType) return "doc";

  if (mimeType.includes("pdf")) return "pdf";
  if (mimeType.includes("image")) return "image";
  if (mimeType.includes("video")) return "video";

  return "doc";
};

export const getFileIcon = (type: FileType) => {
  switch (type) {
    case "pdf":
      return "DocumentTextIcon";
    case "image":
      return "PhotoIcon";
    case "video":
      return "VideoCameraIcon";
    default:
      return "DocumentIcon";
  }
};

export const formatFileSize = (bytes?: number) => {
  if (!bytes) return "";

  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
};
