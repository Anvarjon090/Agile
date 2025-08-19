"use client"

import { ArrowLeft, Users, Settings, Trash2, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/app/page"

interface ProjectSettingsProps {
  project: Project
  onBack: () => void
}

export function ProjectSettings({ project, onBack }: ProjectSettingsProps) {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="rounded-xl">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Project Settings</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">{project.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Settings */}
          <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name" className="text-slate-700 dark:text-slate-300">
                  Project Name
                </Label>
                <Input
                  id="project-name"
                  defaultValue={project.name}
                  className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-description" className="text-slate-700 dark:text-slate-300">
                  Description
                </Label>
                <Textarea
                  id="project-description"
                  defaultValue={project.description}
                  className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 rounded-xl"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">Project Color</Label>
                <div className="flex gap-3">
                  {["bg-purple-500", "bg-blue-500", "bg-green-500", "bg-orange-500", "bg-red-500", "bg-pink-500"].map(
                    (color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 ${color} rounded-lg border-2 ${project.color === color ? "border-slate-900 dark:border-slate-100" : "border-transparent"} hover:scale-110 transition-transform`}
                      />
                    ),
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl">
                  Save Changes
                </Button>
                <Button variant="outline" className="rounded-xl border-slate-200 dark:border-slate-700 bg-transparent">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 rounded-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team Members ({project.members.length})
                </CardTitle>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Member
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.members.map((member, index) => (
                <div
                  key={member}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-400 text-white">
                        {member[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">{member}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{member.toLowerCase()}@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="rounded-lg border-slate-200 dark:border-slate-600">
                      {index === 0 ? "Admin" : "Member"}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-8 h-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Stats */}
          <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">Project Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">Total Tasks</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">{project.taskCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">Completed</span>
                <span className="font-semibold text-green-600 dark:text-green-400">{project.completedTasks}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">In Progress</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {project.taskCount - project.completedTasks}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">Team Size</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">{project.members.length}</span>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 rounded-2xl border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-red-600 dark:text-red-400">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Once you delete a project, there is no going back. Please be certain.
              </p>
              <Button variant="destructive" className="w-full rounded-xl">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Project
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
