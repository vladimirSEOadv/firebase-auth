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
  console.log("user", user);

  const handleLogout = async () => {
    try {
      console.log("auth", auth);
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  let content = {
    auth: (
      <>
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
      </>
    ),
    unAuth: "...You unauthorised",
  };

  return user !== null ? content.auth : content.unAuth;
};
