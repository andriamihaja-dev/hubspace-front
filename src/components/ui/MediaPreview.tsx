import { getMediaUrl } from '@/lib/media';

type Props = {
  path: string; // Ex: /uploads/user/3/photo/abc.jpg
  type: 'PHOTO' | 'VIDEO' | 'DOCUMENT';
};

export function MediaPreview({ path, type }: Props) {
  const url = getMediaUrl(path);

  if (type === 'PHOTO') {
    return (
      <img src={url} alt="media" className="w-full rounded-lg object-cover max-h-64" />
    );
  }

  if (type === 'VIDEO') {
    return (
      <video controls className="w-full rounded-lg max-h-64">
        <source src={url} />
      </video>
    );
  }

  return (
    <a href={url} target="_blank" className="text-blue-600 underline">
      Télécharger le document
    </a>
  );
}
