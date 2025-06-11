import { BrowserRouter,Routes,Route, Navigate } from "react-router-dom"
import LandinPage from "./pages/LandinPage"
import Dashboard from "./pages/Dashboard"
import Layout from "./Layout"
import Signin from "./pages/Signin"
import Resume from "./pages/Resume"
import { useUser } from "@clerk/clerk-react"
import Download from "./components/FormSection/Download"
import UploadLinkedIn from "./components/UploadLinkedIn"
import { useState } from "react"
import { ResumeInfoContext } from "./context/ResumeInfoContext"
import Dummy from "./data/Dummy"
function App() {

  const {user,isSignedIn,isLoaded}=useUser()
  
   const [resumeInfo,setResumeInfo]=useState(Dummy)
  if(!isLoaded){
    return(
      <div>Loading</div>
    )
  }
 
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={isSignedIn?<Dashboard/>:<Navigate to="/signin"/>} />
        <Route path="/" element={<Layout/>}>
          <Route path="" element={<LandinPage/>}/>
          
          <Route path="dashboard/resume/:id" element={<Resume/>}/>
          
        </Route>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="dashboard/resume/:id/download" element={<Download/>}/>
        <Route path="/uploadLinkedIn" element={<UploadLinkedIn/>}/>
      </Routes>
    </BrowserRouter>
    </ResumeInfoContext.Provider>
  )
}
 
export default App