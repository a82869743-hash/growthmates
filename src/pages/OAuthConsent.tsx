import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ShieldCheck } from "lucide-react";

type AuthorizationDetails = {
  client?: { name?: string; client_uri?: string };
  redirect_uri?: string;
  scopes?: string[];
  redirect_url?: string;
  redirect_to?: string;
};

const oauth = (supabase.auth as any).oauth as {
  getAuthorizationDetails: (id: string) => Promise<{ data: AuthorizationDetails | null; error: any }>;
  approveAuthorization: (id: string) => Promise<{ data: { redirect_url?: string; redirect_to?: string } | null; error: any }>;
  denyAuthorization: (id: string) => Promise<{ data: { redirect_url?: string; redirect_to?: string } | null; error: any }>;
};

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Missing authorization_id");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/login?next=" + encodeURIComponent(next);
        return;
      }
      const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) {
        setError(error.message);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorizationId)
      : await oauth.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-bg-base text-fg-default font-body">
        <div className="max-w-md w-full rounded-md border border-border-subtle bg-bg-surface p-8 shadow-raised space-y-3">
          <h1 className="text-xl font-bold font-display text-signal-warm">Authorization Error</h1>
          <p className="text-xs text-fg-dim leading-relaxed">{error}</p>
        </div>
      </main>
    );
  }

  if (!details) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-bg-base text-fg-default font-body">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </main>
    );
  }

  const clientName = details.client?.name ?? "An application";

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-bg-base text-fg-default font-body">
      <div className="max-w-md w-full rounded-md border border-border-subtle bg-bg-surface p-8 shadow-floating space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-dim text-accent">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-display text-fg-default">
              Connect {clientName}
            </h1>
            <p className="text-xs text-fg-dim">OAuth Authorization Request</p>
          </div>
        </div>

        <p className="text-xs text-fg-dim leading-relaxed border-t border-b border-border-subtle py-4">
          {clientName} will be granted permission to invoke GrowthMates.ai tools while you are signed in.
          This does not bypass GrowthMates.ai access policies or backend security.
        </p>

        {details.scopes && details.scopes.length > 0 && (
          <div className="space-y-2 font-mono text-xs">
            <p className="font-semibold text-fg-default">Requested Permissions:</p>
            <ul className="text-fg-dim list-disc pl-5 space-y-1">
              {details.scopes.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            disabled={busy}
            onClick={() => decide(true)}
            className="flex-1 rounded-full bg-accent px-5 py-2.5 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-50 shadow-flat"
          >
            Approve Connection
          </button>
          <button
            disabled={busy}
            onClick={() => decide(false)}
            className="flex-1 rounded-full bg-bg-muted border border-border-subtle px-5 py-2.5 text-xs font-semibold text-fg-default hover:bg-bg-surface disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </main>
  );
}
