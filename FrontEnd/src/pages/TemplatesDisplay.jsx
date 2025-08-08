import React from 'react'
import { useState, useEffect } from 'react'
function TemplatesDisplay() {
    const [hoveredCard, setHoveredCard] = useState(null)

  const templates = [
    {
      id: 1,
      name: "Modern Professional",
      description: "A sleek, contemporary design perfect for tech professionals and creative roles. Features clean typography and strategic use of color to make your resume stand out.",
      features: ["ATS Friendly", "Modern Layout", "Creative"],
      type: "modern",
      gradient: "from-orange-500 to-orange-400",
      image:"/image.png"
    },
    {
      id: 2,
      name: "Classic Business",
      description: "A timeless, professional template ideal for traditional industries like finance, law, and consulting. Clean structure with emphasis on content and readability.",
      features: ["Professional", "Traditional", "Clean"],
      type: "classic",
      gradient: "from-blue-400 to-cyan-400",
      image:"/template1.png"
    }
  ]

  const handleUseTemplate = (templateName) => {
    alert(`Redirecting to ${templateName} editor...`)
  }

  const handlePreview = (templateName) => {
    alert(`Opening ${templateName} preview...`)
  }

  useEffect(() => {
    // Component mounted
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br mt-12 from-orange-50 to-orange-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Professional Resume Templates
          </h1>
          <p className="text-xl text-gray-600">
            Choose from our carefully crafted templates to create your standout resume
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`bg-white rounded-2xl p-8 shadow-lg border-2 border-transparent transition-all duration-300 transform cursor-pointer ${
                hoveredCard === template.id
                  ? '-translate-y-2 scale-105 border-orange-500 shadow-2xl'
                  : 'hover:-translate-y-1 hover:shadow-xl'
              }`}
              onMouseEnter={() => setHoveredCard(template.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Template Preview */}
              <div className={`w-full  bg-gradient-to-r ${template.gradient} rounded-xl mb-6 relative overflow-hidden flex items-center justify-center`}>
                
                <img src={template.image} alt="" />
              </div>

              {/* Template Info */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {template.description}
                </p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {template.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-orange-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12 mt-12 p-8 bg-white/70 rounded-2xl backdrop-blur-sm">
          <div className="text-center">
            <span className="block text-3xl font-bold text-orange-500">2</span>
            <span className="text-sm text-gray-600 mt-1">Templates Available</span>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-bold text-orange-500">100%</span>
            <span className="text-sm text-gray-600 mt-1">ATS Compatible</span>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default TemplatesDisplay