import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Paperclip, SendHorizonal, X } from "lucide-react";

import { useCreatePost } from "@/hooks/posts/useCreatePost";
import { useEditPost } from "@/hooks/posts/useEditPost";
import { useUploadMediaPhysical } from "@/hooks/media/useUploadMediaPhysical";
import type { MediaDto } from "@/hooks/media/types";

interface CreatePostCardProps {
  initialContent?: string;
  editMode?: boolean;
  postId?: number;
}

export default function CreatePostCard({
  initialContent = "",
  editMode = false,
  postId,
}: CreatePostCardProps) {
  const [content, setContent] = useState(initialContent);
  const [mediaList, setMediaList] = useState<MediaDto[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const createPost = useCreatePost();
  const editPost = useEditPost();
  const uploadMedia = useUploadMediaPhysical();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    for (const file of files) {
      try {
        const uploaded = await uploadMedia.mutateAsync(file);
        setMediaList((prev) => [...prev, uploaded]);
      } catch (err) {
        console.error("Erreur upload fichier :", err);
      }
    }
  };

  const handleRemove = (index: number) => {
    setMediaList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const mediaIds = mediaList.map((m) => m.id);
    if (editMode && postId) {
      editPost.mutate({ postId, content, mediaIds });
    } else {
      createPost.mutate({ content, mediaIds });
    }
    setContent("");
    setMediaList([]);
  };

  return (
    <Card className="bg-zinc-900 text-white w-full max-w-2xl mx-auto mb-6 shadow-xl">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-zinc-700 flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <Textarea
              className="bg-zinc-800 border-zinc-700 resize-none text-sm"
              placeholder={editMode ? "Modifier votre post..." : "Exprime-toi..."}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
            />

            {mediaList.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {mediaList.map((file, index) => (
                  <div key={index} className="relative group">
                    {file.mimetype.startsWith("image/") ? (
                      <img
                        src={`/media/file/${file.id}`}
                        alt={file.name}
                        className="max-h-36 rounded border border-zinc-600"
                      />
                    ) : (
                      <div className="text-xs bg-zinc-800 p-2 rounded">
                        📄 {file.name}
                      </div>
                    )}
                    <button
                      onClick={() => handleRemove(index)}
                      className="absolute top-1 right-1 text-red-500 text-xs bg-black/60 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center">
              {!editMode && (
                <>
                  <input
                    type="file"
                    ref={inputRef}
                    onChange={handleFileChange}
                    accept="image/*,video/*,application/pdf"
                    multiple
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-zinc-400 hover:text-white text-sm"
                    onClick={() => inputRef.current?.click()}
                  >
                    <Paperclip className="w-4 h-4 mr-1" /> Ajouter un fichier
                  </Button>
                </>
              )}
              <Button
                onClick={handleSubmit}
                className="text-sm"
                disabled={!content.trim() && mediaList.length === 0}
              >
                <SendHorizonal className="w-4 h-4 mr-1" />
                {editMode ? "Enregistrer" : "Publier"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
