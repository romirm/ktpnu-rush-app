import { CheckIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

interface Step {
  id: string;
  name: string;
  href: string;
  status: "upcoming" | "current" | "complete";
  date: string;
  time: string;
}

const steps_default: Step[] = [
  { 
    id: "01", 
    name: "Networking Night", 
    href: "#", 
    status: "upcoming",
    date: "April 6th",
    time: "7:00 PM"
  },
  { 
    id: "02", 
    name: "Coffee Chats", 
    href: "#", 
    status: "upcoming",
    date: "April 7th",
    time: "Various Times"
  },
  { 
    id: "03", 
    name: "Social Night", 
    href: "#", 
    status: "upcoming",
    date: "April 8th",
    time: "Times TBD"
  },
  { 
    id: "04", 
    name: "Group Interviews", 
    href: "#", 
    status: "upcoming",
    date: "April 9th",
    time: "Times TBD"
  },
  { 
    id: "05", 
    name: "Individual Interviews", 
    href: "#", 
    status: "upcoming",
    date: "April 10th",
    time: "Various Times"
  },
];

export default function Steps(props: { stage: number }) {
  const [steps, setSteps] = useState(steps_default);
  
  useEffect(() => {
    var newSteps = [...steps];
    // Stage 0 is Application (not shown), so subtract 1 to get step index
    // Stage 1 = Networking (index 0), Stage 2 = Coffee (index 1)
    // Stage 3 = Social + Group (indices 2 AND 3 - both highlighted since no cuts between them)
    // Stage 4 = Individual (index 4)
    let stepIndex = props.stage - 1;
    
    for (var i = 0; i < newSteps.length; i++) {
      if (props.stage === 3) {
        // Stage 3 is Social + Group Interviews (both steps 2 and 3)
        if (i < 2) {
          newSteps[i].status = "complete";
        } else if (i === 2 || i === 3) {
          newSteps[i].status = "current";
        }
      } else if (props.stage === 4) {
        // Stage 4 is Individual Interviews (step 4)
        if (i < 4) {
          newSteps[i].status = "complete";
        } else if (i === 4) {
          newSteps[i].status = "current";
        }
      } else {
        // Stages 1-2 map directly
        if (i < stepIndex) {
          newSteps[i].status = "complete";
        } else if (i === stepIndex) {
          newSteps[i].status = "current";
        }
      }
    }
    setSteps(newSteps);
  }, [props.stage]);

  return (
    <nav aria-label="Progress" className="w-full">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
        {steps.map((step, stepIdx) => {
          // Skip Group Interviews (index 3) as it will be merged with Social Night (index 2)
          if (stepIdx === 3) return null;

          // Check if this is the merged Social + Group card
          const isMergedCard = stepIdx === 2;
          const groupInterviewStep = isMergedCard ? steps[3] : null;

          return (
            <div
              key={step.name}
              className={`relative overflow-hidden transition-all duration-300 ${
                isMergedCard
                  ? `lg:col-span-2 rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm hover:shadow-md ${
                      step.status === "current" ? "ring-2 ring-blue-600 shadow-lg" : ""
                    }`
                  : `rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm hover:shadow-md ${
                      step.status === "current" ? "ring-2 ring-blue-600 shadow-lg" : ""
                    }`
              }`}
            >
              {isMergedCard ? (
                <div className="relative z-10 p-6 sm:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-4">
                    <div className="lg:border-r lg:border-slate-200 lg:pr-4">
                      <div className="flex items-center justify-between mb-4">
                        {step.status === "complete" ? (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 shadow-md">
                            <CheckIcon className="h-7 w-7 text-white" aria-hidden="true" />
                          </div>
                        ) : step.status === "current" ? (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue-600 bg-slate-50">
                            <span className="text-lg font-bold text-blue-600">{step.id}</span>
                          </div>
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-300 bg-slate-50">
                            <span className="text-lg font-semibold text-slate-500">{step.id}</span>
                          </div>
                        )}
                        {step.status === "current" && (
                          <span className="inline-block px-3 py-1 text-xs font-bold text-blue-600 bg-blue-50 rounded-full uppercase tracking-wide">
                            Current
                          </span>
                        )}
                      </div>
                      <h3 className={`text-base sm:text-lg font-bold tracking-tight mb-3 transition-colors leading-tight whitespace-nowrap ${
                        step.status === "current" ? "text-blue-700" : "text-slate-800"
                      }`}>
                        {step.name}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <svg className="h-4 w-4 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                          </svg>
                          <p className={`text-sm font-semibold ${
                            step.status === "current" ? "text-slate-700" : "text-slate-600"
                          }`}>
                            {step.date}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <svg className="h-4 w-4 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className={`text-sm font-medium ${
                            step.status === "current" ? "text-slate-700" : "text-slate-600"
                          }`}>
                            {step.time}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="lg:pl-4 border-t lg:border-t-0 border-slate-200 pt-6 lg:pt-0">
                      <div className="flex items-center justify-between mb-4">
                        {groupInterviewStep.status === "complete" ? (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 shadow-md">
                            <CheckIcon className="h-7 w-7 text-white" aria-hidden="true" />
                          </div>
                        ) : groupInterviewStep.status === "current" ? (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue-600 bg-slate-50">
                            <span className="text-lg font-bold text-blue-600">{groupInterviewStep.id}</span>
                          </div>
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-300 bg-slate-50">
                            <span className="text-lg font-semibold text-slate-500">{groupInterviewStep.id}</span>
                          </div>
                        )}
                        {groupInterviewStep.status === "current" && (
                          <span className="inline-block px-3 py-1 text-xs font-bold text-blue-600 bg-blue-50 rounded-full uppercase tracking-wide">
                            Current
                          </span>
                        )}
                      </div>
                      <h3 className={`text-base sm:text-lg font-bold tracking-tight mb-3 transition-colors leading-tight whitespace-nowrap ${
                        groupInterviewStep.status === "current" ? "text-blue-700" : "text-slate-800"
                      }`}>
                        {groupInterviewStep.name}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <svg className="h-4 w-4 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                          </svg>
                          <p className={`text-sm font-semibold ${
                            groupInterviewStep.status === "current" ? "text-slate-700" : "text-slate-600"
                          }`}>
                            {groupInterviewStep.date}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <svg className="h-4 w-4 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className={`text-sm font-medium ${
                            groupInterviewStep.status === "current" ? "text-slate-700" : "text-slate-600"
                          }`}>
                            {groupInterviewStep.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {step.status === "complete" && (
                    <div className="mt-4 h-1 w-8 rounded-full bg-blue-600" />
                  )}
                </div>
              ) : (
                <div className="relative z-10 p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-4">
                    {step.status === "complete" ? (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 shadow-md">
                        <CheckIcon className="h-7 w-7 text-white" aria-hidden="true" />
                      </div>
                    ) : step.status === "current" ? (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue-600 bg-slate-50">
                        <span className="text-lg font-bold text-blue-600">{step.id}</span>
                      </div>
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-300 bg-slate-50">
                        <span className="text-lg font-semibold text-slate-500">{step.id}</span>
                      </div>
                    )}
                    {step.status === "current" && (
                      <span className="inline-block px-3 py-1 text-xs font-bold text-blue-600 bg-blue-50 rounded-full uppercase tracking-wide">
                        Current
                      </span>
                    )}
                  </div>
                  <h3 className={`text-base sm:text-lg font-bold tracking-tight mb-3 transition-colors leading-tight whitespace-nowrap ${
                    step.status === "current" ? "text-blue-700" : "text-slate-800 group-hover:text-slate-900"
                  }`}>
                    {step.name}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <svg className="h-4 w-4 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      <p className={`text-sm font-semibold ${
                        step.status === "current" ? "text-slate-700" : "text-slate-600"
                      }`}>
                        {step.date}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="h-4 w-4 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className={`text-sm font-medium ${
                        step.status === "current" ? "text-slate-700" : "text-slate-600"
                      }`}>
                        {step.time}
                      </p>
                    </div>
                  </div>
                  {step.status === "complete" && (
                    <div className="mt-4 h-1 w-8 rounded-full bg-blue-600" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
