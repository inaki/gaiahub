import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Community {
  id: number;
  name: string;
  role: string;
  avatar?: string;
}

export default function ProfileCommunities({
  communities,
}: {
  communities: Community[];
}) {
  return (
    <Card>
      <CardContent>
        <h3 className="font-semibold mb-4">Communities</h3>
        {communities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Users className="h-8 w-8 mb-2 text-muted-foreground" />
            <div className="text-muted-foreground text-sm">
              No communities joined yet.
            </div>
          </div>
        ) : (
          <ul className="space-y-4">
            {communities.map((c) => (
              <li key={c.id} className="flex items-center gap-3">
                {c.avatar ? (
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-base font-bold text-muted-foreground">
                    {c.name[0].toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="font-medium leading-tight">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.role}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
