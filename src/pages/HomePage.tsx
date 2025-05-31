import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Vote, Kanban, FileText, Users, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

export function HomePage() {
  // Dummy data for the dashboard
  const recentActivity = [
    { id: '1', type: 'discussion', title: 'Upcoming Community Gathering', user: 'Emma Watson', time: '2 hours ago', communityName: 'Sunflower Ecovillage' },
    { id: '2', type: 'decision', title: 'Solar Panel Installation', user: 'Tom Hardy', time: '5 hours ago', communityName: 'Mountain View Co-op' },
    { id: '3', type: 'task', title: 'Update community website', user: 'Sarah Johnson', time: '1 day ago', communityName: 'Urban Permaculture' },
    { id: '4', type: 'document', title: 'Community Guidelines v2', user: 'Michael Chen', time: '2 days ago', communityName: 'Sunflower Ecovillage' },
  ];

  const upcomingDecisions = [
    { id: '1', title: 'Greenhouse Construction Proposal', dueDate: '3 days left', votes: 7, totalMembers: 12 },
    { id: '2', title: 'Community Workshop Schedule', dueDate: '5 days left', votes: 5, totalMembers: 12 },
    { id: '3', title: 'New Member Approval: Jane Doe', dueDate: '1 week left', votes: 9, totalMembers: 12 },
  ];

  const myTasks = [
    { id: '1', title: 'Prepare garden planting guide', status: 'in_progress', dueDate: 'Tomorrow', priority: 'high' },
    { id: '2', title: 'Review renewable energy proposal', status: 'todo', dueDate: 'Next week', priority: 'medium' },
    { id: '3', title: 'Update community directory', status: 'todo', dueDate: 'In 2 weeks', priority: 'low' },
  ];

  // Helper function to get the icon for activity types
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
        return <Activity className="h-4 w-4" />;
    }
  };

  // Helper function to get task priority styling
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening in your communities.</p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Button asChild>
            <Link to="/communities">Browse Communities</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              The latest updates from your communities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-start space-x-4 rounded-lg border p-3 transition-all hover:bg-accent">
                  <div className="mt-1">{getActivityIcon(item.type)}</div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.time}</p>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="mr-2">{item.communityName}</span>
                      <span>•</span>
                      <span className="ml-2">by {item.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" asChild>
              <Link to="/activity">
                View all activity
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-full lg:col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Decisions</CardTitle>
            <CardDescription>
              Decisions that need your vote
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDecisions.map((decision) => (
                <div key={decision.id} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <Link to={`/decisions/${decision.id}`} className="font-medium text-sm hover:underline">
                      {decision.title}
                    </Link>
                    <span className="text-xs text-muted-foreground">{decision.dueDate}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>{decision.votes} voted</span>
                      <span>{decision.votes}/{decision.totalMembers}</span>
                    </div>
                    <Progress value={(decision.votes / decision.totalMembers) * 100} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" asChild>
              <Link to="/decisions">
                View all decisions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>My Tasks</CardTitle>
            <CardDescription>
              Tasks assigned to you across communities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between rounded-lg border p-3 transition-all hover:bg-accent">
                  <div className="flex items-center space-x-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{task.title}</p>
                      <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityStyles(task.priority)}`}>
                      {task.priority}
                    </span>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/tasks/${task.id}`}>
                        View
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" asChild>
              <Link to="/projects">
                View all tasks
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}