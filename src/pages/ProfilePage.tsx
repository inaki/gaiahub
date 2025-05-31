import { useState } from 'react';
import { 
  User, Mail, Calendar, MapPin, Link as LinkIcon, 
  Edit, MessageSquare, Vote, Kanban, FileText 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Mock user data
const mockUser = {
  id: '1',
  name: 'Emma Watson',
  email: 'emma@example.com',
  avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
  bio: 'Passionate about sustainable living and community building. Working to create positive change through collective action.',
  location: 'Portland, Oregon',
  website: 'https://emmawatson.com',
  joined: '2023-01-15',
  communities: [
    {
      id: '1',
      name: 'Sunflower Ecovillage',
      role: 'Admin',
      avatar: 'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg'
    },
    {
      id: '2',
      name: 'Mountain View Co-op',
      role: 'Member',
      avatar: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg'
    }
  ],
  stats: {
    discussions: 45,
    decisions: 28,
    projects: 12,
    documents: 15
  },
  recentActivity: [
    {
      id: '1',
      type: 'discussion',
      title: 'Summer Solstice Celebration Planning',
      community: 'Sunflower Ecovillage',
      timestamp: '2024-05-08T14:22:00Z'
    },
    {
      id: '2',
      type: 'decision',
      title: 'Solar Panel Installation Vote',
      community: 'Mountain View Co-op',
      timestamp: '2024-05-07T09:15:00Z'
    },
    {
      id: '3',
      type: 'project',
      title: 'Community Garden Expansion',
      community: 'Sunflower Ecovillage',
      timestamp: '2024-05-06T11:30:00Z'
    }
  ],
  participation: {
    discussions: 85,
    decisions: 92,
    projects: 78,
    overall: 88
  }
};

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'discussion':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'decision':
        return <Vote className="h-4 w-4 text-purple-500" />;
      case 'project':
        return <Kanban className="h-4 w-4 text-amber-500" />;
      case 'document':
        return <FileText className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                  <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">{mockUser.name}</h2>
                <p className="text-muted-foreground mt-1">{mockUser.email}</p>
                <Button className="mt-4" variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                  <span>{mockUser.location}</span>
                </div>
                <div className="flex items-center">
                  <LinkIcon className="h-4 w-4 text-muted-foreground mr-2" />
                  <a href={mockUser.website} className="hover:underline">{mockUser.website}</a>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                  <span>Joined {formatDate(mockUser.joined)}</span>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-medium mb-2">Bio</h3>
                <p className="text-muted-foreground">{mockUser.bio}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Communities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUser.communities.map((community) => (
                  <div key={community.id} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={community.avatar} alt={community.name} />
                      <AvatarFallback>{community.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{community.name}</p>
                      <p className="text-sm text-muted-foreground">{community.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          <Tabs defaultValue="overview" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="participation">Participation</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contribution Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{mockUser.stats.discussions}</div>
                      <div className="text-sm text-muted-foreground">Discussions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{mockUser.stats.decisions}</div>
                      <div className="text-sm text-muted-foreground">Decisions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{mockUser.stats.projects}</div>
                      <div className="text-sm text-muted-foreground">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{mockUser.stats.documents}</div>
                      <div className="text-sm text-muted-foreground">Documents</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUser.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-4">
                        {getActivityIcon(activity.type)}
                        <div className="flex-1">
                          <p className="font-medium">{activity.title}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline">{activity.community}</Badge>
                            <span>•</span>
                            <span>{formatDate(activity.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Feed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUser.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-4">
                        {getActivityIcon(activity.type)}
                        <div className="flex-1">
                          <p className="font-medium">{activity.title}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline">{activity.community}</Badge>
                            <span>•</span>
                            <span>{formatDate(activity.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="participation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Participation Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Overall Participation</span>
                        <span>{mockUser.participation.overall}%</span>
                      </div>
                      <Progress value={mockUser.participation.overall} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Discussion Participation</span>
                        <span>{mockUser.participation.discussions}%</span>
                      </div>
                      <Progress value={mockUser.participation.discussions} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Decision Participation</span>
                        <span>{mockUser.participation.decisions}%</span>
                      </div>
                      <Progress value={mockUser.participation.decisions} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Project Participation</span>
                        <span>{mockUser.participation.projects}%</span>
                      </div>
                      <Progress value={mockUser.participation.projects} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}