import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Users, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockMembers = [
  {
    id: 1,
    name: "Emma Watson",
    role: "Core Member",
    location: "Portland, OR",
    email: "emma@example.com",
    joined: "January 2023",
    avatar_url: "https://randomuser.me/api/portraits/women/44.jpg",
    communities: ["Sunflower Ecovillage", "Urban Permaculture"],
    skills: ["Permaculture", "Community Building", "Facilitation"],
  },
  {
    id: 2,
    name: "Tom Hardy",
    role: "Member",
    location: "Seattle, WA",
    email: "tom@example.com",
    joined: "March 2023",
    avatar_url: "https://randomuser.me/api/portraits/men/32.jpg",
    communities: ["Mountain View Co-op"],
    skills: ["Renewable Energy", "Construction", "Project Management"],
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Core Member",
    location: "Portland, OR",
    email: "sarah@example.com",
    joined: "February 2023",
    avatar_url: "https://randomuser.me/api/portraits/women/65.jpg",
    communities: ["Sunflower Ecovillage"],
    skills: ["Organic Farming", "Education", "Herbalism"],
  },
  {
    id: 4,
    name: "Michael Chen",
    role: "Member",
    location: "Vancouver, BC",
    email: "michael@example.com",
    joined: "April 2023",
    avatar_url: "https://randomuser.me/api/portraits/men/76.jpg",
    communities: ["Urban Permaculture"],
    skills: ["Web Development", "Sustainable Technology"],
  },
];

export default function MembersDirectory() {
  const [search, setSearch] = useState("");
  // For now, filters are static
  const filteredMembers = mockMembers.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-1">Members Directory</h1>
      <p className="text-muted-foreground mb-6">
        Connect with community members
      </p>
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <div className="flex-1 w-full">
          <Input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded px-3 py-2 text-base"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button
            variant="outline"
            className="flex items-center gap-2 w-full md:w-auto"
          >
            <Users className="h-4 w-4" />
            All Communities
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 w-full md:w-auto"
          >
            <span className="h-4 w-4 inline-block">&#x25BC;</span>
            All Roles
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="border rounded-xl bg-white dark:bg-background shadow-sm p-6 flex flex-col gap-2 min-w-[300px]"
          >
            <div className="flex items-center gap-4 mb-2">
              <Avatar className="h-14 w-14">
                <AvatarImage
                  src={
                    member.avatar_url ||
                    "https://avatar.iran.liara.run/public/girl"
                  }
                  alt={member.name}
                />
                <AvatarFallback>
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-lg leading-tight">
                  {member.name}
                </div>
                <div className="text-muted-foreground text-sm">
                  {member.role}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{member.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${member.email}`} className="hover:underline">
                {member.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Calendar className="h-4 w-4" />
              <span>Member since {member.joined}</span>
            </div>
            <div className="font-semibold text-sm mt-2">Communities</div>
            <div className="flex flex-wrap gap-2 mb-2">
              {member.communities.map((c) => (
                <span
                  key={c}
                  className="bg-muted px-2 py-1 rounded text-xs font-medium"
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="font-semibold text-sm">Skills & Interests</div>
            <div className="flex flex-wrap gap-2 mb-4">
              {member.skills.map((s) => (
                <span
                  key={s}
                  className="bg-muted px-2 py-1 rounded text-xs font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-auto">
              View Profile
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
