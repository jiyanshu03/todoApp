import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import AppLayout from "../components/AppLayout.jsx";

function TodoCard({ todo, onToggleDone, onDelete }) {
  const isDone = todo.status === "completed";
  return (
    <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-3">
      <p className={`text-sm break-words w-full mb-2 ${isDone ? "line-through text-[var(--color-text-muted)]" : "text-[var(--color-text)]"}`}>
        {todo.title}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onToggleDone(todo)}
          className="text-xs font-medium px-2.5 py-1 rounded border border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)] transition-colors"
        >
          {isDone ? "Undo" : "Done"}
        </button>
        <button
          type="button"
          onClick={e => onDelete(e, todo._id)}
          className="p-1 rounded text-[var(--color-text-muted)] hover:bg-red-500/15 hover:text-[var(--color-error)] transition-colors"
          title="Delete"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Todos() {
  const { boardId } = useParams();
  const [todos, setTodos] = useState([]);
  const [boardName, setBoardName] = useState("");
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadTodos = useCallback(async () => {
    const res = await api.get(`/todos/${boardId}`);
    setTodos(res.data);
  }, [boardId]);

  const loadBoardName = useCallback(async () => {
    try {
      const res = await api.get("/boards");
      const board = res.data.find(b => b._id === boardId);
      setBoardName(board?.name || "Board");
    } catch {
      setBoardName("Board");
    }
  }, [boardId]);

  useEffect(() => {
    if (boardId) {
      loadBoardName();
      loadTodos();
    }
  }, [boardId, loadTodos, loadBoardName]);

  const addTodo = async (e) => {
    e?.preventDefault();
    const title = newTodoTitle.trim();
    if (!title) return;
    setSubmitting(true);
    try {
      await api.post(`/todos/${boardId}`, { title });
      setNewTodoTitle("");
      loadTodos();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleDone = async (todo) => {
    const isDone = todo.status === "completed";
    try {
      await api.put(`/todos/${todo._id}`, { status: isDone ? "pending" : "completed" });
      loadTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (e, todoId) => {
    e.stopPropagation();
    if (!confirm("Delete this todo?")) return;
    try {
      await api.delete(`/todos/${todoId}`);
      loadTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const toDoList = todos.filter(t => t.status !== "completed");
  const doneList = todos.filter(t => t.status === "completed");

  return (
    <AppLayout title={boardName} showBack>
      <div className="space-y-6">
        <form onSubmit={addTodo} className="flex gap-2">
          <input
            type="text"
            value={newTodoTitle}
            onChange={e => setNewTodoTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="input-field flex-1 max-w-md"
            disabled={submitting}
          />
          <button
            type="submit"
            disabled={!newTodoTitle.trim() || submitting}
            className="btn-primary shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add todo
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4 min-h-[200px] flex flex-col">
            <h3 className="text-sm font-semibold text-[var(--color-text-muted)] mb-3 uppercase tracking-wide">To do</h3>
            <div className="space-y-2 flex-1">
              {toDoList.length === 0 ? (
                <p className="text-sm text-[var(--color-text-subtle)] italic py-2">Nothing here</p>
              ) : (
                toDoList.map(t => (
                  <TodoCard key={t._id} todo={t} onToggleDone={toggleDone} onDelete={deleteTodo} />
                ))
              )}
            </div>
          </div>
          <div className="rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4 min-h-[200px] flex flex-col">
            <h3 className="text-sm font-semibold text-[var(--color-text-muted)] mb-3 uppercase tracking-wide">Done</h3>
            <div className="space-y-2 flex-1">
              {doneList.length === 0 ? (
                <p className="text-sm text-[var(--color-text-subtle)] italic py-2">Nothing here</p>
              ) : (
                doneList.map(t => (
                  <TodoCard key={t._id} todo={t} onToggleDone={toggleDone} onDelete={deleteTodo} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default Todos;
