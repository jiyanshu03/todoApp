import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout.jsx";

function Boards() {
  const [boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const loadBoards = async () => {
    try {
      const res = await api.get("/boards");
      setBoards(res.data);
    } catch (err) {
      if (err.response?.status === 401) return;
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBoards();
  }, []);

  const createBoard = async (e) => {
    e?.preventDefault();
    const name = newBoardName.trim();
    if (!name) return;
    setSubmitting(true);
    try {
      await api.post("/boards", { name });
      setNewBoardName("");
      loadBoards();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout title="Todo App">
      <div className="space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">Your boards</h2>
          <form onSubmit={createBoard} className="flex gap-2 mb-6">
            <input
              type="text"
              value={newBoardName}
              onChange={e => setNewBoardName(e.target.value)}
              placeholder="New board name"
              className="input-field flex-1 max-w-xs"
              disabled={submitting}
            />
            <button
              type="submit"
              disabled={!newBoardName.trim() || submitting}
              className="btn-primary shrink-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {submitting ? "Adding…" : "Add board"}
            </button>
          </form>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 rounded-[var(--radius)] bg-[var(--color-surface-elevated)] border border-[var(--color-border)] animate-pulse" />
              ))}
            </div>
          ) : boards.length === 0 ? (
            <div className="rounded-[var(--radius)] border-2 border-dashed border-[var(--color-border)] bg-[var(--color-surface-elevated)]/50 p-12 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--color-primary-muted)] text-[var(--color-primary)] mb-4">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-10 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[var(--color-text)] mb-1">No boards yet</h3>
              <p className="text-sm text-[var(--color-text-muted)] max-w-sm mx-auto">
                Create your first board above to start organizing tasks.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {boards.map(b => (
                <button
                  key={b._id}
                  type="button"
                  onClick={() => navigate(`/boards/${b._id}`)}
                  className="group text-left p-5 rounded-[var(--radius)] bg-[var(--color-surface-elevated)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-colors"
                >
                  <span className="font-medium text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors block">
                    {b.name}
                  </span>
                  <span className="mt-2 flex items-center text-sm text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors">
                    Open board
                    <svg className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
}

export default Boards;
