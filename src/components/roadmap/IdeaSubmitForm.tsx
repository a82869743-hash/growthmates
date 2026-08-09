import { useState } from "react";
import { Lightbulb, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { IndustryTag } from "./types";
import { INDUSTRY_LABELS } from "./types";

const SYSTEMS = [
  { value: "TMS", label: "TMS" },
  { value: "Accounting", label: "Accounting (Xero / QuickBooks / MYOB)" },
  { value: "Excel", label: "Excel / Email / PDFs" },
  { value: "Other", label: "Other" },
];

const IdeaSubmitForm = ({ onSubmitted }: { onSubmitted: () => void }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    industry: "" as IndustryTag | "",
    description: "",
    success_criteria: "",
    systems: [] as string[],
    attachment_url: "",
    contact_email: "",
    company_name: "",
  });

  const toggleSystem = (sys: string) => {
    setForm((f) => ({
      ...f,
      systems: f.systems.includes(sys)
        ? f.systems.filter((s) => s !== sys)
        : [...f.systems, sys],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.industry || !form.description.trim() || !form.contact_email.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("ideas").insert({
        title: form.title.trim(),
        description: form.description.trim(),
        success_criteria: form.success_criteria.trim() || null,
        industries: [form.industry] as IndustryTag[],
        systems_involved: form.systems,
        attachment_url: form.attachment_url.trim() || null,
        contact_email: form.contact_email.trim(),
        company_name: form.company_name.trim() || null,
        status: "new" as const,
      });

      if (error) throw error;

      toast({
        title: "Idea submitted!",
        description: "Thanks — we'll review this and update status here.",
      });
      setOpen(false);
      setForm({
        title: "",
        industry: "",
        description: "",
        success_criteria: "",
        systems: [],
        attachment_url: "",
        contact_email: "",
        company_name: "",
      });
      onSubmitted();
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Lightbulb className="h-4 w-4" />
          Submit an Idea
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Submit Your Idea
          </DialogTitle>
          <DialogDescription>
            Help shape what we build next. Tell us about a problem you'd like solved.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Title */}
          <div className="space-y-1.5">
            <Label className="text-sm">
              Idea title <span className="text-destructive">*</span>
            </Label>
            <Input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g. Automated rate card updates"
              maxLength={200}
              required
            />
          </div>

          {/* Industry */}
          <div className="space-y-1.5">
            <Label className="text-sm">
              Industry <span className="text-destructive">*</span>
            </Label>
            <Select
              value={form.industry}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, industry: v as IndustryTag }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(INDUSTRY_LABELS) as IndustryTag[]).map((key) => (
                  <SelectItem key={key} value={key}>
                    {INDUSTRY_LABELS[key]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Problem description */}
          <div className="space-y-1.5">
            <Label className="text-sm">
              What problem are you trying to solve? <span className="text-destructive">*</span>
            </Label>
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              placeholder="Describe the challenge you face..."
              rows={3}
              maxLength={2000}
              required
            />
          </div>

          {/* Success criteria */}
          <div className="space-y-1.5">
            <Label className="text-sm">What does success look like?</Label>
            <Textarea
              value={form.success_criteria}
              onChange={(e) =>
                setForm((f) => ({ ...f, success_criteria: e.target.value }))
              }
              placeholder="How would you measure a good outcome?"
              rows={2}
              maxLength={1000}
            />
          </div>

          {/* Systems involved */}
          <div className="space-y-2">
            <Label className="text-sm">System(s) involved</Label>
            <div className="grid grid-cols-2 gap-2">
              {SYSTEMS.map((sys) => (
                <label
                  key={sys.value}
                  className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer text-sm hover:bg-muted/40 has-[[data-state=checked]]:border-primary/40 has-[[data-state=checked]]:bg-primary/5"
                >
                  <Checkbox
                    checked={form.systems.includes(sys.value)}
                    onCheckedChange={() => toggleSystem(sys.value)}
                  />
                  {sys.label}
                </label>
              ))}
            </div>
          </div>

          {/* Attachment link */}
          <div className="space-y-1.5">
            <Label className="text-sm">Attachment link (optional)</Label>
            <Input
              type="url"
              value={form.attachment_url}
              onChange={(e) =>
                setForm((f) => ({ ...f, attachment_url: e.target.value }))
              }
              placeholder="https://..."
            />
          </div>

          {/* Contact info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-sm">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                type="email"
                value={form.contact_email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, contact_email: e.target.value }))
                }
                placeholder="you@company.com"
                maxLength={255}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Company</Label>
              <Input
                value={form.company_name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, company_name: e.target.value }))
                }
                placeholder="Company name"
                maxLength={200}
              />
            </div>
          </div>

          <Button type="submit" className="w-full gap-2" disabled={loading}>
            <Send className="h-4 w-4" />
            {loading ? "Submitting…" : "Submit Idea"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default IdeaSubmitForm;
