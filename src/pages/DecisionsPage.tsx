import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Vote, ThumbsUp, ThumbsDown, Calendar, User, Filter, Users, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { VoteDialog } from '@/components/decisions/VoteDialog';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const mockDecisions = [
  {
    id: '1',
    title: 'Solar Panel Installation',
    description: 'Proposal to install solar panels on the community center roof to reduce energy costs.',
    author_id: '1',
    author_name: 'Tom Hardy',
    author_avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    community_id: '2',
    community_name: 'Mountain View Co-op',
    created_at: '2024-05-03T09:15:00Z',
    closes_at: '2024-05-20T23:59:59Z',
    vote_method: 'consent',
    status: 'active',
    votes: {
      agree: 8,
      disagree: 1,
      abstain: 2,
      block: 0,
      total: 11,
      total_members: 28
    }
  },
  {
    id: '2',
    title: 'Greenhouse Construction Proposal',
    description: 'Building a community greenhouse to extend our growing season and increase food production.',
    author_id: '3',
    author_name: 'Sarah Johnson',
    author_avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    community_id: '1',
    community_name: 'Sunflower Ecovillage',
    created_at: '2024-05-05T11:30:00Z',
    closes_at: '2024-05-15T23:59:59Z',
    vote_method: 'majority',
    status: 'active',
    votes: {
      agree: 17,
      disagree: 6,
      abstain: 3,
      block: 0,
      total: 26,
      total_members: 45
    }
  },
  {
    id: '3',
    title: 'Community Workshop Schedule',
    description: 'Setting the calendar for skill-sharing workshops for the next quarter.',
    author_id: '4',
    author_name: 'Michael Chen',
    author_avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    community_id: '3',
    community_name: 'Urban Permaculture',
    created_at: '2024-05-04T14:45:00Z',
    closes_at: '2024-05-18T23:59:59Z',
    vote_method: 'consent',
    status: 'active',
    votes: {
      agree: 15,
      disagree: 0,
      abstain: 5,
      block: 0,
      total: 20,
      total_members: 34
    }
  },
  {
    id: '4',
    title: 'New Member Approval: Jane Doe',
    description: 'Voting on accepting Jane Doe as a new community member after her trial period.',
    author_id: '5',
    author_name: 'Jessica Lee',
    author_avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    community_id: '1',
    community_name: 'Sunflower Ecovillage',
    created_at: '2024-05-02T10:00:00Z',
    closes_at: '2024-05-12T23:59:59Z',
    vote_method: 'consent',
    status: 'active',
    votes: {
      agree: 29,
      disagree: 0,
      abstain: 3,
      block: 1,
      total: 33,
      total_members: 45
    }
  },
  {
    id: '5',
    title: 'Community Guidelines Update',
    description: 'Proposed changes to our community guidelines around quiet hours and shared spaces.',
    author_id: '2',
    author_name: 'Emma Watson',
    author_avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    community_id: '2',
    community_name: 'Mountain View Co-op',
    created_at: '2024-05-01T16:30:00Z',
    closes_at: '2024-05-11T23:59:59Z',
    vote_method: 'majority',
    status: 'active',
    votes: {
      agree: 14,
      disagree: 7,
      abstain: 2,
      block: 0,
      total: 23,
      total_members: 28
    }
  },
];

export function DecisionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [communityFilter, setCommunityFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('active');
  const [voteMethod, setVoteMethod] = useState('consent');
  const [selectedDecision, setSelectedDecision] = useState<any>(null);
  const [isVoteDialogOpen, setIsVoteDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredDecisions = mockDecisions.filter(decision => {
    const matchesSearch = decision.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          decision.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCommunity = communityFilter === 'all' || decision.community_id === communityFilter;
    
    if (activeTab === 'active') {
      return matchesSearch && matchesCommunity && decision.status === 'active';
    } else if (activeTab === 'my-votes') {
      return matchesSearch && matchesCommunity && (decision.id === '1' || decision.id === '3');
    }
    return matchesSearch && matchesCommunity;
  });

  const handleVoteClick = (decision: any) => {
    setSelectedDecision(decision);
    setIsVoteDialogOpen(true);
  };

  const handleVote = (position: string, statement?: string) => {
    const voteText = position.charAt(0).toUpperCase() + position.slice(1);
    
    const updatedDecisions = mockDecisions.map(d => {
      if (d.id === selectedDecision.id) {
        const votes = { ...d.votes };
        if (position === 'agree' || position === 'yes') votes.agree++;
        else if (position === 'disagree' || position === 'no') votes.disagree++;
        else if (position === 'abstain') votes.abstain++;
        else if (position === 'block') votes.block++;
        votes.total++;
        return { ...d, votes };
      }
      return d;
    });

    toast({
      title: "Vote Recorded",
      description: `You voted "${voteText}" on "${selectedDecision.title}"`,
    });

    setIsVoteDialogOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const daysRemaining = (dateString: string) => {
    const today = new Date();
    const closingDate = new Date(dateString);
    const diffTime = closingDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Closed';
    if (diffDays === 0) return 'Closing today';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Decisions</h1>
          <p className="text-muted-foreground">Vote on important community matters.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Decision
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create a New Decision</DialogTitle>
                <DialogDescription>
                  Start a new voting process for your community to decide on.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
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
                    <Label htmlFor="closing-date">Closing Date</Label>
                    <Input type="date" id="closing-date" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter decision title" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what is being decided..."
                    className="min-h-[150px]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Voting Method</Label>
                  <RadioGroup value={voteMethod} onValueChange={setVoteMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="consent" id="consent" />
                      <Label htmlFor="consent">Consent (Agree, Disagree, Abstain, Block)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="majority" id="majority" />
                      <Label htmlFor="majority">Majority (Yes/No)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ranked_choice" id="ranked_choice" />
                      <Label htmlFor="ranked_choice">Ranked Choice (for multiple options)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Decision</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search decisions..."
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

      <Tabs defaultValue="active" className="mb-8" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="my-votes">My Votes</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-6">
          <div className="space-y-4">
            {filteredDecisions.map((decision) => (
              <Card key={decision.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">
                        <Link to={`/decisions/${decision.id}`} className="hover:underline">
                          {decision.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Badge variant="outline" className="mr-2">
                          {decision.community_name}
                        </Badge>
                        <Badge variant="secondary" className="mr-2 flex items-center">
                          <Vote className="mr-1 h-3 w-3" />
                          {decision.vote_method === 'consent' ? 'Consent' : 
                           decision.vote_method === 'majority' ? 'Majority' : 'Ranked Choice'}
                        </Badge>
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Closes: {formatDate(decision.closes_at)}</span>
                        <span className="ml-2 text-orange-500 font-medium">{daysRemaining(decision.closes_at)}</span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-2 mb-4">{decision.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Participation: {Math.round((decision.votes.total / decision.votes.total_members) * 100)}%</span>
                      <span>{decision.votes.total}/{decision.votes.total_members} voted</span>
                    </div>
                    <Progress value={(decision.votes.total / decision.votes.total_members) * 100} />
                    
                    {decision.vote_method === 'consent' && (
                      <div className="flex justify-between mt-3 text-sm">
                        <div className="flex items-center">
                          <ThumbsUp className="h-4 w-4 text-green-500 mr-1" />
                          <span>Agree: {decision.votes.agree}</span>
                        </div>
                        <div className="flex items-center">
                          <ThumbsDown className="h-4 w-4 text-red-500 mr-1" />
                          <span>Disagree: {decision.votes.disagree}</span>
                        </div>
                        <div className="flex items-center">
                          <HelpCircle className="h-4 w-4 text-gray-500 mr-1" />
                          <span>Abstain: {decision.votes.abstain}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="h-4 w-4 flex items-center justify-center text-red-600 font-bold mr-1">⛔</span>
                          <span>Block: {decision.votes.block}</span>
                        </div>
                      </div>
                    )}
                    
                    {decision.vote_method === 'majority' && (
                      <div className="flex justify-between mt-3 text-sm">
                        <div className="flex items-center">
                          <ThumbsUp className="h-4 w-4 text-green-500 mr-1" />
                          <span>Yes: {decision.votes.agree}</span>
                        </div>
                        <div className="flex items-center">
                          <ThumbsDown className="h-4 w-4 text-red-500 mr-1" />
                          <span>No: {decision.votes.disagree}</span>
                        </div>
                        <div className="flex items-center">
                          <HelpCircle className="h-4 w-4 text-gray-500 mr-1" />
                          <span>Abstain: {decision.votes.abstain}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={decision.author_avatar} alt={decision.author_name} />
                      <AvatarFallback>{decision.author_name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">Started by {decision.author_name}</span>
                  </div>
                  <Button size="sm" onClick={() => handleVoteClick(decision)}>
                    Vote Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="my-votes" className="mt-6">
          <div className="space-y-4">
            {filteredDecisions.map((decision) => (
              <Card key={decision.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">
                        <Link to={`/decisions/${decision.id}`} className="hover:underline">
                          {decision.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Badge variant="outline" className="mr-2">
                          {decision.community_name}
                        </Badge>
                        <Badge variant="secondary" className="mr-2 flex items-center">
                          <Vote className="mr-1 h-3 w-3" />
                          {decision.vote_method === 'consent' ? 'Consent' : 
                           decision.vote_method === 'majority' ? 'Majority' : 'Ranked Choice'}
                        </Badge>
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Closes: {formatDate(decision.closes_at)}</span>
                        <span className="ml-2 text-orange-500 font-medium">{daysRemaining(decision.closes_at)}</span>
                      </CardDescription>
                    </div>
                    <Badge className="bg-green-500">You voted</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-2 mb-4">{decision.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Participation: {Math.round((decision.votes.total / decision.votes.total_members) * 100)}%</span>
                      <span>{decision.votes.total}/{decision.votes.total_members} voted</span>
                    </div>
                    <Progress value={(decision.votes.total / decision.votes.total_members) * 100} />
                    
                    {decision.vote_method === 'consent' && (
                      <div className="flex justify-between mt-3 text-sm">
                        <div className="flex items-center">
                          <ThumbsUp className="h-4 w-4 text-green-500 mr-1" />
                          <span>Agree: {decision.votes.agree}</span>
                        </div>
                        <div className="flex items-center">
                          <ThumbsDown className="h-4 w-4 text-red-500 mr-1" />
                          <span>Disagree: {decision.votes.disagree}</span>
                        </div>
                        <div className="flex items-center">
                          <HelpCircle className="h-4 w-4 text-gray-500 mr-1" />
                          <span>Abstain: {decision.votes.abstain}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="h-4 w-4 flex items-center justify-center text-red-600 font-bold mr-1">⛔</span>
                          <span>Block: {decision.votes.block}</span>
                        </div>
                      </div>
                    )}
                    
                    {decision.vote_method === 'majority' && (
                      <div className="flex justify-between mt-3 text-sm">
                        <div className="flex items-center">
                          <ThumbsUp className="h-4 w-4 text-green-500 mr-1" />
                          <span>Yes: {decision.votes.agree}</span>
                        </div>
                        <div className="flex items-center">
                          <ThumbsDown className="h-4 w-4 text-red-500 mr-1" />
                          <span>No: {decision.votes.disagree}</span>
                        </div>
                        <div className="flex items-center">
                          <HelpCircle className="h-4 w-4 text-gray-500 mr-1" />
                          <span>Abstain: {decision.votes.abstain}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={decision.author_avatar} alt={decision.author_name} />
                      <AvatarFallback>{decision.author_name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">Started by {decision.author_name}</span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/decisions/${decision.id}`}>
                      View Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="closed" className="mt-6">
          <div className="p-8 text-center text-muted-foreground">
            <Vote className="mx-auto h-12 w-12 opacity-20 mb-2" />
            <h3 className="text-lg font-medium">No closed decisions</h3>
            <p>All current decisions are still active and open for voting.</p>
          </div>
        </TabsContent>
      </Tabs>

      {selectedDecision && (
        <VoteDialog
          isOpen={isVoteDialogOpen}
          onClose={() => setIsVoteDialogOpen(false)}
          decision={selectedDecision}
          onVote={handleVote}
        />
      )}
    </div>
  );
}