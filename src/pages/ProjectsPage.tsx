import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Kanban, Calendar, User, Filter, Users, Clock, CheckCircle2, Circle, ArrowUpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
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
const mockProjects = [
  {
    id: '1',
    title: 'Community Garden Expansion',
    description: 'Expanding our community garden with new plots and a greenhouse.',
    community_id: '1',
    community_name: 'Sunflower Ecovillage',
    created_by: {
      id: '1',
      name: 'Emma Watson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
    },
    created_at: '2024-04-15T09:00:00Z',
    due_date: '2024-07-01T00:00:00Z',
    status: 'active',
    progress: 35,
    tasks: {
      total: 12,
      completed: 4
    },
    members: [
      {
        id: '1',
        name: 'Emma Watson',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
      },
      {
        id: '2',
        name: 'Tom Hardy',
        avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'
      },
      {
        id: '3',
        name: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg'
      }
    ]
  },
  {
    id: '2',
    title: 'Solar Panel Installation',
    description: 'Installing solar panels on community buildings to reduce energy costs.',
    community_id: '2',
    community_name: 'Mountain View Co-op',
    created_by: {
      id: '2',
      name: 'Tom Hardy',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'
    },
    created_at: '2024-04-10T14:30:00Z',
    due_date: '2024-08-15T00:00:00Z',
    status: 'planning',
    progress: 15,
    tasks: {
      total: 8,
      completed: 1
    },
    members: [
      {
        id: '2',
        name: 'Tom Hardy',
        avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'
      },
      {
        id: '4',
        name: 'Michael Chen',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
      }
    ]
  },
  {
    id: '3',
    title: 'Community Workshop Series',
    description: 'Organizing monthly skill-sharing workshops for community members.',
    community_id: '1',
    community_name: 'Sunflower Ecovillage',
    created_by: {
      id: '3',
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg'
    },
    created_at: '2024-04-05T11:15:00Z',
    due_date: '2024-12-31T00:00:00Z',
    status: 'active',
    progress: 25,
    tasks: {
      total: 24,
      completed: 6
    },
    members: [
      {
        id: '3',
        name: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg'
      },
      {
        id: '5',
        name: 'Jessica Lee',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
      }
    ]
  },
  {
    id: '4',
    title: 'Rainwater Collection System',
    description: 'Implementing a rainwater harvesting system for community use.',
    community_id: '3',
    community_name: 'Urban Permaculture',
    created_by: {
      id: '4',
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
    },
    created_at: '2024-04-01T16:45:00Z',
    due_date: '2024-06-30T00:00:00Z',
    status: 'active',
    progress: 60,
    tasks: {
      total: 15,
      completed: 9
    },
    members: [
      {
        id: '4',
        name: 'Michael Chen',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
      },
      {
        id: '1',
        name: 'Emma Watson',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
      }
    ]
  }
];

export function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [communityFilter, setCommunityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  // Filter projects based on search term, community filter, and status filter
  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCommunity = communityFilter === 'all' || project.community_id === communityFilter;
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    if (activeTab === 'all') {
      return matchesSearch && matchesCommunity && matchesStatus;
    } else if (activeTab === 'my-projects') {
      // In a real app, this would filter for user's projects
      return matchesSearch && matchesCommunity && matchesStatus && 
             project.members.some(member => member.id === '1');
    }
    return matchesSearch && matchesCommunity && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'planning':
        return <Circle className="h-4 w-4 text-slate-500" />;
      case 'active':
        return <ArrowUpCircle className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100';
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage and track community projects.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Set up a new project for your community.
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
                  <Label htmlFor="title">Project Title</Label>
                  <Input id="title" placeholder="Enter project title" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the project goals and scope..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input type="date" id="start-date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="due-date">Due Date</Label>
                    <Input type="date" id="due-date" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
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
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="planning">Planning</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="my-projects">My Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle>
                        <Link to={`/projects/${project.id}`} className="hover:underline">
                          {project.title}
                        </Link>
                      </CardTitle>
                      <CardDescription>{project.community_name}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(project.status)} variant="secondary">
                      <span className="flex items-center">
                        {getStatusIcon(project.status)}
                        <span className="ml-1 capitalize">{project.status}</span>
                      </span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>Due {formatDate(project.due_date)}</span>
                      </div>
                      <div className="flex items-center">
                        <Kanban className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{project.tasks.completed}/{project.tasks.total} tasks</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex -space-x-2">
                    {project.members.map((member) => (
                      <Avatar key={member.id} className="border-2 border-background">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/projects/${project.id}`}>
                      View Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="my-projects" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle>
                        <Link to={`/projects/${project.id}`} className="hover:underline">
                          {project.title}
                        </Link>
                      </CardTitle>
                      <CardDescription>{project.community_name}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(project.status)} variant="secondary">
                      <span className="flex items-center">
                        {getStatusIcon(project.status)}
                        <span className="ml-1 capitalize">{project.status}</span>
                      </span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>Due {formatDate(project.due_date)}</span>
                      </div>
                      <div className="flex items-center">
                        <Kanban className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{project.tasks.completed}/{project.tasks.total} tasks</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex -space-x-2">
                    {project.members.map((member) => (
                      <Avatar key={member.id} className="border-2 border-background">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/projects/${project.id}`}>
                      View Details
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