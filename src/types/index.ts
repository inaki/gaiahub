// Common Types
export type User = {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  role?: string;
};

export type Community = {
  id: string;
  name: string;
  description: string;
  image_url?: string;
  created_at: string;
  member_count: number;
  is_public: boolean;
};

export type Discussion = {
  id: string;
  title: string;
  body: string;
  author_id: string;
  community_id: string;
  created_at: string;
  updated_at: string;
  comment_count: number;
  status: 'active' | 'closed';
};

export type Comment = {
  id: string;
  body: string;
  author_id: string;
  discussion_id: string;
  parent_id?: string;
  created_at: string;
  updated_at: string;
};

export type Decision = {
  id: string;
  title: string;
  description: string;
  author_id: string;
  community_id: string;
  created_at: string;
  closes_at: string;
  vote_method: 'consent' | 'majority' | 'ranked_choice';
  status: 'draft' | 'active' | 'closed';
  outcome?: string;
};

export type Vote = {
  id: string;
  decision_id: string;
  user_id: string;
  position: string; // depends on vote_method (e.g., "agree", "disagree", "abstain" or ranking number)
  statement?: string;
  created_at: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  community_id: string;
  created_by: string;
  created_at: string;
  status: 'planning' | 'active' | 'completed' | 'archived';
  due_date?: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  project_id: string;
  assignee_id?: string;
  created_by: string;
  created_at: string;
  due_date?: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
};

export type Document = {
  id: string;
  title: string;
  content: string;
  author_id: string;
  community_id: string;
  created_at: string;
  updated_at: string;
  version: number;
};

export type Notification = {
  id: string;
  user_id: string;
  type: 'mention' | 'comment' | 'decision' | 'task' | 'document' | 'general';
  content: string;
  reference_id: string;
  reference_type: 'discussion' | 'decision' | 'task' | 'document';
  created_at: string;
  read: boolean;
};