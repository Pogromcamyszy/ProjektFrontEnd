import Login from "./Login/Login.tsx"
import Registry from "./Registry/Registry.tsx"
import navbar from "./styles/navbar.module.css"
import { useContext, useState } from "react";
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import AuthContext from "./Auth/Auth.tsx";

function App() {
  
  const [isLogged,setIsLogged] = useState(false);

  return (
    <>
       <BrowserRouter>
         <nav> 
              <div className={navbar.box}>
                 <div className = {navbar.upper}>
                     here logo picture
                  </div>
                     <div className= {navbar.lower}>

                     {isLogged && (
                      <>
                      <div className= {navbar.btn}>
                             <Link to= "/login">Login</Link> 
                       </div>
                 
                      <div className= {navbar.btn}>
                             <Link to= "/registry">Registry</Link> 
                      </div>
                      </>
                      )}

                      {!isLogged && (
                         <>
                          <div className={navbar.btn}>Placeholder </div>
                          <div className={navbar.btn}>Placeholder </div>
                          <div className={navbar.btn}>Placeholder </div>
                          <div className={navbar.btn}>Placeholder </div>
                          <div className={navbar.btn}>Placeholder </div>
                          </>
                      )}

                   </div>  
              </div>
         </nav>
       
          <div className="container">
                <div className="content">
                <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/registry" element={<Registry/>}/>
                </Routes>
                </div>
          </div>
          </BrowserRouter>
    </>
  )
}

export default App
