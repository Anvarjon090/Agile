"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Dashboard } from "@/components/dashboard"
import { KanbanBoard } from "@/components/kanban-board"
import { TaskDetail } from "@/components/task-detail"
import { ProjectSettings } from "@/components/project-settings"
import { ThemeProvider } from "@/components/theme-provider"

export type View = "dashboard" | "kanban" | "task" | "settings"

export type Task = {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "review" | "done"
  priority: "low" | "medium" | "high" | "urgent"
  assignee: string
  project: string
  tags: string[]
  createdAt: string
  updatedAt: string
  comments: Comment[]
}

export type Comment = {
  id: string
  author: string
  content: string
  createdAt: string
}

export type Project = {
  id: string
  name: string
  description: string
  color: string
  members: string[]
  taskCount: number
  completedTasks: number
}

export default function TaskManagementApp() {
  const [currentView, setCurrentView] = useState<View>("dashboard")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      id: "1",
      name: "Website Redesign",
      description: "Complete overhaul of company website",
      color: "bg-purple-500",
      members: ["Alice", "Bob", "Charlie"],
      taskCount: 12,
      completedTasks: 8,
    },
    {
      id: "2",
      name: "Mobile App",
      description: "iOS and Android app development",
      color: "bg-blue-500",
      members: ["David", "Eve", "Frank"],
      taskCount: 18,
      completedTasks: 5,
    },
    {
      id: "3",
      name: "Marketing Campaign",
      description: "Q1 marketing initiatives",
      color: "bg-orange-500",
      members: ["Grace", "Henry"],
      taskCount: 7,
      completedTasks: 3,
    },
  ]

  const tasks: Task[] = [
    {
      id: "1",
      title: "Design new homepage layout",
      description: "Create wireframes and mockups for the new homepage design",
      status: "in-progress",
      priority: "high",
      assignee: "Alice",
      project: "Website Redesign",
      tags: ["design", "frontend"],
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
      comments: [
        {
          id: "1",
          author: "Bob",
          content: "Looking great! Can we add more whitespace?",
          createdAt: "2024-01-18",
        },
      ],
    },
    {
      id: "2",
      title: "Implement user authentication",
      description: "Set up login and registration functionality",
      status: "todo",
      priority: "urgent",
      assignee: "Charlie",
      project: "Website Redesign",
      tags: ["backend", "security"],
      createdAt: "2024-01-16",
      updatedAt: "2024-01-16",
      comments: [],
    },
    {
      id: "3",
      title: "Create mobile wireframes",
      description: "Design wireframes for iOS and Android apps",
      status: "review",
      priority: "medium",
      assignee: "David",
      project: "Mobile App",
      tags: ["design", "mobile"],
      createdAt: "2024-01-14",
      updatedAt: "2024-01-19",
      comments: [],
    },
    {
      id: "4",
      title: "Setup CI/CD pipeline",
      description: "Configure automated testing and deployment",
      status: "done",
      priority: "medium",
      assignee: "Eve",
      project: "Mobile App",
      tags: ["devops", "automation"],
      createdAt: "2024-01-10",
      updatedAt: "2024-01-17",
      comments: [],
    },
  ]

  const handleViewChange = (view: View, task?: Task, project?: Project) => {
    setCurrentView(view)
    if (task) setSelectedTask(task)
    if (project) setSelectedProject(project)
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard projects={projects} onViewChange={handleViewChange} />
      case "kanban":
        return <KanbanBoard tasks={tasks} onTaskClick={(task) => handleViewChange("task", task)} />
      case "task":
        return selectedTask ? <TaskDetail task={selectedTask} onBack={() => setCurrentView("kanban")} /> : null
      case "settings":
        return selectedProject ? (
          <ProjectSettings project={selectedProject} onBack={() => setCurrentView("dashboard")} />
        ) : null
      default:
        return <Dashboard projects={projects} onViewChange={handleViewChange} />
    }
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <AppSidebar currentView={currentView} onViewChange={handleViewChange} />
          <main className="flex-1 overflow-hidden">{renderCurrentView()}</main>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}
