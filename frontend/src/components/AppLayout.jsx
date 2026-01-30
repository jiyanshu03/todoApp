import { Link, useNavigate } from "react-router-dom";

export default function AppLayout({ children, title, showBack = false }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <header className="sticky top-0 z-10 bg-[var(--color-surface)]/80 backdrop-blur-xl border-b border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {showBack && (
              <Link
                to="/boards"
                className="shrink-0 flex items-center gap-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] font-medium text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Boards
              </Link>
            )}
            <Link
              to="/boards"
              className="font-semibold text-lg text-[var(--color-text)] truncate hover:text-[var(--color-primary)] transition-colors"
            >
              {title || "Todo App"}
            </Link>
          </div>
          <button
            type="button"
            onClick={logout}
            className="btn-secondary shrink-0 text-sm"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6">
        {children}
      </main>
    </div>
  );
}
