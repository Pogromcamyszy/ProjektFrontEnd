import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link,useLocation } from "react-router-dom";
import Login from "./Login/Login.tsx";
import Registry from "./Registry/Registry.tsx";
import MyProfile from "./Profile/MyProfile.tsx";
import Profile from "./Profile/Profile.tsx";
import navbar from "./styles/navbar.module.css";
import PostCreate from "./Posts/PostCreate.tsx";
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
                  <div className={navbar.btn}><Link to="/createpost">Create Post</Link></div>
                  <div className={navbar.btn}><Link to="/myprofile">My profile</Link></div>
                  <div className={navbar.btn}><Link to="/profile"></Link></div>
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
              <Route path="/myprofile" element={<MyProfile/>}/>
              <Route path="/profile/:nick" element={<Profile/>}/>
              <Route path="/createpost" element={<PostCreate/>}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;