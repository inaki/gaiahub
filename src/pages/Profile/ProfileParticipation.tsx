import { Card, CardContent } from "@/components/ui/card";

interface Participation {
  overall?: number;
  discussions?: number;
  decisions?: number;
  projects?: number;
}

export default function ProfileParticipation({
  participation,
}: {
  participation: Participation;
}) {
  return (
    <Card>
      <CardContent>
        <div className="font-semibold mb-4">Participation Metrics</div>
        <div className="mb-3">
          <div className="mb-1">Overall Participation</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="bg-black dark:bg-white h-2 rounded-full"
                style={{ width: `${participation.overall ?? 0}%` }}
              />
            </div>
            <span className="text-sm font-medium ml-2">
              {participation.overall ?? 0}%
            </span>
          </div>
        </div>
        <div className="mb-3">
          <div className="mb-1">Discussion Participation</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="bg-black dark:bg-white h-2 rounded-full"
                style={{ width: `${participation.discussions ?? 0}%` }}
              />
            </div>
            <span className="text-sm font-medium ml-2">
              {participation.discussions ?? 0}%
            </span>
          </div>
        </div>
        <div className="mb-3">
          <div className="mb-1">Decision Participation</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="bg-black dark:bg-white h-2 rounded-full"
                style={{ width: `${participation.decisions ?? 0}%` }}
              />
            </div>
            <span className="text-sm font-medium ml-2">
              {participation.decisions ?? 0}%
            </span>
          </div>
        </div>
        <div>
          <div className="mb-1">Project Participation</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="bg-black dark:bg-white h-2 rounded-full"
                style={{ width: `${participation.projects ?? 0}%` }}
              />
            </div>
            <span className="text-sm font-medium ml-2">
              {participation.projects ?? 0}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
