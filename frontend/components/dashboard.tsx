"use client"

import { Plus, Users, Calendar, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { Project, View } from "@/app/page"

interface DashboardProps {
  projects: Project[]
  onViewChange: (view: View, task?: any, project?: Project) => void
}

export function Dashboard({ projects, onViewChange }: DashboardProps) {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Welcome back! Here's what's happening with your projects.
          </p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Total Projects</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">{projects.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Active Tasks</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {projects.reduce((acc, p) => acc + (p.taskCount - p.completedTasks), 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {projects.reduce((acc, p) => acc + p.completedTasks, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Team Members</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {new Set(projects.flatMap((p) => p.members)).size}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Your Projects</h2>
          <Button variant="outline" className="rounded-xl border-slate-200 dark:border-slate-700 bg-transparent">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="border-0 shadow-lg bg-white dark:bg-slate-800 rounded-2xl hover:shadow-xl transition-all duration-200 cursor-pointer group"
              onClick={() => onViewChange("kanban")}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`w-4 h-4 ${project.color} rounded-full`}></div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                    onClick={(e) => {
                      e.stopPropagation()
                      onViewChange("settings", undefined, project)
                    }}
                  >
                    <Users className="w-4 h-4" />
                  </Button>
                </div>
                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {project.name}
                </CardTitle>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{project.description}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Progress</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      {Math.round((project.completedTasks / project.taskCount) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={(project.completedTasks / project.taskCount) * 100}
                    className="h-2 bg-slate-100 dark:bg-slate-700"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg"
                      >
                        {project.taskCount} tasks
                      </Badge>
                    </div>
                    <div className="flex -space-x-2">
                      {project.members.slice(0, 3).map((member, index) => (
                        <div
                          key={member}
                          className="w-6 h-6 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs text-white font-medium"
                        >
                          {member[0]}
                        </div>
                      ))}
                      {project.members.length > 3 && (
                        <div className="w-6 h-6 bg-slate-300 dark:bg-slate-600 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs text-slate-600 dark:text-slate-300 font-medium">
                          +{project.members.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
