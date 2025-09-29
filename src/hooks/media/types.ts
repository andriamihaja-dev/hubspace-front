export interface MediaDto {
  id: number;
  name: string;
  path: string;
  mimetype: string;
  type: "PHOTO" | "VIDEO" | "DOCUMENT" | "AUDIO"; // adapte si besoin
  createdAt: string;
}
