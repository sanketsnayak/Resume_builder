import { BrowserRouter,Routes,Route, Navigate } from "react-router-dom"
import LandinPage from "./pages/LandinPage"
import Dashboard from "./pages/Dashboard"
import Layout from "./Layout"
import Signin from "./pages/Signin"
import Resume from "./pages/Resume"
import Template1 from "./pages/Template1"
import { useUser } from "@clerk/clerk-react"
import Download from "./components/FormSection/Download"
import Download1 from "./components/FormSection/Download1"
import UploadLinkedIn from "./components/UploadLinkedIn"
import TemplatesChoice from "./components/TemplatesChoice"
import { useState } from "react"
import { ResumeInfoContext } from "./context/ResumeInfoContext"
import ATSscore from "./pages/ATSscore"
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
          <Route path="AtsScoreCheck" element={<ATSscore/>}/>
          <Route path="dashboard/template2/:id" element={<Resume/>}/>
          <Route path="dashboard/template1/:id" element={<Template1/>}/>
          <Route path="dashboard/templateChoice/:id" element={<TemplatesChoice/>}/>
        </Route>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="dashboard/template2/:id/download" element={<Download/>}/>
        <Route path="dashboard/template1/:id/download" element={<Download1/>}/>
        <Route path="/uploadLinkedIn" element={<UploadLinkedIn/>}/>
      </Routes>
    </BrowserRouter>
    </ResumeInfoContext.Provider>
  )
}
 
export default App