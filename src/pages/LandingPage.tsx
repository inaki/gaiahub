import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, MessageSquare, Vote } from "lucide-react";
import { LuTreePalm } from "react-icons/lu";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background px-8">
      {/* Navigation */}
      <nav className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <LuTreePalm className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Nemi Hub</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/login">Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-24 space-y-8">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">
            Build thriving communities through collaboration
          </h1>
          <p className="text-xl text-muted-foreground">
            EcoCollab empowers intentional communities with tools for democratic
            decision-making, project management, and knowledge sharing.
          </p>
          <div className="flex gap-4">
            <Button size="lg" asChild>
              <Link to="/login">
                Join Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-24 space-y-16">
        <h2 className="text-3xl font-bold text-center">
          Everything you need to build community
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Users className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-semibold">Community Management</h3>
            <p className="text-muted-foreground">
              Create and manage your community spaces, roles, and membership
              with ease.
            </p>
          </div>
          <div className="space-y-4">
            <MessageSquare className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-semibold">Discussions & Documents</h3>
            <p className="text-muted-foreground">
              Foster meaningful conversations and build a shared knowledge base.
            </p>
          </div>
          <div className="space-y-4">
            <Vote className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-semibold">
              Democratic Decision-Making
            </h3>
            <p className="text-muted-foreground">
              Make collective decisions through consent-based or majority
              voting.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-24">
        <div className="rounded-lg bg-primary/5 p-8 text-center space-y-4">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="text-muted-foreground">
            Join thousands of communities already using EcoCollab.
          </p>
          <Button size="lg" className="mt-4" asChild>
            <Link to="/login">Create Your Community</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <LuTreePalm className="h-5 w-5 text-primary" />
              <span className="font-semibold">Nemi Hub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 EcoCollab. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
