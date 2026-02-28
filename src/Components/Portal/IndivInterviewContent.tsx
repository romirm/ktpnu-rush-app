import TimeSelections from "@portal/TimeSelections";
import { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "@framework/FirebaseContext";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";
import Swal from 'sweetalert2';

export default function IndivInterviewContent(props:{userDBEntry:ProfileType}) {
  const firebase = useContext(FirebaseContext).firebase;
  const [times, setTimes]: [{time:string, i:number,j:number,location:string}[], any] = useState([]);
  
  useEffect(() => {
    if(!props.userDBEntry) return;
    if(props.userDBEntry.selected_indiv_timeslot) return;
    firebase
      .functions()
      .httpsCallable("getIndivTimes")({cs: props.userDBEntry.cs})
      .then((res: any) => {
        setTimes(res.data);
        if(res.data.length==0) {
          Swal.fire({icon:'error',title:'No more available timeslots',text:'Please contact Romir (786-637-3059) to let him know. Thank you!'})
        }
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
                    d="M12 8.25v7.5m0 0l-3-3m3 3l3-3M3.375 9a6.375 6.375 0 1112.75 0v.375c0 .621-.504 1.125-1.125 1.125H4.5A1.125 1.125 0 013.375 9.375V9z"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              Congrats! You moved on to{" "}
              <div className="mt-3">
                <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent text-5xl sm:text-6xl font-extrabold tracking-tight">
                  Individual Interviews
                </span>
              </div>
            </h2>

            {!props.userDBEntry?.selected_indiv_timeslot && (
              <div className="mt-8 space-y-6">
                <p className="text-base sm:text-lg leading-8 text-slate-700">
                  The individual interviews are the <strong>final round</strong> in the KTP rush process. This is your chance to have a focused one-on-one conversation with our leadership team.
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
                    <p className="text-lg font-bold text-slate-900">60 Minutes</p>
                  </div>
                  <div className="rounded-xl bg-blue-50 px-4 py-4 border border-blue-100">
                    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-1">
                      Dress Code
                    </p>
                    <p className="text-lg font-bold text-slate-900">Business Casual</p>
                  </div>
                </div>

                <p className="text-lg font-semibold leading-8 text-slate-800">
                  Please select a timeslot for your final interview below.
                </p>
              </div>
            )}

            {!props.userDBEntry?.selected_indiv_timeslot &&
              Object.keys(times).length == 0 && (
                <div className="mt-8 flex items-center justify-center gap-3">
                  <div className="animate-spin">
                    <ClockIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-lg font-medium text-blue-700">
                    Loading available timeslots...
                  </p>
                </div>
              )}

            {props.userDBEntry?.selected_indiv_timeslot && (
              <div className="mt-8 space-y-6">
                <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 px-6 py-6 sm:px-8 sm:py-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <CheckCircleIcon className="h-6 w-6 text-blue-600" />
                    <p className="text-lg font-bold text-blue-900">Time Slot Confirmed</p>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 my-2">
                    {props.userDBEntry.selected_indiv_timeslot}
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 border border-blue-200 px-6 py-4">
                  <p className="text-sm font-semibold text-blue-700 uppercase mb-2">Final Reminders</p>
                  <ul className="text-base leading-7 text-slate-700 space-y-2 text-left">
                    <li>✓ Arrive 5 minutes early</li>
                    <li>✓ Bring a copy of your resume</li>
                    <li>✓ Be prepared to discuss your passion for tech and KTP</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {Object.keys(times).length > 0 &&
        !props.userDBEntry?.selected_indiv_timeslot && (
          <TimeSelections 
            times={times} 
            userDBEntry={props.userDBEntry} 
            selectMethod={"indiv_interviews"} 
            name={"Individual Interviews"}
          />
        )}
    </div>
  );
}
