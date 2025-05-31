import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Menu,
  Bell,
  Sun,
  Moon,
  X,
  MessageSquare,
  Vote,
  Kanban,
  FileText,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/theme/ModeToggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full px-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl text-primary">Nemi</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Home
            </Link>
            <Link
              to="/communities"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Communities
            </Link>
            <Link
              to="/discussions"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Discussions
            </Link>
            <Link
              to="/decisions"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Decisions
            </Link>
            <Link
              to="/projects"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Projects
            </Link>
            <Link
              to="/documents"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Documents
            </Link>
          </nav>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus:ring-0 focus:ring-offset-0 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className={cn("h-6 w-6", isOpen ? "hidden" : "block")} />
          <X className={cn("h-6 w-6", isOpen ? "block" : "hidden")} />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Logo for mobile */}
        <div className="flex md:hidden">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">EcoCollab</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive"></span>
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  New discussion in "Garden Planning"
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Vote closing in 2 days: "Solar Panel Installation"
                </DropdownMenuItem>
                <DropdownMenuItem>
                  You were assigned a task: "Update website"
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar>
                    <AvatarImage
                      src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
                      alt="User"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "absolute left-0 right-0 top-16 z-50 bg-background border-b md:hidden",
          isOpen ? "block" : "hidden"
        )}
      >
        <div className="container py-4">
          <nav className="grid gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-medium p-2 hover:bg-accent rounded-md"
              onClick={() => setIsOpen(false)}
            >
              <Home className="h-5 w-5" />
              Home
            </Link>
            <Link
              to="/communities"
              className="flex items-center gap-2 text-lg font-medium p-2 hover:bg-accent rounded-md"
              onClick={() => setIsOpen(false)}
            >
              <Users className="h-5 w-5" />
              Communities
            </Link>
            <Link
              to="/discussions"
              className="flex items-center gap-2 text-lg font-medium p-2 hover:bg-accent rounded-md"
              onClick={() => setIsOpen(false)}
            >
              <MessageSquare className="h-5 w-5" />
              Discussions
            </Link>
            <Link
              to="/decisions"
              className="flex items-center gap-2 text-lg font-medium p-2 hover:bg-accent rounded-md"
              onClick={() => setIsOpen(false)}
            >
              <Vote className="h-5 w-5" />
              Decisions
            </Link>
            <Link
              to="/projects"
              className="flex items-center gap-2 text-lg font-medium p-2 hover:bg-accent rounded-md"
              onClick={() => setIsOpen(false)}
            >
              <Kanban className="h-5 w-5" />
              Projects
            </Link>
            <Link
              to="/documents"
              className="flex items-center gap-2 text-lg font-medium p-2 hover:bg-accent rounded-md"
              onClick={() => setIsOpen(false)}
            >
              <FileText className="h-5 w-5" />
              Documents
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}
