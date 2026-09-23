import { useState, type SubmitEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../app/providers/AuthProvider";
import PrimaryButton from "../components/ui/PrimaryButton";
import { ROUTES } from "../constants/routes";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] =
    useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!email.trim()) {
      return "Please enter your email.";
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      return "Please enter a valid email address.";
    }

    if (!password) {
      return "Please enter your password.";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters.";
    }

    if (!confirmPassword) {
      return "Please confirm your password.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    if (!firstName.trim()) {
      return "Please enter your first name.";
    }

    if (!lastName.trim()) {
      return "Please enter your last name.";
    }

    return null;
  };

  const handleSubmit = async (
    event: SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      setSuccessMessage(null);
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);

      await register({
        email: email.trim(),
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });

      setSuccessMessage(
        "Account created successfully. Please log in.",
      );

      setTimeout(() => {
        navigate(ROUTES.login, {
          replace: true,
        });
      }, 900);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to register user.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Create account
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Create your account to start the SRI course.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-8 space-y-5"
        >
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Email <span className="text-red-500" aria-hidden="true">*</span>
            </label>

            <input
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              type="email"
              autoComplete="email"
              required
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Password <span className="text-red-500" aria-hidden="true">*</span>
            </label>

            <div className="relative mt-2">
              <input
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={8}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 text-sm outline-none focus:border-blue-400"
                placeholder="Enter your password"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (current) => !current,
                  )
                }
                className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 hover:text-slate-600"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              At least 8 characters.
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Confirm password <span className="text-red-500" aria-hidden="true">*</span>
            </label>

            <div className="relative mt-2">
              <input
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value,
                  )
                }
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                autoComplete="new-password"
                required
                minLength={8}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 text-sm outline-none focus:border-blue-400"
                placeholder="Confirm your password"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (current) => !current,
                  )
                }
                className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 hover:text-slate-600"
                aria-label={
                  showConfirmPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              First name <span className="text-red-500" aria-hidden="true">*</span>
            </label>

            <input
              value={firstName}
              onChange={(event) =>
                setFirstName(event.target.value)
              }
              autoComplete="given-name"
              required
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Last name <span className="text-red-500" aria-hidden="true">*</span>
            </label>

            <input
              value={lastName}
              onChange={(event) =>
                setLastName(event.target.value)
              }
              autoComplete="family-name"
              required
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
              placeholder="Enter your last name"
            />
          </div>

          {error ? (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          ) : null}

          {successMessage ? (
            <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {successMessage}
            </p>
          ) : null}

          <PrimaryButton
            type="submit"
            disabled={isSubmitting}
            className="w-full justify-center"
          >
            {isSubmitting
              ? "Creating account..."
              : "Sign up"}
          </PrimaryButton>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to={ROUTES.login}
            className="font-semibold text-blue-600"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;