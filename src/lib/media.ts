export const getMediaUrl = (relativePath: string) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
  return `${baseUrl}${relativePath}`;
};
