
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
    title: "Accounts",
    icon: BarChart3,
    isActive: false,
  },
  {
    title: "Cards",
    icon: CreditCard,
    isActive: false,
  },
  {
    title: "Transaction",
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
  const {user}=useUser()
  console.log(user)
  return (
    <div className="w-64 h-screen bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-200">
        {/* User Profile */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-stone-200 rounded-lg flex items-center justify-center">
            <UserButton/>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{user.fullName}</h3>
            
          </div>
          <button className="ml-auto text-gray-400 hover:text-gray-600">
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
            className="w-full pl-10 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 font-mono">/</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.title}>
              <button
                onClick={() => setActiveItem(item.title)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors duration-200 ${
                  activeItem === item.title
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content Preview */}
      <div className="flex-1 p-6 bg-white">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Hey, {user.firstName}!</span>
            <span className="text-sm text-gray-400">Monday, October 23, 2023</span>
          </div>
        </div>

        {/* Available Balance Card */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Available Balance</h3>
            <div className="w-16 h-8">
              <svg viewBox="0 0 64 32" className="w-full h-full">
                <path
                  d="M0,16 Q8,8 16,12 T32,16 T48,20 T64,16"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  className="opacity-60"
                />
              </svg>
            </div>
          </div>
          
          <div className="mb-2">
            <span className="text-4xl font-bold text-gray-900">$19,453.43</span>
          </div>
          
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-green-500">3%</span>
            <span className="text-sm text-gray-500">vs last month</span>
          </div>
        </div>

        {/* Spend Activity */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Spend Activity</h3>
          <div className="text-2xl font-bold text-gray-500">1.2k</div>
        </div>
      </div>
    </div>
  )
}