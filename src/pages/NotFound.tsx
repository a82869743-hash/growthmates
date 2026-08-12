import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-base text-fg-default font-body p-6">
      {/* Node Network Motif */}
      <div className="mb-6 relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full text-accent" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="12" fill="#E8622E" />
          <circle cx="20" cy="30" r="8" fill="#FFF1ED" stroke="#E8622E" strokeWidth="2" />
          <circle cx="80" cy="30" r="8" fill="#FFF1ED" stroke="#E8622E" strokeWidth="2" />
          <circle cx="25" cy="75" r="8" fill="#FFF1ED" stroke="#E8622E" strokeWidth="2" />
          <circle cx="75" cy="75" r="8" fill="#FFF1ED" stroke="#E8622E" strokeWidth="2" />
          <line x1="50" y1="50" x2="20" y2="30" stroke="#E8622E" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="50" y1="50" x2="80" y2="30" stroke="#E8622E" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="50" y1="50" x2="25" y2="75" stroke="#E8622E" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="50" y1="50" x2="75" y2="75" stroke="#E8622E" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
      </div>

      <div className="text-center max-w-md space-y-3">
        <span className="text-xs font-mono font-bold text-accent uppercase tracking-wider">
          404 ROUTE EXCEPTION
        </span>
        <h1 className="text-4xl font-extrabold font-display text-fg-default">
          Page Not Found
        </h1>
        <p className="text-sm text-fg-dim leading-relaxed">
          The requested page endpoint <code className="text-accent font-mono">{location.pathname}</code> does not exist or has been moved.
        </p>

        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-semibold text-white shadow-flat hover:bg-accent-deep transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
