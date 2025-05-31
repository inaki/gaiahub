import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, FileText, Calendar, User, Filter, Users, Clock, FileEdit, FolderOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Mock data
const mockDocuments = [
  {
    id: '1',
    title: 'Community Guidelines',
    content: 'Guidelines for community living and shared spaces.',
    author: {
      id: '1',
      name: 'Emma Watson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
    },
    community_id: '1',
    community_name: 'Sunflower Ecovillage',
    created_at: '2024-04-15T09:00:00Z',
    updated_at: '2024-05-01T14:30:00Z',
    version: 2,
    tags: ['guidelines', 'community'],
    contributors: [
      {
        id: '1',
        name: 'Emma Watson',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
      },
      {
        id: '2',
        name: 'Tom Hardy',
        avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'
      }
    ]
  },
  {
    id: '2',
    title: 'Garden Planning Guide',
    content: 'Annual planting schedule and garden maintenance guidelines.',
    author: {
      id: '2',
      name: 'Tom Hardy',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'
    },
    community_id: '1',
    community_name: 'Sunflower Ecovillage',
    created_at: '2024-04-10T11:20:00Z',
    updated_at: '2024-04-20T16:45:00Z',
    version: 3,
    tags: ['garden', 'planning'],
    contributors: [
      {
        id: '2',
        name: 'Tom Hardy',
        avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'
      }
    ]
  },
  {
    id: '3',
    title: 'Solar System Maintenance',
    content: 'Maintenance procedures for the community solar power system.',
    author: {
      id: '3',
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg'
    },
    community_id: '2',
    community_name: 'Mountain View Co-op',
    created_at: '2024-04-05T13:15:00Z',
    updated_at: '2024-04-25T09:30:00Z',
    version: 1,
    tags: ['maintenance', 'energy'],
    contributors: [
      {
        id: '3',
        name: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg'
      },
      {
        id: '4',
        name: 'Michael Chen',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
      }
    ]
  },
  {
    id: '4',
    title: 'Composting Guide',
    content: 'Best practices for community composting system.',
    author: {
      id: '4',
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
    },
    community_id: '3',
    community_name: 'Urban Permaculture',
    created_at: '2024-04-01T10:45:00Z',
    updated_at: '2024-04-15T11:20:00Z',
    version: 2,
    tags: ['composting', 'waste'],
    contributors: [
      {
        id: '4',
        name: 'Michael Chen',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
      }
    ]
  }
];

export function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [communityFilter, setCommunityFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  // Filter documents based on search term and community filter
  const filteredDocuments = mockDocuments.filter(document => {
    const matchesSearch = document.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCommunity = communityFilter === 'all' || document.community_id === communityFilter;
    
    if (activeTab === 'all') {
      return matchesSearch && matchesCommunity;
    } else if (activeTab === 'my-documents') {
      // In a real app, this would filter for user's documents
      return matchesSearch && matchesCommunity && 
             (document.author.id === '1' || document.contributors.some(c => c.id === '1'));
    }
    return matchesSearch && matchesCommunity;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">Create and manage community documentation.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Document
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Document</DialogTitle>
                <DialogDescription>
                  Create a new document for your community.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="community">Community</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select community" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Sunflower Ecovillage</SelectItem>
                      <SelectItem value="2">Mountain View Co-op</SelectItem>
                      <SelectItem value="3">Urban Permaculture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="title">Document Title</Label>
                  <Input id="title" placeholder="Enter document title" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your document content..."
                    className="min-h-[200px]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input id="tags" placeholder="guidelines, community, etc." />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Document</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={communityFilter} onValueChange={setCommunityFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <Users className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Community" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Communities</SelectItem>
            <SelectItem value="1">Sunflower Ecovillage</SelectItem>
            <SelectItem value="2">Mountain View Co-op</SelectItem>
            <SelectItem value="3">Urban Permaculture</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="my-documents">My Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredDocuments.map((document) => (
              <Card key={document.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle>
                        <Link to={`/documents/${document.id}`} className="hover:underline">
                          {document.title}
                        </Link>
                      </CardTitle>
                      <CardDescription>{document.community_name}</CardDescription>
                    </div>
                    <Badge variant="secondary">v{document.version}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{document.content}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {document.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <FileEdit className="h-4 w-4 mr-1" />
                      <span>Updated {formatDate(document.updated_at)}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{document.contributors.length} contributor{document.contributors.length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex -space-x-2">
                    {document.contributors.map((contributor) => (
                      <Avatar key={contributor.id} className="border-2 border-background">
                        <AvatarImage src={contributor.avatar} alt={contributor.name} />
                        <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/documents/${document.id}`}>
                      View Document
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="my-documents" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredDocuments.map((document) => (
              <Card key={document.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle>
                        <Link to={`/documents/${document.id}`} className="hover:underline">
                          {document.title}
                        </Link>
                      </CardTitle>
                      <CardDescription>{document.community_name}</CardDescription>
                    </div>
                    <Badge variant="secondary">v{document.version}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{document.content}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {document.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <FileEdit className="h-4 w-4 mr-1" />
                      <span>Updated {formatDate(document.updated_at)}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{document.contributors.length} contributor{document.contributors.length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex -space-x-2">
                    {document.contributors.map((contributor) => (
                      <Avatar key={contributor.id} className="border-2 border-background">
                        <AvatarImage src={contributor.avatar} alt={contributor.name} />
                        <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/documents/${document.id}`}>
                      View Document
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}