"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Sign in logic using using Firebase Authentication
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Sign up logic using using Firebase Authentication
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-black">
      {/* Header */}
      <header className="border-b-2 border-black">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <button
            onClick={() => router.push("/landingPage")}
            className="text-2xl md:text-3xl font-medium tracking-tight hover:text-[#17ae4f] transition-colors">
            BUDGET
          </button>
        </div>
      </header>

      {/* Auth Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="border-2 border-black p-8 md:p-12 bg-white">
            <h2 className="text-3xl md:text-4xl font-medium mb-8">
              {isSignUp ? "CREATE ACCOUNT" : "SIGN IN"}
            </h2>

            <form
              onSubmit={isSignUp ? handleSignUp : handleSignIn}
              className="space-y-6">
              {isSignUp && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-base font-medium mb-2">
                    NAME
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-2 border-black px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#17ae4f]"
                    required={isSignUp}
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-medium mb-2">
                  EMAIL
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-black px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#17ae4f]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-base font-medium mb-2">
                  PASSWORD
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-black px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#17ae4f]"
                  required
                />
              </div>

              {error && (
                <div className="bg-black text-white px-4 py-3 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#17ae4f] text-white px-6 py-4 font-medium hover:bg-black transition-colors disabled:opacity-50">
                {loading
                  ? "LOADING..."
                  : isSignUp
                    ? "CREATE ACCOUNT"
                    : "SIGN IN"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t-2 border-black">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError("");
                }}
                className="text-base hover:text-[#17ae4f] transition-colors">
                {isSignUp
                  ? "Already have an account? SIGN IN"
                  : "Don't have an account? CREATE ONE"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
