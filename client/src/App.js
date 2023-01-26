import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { useContext } from "react";
import { AuthContext } from "./context/Authcontext";
import { useState } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  // const [checked, setChecked] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(true);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login/" />;
    }

    return children;
  };

  const toggleSideBar = (a) => {
    setIsOpen(a);
  };

  const myFunction = () => {
    console.log("Myfunction is working");
  };

  useEffect(() => {
    console.log(process.env);
    return () => {};
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home
                    isOpen={isOpen}
                    toggleSideBar={toggleSideBar}
                    myFunction={myFunction}
                  ></Home>
                </ProtectedRoute>
              }
            ></Route>

            <Route
              exact
              path="/home"
              element={
                <ProtectedRoute>
                  <Home
                    isOpen={isOpen}
                    toggleSideBar={toggleSideBar}
                    myFunction={myFunction}
                  ></Home>
                </ProtectedRoute>
              }
            ></Route>

            <Route exact path="login" element={<Login></Login>}></Route>
            <Route
              exact
              path="register"
              element={<Register></Register>}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
