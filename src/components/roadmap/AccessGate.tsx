import { useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  onAccessGranted: () => void;
}

const AccessGate = ({ onAccessGranted }: Props) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        "verify-roadmap-access",
        { body: { code: code.trim() } },
      );

      if (fnError) throw fnError;

      if (data?.valid) {
        sessionStorage.setItem("roadmap_access", "granted");
        onAccessGranted();
      } else {
        setError("Invalid access code. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-lg text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Lock className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Private Preview</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your access code to view the product roadmap.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter access code"
              className="text-center"
              autoFocus
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full gap-2"
              disabled={!code.trim() || loading}
            >
              <ShieldCheck className="h-4 w-4" />
              {loading ? "Verifying…" : "Access Roadmap"}
            </Button>
          </form>

          <p className="mt-6 text-[11px] text-muted-foreground/60">
            Don't have a code? Contact your account manager.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccessGate;
