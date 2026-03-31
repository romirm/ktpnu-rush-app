import { FirebaseContext } from "@framework/FirebaseContext";
import { useContext, useEffect, useState, useRef } from "react";

export default function CheckLogin(props: { setUser: any; delibs: boolean }) {
  const firebase = useContext(FirebaseContext).firebase;
  const { setUser, delibs } = props;
  const [loading, setLoading] = useState(true);
  const hasRedirected = useRef(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user: any) => {
      setLoading(false);
      if (user) {
        console.log("User is logged in\n");
        setUser(user);
        hasRedirected.current = false;
      } else {
        if (!hasRedirected.current) {
          hasRedirected.current = true;
          if (delibs) {
            window.location.href = "/login#delibs";
          } else {
            window.location.href = "/login";
          }
        }
      }
    });

    return () => unsubscribe();
  }, [delibs, firebase, setUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return null;
}