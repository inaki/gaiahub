import { useState } from 'react';
import { Bell, Calendar, Check, MessageSquare, Vote, Kanban, FileText, Filter, CheckCheck, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

// Mock notifications data
const mockNotifications = [
  {
    id: '1',
    type: 'discussion',
    title: 'New comment on "Summer Solstice Celebration"',
    message: 'Tom Hardy commented on your discussion',
    user: {
      name: 'Tom Hardy',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'
    },
    community: 'Sunflower Ecovillage',
    timestamp: '2024-05-08T14:22:00Z',
    read: false,
    link: '/discussions/1'
  },
  {
    id: '2',
    type: 'decision',
    title: 'Decision closing soon: Solar Panel Installation',
    message: 'The voting period ends in 24 hours',
    user: {
      name: 'System',
      avatar: null
    },
    community: 'Mountain View Co-op',
    timestamp: '2024-05-08T13:15:00Z',
    read: false,
    link: '/decisions/2'
  },
  {
    id: '3',
    type: 'task',
    title: 'Task assigned: Update website content',
    message: 'Sarah Johnson assigned you a new task',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg'
    },
    community: 'Urban Permaculture',
    timestamp: '2024-05-08T12:30:00Z',
    read: true,
    link: '/projects/1'
  },
  {
    id: '4',
    type: 'document',
    title: 'Document updated: Community Guidelines',
    message: 'Michael Chen made changes to a document you follow',
    user: {
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
    },
    community: 'Sunflower Ecovillage',
    timestamp: '2024-05-08T11:45:00Z',
    read: true,
    link: '/documents/1'
  }
];

export function NotificationsPage() {
  const [typeFilter, setTypeFilter] = useState('all');
  const [readFilter, setReadFilter] = useState('all');

  const getNotificationIcon = (type: string) => {
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
        return <Bell className="h-4 w-4" />;
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

  const filteredNotifications = mockNotifications.filter(notification => {
    const matchesType = typeFilter === 'all' || notification.type === typeFilter;
    const matchesRead = readFilter === 'all' || 
      (readFilter === 'unread' && !notification.read) ||
      (readFilter === 'read' && notification.read);

    return matchesType && matchesRead;
  });

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with what's happening in your communities</p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Button variant="outline">
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
          <Button variant="outline">
            <Trash2 className="mr-2 h-4 w-4" />
            Clear all
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-6">
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="discussion">Discussions</SelectItem>
            <SelectItem value="decision">Decisions</SelectItem>
            <SelectItem value="task">Tasks</SelectItem>
            <SelectItem value="document">Documents</SelectItem>
          </SelectContent>
        </Select>
        <Select value={readFilter} onValueChange={setReadFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <Check className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
          <CardDescription>
            {filteredNotifications.length} notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start space-x-4 rounded-lg border p-4 transition-all hover:bg-accent ${
                  !notification.read ? 'bg-muted' : ''
                }`}
              >
                <Avatar>
                  <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                  <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    {getNotificationIcon(notification.type)}
                    <a href={notification.link} className="font-medium hover:underline">
                      {notification.title}
                    </a>
                    {!notification.read && (
                      <Badge variant="secondary">New</Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">{notification.message}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline">{notification.community}</Badge>
                    <span>•</span>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {formatDate(notification.timestamp)}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}