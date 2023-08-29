import { useEffect, useState } from "react";
import { getAuth, signInWithPopup } from "firebase/auth";
import { app, googleAuthProvider } from "./firebase.js";

export const AuthProvider = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(auth.currentUser);
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((maybeUser) => {
      if (maybeUser !== null) {
        return setUser(maybeUser);
      }
      signInWithPopup(auth, googleAuthProvider)
        .then((credential) => setUser(credential.user))
        .catch((err) => {
          console.log(err);
        });
    });

    return unsub;
  }, [auth]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  let content = {
    auth: (
      <div style={{ border: "1px solid black", padding: "15px" }}>
        <div>{user?.displayName}</div>
        <div>{user?.metadata.lastSignInTime}</div>
        <button
          onClick={async () => {
            await handleLogout();
            console.log("Logout", "Logout");
          }}
        >
          SingOut
        </button>
      </div>
    ),
    unAuth: "...You unauthorised",
  };

  return user !== null ? content.auth : content.unAuth;
};
