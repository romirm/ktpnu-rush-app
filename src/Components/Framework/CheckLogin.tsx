import { FirebaseContext } from "@framework/FirebaseContext";
import { useContext, useEffect, useState, useRef } from "react";

export default function CheckLogin(props: { setUser: any; delibs: boolean }) {
  const firebase = useContext(FirebaseContext).firebase;
  const [loading, setLoading] = useState(true);
  const hasRedirected = useRef(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user: any) => {
      setLoading(false);
      if (user) {
        console.log("User is logged in\n");
        props.setUser(user);
        hasRedirected.current = false;
      } else {
        if (!hasRedirected.current) {
          hasRedirected.current = true;
          if (props.delibs) {
            window.location.href = "/login#delibs";
          } else {
            window.location.href = "/login";
          }
        }
      }
    });

    return () => unsubscribe();
  }, [props.delibs, props.setUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return null;
}