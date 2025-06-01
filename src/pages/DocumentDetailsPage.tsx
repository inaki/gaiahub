import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  FileEdit,
  MessageSquare,
  User,
  Users,
  History,
  Save,
  Eye,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

// Mock document data (in a real app, this would come from an API)
const mockDocument = {
  id: "1",
  title: "Community Guidelines",
  content: `# Community Guidelines

## Introduction
These guidelines are designed to foster a harmonious and sustainable community environment.

## General Principles
1. Respect for all community members
2. Commitment to sustainability
3. Active participation in community life
4. Shared responsibility for common spaces

## Specific Guidelines

### Shared Spaces
- Keep common areas clean and tidy
- Respect quiet hours (10 PM - 7 AM)
- Book shared facilities in advance

### Sustainability Practices
- Separate waste for recycling
- Conserve water and energy
- Support local food production

### Community Participation
- Attend monthly community meetings
- Contribute to community workdays
- Participate in decision-making processes

## Amendments
These guidelines may be updated through community consensus.`,
  author: {
    id: "1",
    name: "Emma Watson",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
  community_id: "1",
  community_name: "Sunflower Ecovillage",
  created_at: "2024-04-15T09:00:00Z",
  updated_at: "2024-05-01T14:30:00Z",
  version: 2,
  tags: ["guidelines", "community"],
  contributors: [
    {
      id: "1",
      name: "Emma Watson",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    },
    {
      id: "2",
      name: "Tom Hardy",
      avatar:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    },
  ],
  history: [
    {
      version: 2,
      date: "2024-05-01T14:30:00Z",
      editor: {
        id: "1",
        name: "Emma Watson",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      },
      changes: "Updated sustainability practices section",
    },
    {
      version: 1,
      date: "2024-04-15T09:00:00Z",
      editor: {
        id: "1",
        name: "Emma Watson",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      },
      changes: "Initial document creation",
    },
  ],
  comments: [
    {
      id: "1",
      author: {
        id: "2",
        name: "Tom Hardy",
        avatar:
          "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
      },
      content: "Should we add a section about guest policies?",
      created_at: "2024-04-20T10:15:00Z",
    },
    {
      id: "2",
      author: {
        id: "1",
        name: "Emma Watson",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      },
      content: "Good suggestion, I'll work on that for the next revision.",
      created_at: "2024-04-20T11:30:00Z",
    },
  ],
};

export function DocumentDetailsPage() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(mockDocument.content);
  const [activeTab, setActiveTab] = useState("view");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/app/documents">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Documents
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">
            {mockDocument.title}
          </h1>
          <div className="flex items-center gap-2 mt-1 text-muted-foreground">
            <Badge variant="outline">{mockDocument.community_name}</Badge>
            <span>•</span>
            <Badge variant="secondary">v{mockDocument.version}</Badge>
          </div>
        </div>
        {activeTab === "view" ? (
          <Button onClick={() => setActiveTab("edit")}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Document
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setActiveTab("view")}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="mb-8">
            <CardContent className="pt-6">
              {activeTab === "view" ? (
                <div className="prose dark:prose-invert max-w-none">
                  {mockDocument.content}
                </div>
              ) : (
                <Textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="min-h-[500px] font-mono"
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockDocument.comments.map((comment) => (
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
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Author</p>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src={mockDocument.author.avatar}
                        alt={mockDocument.author.name}
                      />
                      <AvatarFallback>
                        {mockDocument.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{mockDocument.author.name}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Last Updated</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(mockDocument.updated_at)}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {mockDocument.tags.map((tag, index) => (
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
              <CardTitle>Contributors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDocument.contributors.map((contributor) => (
                  <div key={contributor.id} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={contributor.avatar}
                        alt={contributor.name}
                      />
                      <AvatarFallback>
                        {contributor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{contributor.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Version History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDocument.history.map((version) => (
                  <div key={version.version} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Version {version.version}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(version.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={version.editor.avatar}
                          alt={version.editor.name}
                        />
                        <AvatarFallback>
                          {version.editor.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{version.editor.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {version.changes}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
