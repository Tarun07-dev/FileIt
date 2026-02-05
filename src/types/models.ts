export type FileItem = {
  id: string;
  name: string;
  type: "pdf" | "image" | "doc" | "video";
  uri?: string;
  createdAt: number;
};

export type Library = {
  id: string;
  name: string;
  files: FileItem[];
  createdAt: number;
};
