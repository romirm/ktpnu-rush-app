import { FirebaseContext } from "@framework/FirebaseContext";
import { useContext, useEffect, useState } from "react";

export default function CheckLogin(props: { setUser: any; delibs: boolean }) {
  const firebase = useContext(FirebaseContext).firebase;
  const [loading, setLoading] = useState(true); // Track auth initialization

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user: any) => {
      setLoading(false); // Auth state has been determined
      if (user) {
        console.log("User is logged in");
        props.setUser(user);
      } else {
        // Only redirect when Firebase is initialized
        if (props.delibs) {
          window.location.href = "/login#delibs";
        } else {
          window.location.href = "/login";
        }
      }
    });

    return () => unsubscribe();
  }, [firebase, props]);

  // Show nothing (or a simple loading screen) while auth is initializing
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return null;
}
