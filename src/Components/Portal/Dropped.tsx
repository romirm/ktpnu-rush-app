export default function Dropped() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-10 px-6 sm:pt-12 sm:pb-8 lg:px-8 flex items-center">
      <div className="mx-auto max-w-3xl w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-200">
            <svg
              className="h-8 w-8 text-slate-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.06 4.343l.953 3.57a2 2 0 0 0 1.946 1.447h3.768c.98 0 1.467 1.255.728 1.972l-3.04 2.541a2 2 0 0 0-.724 2.447l.953 3.57c.292 1.093-.68 2.006-1.657 1.472L12 16.79l-3.028 2.272c-.977.534-1.949-.379-1.657-1.472l.953-3.57a2 2 0 0 0-.724-2.447l-3.04-2.541c-.74-.717-.252-1.972.728-1.972h3.768a2 2 0 0 0 1.946-1.447l.953-3.57c.292-1.093 1.794-1.093 2.086 0z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Thank You for Your Interest
        </h2>

        <div className="mt-8 space-y-6 text-left">
          <div className="rounded-2xl bg-white border border-slate-200 px-6 py-6 sm:px-8 sm:py-8 shadow-sm ring-1 ring-slate-100">
            <p className="text-lg leading-8 text-slate-700">
              Thank you for your interest in KTP. We appreciate your enthusiasm and dedication through the rush process. Unfortunately, we are unable to accept you into the next round at this time.
            </p>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 px-6 py-6 sm:px-8 sm:py-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Don't Give Up</h3>
            <p className="text-base leading-7 text-slate-700 mb-4">
              We encourage you to work on your "elevator pitch" and reapply during the next rush cycle in the spring! This is not where your story ends—it's just the beginning.
            </p>
            <p className="text-sm text-slate-600">
              In the meantime, get more involved in tech clubs and communities, work on your technical skills, and connect with more people at Northwestern. We'd love to see what you accomplish!
            </p>
          </div>

          <div className="rounded-2xl bg-slate-100 border border-slate-300 px-6 py-6 sm:px-8 sm:py-8">
            <p className="text-base font-semibold text-slate-800 mb-3">
              Want Feedback?
            </p>
            <p className="text-slate-700 mb-4">
              If you'd like specific feedback on your performance, please fill out the form below and we'll get back to you when we have the bandwidth:
            </p>
            <a
              className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfmNG3iS2jciW7Hv3NmwdMv8TrKpTt-1fZa2B6LA3OM2VaTLA/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
            >
              Request Feedback →
            </a>
          </div>
        </div>

        <p className="mt-12 text-slate-600">
          Good luck on your endeavors, and we hope to see you reapply next cycle! 🚀
        </p>
      </div>
    </div>
  );
}
