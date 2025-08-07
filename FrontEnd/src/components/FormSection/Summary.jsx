import React, { useContext,useEffect,useState } from 'react'
import { Button } from '../ui/button'
import { Textarea } from "@/components/ui/textarea"
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useUser } from '@clerk/clerk-react'
import { useParams } from 'react-router-dom'
import { toast } from "sonner"
import { generateAIContent } from '../AiGeneratedText';
import { Oval } from 'react-loader-spinner'
function Summary({enableNext}) {
    const [summary,setSummary]=useState("")
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const {user}=useUser()
    const {id}=useParams()
    const [loading,setLoading]=useState(false)
    const [aiGeneratedSummary,setAiGeneratedSummary]=useState([])
    
    const prompt = {
      parts: [{ text: `job title:${resumeInfo?.jobTitle}  Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 linescin array format, With summery and experience_level Field in JSON Format` }]
    };

    useEffect(() => {
      enableNext(false)
      setResumeInfo({
        ...resumeInfo,
        summery:summary
      })

    }, [summary])

    const onSave=async(e)=>{
        e.preventDefault()
        setLoading(true)
        enableNext(true)
        
        try{
          await fetch('http://localhost:8000/api/addSummary',{
            mode:"cors",
            method:"POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
              userId:user.id,
              ResumeID:id,
              Summary:summary
            })
          }).then(res=>res.json()).then((data)=>{
            if(data.success){
              console.log(data.message)
            }
            toast("Summary updated sucessfully")
          })
        }catch(err){
          console.log(err)
        }finally{
          setLoading(false)
        }
    }

    const getSummary=async()=>{
      try{
        await fetch('http://localhost:8000/api/getSummary',{
            mode:"cors",
            method:"POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
              userId:user.id,
              ResumeID:id,
            })
        }).then(res=>res.json()).then((data)=>{
          if(data.success){
          setSummary(data.summary.summery)
           setResumeInfo(prev=>({
              ...prev,
              ...data.summary
            }))
            enableNext(true)
          }
        })
      }catch(err){
        console.log(err)
      }
    }

    const generateSummary = async () => {
      setLoading(true);
      try {
        const result = await generateAIContent(prompt);
        console.log("AI Result:", result);
    
        
        let generatedText = result?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary generated";
    
        console.log("Raw Generated Summary:", generatedText);
    
       
        if (generatedText.startsWith("```json")) {
          generatedText = generatedText.replace(/```json/g, "").replace(/```/g, "").trim();
        }
    
        console.log("Cleaned Generated Summary:", generatedText);
    
        
        try {
          const parsedSummary = JSON.parse(generatedText);
          setAiGeneratedSummary(parsedSummary); 
        } catch (jsonError) {
          console.error("Invalid JSON format:", jsonError);
          toast.error("Failed to parse AI-generated summary. Please try again.");
        }
      } catch (error) {
        console.error("Error generating summary:", error);
        toast.error("An error occurred while generating the summary.");
      } finally {
        setLoading(false);
        toast("generated successfully")
      }
    };

     const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Summary copied to clipboard!");
  };
    
    useEffect(() => {
      getSummary()
    }, [])
    
    
  return (
    <div>
        <h2 className='font-bold'>Personal Details</h2>
        <p className='font-normal text-xs'>Get Started with basic information</p>
        <form onSubmit={onSave}>
            <div className='flex justify-between items-center mt-7'>
                <h2 className='text-sm font-bold'>Add Summary</h2>
                <Button onClick={generateSummary} variant="outline" className="flex items-center gap-2">{loading?(<div className="col-span-3 flex items-center justify-center">
                  <Oval height={40} width={40} color="white" ariaLabel="loading" />
                                </div>):(<div className='flex gap-1.5 items-center'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot-icon lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>Generate from AI</div>)}</Button>
            </div>
            <Textarea onChange={(e)=>setSummary(e.target.value)} defaultValue={summary} className="mt-5"/>
            <div className='flex justify-end mt-3'>
              <Button type='submit'  className="size-fit">{loading?(<div className="col-span-3 flex items-center justify-center">
                  <Oval height={40} width={40} color="white" ariaLabel="loading" />
                                </div>):"Save"}</Button>
            </div>
        </form>

        <div>
          {
            aiGeneratedSummary.map((item,index)=>(
              <div className='border-[1px] rounded p-3 my-3' key={index}>
              <div className='w-full flex justify-end '>
                <div onClick={() => handleCopy(item.summary)} className='border rounded p-1'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-icon lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                </div>
              </div>
                <h2 className='text-sm font-bold'>{item.experience_level}</h2>
                <p className='text-xs font-normal'>{item.summary}</p>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default Summary