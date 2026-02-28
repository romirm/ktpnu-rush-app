import TimeSelections from "@portal/TimeSelections";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "@framework/FirebaseContext";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function GroupInterviewContent(
  props: { userDBEntry: ProfileType },
) {
  const firebase = useContext(FirebaseContext).firebase;
  const [groupTimes, setGroupTimes]: [
    { time: string; i: number; j: number; location: string }[],
    any,
  ] = useState([]);
  const [socialTimes, setSocialTimes]: [
    { time: string; i: number; j: number; location: string }[],
    any,
  ] = useState([]);

  useEffect(() => {
    if (!props.userDBEntry) return;
    if (!props.userDBEntry.selected_gi_timeslot) {
      firebase
        .functions()
        .httpsCallable("getGITimes")({ type: "group" })
        .then((res: any) => {
          setGroupTimes(res.data);
        });
    }
    if (!props.userDBEntry.selected_social_timeslot) {
      firebase
        .functions()
        .httpsCallable("getGITimes")({ type: "social" })
        .then((res: any) => {
          setSocialTimes(res.data);
        });
    }
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
                    d="M18 18.72v-3.5m0 0a6 6 0 00-5.466-5.466m5.466 5.466A6 6 0 006 10.5m12 0v3.5M6 10.5a6 6 0 005.466 5.466m-5.466-5.466a6 6 0 0010.606 0"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              Congrats! You moved on to
            </h2>
            <h3 className="mt-3 text-5xl sm:text-6xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Social & Group Interviews
              </span>
            </h3>

            {(!props.userDBEntry?.selected_gi_timeslot ||
              !props.userDBEntry?.selected_social_timeslot) && (
              <div className="mt-8 space-y-6">
                <p className="text-base sm:text-lg leading-8 text-slate-700">
                  You'll participate in both a <strong>Social Night</strong> to meet KTP members and a <strong>Group Interview</strong> to showcase your collaboration skills on a technical problem.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="rounded-xl bg-blue-50 px-4 py-4 border border-blue-100">
                    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-1">
                      Social Night
                    </p>
                    <p className="text-lg font-bold text-slate-900">Tech F281</p>
                    <p className="text-xs text-slate-600 mt-1">Casual</p>
                  </div>
                  <div className="rounded-xl bg-blue-50 px-4 py-4 border border-blue-100">
                    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-1">
                      Group Interview
                    </p>
                    <p className="text-lg font-bold text-slate-900">Tech M345</p>
                    <p className="text-xs text-slate-600 mt-1">Bring Laptop</p>
                  </div>
                  <div className="rounded-xl bg-blue-50 px-4 py-4 border border-blue-100">
                    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-1">
                      Dress Code
                    </p>
                    <p className="text-lg font-bold text-slate-900">Business Casual</p>
                  </div>
                </div>

                <p className="text-lg font-semibold leading-8 text-slate-800">
                  Please select a timeslot for both events below.
                </p>
              </div>
            )}

            {(!props.userDBEntry?.selected_gi_timeslot ||
              !props.userDBEntry?.selected_social_timeslot) &&
              (Object.keys(groupTimes).length == 0 ||
                Object.keys(socialTimes).length == 0) && (
                <div className="mt-8 flex items-center justify-center gap-3">
                  <div className="animate-spin">
                    <ClockIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-lg font-medium text-blue-700">
                    Loading available timeslots...
                  </p>
                </div>
              )}

            {props.userDBEntry?.selected_gi_timeslot &&
              props.userDBEntry?.selected_social_timeslot && (
                <div className="mt-8 space-y-6">
                  <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 px-6 py-6 sm:px-8 sm:py-8">
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <CheckCircleIcon className="h-6 w-6 text-blue-600" />
                      <p className="text-lg font-bold text-blue-900">
                        Time Slots Confirmed
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-xl bg-white border border-blue-200 px-4 py-4">
                        <p className="text-sm font-semibold text-slate-600 uppercase mb-1">
                          Social Event
                        </p>
                        <p className="text-xl font-bold text-slate-900">
                          {props.userDBEntry.selected_social_timeslot}
                        </p>
                      </div>

                      <div className="rounded-xl bg-white border border-blue-200 px-4 py-4">
                        <p className="text-sm font-semibold text-slate-600 uppercase mb-1">
                          Group Interview
                        </p>
                        <p className="text-xl font-bold text-slate-900">
                          {props.userDBEntry.selected_gi_timeslot}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-blue-50 border border-blue-200 px-6 py-4">
                    <p className="text-sm font-semibold text-blue-700 uppercase mb-2">
                      Remember
                    </p>
                    <ul className="text-base leading-7 text-slate-700 space-y-2 text-left">
                      <li>✓ Bring a laptop to group interviews</li>
                      <li>✓ Dress in business casual attire</li>
                      <li>✓ Be ready to collaborate and have fun!</li>
                    </ul>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>

      <div className="py-6 px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.keys(socialTimes).length > 0 &&
              !props.userDBEntry?.selected_social_timeslot && (
                <TimeSelections
                  times={socialTimes}
                  userDBEntry={props.userDBEntry}
                  selectMethod={"social_interviews"}
                  name={"Social Interviews"}
                />
              )}
            {Object.keys(groupTimes).length > 0 &&
              !props.userDBEntry?.selected_gi_timeslot && (
                <TimeSelections
                  times={groupTimes}
                  userDBEntry={props.userDBEntry}
                  selectMethod={"group_interviews"}
                  name={"Group Interviews"}
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
