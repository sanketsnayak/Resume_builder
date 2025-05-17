import React, { useContext, useState, useEffect } from 'react'
import Editor, { 
    BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, EditorProvider, HtmlButton, Separator, Toolbar 
  } from 'react-simple-wysiwyg';
  import { Button } from './ui/button';
  import { generateAIContent } from './AiGeneratedText';
  import { toast } from 'sonner';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
function RichTextEditor({onRichTextEditorChange,index,Value}) {
  const [value,setValue]=useState()
  const [loading,setLoading]=useState(false)
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
  
  const PROMPT=`position titile:${resumeInfo?.Experience[index]?.title} , Depends on position title give me 3 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags`
  

  const generateWorkSummary=async()=>{
    setLoading(true)
    if(resumeInfo?.Experience[index]?.title){
      try {
        const result = await generateAIContent(PROMPT);
        
        let generatedText = result?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary generated";
        console.log("Raw Generated Summary:", generatedText);
        if (generatedText.startsWith("```html")) {
          generatedText = generatedText.replace(/```html/g, "").replace(/```/g, "").trim();
        }
       setValue(generatedText)
       onRichTextEditorChange({ target: { value: generatedText } }, "workSummery", index);
      } catch (error) {
        console.error("Error generating summary:", error);
        toast.error("An error occurred while generating the summary.");
      } finally {
        setLoading(false);
      }
    }else{
      toast("Enter the Position title")
    }
    
  }
 
  

  return (
    <>
    <div className='flex justify-between items-center my-3'>
      <h2 className='font-medium text-sm'>Work Summary</h2>
      <Button onClick={generateWorkSummary} variant="outline" className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot-icon lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>Generate from AI</Button>
    </div>
    <Editor value={Value} onChange={(e)=>{
        setValue(e.target.value)
        onRichTextEditorChange(e)
    }}>
      <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
      </Toolbar>
    </Editor>
    </>
  )
}

export default RichTextEditor