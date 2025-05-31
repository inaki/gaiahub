import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart, Users, MessageSquare, Vote, Kanban, 
  FileText, Settings, User, Bell, Home
} from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  communities?: Array<{ id: string; name: string }>;
}

export function SidebarNav({ className, communities = [], ...props }: SidebarNavProps) {
  const location = useLocation();
  
  const mainLinks = [
    {
      href: '/',
      label: 'Dashboard',
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      href: '/communities',
      label: 'Communities',
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      href: '/discussions',
      label: 'Discussions',
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
    },
    {
      href: '/decisions',
      label: 'Decisions',
      icon: <Vote className="mr-2 h-4 w-4" />,
    },
    {
      href: '/projects',
      label: 'Projects',
      icon: <Kanban className="mr-2 h-4 w-4" />,
    },
    {
      href: '/documents',
      label: 'Documents',
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
  ];

  const userLinks = [
    {
      href: '/notifications',
      label: 'Notifications',
      icon: <Bell className="mr-2 h-4 w-4" />,
    },
    {
      href: '/profile',
      label: 'Profile',
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      href: '/settings',
      label: 'Settings',
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <ScrollArea className={cn("pb-12", className)} {...props}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Main
          </h2>
          <div className="space-y-1">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-full justify-start",
                  location.pathname === link.href 
                    ? "bg-accent text-accent-foreground" 
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        
        {communities.length > 0 && (
          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              My Communities
            </h2>
            <div className="space-y-1">
              {communities.map((community) => (
                <Link
                  key={community.id}
                  to={`/communities/${community.id}`}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-full justify-start",
                    location.pathname === `/communities/${community.id}` 
                      ? "bg-accent text-accent-foreground" 
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Users className="mr-2 h-4 w-4" />
                  {community.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Account
          </h2>
          <div className="space-y-1">
            {userLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-full justify-start",
                  location.pathname === link.href 
                    ? "bg-accent text-accent-foreground" 
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}