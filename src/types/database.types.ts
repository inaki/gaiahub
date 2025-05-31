export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          role: string | null;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          role?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          role?: string | null;
        };
      };
      communities: {
        Row: {
          id: string;
          name: string;
          description: string;
          image_url: string | null;
          created_at: string;
          is_public: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          image_url?: string | null;
          created_at?: string;
          is_public?: boolean;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          image_url?: string | null;
          created_at?: string;
          is_public?: boolean;
        };
      };
      community_members: {
        Row: {
          id: string;
          community_id: string;
          user_id: string;
          role: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          community_id: string;
          user_id: string;
          role: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          community_id?: string;
          user_id?: string;
          role?: string;
          created_at?: string;
        };
      };
      discussions: {
        Row: {
          id: string;
          title: string;
          body: string;
          author_id: string;
          community_id: string;
          created_at: string;
          updated_at: string;
          status: string;
        };
        Insert: {
          id?: string;
          title: string;
          body: string;
          author_id: string;
          community_id: string;
          created_at?: string;
          updated_at?: string;
          status?: string;
        };
        Update: {
          id?: string;
          title?: string;
          body?: string;
          author_id?: string;
          community_id?: string;
          created_at?: string;
          updated_at?: string;
          status?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          body: string;
          author_id: string;
          discussion_id: string;
          parent_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          body: string;
          author_id: string;
          discussion_id: string;
          parent_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          body?: string;
          author_id?: string;
          discussion_id?: string;
          parent_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      decisions: {
        Row: {
          id: string;
          title: string;
          description: string;
          author_id: string;
          community_id: string;
          created_at: string;
          closes_at: string;
          vote_method: string;
          status: string;
          outcome: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          author_id: string;
          community_id: string;
          created_at?: string;
          closes_at: string;
          vote_method: string;
          status?: string;
          outcome?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          author_id?: string;
          community_id?: string;
          created_at?: string;
          closes_at?: string;
          vote_method?: string;
          status?: string;
          outcome?: string | null;
        };
      };
      votes: {
        Row: {
          id: string;
          decision_id: string;
          user_id: string;
          position: string;
          statement: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          decision_id: string;
          user_id: string;
          position: string;
          statement?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          decision_id?: string;
          user_id?: string;
          position?: string;
          statement?: string | null;
          created_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          community_id: string;
          created_by: string;
          created_at: string;
          status: string;
          due_date: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          community_id: string;
          created_by: string;
          created_at?: string;
          status?: string;
          due_date?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          community_id?: string;
          created_by?: string;
          created_at?: string;
          status?: string;
          due_date?: string | null;
        };
      };
      tasks: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          project_id: string;
          assignee_id: string | null;
          created_by: string;
          created_at: string;
          due_date: string | null;
          status: string;
          priority: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          project_id: string;
          assignee_id?: string | null;
          created_by: string;
          created_at?: string;
          due_date?: string | null;
          status?: string;
          priority?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          project_id?: string;
          assignee_id?: string | null;
          created_by?: string;
          created_at?: string;
          due_date?: string | null;
          status?: string;
          priority?: string;
        };
      };
      documents: {
        Row: {
          id: string;
          title: string;
          content: string;
          author_id: string;
          community_id: string;
          created_at: string;
          updated_at: string;
          version: number;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          author_id: string;
          community_id: string;
          created_at?: string;
          updated_at?: string;
          version?: number;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          author_id?: string;
          community_id?: string;
          created_at?: string;
          updated_at?: string;
          version?: number;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          content: string;
          reference_id: string;
          reference_type: string;
          created_at: string;
          read: boolean;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          content: string;
          reference_id: string;
          reference_type: string;
          created_at?: string;
          read?: boolean;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          content?: string;
          reference_id?: string;
          reference_type?: string;
          created_at?: string;
          read?: boolean;
        };
      };
    };
  };
}