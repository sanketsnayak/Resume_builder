

import {
  ChevronRight,
  Star,
  FileText,
  Award,
  Clock,
  Users,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { useState, useEffect } from "react"

const ResumeBuilderLanding = () => {
  const [isVisible, setIsVisible] = useState({})
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }))
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "Marketing Manager",
      testimonial:
        "I landed my dream job within 2 weeks of using this resume builder. The templates are professional and the guidance was invaluable.",
    },
    {
      name: "Michael Chen",
      position: "Software Developer",
      testimonial:
        "The ATS-friendly templates helped my resume get past the initial screening. I received more interview calls than ever before.",
    },
    {
      name: "Emily Rodriguez",
      position: "HR Specialist",
      testimonial:
        "As someone who reviews resumes daily, I can confirm that resumes created with this tool stand out from the crowd.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      
      

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-orange-50 py-16 md:py-24 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0" data-animate id="hero-text">
              <div
                className={`transition-all duration-1000 ${isVisible["hero-text"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              >
                <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-bounce">
                  <Sparkles className="w-4 h-4 mr-2" />
                  #1 Resume Builder Platform
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                  Create a
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 animate-gradient-x">
                    {" "}
                    Professional{" "}
                  </span>
                  Resume in Minutes
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                  Our AI-powered resume builder helps you create a personalized, professional resume that gets you hired
                  faster with expert guidance and ATS-friendly templates.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl transform">
                    <span className="flex items-center justify-center gap-2">
                      Build My Resume
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>
                  <button className="group border-2 border-gray-300 hover:border-orange-500 hover:text-orange-500 px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg transform">
                    <span className="flex items-center justify-center gap-2">
                      View Templates
                      <FileText className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    </span>
                  </button>
                </div>
                <div className="mt-8 flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-red-400 border-3 border-white shadow-lg animate-pulse"
                        style={{ animationDelay: `${i * 200}ms` }}
                      />
                    ))}
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-current text-yellow-400 animate-pulse"
                          style={{ animationDelay: `${i * 100}ms` }}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 font-medium">Trusted by over 3 million job seekers</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10" data-animate id="hero-image">
              <div
                className={`relative transition-all duration-1000 delay-300 ${isVisible["hero-image"] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
              >
                <div className="relative group">
                  <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 hover:shadow-3xl transition-all duration-500 hover:scale-105 transform">
                    <img
                      src="home-hero-banner.avif"
                      alt="Resume Preview"
                      className="w-full rounded-lg shadow-lg"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full p-4 shadow-lg animate-bounce">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="absolute -top-4 -left-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full p-3 shadow-lg animate-pulse">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  </div>
                  {/* Floating elements */}
                  <div className="absolute top-10 -left-6 bg-white rounded-lg shadow-lg p-3 animate-float">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">ATS Optimized</span>
                    </div>
                  </div>
                  <div className="absolute bottom-10 -right-6 bg-white rounded-lg shadow-lg p-3 animate-float animation-delay-2000">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium">Professional</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-animate id="features-header">
            <div
              className={`transition-all duration-1000 ${isVisible["features-header"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                Why Choose Our
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                  {" "}
                  Resume Builder?
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our resume builder combines professional templates with expert advice to help you stand out and get
                hired faster.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-animate id="features-grid">
            {[
              {
                icon: <Clock className="w-10 h-10 text-orange-500" />,
                title: "Quick & Easy",
                description: "Create a professional resume in just minutes with our intuitive builder.",
                color: "from-orange-500 to-red-500",
              },
              {
                icon: <Award className="w-10 h-10 text-blue-500" />,
                title: "ATS-Friendly Templates",
                description: "Our templates are designed to pass Applicant Tracking Systems.",
                color: "from-blue-500 to-purple-500",
              },
              {
                icon: <Users className="w-10 h-10 text-green-500" />,
                title: "Expert Reviewed",
                description: "Templates and advice reviewed by HR professionals and hiring managers.",
                color: "from-green-500 to-teal-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 transform border border-gray-100 hover:border-transparent ${isVisible["features-grid"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{
                  transitionDelay: `${index * 200}ms`,
                  animationDelay: `${index * 200}ms`,
                }}
              >
                <div
                  className={`mb-6 p-4 rounded-2xl bg-gradient-to-r ${feature.color} w-fit group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-500 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16" data-animate id="how-it-works-header">
            <div
              className={`transition-all duration-1000 ${isVisible["how-it-works-header"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">How It Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Create a professional resume in three simple steps
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-animate id="steps-grid">
            {[
              {
                step: "1",
                title: "Choose a Template",
                description: "Select from our library of professional templates designed by experts.",
              },
              {
                step: "2",
                title: "Fill in Your Details",
                description: "Add your information with our easy-to-use form and expert tips.",
              },
              {
                step: "3",
                title: "Download & Apply",
                description: "Download your resume in PDF, Word, or other formats and start applying.",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div
                  className={`bg-white rounded-2xl p-8 shadow-lg relative z-10 hover:shadow-2xl transition-all duration-500 hover:scale-105 transform group ${isVisible["steps-grid"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center font-bold mb-6 text-lg group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-500 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-8 h-0.5 bg-gradient-to-r from-orange-300 to-orange-500 z-0 -translate-y-1/2 transform">
                    <ChevronRight className="absolute right-0 top-1/2 transform -translate-y-1/2 text-orange-500 animate-pulse" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Showcase */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-animate id="templates-header">
            <div
              className={`transition-all duration-1000 ${isVisible["templates-header"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                Professional
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                  {" "}
                  Resume Templates
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose from our collection of professionally designed templates
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" data-animate id="templates-grid">
            {[1, 2, 3, 4, 5, 6].map((template) => (
              <div
                key={template}
                className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 transform ${isVisible["templates-grid"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${template * 100}ms` }}
              >
                <img
                  src="resume1.avif"
                  alt={`Resume Template ${template}`}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                  <div className="p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white text-xl font-bold mb-3">Template {template}</h3>
                    <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 w-full hover:scale-105 transform shadow-lg">
                      Use This Template
                    </button>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Star className="w-5 h-5 text-orange-500" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="group border-2 border-gray-300 hover:border-orange-500 hover:text-orange-500 px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg transform">
              <span className="flex items-center justify-center gap-2">
                View All Templates
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-animate id="testimonials-header">
            <div
              className={`transition-all duration-1000 ${isVisible["testimonials-header"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join thousands of satisfied job seekers who found their dream job
              </p>
            </div>
          </div>

          {/* Animated testimonial carousel */}
          <div className="max-w-4xl mx-auto">
            <div className="relative h-64 overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 transform ${
                    index === currentTestimonial
                      ? "translate-x-0 opacity-100"
                      : index < currentTestimonial
                        ? "-translate-x-full opacity-0"
                        : "translate-x-full opacity-0"
                  }`}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 h-full flex flex-col justify-center">
                    <div className="flex items-center mb-6 justify-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-6 h-6 fill-current text-yellow-400 animate-pulse"
                          style={{ animationDelay: `${star * 100}ms` }}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-8 italic text-lg text-center leading-relaxed">
                      "{testimonial.testimonial}"
                    </p>
                    <div className="flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-red-400 mr-4 flex items-center justify-center text-white font-bold text-xl">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg">{testimonial.name}</h4>
                        <p className="text-gray-600">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? "bg-orange-500 scale-125" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-animate id="faq-header">
            <div
              className={`transition-all duration-1000 ${isVisible["faq-header"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about our resume builder
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto" data-animate id="faq-list">
            {[
              {
                question: "How long does it take to create a resume?",
                answer:
                  "Most users complete their resume in less than 15 minutes. Our intuitive builder guides you through each section with expert tips and suggestions.",
              },
              {
                question: "Are the templates ATS-friendly?",
                answer:
                  "Yes, all our templates are designed to pass through Applicant Tracking Systems. They have clean layouts and use standard fonts and formatting that ATS can easily read.",
              },
              {
                question: "Can I download my resume in different formats?",
                answer:
                  "Yes, you can download your resume in PDF, Word, and plain text formats. PDF is recommended for most job applications as it preserves your formatting.",
              },
              {
                question: "Is the resume builder free to use?",
                answer:
                  "We offer both free and premium options. The free version includes basic templates and features, while the premium version provides access to all templates, advanced features, and unlimited downloads.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className={`border-b border-gray-200 py-8 hover:bg-gray-50 px-6 rounded-lg transition-all duration-300 ${isVisible["faq-list"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4 hover:text-orange-500 transition-colors duration-300">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center" data-animate id="cta-section">
            <div
              className={`transition-all duration-1000 ${isVisible["cta-section"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Land Your Dream Job?</h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
                Create a professional resume in minutes and increase your chances of getting hired.
              </p>
              <button className="group bg-white hover:bg-gray-100 text-orange-500 px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl transform">
                <span className="flex items-center justify-center gap-2">
                  Build My Resume Now
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 hover:scale-105 transition-transform duration-300">
                resume<span className="text-orange-500">genius</span>
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Professional resume builder helping job seekers land their dream jobs since 2015.
              </p>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 transform"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: "Resume Builder",
                links: [
                  "Create Resume",
                  "Resume Templates",
                  "Resume Examples",
                  "Resume Format",
                  "How to Write a Resume",
                ],
              },
              {
                title: "Cover Letters",
                links: [
                  "Create Cover Letter",
                  "Cover Letter Templates",
                  "Cover Letter Examples",
                  "Cover Letter Format",
                  "How to Write a Cover Letter",
                ],
              },
              {
                title: "Resources",
                links: ["Job Search Tips", "Interview Preparation", "Career Advice", "Blog", "Help Center"],
              },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-bold mb-4 text-lg">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 transform inline-block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} ResumeGenius. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {["Privacy Policy", "Terms of Service", "Contact Us"].map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300 text-sm hover:scale-105 transform"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ResumeBuilderLanding
