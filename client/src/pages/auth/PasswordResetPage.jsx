import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function PasswordResetPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("Please enter a new password");
      return;
    }

    setLoading(true);
    const response = await fetch(
      `http://localhost:3000/auth/reset-password/${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setLoading(false);
    }
    if (response.ok) {
      navigate("/signin");
    }
  };

  return (
    <>
      <div className="h-screen bg-slate-300 flex justify-center items-center">
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-semibold leading-tight tracking-tight md:text-2xl text-white">
              Reset Your Password
            </h1>
            {error && (
              <div className="bg-red-500 text-white border rounded-md border-white font-semibold text-center py-1">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Enter New Password
                </label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className=" border sm:text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-fuchsia-500 focus:border-fuchsia-500"
                  required=""
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center items-center font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center bg-fuchsia-600 hover:bg-fuchsia-700 focus:ring-fuchsia-800"
              >
                {loading ? (
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-loader-circle animate-spin"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                  </span>
                ) : (
                  <span>Reset</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
