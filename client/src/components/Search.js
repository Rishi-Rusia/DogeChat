import React, { useContext } from "react";
import {
  collection,
  doc,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { getDocs, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
import { AuthContext } from "../context/Authcontext";
import { setDoc } from "firebase/firestore";
// import { onSnapshot } from "firebase/firestore";
// import { ChatContext } from "../context/ChatContext";

export default function Search() {
  const { currentUser } = useContext(AuthContext);
  const [searchState, setSearchState] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [user, setUser] = useState(null);
  // const [chats, setChats] = useState([]);
  // const { dispatch } = useContext(ChatContext);

  const handleSelect = async (username, u) => {
    console.log("handleSelect fired");

    const citiesRef = collection(db, "users");

    const q = query(citiesRef, where("username", "==", username));

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    console.log(querySnapshot.docs[0].data());
    setUser(querySnapshot.docs[0].data());
    // dispatch({ type: "CHANGE_USER", payload: u });

    console.log(user);
    console.log(currentUser);
  };

  // const handleSelect2 = (u) => {};
  const handleSearch = async (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      console.log(e.code);
      console.log(searchState);

      const citiesRef = collection(db, "users");

      const q = query(citiesRef, where("username", "==", searchState));

      //   console.log(q);

      //   console.log(q._query.filters[0].value.stringValue);

      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);

      if (!querySnapshot.empty) {
        setSearchResult([]);

        // querySnapshot.docs[0].data();
        console.log(querySnapshot);
        // setUser(querySnapshot[0].data()); _snapshot.docs
        console.log(user);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          // setUser(() => doc.data());
          const setter = (username, photo) => {
            return (
              <div
                className="contact-chat-search"
                onClick={() => {
                  handleSelect(username);
                }}
              >
                <img src={photo} alt="" className="contact-profile" />
                <div className="contact-name-message">
                  <span className="contact-name">
                    <b>{username}</b>
                  </span>
                  <p className="contact-last-message">hey</p>
                </div>
              </div>
            );
          };

          let newpush = setter(doc.data().username, doc.data().image);

          setSearchResult((searchResult) => [...searchResult, newpush]);
        });
      } else {
        const notFoundResult = () => {
          console.log("notFoundinvoked");
          return (
            <div className="contact-chat-search">
              <div className="contact-name-message">
                <span className="contact-name">{"  "}No Results</span>
              </div>
            </div>
          );
        };

        let newResult = notFoundResult();
        setSearchResult([newResult]);
      }
    }
  };

  // const handleSearch = async (e) => {
  //   if (e.code === "Enter") {
  //     e.preventDefault();
  //     console.log(e.code);
  //     console.log(searchState);

  //     const citiesRef = collection(db, "users");
  //     const q = query(citiesRef, where("username", "==", searchState));
  //     const querySnapshot = await getDocs(q);

  //     if (!querySnapshot.empty) {
  //       setSearchResult([]);
  //       querySnapshot.forEach((doc) => {
  //         if (doc.exists) {
  //           setUser(doc.data());
  //           const setter = (username, photo) => {
  //             return (
  //               <div className="contact-chat-search" onClick={handleSelect}>
  //                 <img src={photo} alt="" className="contact-profile" />
  //                 <div className="contact-name-message">
  //                   <span className="contact-name">
  //                     <b>{username}</b>
  //                   </span>
  //                   <p className="contact-last-message">hey</p>
  //                 </div>
  //               </div>
  //             );
  //           };
  //           let newpush = setter(doc.data().username, doc.data().image);
  //           setSearchResult((searchResult) => [...searchResult, newpush]);
  //         }
  //       });
  //     } else {
  //       const notFoundResult = () => {
  //         console.log("notFoundinvoked");
  //         return (
  //           <div className="contact-chat-search" onClick={handleSelect}>
  //             <div className="contact-name-message">
  //               <span className="contact-name">{"  "}No Results</span>
  //             </div>
  //           </div>
  //         );
  //       };
  //       let newResult = notFoundResult();
  //       setSearchResult([newResult]);
  //     }
  //   }
  // };

  const handleChange = (e) => {
    setSearchState(e.target.value);

    if (searchState === "") {
      setSearchResult([]);
    }
    console.log(e.target.value);
  };

  useEffect(() => {}, [searchResult]);

  useEffect(() => {
    if (searchState === "") {
      setSearchResult([]);
    }
  }, [searchState]);

  // useEffect(() => {
  //   const getChats = () => {
  //     const unsub = onSnapshot(doc(db, "userchats", currentUser.uid), (doc) => {
  //       setChats(doc.data());
  //     });

  //     return () => {
  //       unsub();
  //     };
  //   };

  //   currentUser.uid && getChats();
  // }, [currentUser.uid]);

  useEffect(() => {
    const documentHandler = async () => {
      console.log(user);
      if (user && currentUser) {
        setTimeout(async () => {
          console.log("condition was true");
          const combinedId =
            currentUser.uid > user.uid
              ? currentUser.uid + user.uid
              : user.uid + currentUser.uid;
          console.log("after combinedid");
          try {
            const res = await getDoc(doc(db, "chats", combinedId));

            console.log("afterres");
            if (!res.exists()) {
              setDoc(doc(db, "chats", combinedId), { messages: [] });
              console.log("after setdoc");

              // const userChatExists = await getDoc(
              //   doc(db, "userchats", user.uid)
              // );

              // if (!userChatExists) {
              //   setDoc(doc(db, "userchats", user.uid));
              // }

              // const currentUserChatExists = await getDoc(
              //   doc(db, "userchats", currentUser.uid)
              // );

              // if (!currentUserChatExists) {
              //   setDoc(doc(db, "userchats", currentUser.uid));
              // }

              try {
                try {
                  await updateDoc(doc(db, "userchats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                      uid: user.uid,
                      username: user.username,
                      image: user.image,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                  });
                } catch (error) {
                  console.log(error);
                }

                const docRef = doc(db, "users", `${currentUser.uid}`);
                const docSnap = await getDoc(docRef);

                try {
                  console.log("between updatedocs");
                  await updateDoc(doc(db, "userchats", user.uid), {
                    [combinedId + ".userInfo"]: {
                      uid: currentUser.uid,
                      username:
                        docSnap._document.data.value.mapValue.fields.username
                          .stringValue,
                      image:
                        docSnap._document.data.value.mapValue.fields.image
                          .stringValue,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                  });
                } catch (error) {
                  console.log(error);
                }

                console.log("after updatedocs");
              } catch (error) {
                console.log(error);
              }
            }
          } catch (error) {
            console.log(error);
          }
        }, 0);
      }

      setUser(null);
      setSearchState("");
    };

    if (user != null) {
      documentHandler();
    }
  }, [user, currentUser]);

  return (
    <div>
      <div className="search-bar">
        <form onKeyDown={handleSearch}>
          <input
            type="text"
            className="search-user"
            placeholder="Search contacts here"
            name="searchbar"
            value={searchState}
            onChange={handleChange}
            // onKeyDown={handleSearch}
          />
        </form>
      </div>
      <div className="searchResults">{searchResult}</div>
    </div>
  );
}
