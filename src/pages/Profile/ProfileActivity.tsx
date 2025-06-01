import { MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Activity {
  id: number;
  type: string;
  title: string;
  community: string;
  timestamp: string;
}

export default function ProfileActivity({
  activity,
}: {
  activity: Activity[];
}) {
  return (
    <Card>
      <CardContent>
        <h3 className="font-semibold mb-2">Recent Activity</h3>
        {activity.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <MessageSquare className="h-8 w-8 mb-2 text-muted-foreground" />
            <div className="text-muted-foreground text-sm">
              No recent activity.
            </div>
          </div>
        ) : (
          <ul className="space-y-2">
            {activity.map((a) => (
              <li
                key={a.id}
                className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2"
              >
                <span className="text-xs text-muted-foreground">
                  {new Date(a.timestamp).toLocaleDateString()}
                </span>
                <span className="font-medium">{a.title}</span>
                <span className="text-xs text-muted-foreground">
                  ({a.community})
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
