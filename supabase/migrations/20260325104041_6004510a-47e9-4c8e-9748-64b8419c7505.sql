
UPDATE public.blog_posts 
SET 
  title = 'AI Agents Are Decision Engines, Not Workflow Tools — Here''s What That Means for Your Enterprise',
  excerpt = 'Traditional automation follows scripts. AI agents reason, decide, and act. Backed by research from Gartner, McKinsey, and Forrester, this analysis reveals why the shift from process automation to decision intelligence is the defining enterprise technology transition of the decade.',
  tags = ARRAY['AI Agents', 'Decision Intelligence', 'Enterprise AI', 'Beyond IPA', 'Automation Strategy'],
  author_name = 'GrowthMates Research',
  content = 'Rich content rendered via React component — see DecisionEngineArticle.tsx',
  updated_at = now()
WHERE slug = 'ai-workflow-automation-guide';
