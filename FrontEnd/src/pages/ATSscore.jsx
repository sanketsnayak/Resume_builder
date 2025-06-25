import React, { useState, useEffect } from 'react';
import { Upload, FileText, Target, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { generateAIContent } from '@/components/AiGeneratedText';
function ATSscore() {
  const [resumeFile, setResumeFile] = useState(null);
  const [text,setText]=useState("");
  const [jobDescription, setJobDescription] = useState('');
  const [score, setScore] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading,setLoading]=useState(false)

  const prompt = {
      parts: [{ text: `resume file:${resumeFile} job description:${jobDescription} Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 linescin array format, With summery and experience_level Field in JSON Format` }]
    };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResumeFile(file);
      parseText()
      setCurrentStep(2);
    }
  };
  
  const parseText=async()=>{
    if(!resumeFile) return alert('Upload the pdf file')
    const formData = new FormData();
    formData.append("resume", resumeFile);
    setLoading(true)
    try{
        await fetch('http://localhost:8000/api/AtsScoreCheck',{
          method: "POST",
        body: formData,
        }).then(res=>res.json()).then(data=>{
          if(data.success){
              setText(data.text)
              
          }
        })
    }catch(err){
      console.log(err)

    }finally{
      setLoading(false)
    }
  }
   useEffect(() => {
    if (resumeFile) {
    parseText();
  }
    
    
  }, [resumeFile]);

  const generateScore=async()=>{
    const result=await generateAIContent(prompt);
    console.log(result)
  }

  const analyzeResume = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      alert('Please upload a resume and enter a job description');
      return;
    }

    setIsAnalyzing(true);
    setCurrentStep(3);

    
    setTimeout(() => {
      
      const baseScore = Math.floor(Math.random() * 30) + 60; // 60-90 range
      const keywords = jobDescription.toLowerCase().split(' ').filter(word => word.length > 3);
      const keywordBonus = Math.min(keywords.length * 2, 10);
      const finalScore = Math.min(baseScore + keywordBonus, 95);

      setScore({
        overall: finalScore,
        keywords: Math.floor(Math.random() * 20) + 70,
        formatting: Math.floor(Math.random() * 15) + 80,
        experience: Math.floor(Math.random() * 25) + 65,
        skills: Math.floor(Math.random() * 20) + 75,
        suggestions: [
          'Add more relevant keywords from the job description',
          'Include quantifiable achievements with numbers',
          'Optimize section headings for ATS readability',
          'Add technical skills section',
          'Use standard date formats'
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const resetAnalysis = () => {
    setResumeFile(null);
    setJobDescription('');
    setScore(null);
    setCurrentStep(1);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ATS Resume <span className="text-orange-500">Score Analyzer</span>
          </h1>
          <p className="text-lg text-gray-600">
            Optimize your resume for Applicant Tracking Systems and increase your chances of getting noticed
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center items-center mb-12">
          <div className="flex items-center space-x-8">
            {/* Step 1 */}
            <div className="flex items-center">
              <div  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                currentStep >= 1 ? 'bg-orange-500' : 'bg-gray-300'
              }`}>
                1
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700">Upload Resume</span>
            </div>
            
            <div className={`h-1 w-16 ${currentStep >= 2 ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
            
            {/* Step 2 */}
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                currentStep >= 2 ? 'bg-orange-500' : 'bg-gray-300'
              }`}>
                2
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700">Job Description</span>
            </div>
            
            <div className={`h-1 w-16 ${currentStep >= 3 ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
            
            {/* Step 3 */}
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                currentStep >= 3 ? 'bg-orange-500' : 'bg-gray-300'
              }`}>
                3
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700">Get Score</span>
            </div>
          </div>
        </div>

        {!score ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* File Upload Section */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Upload className="w-6 h-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Upload Your Resume</h2>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    {resumeFile ? resumeFile.name : 'Click to upload your resume'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports PDF, DOC, DOCX files up to 10MB
                  </p>
                </label>
              </div>
              
              {resumeFile && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-700 font-medium">Resume uploaded successfully!</span>
                </div>
              )}
            </div>

            {/* Job Description Section */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Target className="w-6 h-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Job Description</h2>
              </div>
              
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here. Include key requirements, skills, and qualifications to get a more accurate ATS score..."
                className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              />
              
              <p className="text-sm text-gray-500 mt-2">
                {jobDescription.length} characters • Minimum 100 characters recommended
              </p>
            </div>

            {/* Analyze Button */}
            <div className="text-center">
              <button
                onClick={analyzeResume}
                disabled={!resumeFile || jobDescription.length < 50 || isAnalyzing}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg transition-colors flex items-center mx-auto"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Analyze Resume
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Results Section */
          <div className="space-y-6">
            {/* Overall Score Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your ATS Score</h2>
              <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreBg(score.overall)} mb-4`}>
                <span className={`text-4xl font-bold ${getScoreColor(score.overall)}`}>
                  {score.overall}
                </span>
              </div>
              <p className="text-lg text-gray-600">
                {score.overall >= 80 ? 'Excellent! Your resume is well-optimized for ATS systems.' :
                 score.overall >= 60 ? 'Good score, but there\'s room for improvement.' :
                 'Your resume needs optimization to pass through ATS filters.'}
              </p>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Score Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Keyword Match', score: score.keywords, icon: Target },
                  { label: 'Formatting', score: score.formatting, icon: FileText },
                  { label: 'Experience Relevance', score: score.experience, icon: TrendingUp },
                  { label: 'Skills Match', score: score.skills, icon: CheckCircle }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <item.icon className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="font-medium text-gray-700">{item.label}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className={`h-2 rounded-full ${item.score >= 80 ? 'bg-green-500' : item.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${item.score}%` }}
                        ></div>
                      </div>
                      <span className={`font-bold ${getScoreColor(item.score)}`}>{item.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Improvement Suggestions */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Improvement Suggestions</h3>
              <div className="space-y-3">
                {score.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={resetAnalysis}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Analyze Another Resume
              </button>
              <button
                onClick={() => window.print()}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Save Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ATSscore;