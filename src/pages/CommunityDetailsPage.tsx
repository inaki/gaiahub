import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Users,
  Calendar,
  MessageSquare,
  Vote,
  Kanban,
  FileText,
  Settings,
  User,
  Shield,
  Mail,
  MapPin,
  Globe,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

// Mock community data
const mockCommunity = {
  id: '1',
  name: 'Sunflower Ecovillage',
  description: 'A vibrant community focused on permaculture and sustainable living in the Pacific Northwest.',
  image_url: 'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg',
  member_count: 45,
  is_public: true,
  created_at: '2023-05-15',
  location: 'Portland, Oregon',
  website: 'https://sunflower-ecovillage.org',
  email: 'contact@sunflower-ecovillage.org',
  phone: '+1 (555) 123-4567',
  stats: {
    discussions: 128,
    decisions: 45,
    projects: 12,
    documents: 34
  },
  members: [
    {
      id: '1',
      name: 'Emma Watson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      role: 'Admin'
    },
    {
      id: '2',
      name: 'Tom Hardy',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
      role: 'Member'
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
      role: 'Member'
    }
  ],
  recentActivity: [
    {
      id: '1',
      type: 'discussion',
      title: 'Summer Solstice Celebration Planning',
      user: {
        name: 'Emma Watson',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
      },
      timestamp: '2024-05-08T14:22:00Z'
    },
    {
      id: '2',
      type: 'decision',
      title: 'New Garden Plot Allocation',
      user: {
        name: 'Tom Hardy',
        avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'
      },
      timestamp: '2024-05-07T09:15:00Z'
    },
    {
      id: '3',
      type: 'project',
      title: 'Greenhouse Construction',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg'
      },
      timestamp: '2024-05-06T11:30:00Z'
    }
  ],
  upcomingEvents: [
    {
      id: '1',
      title: 'Monthly Community Meeting',
      date: '2024-05-15T18:00:00Z',
      attendees: 28
    },
    {
      id: '2',
      title: 'Garden Workday',
      date: '2024-05-18T09:00:00Z',
      attendees: 15
    },
    {
      id: '3',
      title: 'Sustainable Living Workshop',
      date: '2024-05-20T14:00:00Z',
      attendees: 22
    }
  ]
};

export function CommunityDetailsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/communities">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Communities
          </Link>
        </Button>
      </div>

      <div className="relative w-full h-64 rounded-lg overflow-hidden mb-8">
        <img
          src={mockCommunity.image_url}
          alt={mockCommunity.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <h1 className="text-4xl font-bold text-white mb-2">{mockCommunity.name}</h1>
          <div className="flex items-center gap-2">
            {mockCommunity.is_public ? (
              <Badge variant="secondary">
                <Globe className="h-3 w-3 mr-1" />
                Public Community
              </Badge>
            ) : (
              <Badge variant="secondary">
                <Shield className="h-3 w-3 mr-1" />
                Private Community
              </Badge>
            )}
            <Badge variant="outline" className="text-white border-white">
              <Users className="h-3 w-3 mr-1" />
              {mockCommunity.member_count} members
            </Badge>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <Button className="mr-2">Join Community</Button>
          <Button variant="secondary">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{mockCommunity.description}</p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        {mockCommunity.location}
                      </div>
                      <div className="flex items-center text-sm">
                        <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a href={mockCommunity.website} className="hover:underline">
                          {mockCommunity.website}
                        </a>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a href={`mailto:${mockCommunity.email}`} className="hover:underline">
                          {mockCommunity.email}
                        </a>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        {mockCommunity.phone}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Community Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
                          <span>Discussions</span>
                        </div>
                        <span className="font-medium">{mockCommunity.stats.discussions}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Vote className="h-4 w-4 mr-2 text-purple-500" />
                          <span>Decisions</span>
                        </div>
                        <span className="font-medium">{mockCommunity.stats.decisions}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Kanban className="h-4 w-4 mr-2 text-amber-500" />
                          <span>Projects</span>
                        </div>
                        <span className="font-medium">{mockCommunity.stats.projects}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-green-500" />
                          <span>Documents</span>
                        </div>
                        <span className="font-medium">{mockCommunity.stats.documents}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockCommunity.upcomingEvents.map((event) => (
                        <div key={event.id} className="space-y-1">
                          <p className="font-medium">{event.title}</p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(event.date)}
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {event.attendees} attending
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="members" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Community Members</CardTitle>
                  <CardDescription>
                    {mockCommunity.member_count} members in total
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCommunity.members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <User className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockCommunity.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                          <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{activity.user.name}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getActivityIcon(activity.type)}
                            <span className="font-medium">{activity.title}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(activity.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" asChild>
                <Link to="/discussions/new">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Start Discussion
                </Link>
              </Button>
              <Button className="w-full" asChild>
                <Link to="/decisions/new">
                  <Vote className="mr-2 h-4 w-4" />
                  Create Decision
                </Link>
              </Button>
              <Button className="w-full" asChild>
                <Link to="/projects/new">
                  <Kanban className="mr-2 h-4 w-4" />
                  New Project
                </Link>
              </Button>
              <Button className="w-full" asChild>
                <Link to="/documents/new">
                  <FileText className="mr-2 h-4 w-4" />
                  Add Document
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Member Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Active Members</span>
                    <span>38/45</span>
                  </div>
                  <Progress value={84} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Decision Participation</span>
                    <span>41/45</span>
                  </div>
                  <Progress value={91} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Project Involvement</span>
                    <span>32/45</span>
                  </div>
                  <Progress value={71} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}