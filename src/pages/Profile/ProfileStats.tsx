import { Card, CardContent } from "@/components/ui/card";

interface Stats {
  discussions?: number;
  decisions?: number;
  projects?: number;
  documents?: number;
}

export default function ProfileStats({ stats }: { stats: Stats }) {
  return (
    <Card className="mb-8">
      <CardContent>
        <div className="font-semibold mb-4">Contribution Stats</div>
        <div className="flex justify-between text-center">
          <div className="flex-1">
            <div className="text-2xl font-bold">{stats.discussions ?? 0}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Discussions
            </div>
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold">{stats.decisions ?? 0}</div>
            <div className="text-xs text-muted-foreground mt-1">Decisions</div>
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold">{stats.projects ?? 0}</div>
            <div className="text-xs text-muted-foreground mt-1">Projects</div>
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold">{stats.documents ?? 0}</div>
            <div className="text-xs text-muted-foreground mt-1">Documents</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
