import { useState } from 'react';
import { ThumbsUp, ThumbsDown, HelpCircle, Ban, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface VoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  decision: {
    id: string;
    title: string;
    description: string;
    vote_method: 'consent' | 'majority';
  };
  onVote: (position: string, statement?: string) => void;
}

export function VoteDialog({ isOpen, onClose, decision, onVote }: VoteDialogProps) {
  const [position, setPosition] = useState<string>('');
  const [statement, setStatement] = useState('');

  const handleSubmit = () => {
    onVote(position, statement);
    setPosition('');
    setStatement('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Cast Your Vote</DialogTitle>
          <DialogDescription>
            {decision.vote_method === 'consent'
              ? 'Choose your position and provide an optional statement.'
              : 'Cast your vote for this decision.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <h3 className="font-medium mb-2">{decision.title}</h3>
            <p className="text-sm text-muted-foreground">{decision.description}</p>
          </div>

          {decision.vote_method === 'consent' ? (
            <RadioGroup value={position} onValueChange={setPosition}>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="agree" id="agree" />
                  <Label htmlFor="agree" className="flex items-center">
                    <ThumbsUp className="h-4 w-4 text-green-500 mr-2" />
                    Agree
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="disagree" id="disagree" />
                  <Label htmlFor="disagree" className="flex items-center">
                    <ThumbsDown className="h-4 w-4 text-red-500 mr-2" />
                    Disagree
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="abstain" id="abstain" />
                  <Label htmlFor="abstain" className="flex items-center">
                    <HelpCircle className="h-4 w-4 text-gray-500 mr-2" />
                    Abstain
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="block" id="block" />
                  <Label htmlFor="block" className="flex items-center">
                    <Ban className="h-4 w-4 text-red-600 mr-2" />
                    Block
                  </Label>
                </div>
              </div>
            </RadioGroup>
          ) : (
            <RadioGroup value={position} onValueChange={setPosition}>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes" className="flex items-center">
                    <ThumbsUp className="h-4 w-4 text-green-500 mr-2" />
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no" className="flex items-center">
                    <ThumbsDown className="h-4 w-4 text-red-500 mr-2" />
                    No
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="abstain" id="abstain" />
                  <Label htmlFor="abstain" className="flex items-center">
                    <HelpCircle className="h-4 w-4 text-gray-500 mr-2" />
                    Abstain
                  </Label>
                </div>
              </div>
            </RadioGroup>
          )}

          {position === 'block' && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                A block vote should only be used when you have a fundamental objection that must be addressed. Please explain your concerns below.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="statement">Statement (optional{position === 'block' && ' but required for blocks'})</Label>
            <Textarea
              id="statement"
              placeholder="Share your thoughts or concerns..."
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit}
            disabled={!position || (position === 'block' && !statement)}
          >
            Cast Vote
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}