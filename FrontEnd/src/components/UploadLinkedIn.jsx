import React, { useState, useEffect, useContext } from 'react';
import { Download, Upload, CheckCircle, ExternalLink, FileText, ArrowRight } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

function LinkedInUploadPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error
  const [uploadedData, setUploadedData] = useState(null);
  
  
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadStatus('uploading');
    
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:8000/api/uploadLinkedIn", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      if (data.success) {
        console.log("LinkedIn Data:", data.data);
        setUploadedData(data.data);
        
        setResumeInfo(prev=>({
          ...prev,
          firstName: data?.data?.profile?.[0]?.["First Name"] || prev.firstName || "",
          lastName: data?.data?.profile?.[0]?.["Last Name"] || prev.lastName || "",
          jobTitle:data?.data?.profile?.[0]?.HeadLine|| prev.jobTitle || "",
          address:data?.data?.profile?.[0]?.Address || prev.address || "",
          phone: data?.data?.phoneNumber?.[1]?.Number || prev.phone || "",
          email:data?.data?.email?.[0]?.["Email Address"] || prev.email || "",
          summery:data?.data?.profile?.[0]?.Summary || prev.summery || ""
        }))
        setUploadStatus('success');
        setCurrentStep(3);
      } else {
        setUploadStatus('error');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
    }
  };
  
  useEffect(() => {
    console.log(resumeInfo.lastName)
  }, [resumeInfo.lastName])
  



  const steps = [
    {
      number: 1,
      title: "Download LinkedIn Data",
      description: "Get your LinkedIn data export",
      completed: currentStep > 1
    },
    {
      number: 2,
      title: "Upload ZIP File",
      description: "Upload your LinkedIn data",
      completed: currentStep > 2
    },
    {
      number: 3,
      title: "Generate Resume",
      description: "Create your professional resume",
      completed: uploadStatus === 'success'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Import from <span className="text-orange-600">LinkedIn</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your LinkedIn profile into a professional resume in minutes
          </p>
        </div>

        
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold transition-all duration-200 ${
                    step.completed 
                      ? 'bg-green-500' 
                      : currentStep === step.number 
                        ? 'bg-orange-600' 
                        : 'bg-gray-300'
                  }`}>
                    {step.completed ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium text-gray-900">{step.title}</p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-20 h-1 mx-4 rounded transition-colors duration-200 ${
                    step.completed ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Download className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Download Your LinkedIn Data</h2>
                <p className="text-gray-600">Follow these steps to get your LinkedIn data export</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Step-by-step instructions:</h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">1</span>
                    <span>Click the link below to go to LinkedIn's data export page</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">2</span>
                    <span>Select "Request archive" to download your data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">3</span>
                    <span>Wait for LinkedIn to prepare your data (usually takes a few minutes)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">4</span>
                    <span>Download the ZIP file when ready</span>
                  </li>
                </ol>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://www.linkedin.com/psettings/member-data"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  <ExternalLink className="w-5 h-5" />
                  Go to LinkedIn Data Export
                </a>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                >
                  I have my ZIP file
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Upload className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Upload Your LinkedIn Data</h2>
                <p className="text-gray-600">Select the ZIP file you downloaded from LinkedIn</p>
              </div>
            </div>

            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="file"
                  accept=".zip"
                  onChange={handleUpload}
                  disabled={uploadStatus === 'uploading'}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  id="linkedin-upload"
                />
                <label
                  htmlFor="linkedin-upload"
                  className={`block w-full p-8 border-2 border-dashed rounded-2xl text-center transition-all duration-200 cursor-pointer ${
                    uploadStatus === 'uploading' 
                      ? 'border-orange-300 bg-orange-50 cursor-not-allowed' 
                      : 'border-gray-300 hover:border-orange-400 hover:bg-orange-50'
                  }`}
                >
                  <div className="flex flex-col items-center gap-4">
                    {uploadStatus === 'uploading' ? (
                      <>
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                        <span className="text-orange-600 font-medium">Processing your data...</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-12 h-12 text-gray-400" />
                        <div>
                          <p className="text-lg font-medium text-gray-900 mb-1">
                            Drop your LinkedIn ZIP file here
                          </p>
                          <p className="text-sm text-gray-500">or click to browse</p>
                        </div>
                      </>
                    )}
                  </div>
                </label>
              </div>

              {uploadStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">
                    Failed to process your LinkedIn data. Please make sure you uploaded the correct ZIP file.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {currentStep === 3 && uploadStatus === 'success' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                LinkedIn Data Imported Successfully!
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Your LinkedIn profile data has been processed. You can now generate your professional resume.
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl">
                Generate My Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LinkedInUploadPage;