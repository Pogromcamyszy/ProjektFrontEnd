import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./Login/Login.tsx";
import Registry from "./Registry/Registry.tsx";
import MyProfile from "./Profile/MyProfile.tsx";
import Profile from "./Profile/Profile.tsx";
import navbar from "./styles/navbar.module.css";
import PostCreate from "./Posts/PostCreate.tsx";
import Logout from "./Auth/Logout.tsx";
import SearchSite from "./Search/SearchSite.tsx";
import { getAuth } from "./Fetch/Fetch.tsx";
import logo from "./assets/logo.png";
import Home from "./Feed/HomePage.tsx"

// Create the context
export const AuthContext = createContext([false, () => {}]);

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      const res = await getAuth();
      if (res === 200) {
        setIsLogged(true);
      } else if (res === 401) {
        setIsLogged(false);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={[isLogged, setIsLogged]}>
      <BrowserRouter>
        <nav>
          <div className={navbar.box}>
            <div className={navbar.upper}><img src={logo} alt="Logo" className={navbar.logo} /></div>
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
                  <div className={navbar.searchContainer}>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={navbar.searchInput}
                    />
                    <Link to={`/search/${searchTerm}`}>
                      <button className={navbar.searchBtn}>🔍</button>
                    </Link>
                  </div>
                  <div className={navbar.btn}>
                    <Link to="/createpost">Create Post</Link>
                  </div>
                  <div className={navbar.btn}>
                    <Link to="/home">Home</Link>
                  </div>
                  <div className={navbar.btn}>
                    <Link to="/myprofile">My profile</Link>
                  </div>
                  <div className={navbar.btn}>
                    <Link to="/logout">Logout</Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registry" element={<Registry />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/createpost" element={<PostCreate />} />
          <Route path="/search/:searchTerm" element={<SearchSite />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
