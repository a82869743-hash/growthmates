import { Linkedin, Twitter, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface SocialShareButtonsProps {
  url: string;
  title: string;
  excerpt?: string;
}

const SocialShareButtons = ({ url, title, excerpt }: SocialShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const fullUrl = `https://brush-to-blossom.lovable.app${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedExcerpt = encodeURIComponent(excerpt || title);

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedExcerpt}&via=growthmatesai`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast({ title: "Link copied!", description: "Blog post URL copied to clipboard." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Failed to copy", variant: "destructive" });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-muted-foreground mr-1">Share:</span>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full border-border hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
        onClick={() => window.open(linkedinUrl, "_blank", "width=600,height=600")}
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full border-border hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
        onClick={() => window.open(twitterUrl, "_blank", "width=600,height=400")}
        aria-label="Share on X (Twitter)"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full border-border hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
        onClick={handleCopy}
        aria-label="Copy link"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Link2 className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default SocialShareButtons;
