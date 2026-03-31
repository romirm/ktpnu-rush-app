import { useContext, useEffect, useRef, useState } from "react";
import { FirebaseContext } from "@framework/FirebaseContext";
import { ref, update } from "firebase/database";
import { getDownloadURL, ref as sRef, uploadBytes } from "firebase/storage";
import Swal from "sweetalert2";
import FailureNotif from "@portal/FailureNotif";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Application(props: {
  user: any;
  userEntry: ProfileType;
  readonly: boolean;
}) {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const hometownRef = useRef(null);
  const genderRef = useRef(null);
  const gradeRef = useRef(null);
  const majorRef = useRef(null);
  const gpaRef = useRef(null);
  const linkedinRef = useRef(null);
  const techInterestRef = useRef(null);
  const scientificBreakthroughRef = useRef(null);
  const brandCompanyRef = useRef(null);
  const passionRef = useRef(null);
  const funFactRef = useRef(null);
  const whyKTPRef = useRef(null);
  const resumeRef = useRef(null);
  const pfpRef = useRef(null);
  const pfpImgRef = useRef(null);

  const database = useContext(FirebaseContext).database;
  const storage = useContext(FirebaseContext).storage;

  const [showFailureNotif, setFailureNotif] = useState(false);
  const [resumeAdded, setResumeAdded] = useState(false);
  const [pfpAdded, setPfpAdded] = useState(false);
  useEffect(() => {
    if (props.user) {
      emailRef.current.value = props.user.email;
    }
  }, [props.user]);

  useEffect(() => {
    if (new Date() > new Date(2026, 11, 31, 0) && !props.readonly) {
      Swal.fire({
        icon: "error",
        title: "Applications are closed!",
        text: "Applications for Spring 2026 are closed.",
      }).then(() => {
        window.location.href = "https://ktpnu.com";
      });
    }
  }, [props.readonly]);

  useEffect(() => {
    if (props.userEntry.fullName) {
      nameRef.current.value = props.userEntry.fullName || "";
      hometownRef.current.value = props.userEntry.hometown || "";
      genderRef.current.value = props.userEntry.gender || "Female";
      gradeRef.current.value = props.userEntry.grade || "Freshman";
      majorRef.current.value = props.userEntry.major || "";
      gpaRef.current.value = props.userEntry.gpa || "";
      linkedinRef.current.value = props.userEntry.linkedinURL || "";
      techInterestRef.current.value = props.userEntry.techInterest || "";
      whyKTPRef.current.value = props.userEntry.whyKTP || "";
      scientificBreakthroughRef.current.value =
        props.userEntry.scientificBreakthrough || "";
      brandCompanyRef.current.value = props.userEntry.brandCompany || "";
      passionRef.current.value = props.userEntry.passion || "";
      funFactRef.current.value = props.userEntry.funFact || "";
      if (props.userEntry.PfpURL) {
        pfpImgRef.current.src = props.userEntry.PfpURL;
      }
    }
  }, [props.userEntry]);

  function removeRedIfApplicable(ref: React.MutableRefObject<any>) {
    while (ref.current.classList.contains("bg-red-100")) {
      ref.current.classList.remove("bg-red-100");
    }
  }

  async function completeSubmission() {
    var skip = false;
    var ps: ProfileType = {
      fullName: "",
      hometown: "",
      gender: "",
      grade: "",
      major: "",
      gpa: "",
      linkedinURL: "",
      techInterest: "",
      whyKTP: "",
      scientificBreakthrough: "",
      brandCompany: "",
      passion: "",
      funFact: "",
      completed_application: true,
    };
    ps.fullName = nameRef.current.value;
    ps.hometown = hometownRef.current.value;
    ps.gender = genderRef.current.value;
    ps.grade = gradeRef.current.value;
    ps.major = majorRef.current.value;
    ps.gpa = gpaRef.current.value;
    ps.linkedinURL = linkedinRef.current.value;
    ps.techInterest = techInterestRef.current.value;
    ps.whyKTP = whyKTPRef.current.value;
    ps.scientificBreakthrough = scientificBreakthroughRef.current.value;
    ps.brandCompany = brandCompanyRef.current.value;
    ps.passion = passionRef.current.value;
    ps.funFact = funFactRef.current.value;
    if (!emailRef.current.value) {
      emailRef.current.classList.add("bg-red-100");
      skip = true;
      Swal.fire({
        icon: "error",
        text: "An email address is required to submit your application.",
      });
    }
    if (!ps.fullName) {
      nameRef.current.classList.add("bg-red-100");
      skip = true;
    }
    if (!ps.hometown) {
      hometownRef.current.classList.add("bg-red-100");
      skip = true;
    }
    if (!ps.major) {
      majorRef.current.classList.add("bg-red-100");
      skip = true;
    }
    if (!ps.grade) {
      gradeRef.current.classList.add("bg-red-100");
      skip = true;
    }
    if (!ps.gpa || isNaN(parseFloat(ps.gpa)) || parseFloat(ps.gpa) > 4.0) {
      if (ps.gpa && !isNaN(parseFloat(ps.gpa)) && parseFloat(ps.gpa) > 4.0) {
        Swal.fire({
          icon: "info",
          text: "We know you're smart, but your GPA can't be higher than 4.0!",
        });
      }
      gpaRef.current.value = "";
      gpaRef.current.classList.add("bg-red-100");
      skip = true;
    }
    if (!ps.linkedinURL) {
      linkedinRef.current.classList.add("bg-red-100");
      skip = true;
    }
    if (!ps.techInterest) {
      techInterestRef.current.classList.add("bg-red-100");
      skip = true;
    }
    if (ps.techInterest && ps.techInterest.trim().split(/\s+/).length > 100) {
      techInterestRef.current.classList.add("bg-red-100");
      skip = true;
      Swal.fire({
        icon: "error",
        text:
          "We appreciate the enthusiasm, but your tech interests can't be more than 100 words!",
      });
    }
    if (!ps.whyKTP) {
      whyKTPRef.current.classList.add("bg-red-100");
      skip = true;
    }
    if (!ps.scientificBreakthrough) {
      scientificBreakthroughRef.current.classList.add("bg-red-100");
      skip = true;
    }
    if (!ps.brandCompany) {
      brandCompanyRef.current.classList.add("bg-red-100");
      skip = true;
    }
    if (!ps.passion) {
      passionRef.current.classList.add("bg-red-100");
      skip = true;
    }
    if (!ps.funFact) {
      funFactRef.current.classList.add("bg-red-100");
      skip = true;
    }
    if (ps.whyKTP && ps.whyKTP.trim().split(/\s+/).length > 250) {
      whyKTPRef.current.classList.add("bg-red-100");
      skip = true;
      Swal.fire({
        icon: "error",
        text:
          "We appreciate the enthusiasm, but your 'Why KTP?' can't be more than 250 words!",
      });
    }
    if (!resumeAdded) {
      resumeRef.current.classList.add("bg-red-100");
      skip = true;
    }
    if (!pfpAdded) {
      pfpRef.current.classList.add("bg-red-100");
      skip = true;
    }
    if (!skip) {
      Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text:
          "Once you submit, you will not be able to edit your application. You can submit any time before the deadline.",
        showCancelButton: true,
        confirmButtonText: "Yes, I'm ready!",
      }).then(async (res) => {
        if (res.isConfirmed) {
          await update(ref(database, "rush_users/" + props.user.uid), ps);
          Swal.fire({
            icon: "success",
            title: "Rush Application Submitted!",
            text: "Processing profile...",
            timer: 1500,
            timerProgressBar: true,
          }).then(() => {
            window.location.reload();
          }).catch(() => {
            Swal.fire({
              icon: "error",
              title: "Error submitting application",
              text: "Please email help@ktpnu.com if this issue persists.",
            }).then(() => {
              window.location.reload();
            });
          });
        }
      });
    } else {
      //forces update
      await setFailureNotif(false);
      setFailureNotif(true);
    }
  }

  async function saveResponses() {
    if (!props.user?.uid) {
      return;
    }

    const formData = {
      fullName: nameRef.current.value,
      hometown: hometownRef.current.value,
      gender: genderRef.current.value,
      grade: gradeRef.current.value,
      major: majorRef.current.value,
      gpa: gpaRef.current.value,
      linkedinURL: linkedinRef.current.value,
      techInterest: techInterestRef.current.value,
      whyKTP: whyKTPRef.current.value,
      scientificBreakthrough: scientificBreakthroughRef.current.value,
      brandCompany: brandCompanyRef.current.value,
      passion: passionRef.current.value,
      funFact: funFactRef.current.value,
    };

    try {
      await update(ref(database, "rush_users/" + props.user.uid), formData);
      Swal.fire({
        icon: "success",
        title: "Responses Saved!",
        text: "Your application responses have been saved. You can come back to finish anytime.",
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error saving responses",
        text: "Please try again. If this continues, email help@ktpnu.com.",
      });
    }
  }
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {!props.readonly && (
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="md:col-span-3">
                    <h1 className="text-lg font-bold text-blue-900">
                      Welcome to KTP's Spring 2026 Rush Application!
                    </h1>
                    <p className="mt-3 text-sm text-gray-700">
                      We are Northwestern's premiere pre-professional technical fraternity and offer the best opportunities for students pursuing tech careers. We look forward to getting to know you and potentially welcoming you to our organization.
                    </p>
                    <p className="mt-4 text-sm font-medium text-blue-700">
                      Complete the application below to proceed through our rush process. Contact help@ktpnu.com with any questions.
                    </p>
                    <p className="mt-3 text-xs text-gray-600"><span className="text-red-600 font-semibold">*</span> indicates required fields</p>
                  </div>
                </div>
              </div>
            )}

            {/* Personal Information */}
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-base font-bold leading-6 text-blue-900">
                    Personal Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Details to help us understand your background and interests,
                    as well as identify you during deliberations.
                  </p>
                </div>
                <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="full-name"
                        id="full-name"
                        autoComplete="given-name"
                        ref={nameRef}
                        readOnly={props.readonly}
                        onChange={() => {
                          removeRedIfApplicable(nameRef);
                        }}
                        className={classNames(
                          props.readonly ? "bg-gray-100" : "",
                          "mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                        )}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address <span className="text-red-600">*</span>
                      </label>
                      <input
                        readOnly={true}
                        type="text"
                        name="email-address"
                        id="email-address"
                        ref={emailRef}
                        className={classNames(
                          props.readonly ? "bg-gray-100" : "",
                          "mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 placeholder:text-gray-400 sm:text-sm sm:leading-6",
                        )}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="hometown"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Hometown <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="hometown"
                        id="hometown"
                        readOnly={props.readonly}
                        ref={hometownRef}
                        onChange={() => {
                          removeRedIfApplicable(hometownRef);
                        }}
                        className={classNames(
                          props.readonly ? "bg-gray-100" : "",
                          "mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                        )}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-2">
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        ref={genderRef}
                        onChange={() => {
                          removeRedIfApplicable(genderRef);
                        }}
                        className={classNames(
                          props.readonly ? "bg-gray-100" : "bg-white hover:bg-gray-50",
                          "mt-2 block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-gray-300 focus:ring-0 focus:outline-none sm:text-sm sm:leading-6",
                        )}
                      >
                        <option disabled={props.readonly}>Female</option>
                        <option disabled={props.readonly}>Male</option>
                        <option disabled={props.readonly}>Other</option>
                      </select>
                    </div>
                    <div className="col-span-6">
                      <div className="flex items-center space-x-1">
                        <label className="inline-block text-sm font-medium leading-6 text-gray-900">
                          Photo <span className="text-red-600">*</span>
                        </label>
                        <QuestionMarkCircleIcon
                          className="cursor-pointer h-3 w-3 text-indigo-700"
                          onClick={() => {
                            Swal.fire({
                              icon: "info",
                              title: "Why do we need a profile picture?",
                              text:
                                "We identify applicants after networking night visually.",
                            });
                          }}
                        />
                      </div>
                      <div className="mt-2 flex items-center space-x-5">
                        <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                          <img
                            className="h-full w-full text-gray-300 object-cover"
                            id="profPicImg"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt1ceyneFkZchgkrwN7dZxWNl_C5Dctvc5BzNh_rEzPQ&s"
                            alt="Profile preview"
                            ref={pfpImgRef}
                          />
                        </span>
                        {!props.readonly && (
                          <label
                            htmlFor="photo-upload"
                            ref={pfpRef}
                            className="rounded-md border border-gray-300 py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50"
                          >
                            <span>Upload from device</span>
                            <input
                              onChange={() => {
                                removeRedIfApplicable(pfpRef);
                                var inputElem = document.getElementById(
                                  "photo-upload",
                                );
                                //@ts-ignore
                                if (inputElem.files && inputElem.files[0]) {
                                  //@ts-ignore
                                  const fileName = inputElem.files[0].name;
                                  if (
                                    !(
                                      fileName.substring(
                                          fileName.indexOf("."),
                                          fileName.length,
                                        ) === ".JPEG" ||
                                      fileName.substring(
                                          fileName.indexOf("."),
                                          fileName.length,
                                        ) === ".jpeg" ||
                                      fileName.substring(
                                          fileName.indexOf("."),
                                          fileName.length,
                                        ) === ".png" ||
                                      fileName.substring(
                                          fileName.indexOf("."),
                                          fileName.length,
                                        ) === ".PNG" ||
                                      fileName.substring(
                                          fileName.indexOf("."),
                                          fileName.length,
                                        ) === ".jpg" ||
                                      fileName.substring(
                                          fileName.indexOf("."),
                                          fileName.length,
                                        ) === ".JPG"
                                    )
                                  ) {
                                    Swal.fire({
                                      icon: "error",
                                      title:
                                        "Cover picture uploads must be in jpeg or png format and less than 10 mb in size.",
                                    });
                                  } else {
                                    var reader = new FileReader();

                                    reader.onload = function (e) {
                                      //@ts-ignore
                                      document.getElementById(
                                        "profPicImg",
                                        //@ts-ignore
                                      ).src = e.target.result;
                                    };
                                    //@ts-ignore
                                    reader.readAsDataURL(inputElem.files[0]);
                                    const storageRef = sRef(
                                      storage,
                                      "rush_pfps/" +
                                        props.user.uid +
                                        fileName.substring(
                                          fileName.indexOf("."),
                                          fileName.length,
                                        ),
                                    );
                                    //@ts-ignore
                                    uploadBytes(storageRef, inputElem.files[0])
                                      .then((snapshot) => {
                                        console.log("Uploaded bytes");
                                        getDownloadURL(snapshot.ref)
                                          .then((downloadURL) => {
                                            update(
                                              ref(
                                                database,
                                                "rush_users/" + props.user.uid,
                                              ),
                                              {
                                                PfpURL: downloadURL,
                                              },
                                            ).then(() => {
                                              console.log(
                                                "Successfully uploaded profile picture\n",
                                              );
                                              setPfpAdded(true);
                                            });
                                          })
                                          .catch((err) => {
                                            alert(err);
                                          });
                                      })
                                      .catch((err) => {
                                        alert(err);
                                      });
                                  }
                                }
                              }}
                              type="file"
                              id="photo-upload"
                              name="photo-upload"
                              className="sr-only"
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-base font-bold leading-6 text-blue-900">
                    Professional Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Details about your professional background and interests.
                  </p>
                </div>
                <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="grade"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Grade <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="grade"
                        name="grade"
                        ref={gradeRef}
                        onChange={() => {
                          removeRedIfApplicable(gradeRef);
                        }}
                        className={classNames(
                          props.readonly ? "bg-gray-100" : "bg-white hover:bg-gray-50",
                          "mt-2 block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-gray-300 focus:ring-0 focus:outline-none sm:text-sm sm:leading-6",
                        )}
                      >
                        <option disabled={props.readonly}>Freshman</option>
                        <option disabled={props.readonly}>Sophomore</option>
                        <option disabled={props.readonly}>Junior</option>
                        <option disabled={props.readonly}>Senior</option>
                      </select>
                    </div>
                    <div className="col-span-0 sm:col-span-3"></div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="major"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Major <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="major"
                        id="major"
                        readOnly={props.readonly}
                        ref={majorRef}
                        onChange={() => {
                          removeRedIfApplicable(majorRef);
                        }}
                        className={classNames(
                          props.readonly ? "bg-gray-100" : "",
                          "mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                        )}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-2">
                      <label
                        htmlFor="gpa"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        GPA <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="gpa"
                        id="gpa"
                        readOnly={props.readonly}
                        ref={gpaRef}
                        onChange={() => {
                          removeRedIfApplicable(gpaRef);
                        }}
                        className={classNames(
                          props.readonly ? "bg-gray-100" : "",
                          "mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                        )}
                      />
                    </div>
                    <div className="col-span-3 sm:col-span-4">
                      <label
                        htmlFor="linkedin"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        LinkedIn <span className="text-red-600">*</span>
                      </label>
                      <div className="mt-2 flex rounded-md shadow-sm">
                        <span
                          className={classNames(
                            props.readonly ? "bg-gray-100" : "",
                            "inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm",
                          )}
                        >
                          linkedin.com/in/
                        </span>
                        <input
                          type="text"
                          name="linkedin"
                          id="linkedin"
                          readOnly={props.readonly}
                          ref={linkedinRef}
                          onChange={() => {
                            removeRedIfApplicable(linkedinRef);
                          }}
                          className={classNames(
                            props.readonly ? "bg-gray-100" : "",
                            "block w-full flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                          )}
                          placeholder="your-username"
                        />
                      </div>
                    </div>
                    <div className="col-span-0 sm:col-span-2"></div>
                    {!props.readonly && (
                      <div className="col-span-8">
                        <label
                          htmlFor="resume"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Resume <span className="text-red-600">*</span>
                        </label>
                        <div className="mt-1 flex items-center">
                          <label
                            htmlFor="resume-upload"
                            ref={resumeRef}
                            className="rounded-md border border-gray-300 py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50"
                          >
                            <span>Upload from device</span>
                            <input
                              id="resume-upload"
                              name="resume-upload"
                              type="file"
                              className="sr-only"
                              onChange={() => {
                                removeRedIfApplicable(resumeRef);
                                var inputElem = document.getElementById(
                                  "resume-upload",
                                );
                                //@ts-ignore
                                if (inputElem.files && inputElem.files[0]) {
                                  //@ts-ignore
                                  const fileName = inputElem.files[0].name;
                                  if (
                                    !(
                                      fileName.substring(
                                          fileName.indexOf("."),
                                          fileName.length,
                                        ) === ".pdf" ||
                                      fileName.substring(
                                          fileName.indexOf("."),
                                          fileName.length,
                                        ) === ".PDF"
                                    )
                                  ) {
                                    Swal.fire({
                                      icon: "error",
                                      title:
                                        "Resume uploads must be in pdf format",
                                    });
                                  } else {
                                    const storageRef = sRef(
                                      storage,
                                      "rush_resumes/" +
                                        props.user.uid +
                                        fileName.substring(
                                          fileName.indexOf("."),
                                          fileName.length,
                                        ),
                                    );

                                    document
                                      .getElementById("resume-name")
                                      .classList.remove("hidden");
                                    document.getElementById(
                                      "resume-name-text",
                                    ).textContent = fileName;
                                    //@ts-ignore
                                    uploadBytes(storageRef, inputElem.files[0])
                                      .then((snapshot) => {
                                        getDownloadURL(snapshot.ref)
                                          .then((downloadURL) => {
                                            update(
                                              ref(
                                                database,
                                                "rush_users/" + props.user.uid,
                                              ),
                                              {
                                                ResumeURL: downloadURL,
                                              },
                                            );
                                            console.log(
                                              "Successfully uploaded resume\n",
                                            );
                                            setResumeAdded(true);
                                          })
                                          .catch((err) => {
                                            alert(err);
                                          });
                                      })
                                      .catch((err) => {
                                        alert(err);
                                      });
                                  }
                                }
                              }}
                            />
                          </label>
                          <div id="resume-name" className="hidden pl-3 flex">
                            <p
                              className="text-sm font-medium"
                              id="resume-name-text"
                            >
                            </p>
                            <CheckCircleIcon className="ml-1.5 h-5 w-5 flex-shrink-0 text-green-400" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Short Answers */}
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-base font-bold leading-6 text-blue-900">
                    Short Answers
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    These questions will gauge your specific interests, as well
                    as your ability to communicate ideas. These questions are
                    NOT saved if you leave the page.
                  </p>
                </div>
                <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                  <div>
                    <label
                      htmlFor="tech-interest"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Briefly describe your tech interest. <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="tech-interest"
                        name="tech-interest"
                        rows={3}
                        readOnly={props.readonly}
                        ref={techInterestRef}
                        onChange={() => {
                          removeRedIfApplicable(techInterestRef);
                        }}
                        className={classNames(
                          props.readonly ? "bg-gray-100" : "",
                          "block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6",
                        )}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Max. 100 words</p>
                  </div>
                  <div>
                    <label
                      htmlFor="scientific-breakthrough"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      What do you believe has been the most influential scientific/technological breakthrough of the last 100 years and why? <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="scientific-breakthrough"
                        name="scientific-breakthrough"
                        rows={3}
                        readOnly={props.readonly}
                        ref={scientificBreakthroughRef}
                        onChange={() => {
                          removeRedIfApplicable(scientificBreakthroughRef);
                        }}
                        className={classNames(
                          props.readonly ? "bg-gray-100" : "",
                          "block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6",
                        )}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Max. 100 words</p>
                  </div>
                  <div>
                    <label
                      htmlFor="company-resonate"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      What is a brand or company you resonate with? <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="company-resonate"
                        name="company-resonate"
                        rows={3}
                        readOnly={props.readonly}
                        ref={brandCompanyRef}
                        onChange={() => {
                          removeRedIfApplicable(brandCompanyRef);
                        }}
                        className={classNames(
                          props.readonly ? "bg-gray-100" : "",
                          "block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6",
                        )}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Max. 100 words</p>
                  </div>
                  <div>
                    <label
                      htmlFor="why-ktp"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Why do you want to join Kappa Theta Pi? <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="why-ktp"
                        name="why-ktp"
                        rows={6}
                        readOnly={props.readonly}
                        ref={whyKTPRef}
                        onChange={() => {
                          removeRedIfApplicable(whyKTPRef);
                        }}
                        className={classNames(
                          props.readonly ? "bg-gray-100" : "",
                          "block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6",
                        )}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Max. 250 words</p>
                  </div>
                  <div>
                    <label
                      htmlFor="passion-class"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      What is a passion of yours, unrelated to your major/classes/tech, that you would love to teach a class about? <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="passion-class"
                        name="passion-class"
                        rows={2}
                        readOnly={props.readonly}
                        ref={passionRef}
                        onChange={() => {
                          removeRedIfApplicable(passionRef);
                        }}
                        className={classNames(
                          props.readonly ? "bg-gray-100" : "",
                          "block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6",
                        )}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Max. 50 words</p>
                  </div>
                  <div>
                    <label
                      htmlFor="fun-fact"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Tell us a fun fact. <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="fun-fact"
                        name="fun-fact"
                        rows={2}
                        readOnly={props.readonly}
                        ref={funFactRef}
                        onChange={() => {
                          removeRedIfApplicable(funFactRef);
                        }}
                        className={classNames(
                          props.readonly ? "bg-gray-100" : "",
                          "block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6",
                        )}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Max. 50 words</p>
                  </div>
                </div>
              </div>
            </div>

            {!props.readonly && (
              <div className="flex justify-end gap-3 px-4 sm:px-0">
                <button
                  onClick={saveResponses}
                  className="inline-flex justify-center rounded-lg bg-gray-600 py-3 px-6 text-base font-bold text-white shadow-md hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 transition-colors"
                >
                  Save Responses
                </button>
                <button
                  onClick={completeSubmission}
                  className="inline-flex justify-center rounded-lg bg-blue-600 py-3 px-8 text-base font-bold text-white shadow-md hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                >
                  Submit Application
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <FailureNotif shown={showFailureNotif} />
    </>
  );
}
