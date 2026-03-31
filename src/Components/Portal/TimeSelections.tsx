import { FirebaseContext } from "@framework/FirebaseContext";
import { useContext } from "react";
import Swal from "sweetalert2";
export default function TimeSelections(props: {
  times: { time: string; location: string; i: number; j: number }[];
  userDBEntry: ProfileType;
  selectMethod: string;
  name: string;
}) {
  const firebase = useContext(FirebaseContext).firebase;

  function handleReservationResult(res: any) {
    if (res.data) {
      window.location.reload();
    } else {
      Swal.fire({
        icon: "error",
        text:
          "This time slot is no longer available. Please refresh the page and try again.",
      }).then(() => {
        window.location.reload();
      });
    }
  }

  function handleReservationError(err: any) {
    const errorMessage =
      err?.message ||
      "We could not reserve your timeslot. Please try again. If this continues, contact help@ktpnu.com.";
    Swal.fire({
      icon: "error",
      title: "Unable to reserve timeslot",
      text: errorMessage,
    });
  }

  return (
    <div className="flex justify-center">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flow-root">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th></th>
                      <th
                        scope="col"
                        className="py-3.5 font-semibold text-gray-900 text-center"
                      >
                        {props.name}
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-10 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Time
                      </th>
                      <th
                        scope="col"
                        className="px-10 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="px-10 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {props.times.map((time) => (
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-10 text-sm font-medium text-gray-900 sm:pl-6">
                          {time.time}
                        </td>
                        <td className="whitespace-nowrap px-10 py-4 text-sm text-gray-500">
                          {time.location}
                        </td>
                        <td className="whitespace-nowrap px-10 py-4 text-sm text-gray-500">
                          <button
                            type="button"
                            onClick={() => {
                              const coffeeOptions: any = {
                                icon: "info",
                                title:
                                  "Are you sure you want to select this time slot?",
                                text:
                                  "You will not be able to change this time slot after you select it. Enter your phone number to confirm your selection.",
                                input: "text",
                                showCancelButton: true,
                              };
                              const indivOptions: any = {
                                icon: "info",
                                title:
                                  "Are you sure you want to select this time slot?",
                                text:
                                  "You will not be able to change this time slot after you select it. Enter your phone number to confirm your selection.",
                                input: "text",
                                showCancelButton: true,
                              };
                              const groupOptions: any = {
                                icon: "info",
                                title:
                                  "Are you sure you want to select this time slot?",
                                text:
                                  "You will not be able to change this time slot after you select it.",
                                showCancelButton: true,
                              };
                              const needsPhone =
                                props.selectMethod === "coffee_chats" ||
                                props.selectMethod === "indiv_interviews";
                              Swal.fire(
                                props.selectMethod === "coffee_chats"
                                  ? coffeeOptions
                                  : props.selectMethod === "indiv_interviews"
                                  ? indivOptions
                                  : groupOptions
                              ).then((res) => {
                                if (res.isConfirmed) {
                                  if (
                                    needsPhone &&
                                    (!res.value || res.value.trim().length === 0)
                                  ) {
                                    Swal.fire({
                                      icon: "error",
                                      text: "Please enter a phone number to continue.",
                                    });
                                    return;
                                  }
                                  Swal.fire({
                                    icon: "info",
                                    text:
                                      "Please wait while your timeslot is reserved...",
                                    allowOutsideClick: false,
                                    allowEscapeKey: false,
                                    allowEnterKey: false,
                                  });
                                  Swal.showLoading();
                                  if (props.selectMethod === "coffee_chats") {
                                    firebase
                                      .functions()
                                      .httpsCallable("reserveCCTime")({
                                        i: time.i,
                                        name: props.userDBEntry.fullName,
                                        phone: res.value,
                                      })
                                      .then(handleReservationResult)
                                      .catch(handleReservationError);
                                  } else if (
                                    props.selectMethod === "group_interviews"
                                  ) {
                                    firebase
                                      .functions()
                                      .httpsCallable("reserveGITime")({
                                        i: time.i,
                                        name: props.userDBEntry.fullName,
                                          type:"group"
                                      })
                                      .then(handleReservationResult)
                                      .catch(handleReservationError);
                                  } else if (
                                    props.selectMethod === "social_interviews"
                                  ) {
                                    firebase
                                      .functions()
                                      .httpsCallable("reserveGITime")({
                                        i: time.i,
                                        name: props.userDBEntry.fullName,
                                          type:"social"
                                      })
                                      .then(handleReservationResult)
                                      .catch(handleReservationError);
                                  } else {
                                    firebase
                                      .functions()
                                      .httpsCallable("reserveIndivTime")({
                                        i: time.i,
                                        j: time.j,
                                        name: props.userDBEntry.fullName,
                                        phone: res.value,
                                      })
                                      .then(handleReservationResult)
                                      .catch(handleReservationError);
                                  }
                                }
                              });
                            }}
                            className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Select Time
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
