import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

function TemplatesChoice() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate=useNavigate();
  const {id}=useParams()
  const templates = [
    {
      id: 1,
      name: "Professional Classic",
      description: "Clean and traditional layout perfect for corporate roles",
      preview: "classic-preview",
      color: "blue"
    },
    {
      id: 2,
      name: "Modern Creative",
      description: "Contemporary design with visual elements for creative industries",
      preview: "modern-preview",
      color: "purple"
    }
  ];

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      navigate(`/dashboard/template${selectedTemplate}/${id}`)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your <span className="text-orange-600">Resume Template</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select a professional template that best represents your style and industry. 
            You can customize colors, fonts, and layout later.
          </p>
        </div>

        {/* Template Selection */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                selectedTemplate === template.id 
                  ? 'border-orange-500 shadow-orange-100' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              {/* Selection Indicator */}
              {selectedTemplate === template.id && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center z-10">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              {/* Template Preview */}
              <div className="p-4">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 mb-4 h-64 flex items-center justify-center">
                  {template.id === 1 ? (
                   
                    <div className="w-full max-w-xs bg-white rounded-lg shadow-md  p-4 transform scale-75">
                      <img src="/template1.png" alt="" />
                    </div>
                  ) :  (
                    
                    <div className="w-full max-w-xs bg-white rounded-lg shadow-md p-4  h-fit transform scale-75">
                      <img src="/image.png" alt="" />
                    </div>
                  ) 
                  }
                </div>

                {/* Template Info */}
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={!selectedTemplate}
            className={`px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${
              selectedTemplate
                ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue with Selected Template
          </button>
          {selectedTemplate && (
            <p className="text-sm text-gray-600 mt-2">
              Template {selectedTemplate} selected. You can customize it in the next step.
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-6">
              <span>© 2025 Resume Builder</span>
              <span>•</span>
              <span>Professional Templates</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Need Help?</span>
              <button className="text-orange-600 hover:text-orange-700 font-medium">
                Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplatesChoice;