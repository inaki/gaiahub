import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, MessageSquare, CalendarDays, User, Filter, Users } from 'lucide-react';
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
const mockDiscussions = [
  {
    id: '1',
    title: 'Upcoming Community Gathering',
    body: 'Let\'s discuss plans for our summer solstice celebration next month.',
    author_id: '1',
    author_name: 'Emma Watson',
    author_avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    community_id: '1',
    community_name: 'Sunflower Ecovillage',
    created_at: '2024-05-08T14:22:00Z',
    updated_at: '2024-05-08T14:22:00Z',
    comment_count: 12,
    status: 'active',
  },
  {
    id: '2',
    title: 'Garden Planning for Summer Season',
    body: 'We need to coordinate our planting schedule for the community garden.',
    author_id: '2',
    author_name: 'Tom Hardy',
    author_avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    community_id: '1',
    community_name: 'Sunflower Ecovillage',
    created_at: '2024-05-07T09:15:00Z',
    updated_at: '2024-05-07T17:45:00Z',
    comment_count: 8,
    status: 'active',
  },
  {
    id: '3',
    title: 'Renewable Energy Project Update',
    body: 'Updates on our solar panel installation project and next steps.',
    author_id: '3',
    author_name: 'Sarah Johnson',
    author_avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    community_id: '2',
    community_name: 'Mountain View Co-op',
    created_at: '2024-05-06T11:30:00Z',
    updated_at: '2024-05-08T13:10:00Z',
    comment_count: 15,
    status: 'active',
  },
  {
    id: '4',
    title: 'Community Meal Planning',
    body: 'Weekly meal planning for our shared kitchen. Please add your dietary preferences.',
    author_id: '4',
    author_name: 'Michael Chen',
    author_avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    community_id: '3',
    community_name: 'Urban Permaculture',
    created_at: '2024-05-05T16:45:00Z',
    updated_at: '2024-05-07T08:20:00Z',
    comment_count: 6,
    status: 'active',
  },
  {
    id: '5',
    title: 'New Member Introduction Process',
    body: 'Let\'s improve our onboarding process for new community members.',
    author_id: '5',
    author_name: 'Jessica Lee',
    author_avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    community_id: '1',
    community_name: 'Sunflower Ecovillage',
    created_at: '2024-05-04T13:00:00Z',
    updated_at: '2024-05-08T09:30:00Z',
    comment_count: 10,
    status: 'active',
  },
];

export function DiscussionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [communityFilter, setCommunityFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  // Filter discussions based on search term, community filter, and active tab
  const filteredDiscussions = mockDiscussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          discussion.body.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCommunity = communityFilter === 'all' || discussion.community_id === communityFilter;
    
    if (activeTab === 'all') {
      return matchesSearch && matchesCommunity;
    } else if (activeTab === 'my-posts') {
      // In a real app, this would filter for user's posts
      return matchesSearch && matchesCommunity && (discussion.author_id === '1' || discussion.author_id === '2');
    }
    return matchesSearch && matchesCommunity;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Discussions</h1>
          <p className="text-muted-foreground">Browse and participate in community conversations.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Discussion
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Start a New Discussion</DialogTitle>
                <DialogDescription>
                  Create a new topic to discuss with your community.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="community">Community</Label>
                  <Select defaultValue="1">
                    <SelectTrigger id="community">
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
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter discussion title" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="body">Body</Label>
                  <Textarea
                    id="body"
                    placeholder="What would you like to discuss?"
                    className="min-h-[150px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Post Discussion</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search discussions..."
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
          <TabsTrigger value="all">All Discussions</TabsTrigger>
          <TabsTrigger value="my-posts">My Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {filteredDiscussions.map((discussion) => (
              <Card key={discussion.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">
                        <Link to={`/discussions/${discussion.id}`} className="hover:underline">
                          {discussion.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Badge variant="outline" className="mr-2">
                          {discussion.community_name}
                        </Badge>
                        <CalendarDays className="h-3 w-3 mr-1" />
                        {formatDate(discussion.created_at)}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="flex items-center">
                      <MessageSquare className="mr-1 h-3 w-3" />
                      {discussion.comment_count}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-2">{discussion.body}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={discussion.author_avatar} alt={discussion.author_name} />
                      <AvatarFallback>{discussion.author_name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{discussion.author_name}</span>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/discussions/${discussion.id}`}>
                      Read More
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="my-posts" className="mt-6">
          <div className="space-y-4">
            {filteredDiscussions.map((discussion) => (
              <Card key={discussion.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">
                        <Link to={`/discussions/${discussion.id}`} className="hover:underline">
                          {discussion.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Badge variant="outline" className="mr-2">
                          {discussion.community_name}
                        </Badge>
                        <CalendarDays className="h-3 w-3 mr-1" />
                        {formatDate(discussion.created_at)}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="flex items-center">
                      <MessageSquare className="mr-1 h-3 w-3" />
                      {discussion.comment_count}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-2">{discussion.body}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={discussion.author_avatar} alt={discussion.author_name} />
                      <AvatarFallback>{discussion.author_name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{discussion.author_name}</span>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/discussions/${discussion.id}`}>
                      Read More
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