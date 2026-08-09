export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      audit_log: {
        Row: {
          action: string
          admin_email: string
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_type: string
          id: string
        }
        Insert: {
          action: string
          admin_email: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
        }
        Update: {
          action?: string
          admin_email?: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_name: string
          content: string
          cover_image_url: string | null
          created_at: string
          excerpt: string
          id: string
          published: boolean
          published_at: string | null
          slug: string
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          author_name?: string
          content?: string
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string
          id?: string
          published?: boolean
          published_at?: string | null
          slug: string
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string
          content?: string
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string
          id?: string
          published?: boolean
          published_at?: string | null
          slug?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          author_email: string
          body: string
          created_at: string
          id: string
          idea_id: string
        }
        Insert: {
          author_email: string
          body: string
          created_at?: string
          id?: string
          idea_id: string
        }
        Update: {
          author_email?: string
          body?: string
          created_at?: string
          id?: string
          idea_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_idea_id_fkey"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "ideas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_idea_id_fkey"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "ideas_public"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          source: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          source?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          source?: string | null
        }
        Relationships: []
      }
      idea_votes: {
        Row: {
          created_at: string
          id: string
          idea_id: string
          voter_email: string
        }
        Insert: {
          created_at?: string
          id?: string
          idea_id: string
          voter_email: string
        }
        Update: {
          created_at?: string
          id?: string
          idea_id?: string
          voter_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "idea_votes_idea_id_fkey"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "ideas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "idea_votes_idea_id_fkey"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "ideas_public"
            referencedColumns: ["id"]
          },
        ]
      }
      ideas: {
        Row: {
          admin_note: string | null
          attachment_url: string | null
          company_name: string | null
          contact_email: string
          created_at: string
          description: string
          duplicate_of_id: string | null
          id: string
          industries: Database["public"]["Enums"]["industry_tag"][]
          linked_roadmap_id: string | null
          status: Database["public"]["Enums"]["idea_status"]
          success_criteria: string | null
          systems_involved: string[]
          tags: string[]
          title: string
          updated_at: string
          votes_count: number
        }
        Insert: {
          admin_note?: string | null
          attachment_url?: string | null
          company_name?: string | null
          contact_email: string
          created_at?: string
          description?: string
          duplicate_of_id?: string | null
          id?: string
          industries?: Database["public"]["Enums"]["industry_tag"][]
          linked_roadmap_id?: string | null
          status?: Database["public"]["Enums"]["idea_status"]
          success_criteria?: string | null
          systems_involved?: string[]
          tags?: string[]
          title: string
          updated_at?: string
          votes_count?: number
        }
        Update: {
          admin_note?: string | null
          attachment_url?: string | null
          company_name?: string | null
          contact_email?: string
          created_at?: string
          description?: string
          duplicate_of_id?: string | null
          id?: string
          industries?: Database["public"]["Enums"]["industry_tag"][]
          linked_roadmap_id?: string | null
          status?: Database["public"]["Enums"]["idea_status"]
          success_criteria?: string | null
          systems_involved?: string[]
          tags?: string[]
          title?: string
          updated_at?: string
          votes_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "ideas_duplicate_of_id_fkey"
            columns: ["duplicate_of_id"]
            isOneToOne: false
            referencedRelation: "ideas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ideas_duplicate_of_id_fkey"
            columns: ["duplicate_of_id"]
            isOneToOne: false
            referencedRelation: "ideas_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ideas_linked_roadmap_id_fkey"
            columns: ["linked_roadmap_id"]
            isOneToOne: false
            referencedRelation: "roadmap_items"
            referencedColumns: ["id"]
          },
        ]
      }
      roadmap_access: {
        Row: {
          access_code: string
          admin_emails: string[]
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          access_code?: string
          admin_emails?: string[]
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          access_code?: string
          admin_emails?: string[]
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      roadmap_items: {
        Row: {
          created_at: string
          dependencies: string | null
          description: string
          id: string
          industries: Database["public"]["Enums"]["industry_tag"][]
          intended_outcome: string | null
          linked_idea_id: string | null
          priority: Database["public"]["Enums"]["priority_level"]
          problem_statement: string | null
          progress_pct: number
          release_notes: string | null
          status: Database["public"]["Enums"]["roadmap_status"]
          tags: string[]
          target_window: string | null
          title: string
          updated_at: string
          votes_count: number
          who_benefits: string | null
        }
        Insert: {
          created_at?: string
          dependencies?: string | null
          description?: string
          id?: string
          industries?: Database["public"]["Enums"]["industry_tag"][]
          intended_outcome?: string | null
          linked_idea_id?: string | null
          priority?: Database["public"]["Enums"]["priority_level"]
          problem_statement?: string | null
          progress_pct?: number
          release_notes?: string | null
          status?: Database["public"]["Enums"]["roadmap_status"]
          tags?: string[]
          target_window?: string | null
          title: string
          updated_at?: string
          votes_count?: number
          who_benefits?: string | null
        }
        Update: {
          created_at?: string
          dependencies?: string | null
          description?: string
          id?: string
          industries?: Database["public"]["Enums"]["industry_tag"][]
          intended_outcome?: string | null
          linked_idea_id?: string | null
          priority?: Database["public"]["Enums"]["priority_level"]
          problem_statement?: string | null
          progress_pct?: number
          release_notes?: string | null
          status?: Database["public"]["Enums"]["roadmap_status"]
          tags?: string[]
          target_window?: string | null
          title?: string
          updated_at?: string
          votes_count?: number
          who_benefits?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      comments_public: {
        Row: {
          author_id: string | null
          body: string | null
          created_at: string | null
          id: string | null
          idea_id: string | null
        }
        Insert: {
          author_id?: never
          body?: string | null
          created_at?: string | null
          id?: string | null
          idea_id?: string | null
        }
        Update: {
          author_id?: never
          body?: string | null
          created_at?: string | null
          id?: string | null
          idea_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_idea_id_fkey"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "ideas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_idea_id_fkey"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "ideas_public"
            referencedColumns: ["id"]
          },
        ]
      }
      ideas_public: {
        Row: {
          admin_note: string | null
          attachment_url: string | null
          company_name: string | null
          created_at: string | null
          description: string | null
          duplicate_of_id: string | null
          id: string | null
          industries: Database["public"]["Enums"]["industry_tag"][] | null
          linked_roadmap_id: string | null
          status: Database["public"]["Enums"]["idea_status"] | null
          success_criteria: string | null
          systems_involved: string[] | null
          tags: string[] | null
          title: string | null
          updated_at: string | null
          votes_count: number | null
        }
        Insert: {
          admin_note?: string | null
          attachment_url?: string | null
          company_name?: string | null
          created_at?: string | null
          description?: string | null
          duplicate_of_id?: string | null
          id?: string | null
          industries?: Database["public"]["Enums"]["industry_tag"][] | null
          linked_roadmap_id?: string | null
          status?: Database["public"]["Enums"]["idea_status"] | null
          success_criteria?: string | null
          systems_involved?: string[] | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
          votes_count?: number | null
        }
        Update: {
          admin_note?: string | null
          attachment_url?: string | null
          company_name?: string | null
          created_at?: string | null
          description?: string | null
          duplicate_of_id?: string | null
          id?: string | null
          industries?: Database["public"]["Enums"]["industry_tag"][] | null
          linked_roadmap_id?: string | null
          status?: Database["public"]["Enums"]["idea_status"] | null
          success_criteria?: string | null
          systems_involved?: string[] | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
          votes_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ideas_duplicate_of_id_fkey"
            columns: ["duplicate_of_id"]
            isOneToOne: false
            referencedRelation: "ideas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ideas_duplicate_of_id_fkey"
            columns: ["duplicate_of_id"]
            isOneToOne: false
            referencedRelation: "ideas_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ideas_linked_roadmap_id_fkey"
            columns: ["linked_roadmap_id"]
            isOneToOne: false
            referencedRelation: "roadmap_items"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      idea_status:
        | "new"
        | "under_review"
        | "accepted"
        | "not_now"
        | "duplicate"
        | "shipped"
      industry_tag: "transportation" | "retail" | "agriculture"
      priority_level: "p1" | "p2" | "p3"
      roadmap_status:
        | "under_review"
        | "planned"
        | "in_progress"
        | "in_beta"
        | "shipped"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      idea_status: [
        "new",
        "under_review",
        "accepted",
        "not_now",
        "duplicate",
        "shipped",
      ],
      industry_tag: ["transportation", "retail", "agriculture"],
      priority_level: ["p1", "p2", "p3"],
      roadmap_status: [
        "under_review",
        "planned",
        "in_progress",
        "in_beta",
        "shipped",
      ],
    },
  },
} as const
