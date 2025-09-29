import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { SendHorizonal } from "lucide-react";
import { useCreateComment } from "@/hooks/comments/useCreateComment";
import { useEditComment } from "@/hooks/comments/useEditComment";

interface CreateCommentCardProps {
  postId: number;
  commentId?: number;
  initialContent?: string;
  editMode?: boolean;
}

export default function CreateCommentCard({
  postId,
  commentId,
  initialContent = "",
  editMode = false,
}: CreateCommentCardProps) {
  const [comment, setComment] = useState(initialContent);

  const createComment = useCreateComment();
  const editComment = useEditComment();

  const handleSubmit = () => {
    if (editMode && commentId) {
      editComment.mutate({ commentId, content: comment });
    } else {
      createComment.mutate({ postId, content: comment });
    }
  };

  return (
    <Card className="bg-zinc-900 text-white w-full max-w-2xl mx-auto mb-4 shadow-md">
      <CardContent className="p-3">
        <div className="flex gap-3 items-start">
          <div className="w-8 h-8 rounded-full bg-zinc-700 flex-shrink-0" />
          <div className="flex-1">
            <Textarea
              className="bg-zinc-800 border-zinc-700 resize-none text-sm"
              placeholder={editMode ? "Modifier le commentaire..." : "Ajouter un commentaire..."}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={2}
            />
            <div className="flex justify-end mt-2">
              <Button onClick={handleSubmit} size="sm" disabled={!comment.trim()}>
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
