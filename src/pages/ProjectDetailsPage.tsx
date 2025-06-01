import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  FileEdit,
  MessageSquare,
  Plus,
  User,
  Users,
  ArrowUpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock project data (in a real app, this would come from an API)
const mockProject = {
  id: "1",
  title: "Community Garden Expansion",
  description:
    "Expanding our community garden with new plots and a greenhouse.",
  community_id: "1",
  community_name: "Sunflower Ecovillage",
  created_by: {
    id: "1",
    name: "Emma Watson",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
  created_at: "2024-04-15T09:00:00Z",
  due_date: "2024-07-01T00:00:00Z",
  status: "active",
  progress: 35,
  tasks: {
    total: 12,
    completed: 4,
    list: [
      {
        id: "1",
        title: "Design greenhouse layout",
        description:
          "Create detailed plans for greenhouse structure and layout",
        status: "completed",
        assignee: {
          id: "1",
          name: "Emma Watson",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
        },
        due_date: "2024-05-01T00:00:00Z",
        priority: "high",
      },
      {
        id: "2",
        title: "Order materials",
        description: "Purchase required materials for greenhouse construction",
        status: "in_progress",
        assignee: {
          id: "2",
          name: "Tom Hardy",
          avatar:
            "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
        },
        due_date: "2024-05-15T00:00:00Z",
        priority: "high",
      },
      {
        id: "3",
        title: "Prepare garden beds",
        description: "Clear and prepare new garden bed areas",
        status: "todo",
        assignee: {
          id: "3",
          name: "Sarah Johnson",
          avatar:
            "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg",
        },
        due_date: "2024-05-30T00:00:00Z",
        priority: "medium",
      },
    ],
  },
  members: [
    {
      id: "1",
      name: "Emma Watson",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      role: "Project Lead",
    },
    {
      id: "2",
      name: "Tom Hardy",
      avatar:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
      role: "Team Member",
    },
    {
      id: "3",
      name: "Sarah Johnson",
      avatar:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg",
      role: "Team Member",
    },
  ],
  updates: [
    {
      id: "1",
      author: {
        id: "1",
        name: "Emma Watson",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      },
      content: "Greenhouse design plans have been completed and approved.",
      created_at: "2024-04-20T10:30:00Z",
      type: "update",
    },
    {
      id: "2",
      author: {
        id: "2",
        name: "Tom Hardy",
        avatar:
          "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
      },
      content: "Started gathering quotes from material suppliers.",
      created_at: "2024-04-22T15:45:00Z",
      type: "update",
    },
  ],
};

export function ProjectDetailsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "in_progress":
        return <ArrowUpCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <Circle className="h-4 w-4 text-slate-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "in_progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100";
    }
  };

  return (
    <div className="container py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/app/projects">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">
            {mockProject.title}
          </h1>
          <div className="flex items-center gap-2 mt-1 text-muted-foreground">
            <Badge variant="outline">{mockProject.community_name}</Badge>
            <span>•</span>
            <Badge
              className={getStatusColor(mockProject.status)}
              variant="secondary"
            >
              <span className="flex items-center">
                {getStatusIcon(mockProject.status)}
                <span className="ml-1 capitalize">{mockProject.status}</span>
              </span>
            </Badge>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Create a new task for this project.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Task Title</Label>
                <Input id="title" placeholder="Enter task title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the task..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="assignee">Assignee</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockProject.members.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="due-date">Due Date</Label>
                <Input type="date" id="due-date" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs
            defaultValue="overview"
            className="mb-8"
            onValueChange={setActiveTab}
          >
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      {mockProject.description}
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Project Lead</p>
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage
                              src={mockProject.created_by.avatar}
                              alt={mockProject.created_by.name}
                            />
                            <AvatarFallback>
                              {mockProject.created_by.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{mockProject.created_by.name}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Due Date</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(mockProject.due_date)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{mockProject.progress}%</span>
                      </div>
                      <Progress value={mockProject.progress} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockProject.members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={member.avatar}
                              alt={member.name}
                            />
                            <AvatarFallback>
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {member.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tasks" className="space-y-4">
              {mockProject.tasks.list.map((task) => (
                <Card key={task.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {task.description}
                        </p>
                      </div>
                      <Badge className={getStatusColor(task.status)}>
                        <span className="flex items-center">
                          {getStatusIcon(task.status)}
                          <span className="ml-1 capitalize">{task.status}</span>
                        </span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{task.assignee.name}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>Due {formatDate(task.due_date)}</span>
                        </div>
                      </div>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="updates" className="space-y-4">
              {mockProject.updates.map((update) => (
                <Card key={update.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage
                          src={update.author.avatar}
                          alt={update.author.name}
                        />
                        <AvatarFallback>
                          {update.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{update.author.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(update.created_at)}
                          </p>
                        </div>
                        <p className="mt-2">{update.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                    <span>Completed Tasks</span>
                  </div>
                  <span className="font-medium">
                    {mockProject.tasks.completed}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Circle className="h-4 w-4 mr-2 text-slate-500" />
                    <span>Total Tasks</span>
                  </div>
                  <span className="font-medium">{mockProject.tasks.total}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Team Members</span>
                  </div>
                  <span className="font-medium">
                    {mockProject.members.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    <span>Updates</span>
                  </div>
                  <span className="font-medium">
                    {mockProject.updates.length}
                  </span>
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
                {mockProject.updates.slice(0, 3).map((update) => (
                  <div key={update.id} className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={update.author.avatar}
                        alt={update.author.name}
                      />
                      <AvatarFallback>
                        {update.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">{update.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(update.created_at)}
                      </p>
                    </div>
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
