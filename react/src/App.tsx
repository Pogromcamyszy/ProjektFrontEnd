import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link,useLocation } from "react-router-dom";
import Login from "./Login/Login.tsx";
import Registry from "./Registry/Registry.tsx";
import Profile from "./Profile/Profile.tsx";
import navbar from "./styles/navbar.module.css";

// Create the context
export const AuthContext = createContext([false, () => {}]);

function App() {
  
  const [isLogged, setIsLogged] = useState(true); // Define state for login status

  return (
    <AuthContext.Provider value={[isLogged, setIsLogged]}>
      <BrowserRouter>
        <nav>
          <div className={navbar.box}>
            <div className={navbar.upper}>here logo picture</div>
            <div className={navbar.lower}>
              {!isLogged ? (
                <>
                  <div className={navbar.btn}>
                    <Link to="/login">Login</Link>
                  </div>
                  <div className={navbar.btn}>
                    <Link to="/registry">Registry</Link>
                  </div>
                </>
              ) : (
                <>
                  <div className={navbar.btn}>Placeholder</div>
                  <div className={navbar.btn}>Placeholder</div>
                  <div className={navbar.btn}>Placeholder</div>
                  <div className={navbar.btn}><Link to="/profile">Profile</Link></div>
                  <div className={navbar.btn}>Placeholder</div>
                </>
              )}
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/registry" element={<Registry />} />
              <Route path="/profile" element={<Profile/>}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;