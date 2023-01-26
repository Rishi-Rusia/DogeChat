import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(
      auth,
      (user) => {
        setCurrentUser(user);
        console.log("contextState:");
        console.log(currentUser);
      },
      []
    );

    return () => {
      unsub();
    };
  });

  //   useEffect(() => {
  //     const unsub = onAuthStateChanged(auth.currentUser, (user) => {
  //       setCurrentUser(user);
  //       console.log("contextState:");
  //       console.log(currentUser);
  //     });

  //     return () => {
  //       unsub();
  //     };
  //   }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
