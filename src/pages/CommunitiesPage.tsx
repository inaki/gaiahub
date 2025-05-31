import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Users, Calendar, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

// Mock data
const mockCommunities = [
  {
    id: '1',
    name: 'Sunflower Ecovillage',
    description: 'A vibrant community focused on permaculture and sustainable living in the Pacific Northwest.',
    image_url: 'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg',
    member_count: 45,
    is_public: true,
    created_at: '2023-05-15',
  },
  {
    id: '2',
    name: 'Mountain View Co-op',
    description: 'Housing cooperative nestled in the mountains with a focus on communal living and outdoor activities.',
    image_url: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg',
    member_count: 28,
    is_public: true,
    created_at: '2023-07-22',
  },
  {
    id: '3',
    name: 'Urban Permaculture',
    description: 'City-based community applying permaculture principles in urban environments.',
    image_url: 'https://images.pexels.com/photos/1556484/pexels-photo-1556484.jpeg',
    member_count: 34,
    is_public: true,
    created_at: '2023-09-10',
  },
  {
    id: '4',
    name: 'Riverside Collective',
    description: 'A collective focused on river conservation and sustainable farming along the riverbanks.',
    image_url: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg',
    member_count: 22,
    is_public: false,
    created_at: '2024-01-05',
  },
];

export function CommunitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [activeTab, setActiveTab] = useState('discover');

  // Filter communities based on search term and active tab
  const filteredCommunities = mockCommunities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          community.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'discover') {
      return matchesSearch && community.is_public;
    } else if (activeTab === 'my-communities') {
      // In a real app, this would filter for user's communities
      return matchesSearch && (community.id === '1' || community.id === '3');
    }
    return matchesSearch;
  });

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Communities</h1>
          <p className="text-muted-foreground">Discover and join communities or create your own.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Community
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Community</DialogTitle>
                <DialogDescription>
                  Fill out the details below to create a new community. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Community Name</Label>
                  <Input id="name" placeholder="Enter community name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe your community..." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Cover Image URL</Label>
                  <Input id="image" placeholder="https://example.com/image.jpg" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="public" checked={isPublic} onCheckedChange={setIsPublic} />
                  <Label htmlFor="public">Public Community</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Community</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search communities..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="discover" className="mb-8" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="my-communities">My Communities</TabsTrigger>
        </TabsList>
        <TabsContent value="discover" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCommunities.map((community) => (
              <Card key={community.id} className="overflow-hidden">
                <div className="aspect-[2/1] relative">
                  <img
                    src={community.image_url}
                    alt={community.name}
                    className="object-cover w-full h-full"
                  />
                  {!community.is_public && (
                    <Badge variant="secondary\" className="absolute top-2 right-2">
                      <Shield className="h-3 w-3 mr-1" />
                      Private
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{community.name}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{community.member_count} members</span>
                      <span className="mx-2">•</span>
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {new Date(community.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-3">{community.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="w-full" asChild>
                    <Link to={`/communities/${community.id}`}>
                      View Community
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="my-communities" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCommunities.map((community) => (
              <Card key={community.id} className="overflow-hidden">
                <div className="aspect-[2/1] relative">
                  <img
                    src={community.image_url}
                    alt={community.name}
                    className="object-cover w-full h-full"
                  />
                  {!community.is_public && (
                    <Badge variant="secondary\" className="absolute top-2 right-2">
                      <Shield className="h-3 w-3 mr-1" />
                      Private
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{community.name}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{community.member_count} members</span>
                      <span className="mx-2">•</span>
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {new Date(community.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-3">{community.description}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link to={`/communities/${community.id}`}>
                      Enter Community
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