"use client";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b-2 border-black">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-medium tracking-tight">
              BUDGET
            </h1>
            <button
              onClick={() => router.push("/authPage")}
              className="px-6 py-2 bg-black text-white font-medium hover:bg-[#17ae4f] transition-colors">
              SIGN IN
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 lg:px-8 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-medium mb-8 leading-tight">
            Simple.
            <br />
            Efficient.
            <br />
            <span className="text-[#17ae4f]">Budgeting.</span>
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl leading-relaxed">
            A minimalist approach to managing your finances. Track expenses, set
            budgets, and achieve your financial goals.
          </p>
          <button
            onClick={() => router.push("/authPage")}
            className="px-8 py-4 bg-[#17ae4f] text-white text-lg font-medium hover:bg-black transition-colors">
            GET STARTED
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="border-t-2 border-black bg-white">
        <div className="container mx-auto px-4 lg:px-8 py-16 md:py-24">
          <h3 className="text-3xl md:text-4xl font-medium mb-16">
            HOW IT WORKS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Step 1 */}
            <div className="border-2 border-black p-8">
              <div className="text-6xl font-medium text-[#17ae4f] mb-6">01</div>
              <h4 className="text-xl font-medium mb-4">CREATE CATEGORIES</h4>
              <p className="text-base leading-relaxed">
                Organize your spending into custom categories. Set monthly
                budgets for each category to stay on track.
              </p>
            </div>

            {/* Step 2 */}
            <div className="border-2 border-black p-8">
              <div className="text-6xl font-medium text-[#17ae4f] mb-6">02</div>
              <h4 className="text-xl font-medium mb-4">LOG EXPENSES</h4>
              <p className="text-base leading-relaxed">
                Quickly add expenses with a description and amount. See your
                spending in real-time as you go.
              </p>
            </div>

            {/* Step 3 */}
            <div className="border-2 border-black p-8">
              <div className="text-6xl font-medium text-[#17ae4f] mb-6">03</div>
              <h4 className="text-xl font-medium mb-4">TRACK PROGRESS</h4>
              <p className="text-base leading-relaxed">
                Monitor your budget with visual progress bars. Get insights into
                your spending habits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t-2 border-black bg-[#17ae4f] text-white">
        <div className="container mx-auto px-4 lg:px-8 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-medium mb-12">FEATURES</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4 border-b-2 border-white pb-6">
                <div className="text-2xl font-medium">—</div>
                <div>
                  <h4 className="text-xl font-medium mb-2">Dashboard View</h4>
                  <p className="text-base leading-relaxed">
                    Visual overview of all your budget categories with progress
                    indicators.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b-2 border-white pb-6">
                <div className="text-2xl font-medium">—</div>
                <div>
                  <h4 className="text-xl font-medium mb-2">
                    Detailed List View
                  </h4>
                  <p className="text-base leading-relaxed">
                    Comprehensive breakdown of every expense in each category.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b-2 border-white pb-6">
                <div className="text-2xl font-medium">—</div>
                <div>
                  <h4 className="text-xl font-medium mb-2">Quick Add</h4>
                  <p className="text-base leading-relaxed">
                    Floating action button for instant expense logging from
                    anywhere.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl font-medium">—</div>
                <div>
                  <h4 className="text-xl font-medium mb-2">
                    Mobile Responsive
                  </h4>
                  <p className="text-base leading-relaxed">
                    Fully optimized for mobile devices with touch-friendly
                    interface.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-black bg-white">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-base">© 2026 BUDGET. All rights reserved.</p>
            <button
              onClick={() => router.push("/authPage")}
              className="text-base font-medium hover:text-[#17ae4f] transition-colors">
              SIGN IN →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
