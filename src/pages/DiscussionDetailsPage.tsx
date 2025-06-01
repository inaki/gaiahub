import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, Calendar, User, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Mock discussion data (in a real app, this would come from an API)
const mockDiscussion = {
  id: "1",
  title: "Upcoming Community Gathering",
  body: "Let's discuss plans for our summer solstice celebration next month. I think it would be great to organize a special event that brings together all community members for celebration and connection.\n\nSome initial ideas:\n- Potluck dinner with locally grown food\n- Music and dancing\n- Workshops and skill-sharing sessions\n- Children's activities\n- Ceremony to honor the season\n\nWhat are your thoughts and suggestions? What would you like to see included in this celebration?",
  author: {
    id: "1",
    name: "Emma Watson",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
  community_id: "1",
  community_name: "Sunflower Ecovillage",
  created_at: "2024-05-08T14:22:00Z",
  updated_at: "2024-05-08T14:22:00Z",
  comments: [
    {
      id: "1",
      author: {
        id: "2",
        name: "Tom Hardy",
        avatar:
          "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
      },
      content:
        "Great idea! I can help organize the music and dancing part. I know several community members who play instruments and would love to participate.",
      created_at: "2024-05-08T15:30:00Z",
    },
    {
      id: "2",
      author: {
        id: "3",
        name: "Sarah Johnson",
        avatar:
          "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg",
      },
      content:
        "I can lead a workshop on herbal medicine and wildcrafting. Would be perfect for the season!",
      created_at: "2024-05-08T16:15:00Z",
    },
    {
      id: "3",
      author: {
        id: "4",
        name: "Michael Chen",
        avatar:
          "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
      },
      content:
        "I'll coordinate the children's activities. Thinking of nature-based crafts and games.",
      created_at: "2024-05-08T17:45:00Z",
    },
  ],
  tags: ["event", "community", "celebration"],
};

export function DiscussionDetailsPage() {
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    // In a real app, this would send the comment to an API
    toast({
      title: "Comment Posted",
      description: "Your comment has been added to the discussion.",
    });

    setNewComment("");
  };

  return (
    <div className="container py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/app/discussions">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Discussions
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">
            {mockDiscussion.title}
          </h1>
          <div className="flex items-center gap-2 mt-1 text-muted-foreground">
            <Badge variant="outline">{mockDiscussion.community_name}</Badge>
            <span>•</span>
            <span className="text-sm">
              Started by {mockDiscussion.author.name}
            </span>
            <span>•</span>
            <span className="text-sm">
              {formatDate(mockDiscussion.created_at)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage
                    src={mockDiscussion.author.avatar}
                    alt={mockDiscussion.author.name}
                  />
                  <AvatarFallback>
                    {mockDiscussion.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <p className="whitespace-pre-wrap">{mockDiscussion.body}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mockDiscussion.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Comments ({mockDiscussion.comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockDiscussion.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4">
                    <Avatar>
                      <AvatarImage
                        src={comment.author.avatar}
                        alt={comment.author.name}
                      />
                      <AvatarFallback>
                        {comment.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{comment.author.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(comment.created_at)}
                        </p>
                      </div>
                      <p className="mt-2">{comment.content}</p>
                    </div>
                  </div>
                ))}

                <div className="flex gap-4 pt-4">
                  <Avatar>
                    <AvatarImage
                      src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
                      alt="Your Avatar"
                    />
                    <AvatarFallback>YA</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <Textarea
                      placeholder="Add your comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button
                        onClick={handleSubmitComment}
                        disabled={!newComment.trim()}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Post Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Discussion Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Author</p>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src={mockDiscussion.author.avatar}
                        alt={mockDiscussion.author.name}
                      />
                      <AvatarFallback>
                        {mockDiscussion.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{mockDiscussion.author.name}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Created</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(mockDiscussion.created_at)}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Activity</p>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>{mockDiscussion.comments.length} comments</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {mockDiscussion.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
