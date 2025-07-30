"use client"

import { Home, Kanban, Settings, Search, Plus, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { View } from "@/app/page"

interface AppSidebarProps {
  currentView: View
  onViewChange: (view: View) => void
}

export function AppSidebar({ currentView, onViewChange }: AppSidebarProps) {
  const { theme, setTheme } = useTheme()

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      view: "dashboard" as View,
    },
    {
      title: "Kanban Board",
      icon: Kanban,
      view: "kanban" as View,
    },
    {
      title: "Settings",
      icon: Settings,
      view: "settings" as View,
    },
  ]

  return (
    <Sidebar className="border-r border-slate-200 dark:border-slate-700">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <div>
            <h1 className="font-semibold text-slate-900 dark:text-slate-100">TaskFlow</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Project Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search tasks..."
              className="pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-600 dark:text-slate-300 font-medium">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => onViewChange(item.view)}
                    isActive={currentView === item.view}
                    className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 data-[active=true]:bg-purple-100 dark:data-[active=true]:bg-purple-900/30 data-[active=true]:text-purple-700 dark:data-[active=true]:text-purple-300"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4" />

        <SidebarGroup>
          <div className="flex items-center justify-between">
            <SidebarGroupLabel className="text-slate-600 dark:text-slate-300 font-medium">
              Recent Projects
            </SidebarGroupLabel>
            <Button size="sm" variant="ghost" className="w-6 h-6 p-0 rounded-lg">
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Website Redesign</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Mobile App</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Marketing Campaign</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-purple-100 text-purple-700 text-sm">JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">John Doe</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">john@example.com</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-8 h-8 p-0 rounded-lg"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
