// Local types matching the database schema
// These supplement the auto-generated Supabase types

export type RoadmapStatus = 'under_review' | 'planned' | 'in_progress' | 'in_beta' | 'shipped';
export type IdeaStatus = 'new' | 'under_review' | 'accepted' | 'not_now' | 'duplicate' | 'shipped';
export type PriorityLevel = 'p1' | 'p2' | 'p3';
export type IndustryTag = 'transportation' | 'retail';

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  problem_statement: string | null;
  intended_outcome: string | null;
  who_benefits: string | null;
  dependencies: string | null;
  release_notes: string | null;
  industries: IndustryTag[];
  tags: string[];
  status: RoadmapStatus;
  priority: PriorityLevel;
  target_window: string | null;
  progress_pct: number;
  votes_count: number;
  linked_idea_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  success_criteria: string | null;
  industries: IndustryTag[];
  tags: string[];
  systems_involved: string[];
  status: IdeaStatus;
  votes_count: number;
  contact_email: string;
  company_name: string | null;
  attachment_url: string | null;
  admin_note: string | null;
  duplicate_of_id: string | null;
  linked_roadmap_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface IdeaVote {
  id: string;
  idea_id: string;
  voter_email: string;
  created_at: string;
}

export interface Comment {
  id: string;
  idea_id: string;
  author_id: string;
  body: string;
  created_at: string;
}

export interface RoadmapAccess {
  id: string;
  access_code: string;
  admin_emails: string[];
}

export const ROADMAP_STATUS_LABELS: Record<RoadmapStatus, string> = {
  under_review: 'Under Review',
  planned: 'Planned',
  in_progress: 'In Progress',
  in_beta: 'In Beta',
  shipped: 'Shipped',
};

export const IDEA_STATUS_LABELS: Record<IdeaStatus, string> = {
  new: 'New',
  under_review: 'Under Review',
  accepted: 'Accepted',
  not_now: 'Not Now',
  duplicate: 'Duplicate',
  shipped: 'Shipped',
};

export const PRIORITY_LABELS: Record<PriorityLevel, string> = {
  p1: 'P1',
  p2: 'P2',
  p3: 'P3',
};

export const INDUSTRY_LABELS: Record<IndustryTag, string> = {
  transportation: 'Transportation',
  retail: 'Retail',
  
};

export const KANBAN_COLUMNS: RoadmapStatus[] = [
  'under_review',
  'planned',
  'in_progress',
  'in_beta',
  'shipped',
];

export const ALL_TAGS = [
  'Integrations',
  'Finance',
  'Operations',
  'Compliance',
  'Customer Experience',
  'Reporting',
  'Automation',
];
