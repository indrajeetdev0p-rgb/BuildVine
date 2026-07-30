"use client";

import { useState } from "react";
import { format } from "date-fns";
import { MessageSquare, Send, Trash2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { postComment, deleteComment } from "@/lib/actions/social";
import { toast } from "sonner";
import { Card, Button } from "@/components/ui";

export function ProjectComments({ 
  projectId, 
  comments,
  projectOwnerId
}: { 
  projectId: string; 
  comments: any[];
  projectOwnerId: string;
}) {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isPending) return;

    setIsPending(true);
    const res = await postComment(projectId, content, window.location.pathname);
    
    if (res.success) {
      setContent("");
      toast.success("Comment posted successfully");
    } else {
      toast.error(res.error || "Failed to post comment");
    }
    
    setIsPending(false);
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    
    const res = await deleteComment(commentId, window.location.pathname);
    if (res.success) {
      toast.success("Comment deleted");
    } else {
      toast.error(res.error || "Failed to delete comment");
    }
  };

  return (
    <section className="mt-16">
      <h2 className="text-xl font-heading font-bold text-text-primary mb-6 flex items-center gap-2">
        <MessageSquare size={20} className="text-accent" />
        Discussion ({comments.length})
      </h2>

      {/* New Comment Input */}
      {session ? (
        <form onSubmit={handleSubmit} className="mb-10">
          <Card className="p-4 bg-bg-secondary border-border-default focus-within:border-accent/50 transition-colors">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Leave a comment, ask a question, or provide feedback..."
              className="w-full bg-transparent border-none focus:ring-0 text-text-primary placeholder-text-tertiary resize-y min-h-[80px]"
              disabled={isPending}
            />
            <div className="flex justify-end pt-2 border-t border-border-default/50 mt-2">
              <Button type="submit" variant="accent" size="sm" isLoading={isPending} leftIcon={<Send size={14} />}>
                Post Comment
              </Button>
            </div>
          </Card>
        </form>
      ) : (
        <div className="mb-10 p-6 rounded-2xl border border-dashed border-border-default bg-bg-secondary/30 text-center">
          <p className="text-text-secondary text-sm">
            Please <a href="/login" className="text-accent hover:underline">sign in</a> to join the discussion.
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 group">
            {/* Avatar */}
            <div className="h-10 w-10 shrink-0 rounded-full bg-bg-tertiary border border-border-default overflow-hidden flex items-center justify-center text-sm font-medium">
              {comment.user.avatar ? (
                <img src={comment.user.avatar} alt="Avatar" className="h-full w-full object-cover" />
              ) : comment.user.image ? (
                <img src={comment.user.image} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                comment.user.name?.charAt(0) || "?"
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm text-text-primary">
                  {comment.user.name}
                </span>
                {comment.user.id === projectOwnerId && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-accent/10 text-accent uppercase tracking-wider">
                    Creator
                  </span>
                )}
                <span className="text-xs text-text-tertiary ml-2">
                  {format(new Date(comment.createdAt), "MMM d, yyyy")}
                </span>
              </div>
              
              <div className="text-text-secondary text-sm whitespace-pre-wrap mb-2">
                {comment.content}
              </div>

              {/* Delete button (only for owner of the comment) */}
              {session?.user?.id === comment.user.id && (
                <button 
                  onClick={() => handleDelete(comment.id)}
                  className="text-xs text-text-tertiary hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                >
                  <Trash2 size={12} /> Delete
                </button>
              )}
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <p className="text-text-tertiary text-center py-8">
            No comments yet. Be the first to start the discussion!
          </p>
        )}
      </div>
    </section>
  );
}
