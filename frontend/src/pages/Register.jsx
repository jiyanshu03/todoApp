import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const submit = async e => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/register", {
        email: e.target.email.value,
        password: e.target.password.value
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[var(--color-bg)]">
      <div className="w-full max-w-sm">
        <div className="auth-card p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[var(--color-text)]">Create account</h1>
            <p className="text-[var(--color-text-muted)] text-sm mt-1">Get started with your boards and todos</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-[var(--radius-sm)] bg-[var(--color-error-bg)] text-[var(--color-error)] text-sm text-center border border-red-500/20">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text-muted)] mb-1.5">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="input-field"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--color-text-muted)] mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="At least 6 characters"
                required
                className="input-field"
                autoComplete="new-password"
              />
            </div>
            <button type="submit" className="w-full btn-primary py-3 text-base">
              Create account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
