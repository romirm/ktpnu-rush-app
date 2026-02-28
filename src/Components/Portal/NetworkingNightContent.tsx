export default function NetworkingNightContent() {
  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-slate-50 to-blue-50 py-10 px-6 sm:pt-12 sm:pb-8 lg:px-8 flex items-center">
      <div className="mx-auto max-w-4xl w-full">
        <div className="rounded-3xl border border-blue-200 bg-white px-8 py-12 sm:px-10 sm:py-16 text-center shadow-lg ring-1 ring-blue-100">
          {/* Header Icon */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-50 ring-2 ring-blue-200">
              <svg
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Join us for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Networking Night
            </span>
          </h2>

          <div className="mt-8 space-y-6">
            <p className="text-lg leading-8 text-slate-700">
              Our first rush event is an exciting opportunity to connect with KTP members and experience our community firsthand. Get ready for engaging conversations and memorable moments!
            </p>

            {/* Event Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="rounded-xl bg-blue-50 px-4 py-4 border border-blue-100">
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-1">
                  Time
                </p>
                <p className="text-lg font-bold text-slate-900">7:00 PM</p>
              </div>
              <div className="rounded-xl bg-blue-50 px-4 py-4 border border-blue-100">
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-1">
                  Location
                </p>
                <p className="text-lg font-bold text-slate-900">Tech LR2</p>
              </div>
              <div className="rounded-xl bg-blue-50 px-4 py-4 border border-blue-100">
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-1">
                  Dress Code
                </p>
                <p className="text-lg font-bold text-slate-900">Business Casual</p>
              </div>
            </div>

            <p className="text-base leading-7 text-slate-600 pt-4">
              You'll have the opportunity to meet many KTP members, learn more about our organization, and hopefully move on to the next round. This is your chance to make a great first impression!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
