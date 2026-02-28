import TimeSelections from "@portal/TimeSelections";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "@framework/FirebaseContext";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

export default function CoffeeChatContent(props: { userDBEntry: ProfileType }) {
  const firebase = useContext(FirebaseContext).firebase;
  const [times, setTimes]: [
    {
      time: string;
      location: string;
      date: string;
      i: number;
      j: number;
    }[],
    any,
  ] = useState([]);

  if (window.innerWidth < 660) {
    Swal.fire({
      icon: "warning",
      title: "Please use a non-mobile device to select your coffee chat times.",
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    });
  }

  useEffect(() => {
    if (window.innerWidth < 660) return;
    if (!props.userDBEntry) return;
    if (props.userDBEntry.selected_cc_timeslot) return;
    firebase
      .functions()
      .httpsCallable("getCCTimes")()
      .then((res: any) => {
        setTimes(res.data);
      });
  }, [props.userDBEntry]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="py-10 px-6 sm:pt-12 sm:pb-8 lg:px-8">
        <div className="mx-auto max-w-4xl">
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
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5H4.5A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5z"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              Congrats! You moved on to
            </h2>
            <h3 className="mt-3 text-5xl sm:text-6xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Coffee Chats
              </span>
            </h3>

            {!props.userDBEntry?.selected_cc_timeslot && (
              <div className="mt-8 space-y-6">
                <p className="text-base sm:text-lg leading-8 text-slate-700">
                  The coffee chats are meant to be a <strong>casual and relaxed two-way conversation</strong> (20 minutes) for us to get to know you better, and for you to get to know us! This is an informal chance to connect with our members.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="rounded-xl bg-blue-50 px-4 py-4 border border-blue-100">
                    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-1">
                      Format
                    </p>
                    <p className="text-lg font-bold text-slate-900">One-on-One</p>
                  </div>
                  <div className="rounded-xl bg-blue-50 px-4 py-4 border border-blue-100">
                    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-1">
                      Duration
                    </p>
                    <p className="text-lg font-bold text-slate-900">20 Minutes</p>
                  </div>
                  <div className="rounded-xl bg-blue-50 px-4 py-4 border border-blue-100">
                    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-1">
                      Dress Code
                    </p>
                    <p className="text-lg font-bold text-slate-900">Casual</p>
                  </div>
                </div>

                <p className="text-lg font-semibold leading-8 text-slate-800">
                  Please select a timeslot for your coffee chat below.
                </p>
              </div>
            )}

            {!props.userDBEntry?.selected_cc_timeslot &&
              Object.keys(times).length == 0 && (
                <div className="mt-8 flex items-center justify-center gap-3">
                  <div className="animate-spin">
                    <ClockIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-lg font-medium text-amber-700">
                    Loading available timeslots...
                  </p>
                </div>
              )}

            {props.userDBEntry?.selected_cc_timeslot && (
              <div className="mt-8 space-y-6">
                <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 px-6 py-6 sm:px-8 sm:py-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <CheckCircleIcon className="h-6 w-6 text-green-600" />
                    <p className="text-lg font-bold text-green-900">Time Slot Confirmed</p>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 my-2">
                    {props.userDBEntry.selected_cc_timeslot}
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 border border-blue-200 px-6 py-4">
                  <p className="text-sm font-semibold text-blue-700 uppercase mb-2">Important</p>
                  <p className="text-base leading-7 text-slate-700">
                    If you cannot find your interviewer, reach out via phone. If you absolutely must reschedule, text your interviewer as soon as possible.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {Object.keys(times).length > 0 &&
        !props.userDBEntry?.selected_cc_timeslot && (
          <TimeSelections
            times={times}
            userDBEntry={props.userDBEntry}
            selectMethod={"coffee_chats"}
            name="Coffee Chat times"
          />
        )}
    </div>
  );
}
