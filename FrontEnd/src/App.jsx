import { BrowserRouter,Routes,Route, Navigate } from "react-router-dom"
import LandinPage from "./pages/LandinPage"
import Dashboard from "./pages/Dashboard"
import Layout from "./Layout"
import Signin from "./pages/Signin"
import Resume from "./pages/Resume"
import { useUser } from "@clerk/clerk-react"

function App() {

  const {user,isSignedIn,isLoaded}=useUser()

  if(!isLoaded){
    return(
      <div>Loading</div>
    )
  }
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="" element={<LandinPage/>}/>
          <Route path="dashboard" element={isSignedIn?<Dashboard/>:<Navigate to="/signin"/>} />
          <Route path="dashboard/resume/:id" element={<Resume/>}/>
          
        </Route>
        <Route path="/signin" element={<Signin/>}/>
      </Routes>
    </BrowserRouter>
  )
}
 
export default App