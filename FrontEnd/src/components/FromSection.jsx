import React, { useContext, useState, useEffect } from 'react'
import { Button } from './ui/button'
import PersonalDetails from './FormSection/PersonalDetails'
import Summary from './FormSection/Summary'
import ProfessionalExperience from './FormSection/ProfessionalExperience'
import Education from './FormSection/Education'
import Skills from './FormSection/Skills'
import TextColor from './TextColor'
import Download from './FormSection/Download'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useUser } from '@clerk/clerk-react'

function FromSection() {
  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
  const [formIndex, setFormIndex] = useState(1)
  const [enableNext, setEnableNext] = useState(false)
  const {id} = useParams()
  const navigate = useNavigate()
  const {user} = useUser()

  // Fetch template data when component mounts
  useEffect(() => {
    const fetchTemplate = async () => {
      if (user && id) {
        try {
          const response = await fetch('http://localhost:8000/api/getTemplate', {
            mode: "cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user.id,
              ResumeID: id
            })
          });

          const data = await response.json();
          console.log("Fetched template data:", data);

          if (data.success && data.Template) {
            setResumeInfo((prev) => ({
              ...prev,
              template: data.Template.Template || data.Template
            }));
          }
        } catch (error) {
          console.error("Error fetching template:", error);
        }
      }
    };

    fetchTemplate();
  }, [user, id, setResumeInfo]);

  return (
    <div>
      <div className='flex justify-between'>
        <div className='flex gap-3'>
          <Button onClick={() => navigate('/dashboard')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house-icon lucide-house">
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/>
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            </svg>
          </Button>
          <TextColor/>
        </div>
        <div className='flex gap-2'>
          {formIndex > 1 ? (
            <Button onClick={() => setFormIndex(formIndex - 1)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left-icon lucide-arrow-left">
                <path d="m12 19-7-7 7-7"/>
                <path d="M19 12H5"/>
              </svg>
            </Button>
          ) : ""}
          <Button 
            disabled={!enableNext} 
            onClick={() => {
              setFormIndex(formIndex + 1)
              setEnableNext(false)
            }} 
            className="flex gap-2"
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right-icon lucide-arrow-right">
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </Button>
        </div>
      </div>
      <div className='shadow-lg border-t-4 rounded-lg border-purple-600 mt-6 p-5'>
        {formIndex == 1 ? <PersonalDetails enableNext={(e) => setEnableNext(e)}/> : null}
        {formIndex == 2 ? <Summary enableNext={(e) => setEnableNext(e)}/> : null}
        {formIndex == 3 ? <ProfessionalExperience enableNext={(e) => setEnableNext(e)}/> : null}
        {formIndex == 4 ? <Education enableNext={(e) => setEnableNext(e)}/> : null}
        {formIndex == 5 ? <Skills enableNext={(e) => setEnableNext(e)}/> : null}
        {formIndex == 6 ? (
          <>
            {console.log("Template value:", resumeInfo.template)}
            {console.log("Comparison result:", resumeInfo.template === "template1")}
            {resumeInfo.template ? (
              resumeInfo.template === "template1" ? 
                <Navigate to={`/dashboard/template1/${id}/download`} /> : 
                <Navigate to={`/dashboard/template2/${id}/download`} />
            ) : (
              <div className="text-red-500">Loading template...</div>
            )}
          </>
        ) : null}
      </div>
    </div>
  )
}

export default FromSection