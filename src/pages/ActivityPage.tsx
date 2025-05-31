import { useState } from 'react';
import { MessageSquare, Vote, Kanban, FileText, Users, Calendar, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Mock activity data
const mockActivity = [
  {
    id: '1',
    type: 'discussion',
    title: 'Upcoming Community Gathering',
    description: 'Started a new discussion about the summer solstice celebration',
    user: {
      name: 'Emma Watson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
    },
    community: 'Sunflower Ecovillage',
    timestamp: '2024-05-08T14:22:00Z',
    link: '/discussions/1'
  },
  {
    id: '2',
    type: 'decision',
    title: 'Solar Panel Installation',
    description: 'Created a new decision for voting on solar panel installation',
    user: {
      name: 'Tom Hardy',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'
    },
    community: 'Mountain View Co-op',
    timestamp: '2024-05-08T13:15:00Z',
    link: '/decisions/2'
  },
  {
    id: '3',
    type: 'task',
    title: 'Update community website',
    description: 'Completed task: Update website content and images',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg'
    },
    community: 'Urban Permaculture',
    timestamp: '2024-05-08T12:30:00Z',
    link: '/projects/1'
  },
  {
    id: '4',
    type: 'document',
    title: 'Community Guidelines v2',
    description: 'Updated the community guidelines document with new sections',
    user: {
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
    },
    community: 'Sunflower Ecovillage',
    timestamp: '2024-05-08T11:45:00Z',
    link: '/documents/1'
  },
  {
    id: '5',
    type: 'discussion',
    title: 'Garden Planning for Summer',
    description: 'Added a comment to the garden planning discussion',
    user: {
      name: 'Jessica Lee',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
    },
    community: 'Mountain View Co-op',
    timestamp: '2024-05-08T10:20:00Z',
    link: '/discussions/2'
  }
];

export function ActivityPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [communityFilter, setCommunityFilter] = useState('all');

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'discussion':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'decision':
        return <Vote className="h-4 w-4 text-purple-500" />;
      case 'task':
        return <Kanban className="h-4 w-4 text-amber-500" />;
      case 'document':
        return <FileText className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredActivity = mockActivity.filter(activity => {
    const matchesSearch = 
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.community.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'all' || activity.type === typeFilter;
    const matchesCommunity = communityFilter === 'all' || activity.community === communityFilter;

    return matchesSearch && matchesType && matchesCommunity;
  });

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activity</h1>
          <p className="text-muted-foreground">Recent activity across all your communities</p>
        </div>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search activity..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Activity Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="discussion">Discussions</SelectItem>
            <SelectItem value="decision">Decisions</SelectItem>
            <SelectItem value="task">Tasks</SelectItem>
            <SelectItem value="document">Documents</SelectItem>
          </SelectContent>
        </Select>
        <Select value={communityFilter} onValueChange={setCommunityFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <Users className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Community" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Communities</SelectItem>
            <SelectItem value="Sunflower Ecovillage">Sunflower Ecovillage</SelectItem>
            <SelectItem value="Mountain View Co-op">Mountain View Co-op</SelectItem>
            <SelectItem value="Urban Permaculture">Urban Permaculture</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Feed</CardTitle>
          <CardDescription>
            All activity sorted by most recent
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-4 rounded-lg border p-4 transition-all hover:bg-accent"
              >
                <Avatar className="mt-1">
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{activity.user.name}</p>
                    <span className="text-muted-foreground">•</span>
                    <Badge variant="outline">{activity.community}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {getActivityIcon(activity.type)}
                    <a href={activity.link} className="font-medium hover:underline">
                      {activity.title}
                    </a>
                  </div>
                  <p className="text-muted-foreground">{activity.description}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {formatDate(activity.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}