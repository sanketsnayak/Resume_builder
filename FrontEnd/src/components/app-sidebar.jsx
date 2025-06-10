import { BarChart3, CreditCard, DollarSign, FileText, Home, Search, Settings, TrendingUp, Users, Zap } from "lucide-react"
import { useState } from "react"
import { UserButton } from "@clerk/clerk-react"
import { useUser } from "@clerk/clerk-react"

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    isActive: true,
  },
  {
    title: "Create Resume",
    icon: BarChart3,
    isActive: false,
  },
  {
    title: "Resume Templates",
    icon: CreditCard,
    isActive: false,
  },
  {
    title: "linkedIn Resume",
    icon: TrendingUp,
    isActive: false,
  },
  {
    title: "Spend Groups",
    icon: Users,
    isActive: false,
  },
  {
    title: "Integrations",
    icon: Zap,
    isActive: false,
  },
  {
    title: "Payees",
    icon: Users,
    isActive: false,
  },
  {
    title: "Invoices",
    icon: FileText,
    isActive: false,
  },
]

export function AppSidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard")
  const {user} = useUser()
  console.log(user)
  
  return (
    <div className="w-64 h-screen bg-gradient-to-b from-white to-gray-50 border-r border-gray-200/50 shadow-lg flex flex-col">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-200/50 bg-white/80 backdrop-blur-sm">
        {/* User Profile */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl blur opacity-20"></div>
            <div className="relative w-10 h-10 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl flex items-center justify-center border border-orange-200/50">
              <UserButton/>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{user?.fullName}</h3>
          </div>
          <button className="ml-auto text-gray-400 hover:text-orange-600 transition-colors duration-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-8 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-300 transition-all duration-200 shadow-sm"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 font-mono bg-gray-100 px-1.5 py-0.5 rounded">/</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.title}>
              <button
                onClick={() => setActiveItem(item.title)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                  activeItem === item.title
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-[1.02]"
                    : "text-gray-600 hover:bg-white/80 hover:text-gray-900 hover:shadow-sm"
                }`}
              >
                <item.icon className={`w-5 h-5 transition-transform duration-200 ${
                  activeItem === item.title 
                    ? "text-white" 
                    : "text-gray-500 group-hover:text-orange-600 group-hover:scale-110"
                }`} />
                <span className="font-medium">{item.title}</span>
                {activeItem === item.title && (
                  <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content Preview */}
      <div className="p-6 bg-gradient-to-br from-gray-50 to-white border-t border-gray-200/50">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 font-medium">Hey, {user?.firstName}!</span>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">Monday, October 23, 2023</span>
          </div>
        </div>
      </div>
    </div>
  )
}