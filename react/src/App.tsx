import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link,useLocation } from "react-router-dom";
import Login from "./Login/Login.tsx";
import Registry from "./Registry/Registry.tsx";
import MyProfile from "./Profile/MyProfile.tsx";
import Profile from "./Profile/Profile.tsx";
import navbar from "./styles/navbar.module.css";
import PostCreate from "./Posts/PostCreate.tsx";
import Logout from "./Auth/Logout.tsx"
import { getAuth } from "./Fetch/Fetch.tsx";
// Create the context
export const AuthContext = createContext([false, () => {}]);

function App() {
  
  // Define state for login status and check is user is loggin by useEffect
  const [isLogged, setIsLogged] = useState(); 
  useEffect(() => {
    const checkLoginStatus = async() =>{
    const res = await getAuth();
    if (res === 200) {
      setIsLogged(true); // Set the login status to true
    } else if (res === 401) {
      setIsLogged(false); // Set the login status to false
    }
  }
    checkLoginStatus();
  }, []);

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
                  <div className={navbar.btn}><Link to="/logout">Logout</Link></div>
                  
                </>
              )}
            </div>
          </div>
        </nav>


            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/registry" element={<Registry />} />
              <Route path="/myprofile" element={<MyProfile/>}/>
              <Route path="/logout" element={<Logout/>}/>
              <Route path="/createpost" element={<PostCreate/>}/>
            </Routes>
      </BrowserRouter>
    </AuthContext.Provider>

  );
}

export default App;