"use client"

import { useState } from "react"
import { Plus, Filter, Search, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Task } from "@/app/page"

interface KanbanBoardProps {
  tasks: Task[]
  onTaskClick: (task: Task) => void
}

const columns = [
  { id: "todo", title: "To Do", color: "bg-slate-100 dark:bg-slate-800" },
  { id: "in-progress", title: "In Progress", color: "bg-blue-50 dark:bg-blue-900/20" },
  { id: "review", title: "Review", color: "bg-orange-50 dark:bg-orange-900/20" },
  { id: "done", title: "Done", color: "bg-green-50 dark:bg-green-900/20" },
]

const priorityColors = {
  low: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
  medium: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  high: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  urgent: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
}

export function KanbanBoard({ tasks, onTaskClick }: KanbanBoardProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getTasksByStatus = (status: string) => {
    return filteredTasks.filter((task) => task.status === status)
  }

  return (
    <div className="p-8 h-full flex flex-col max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Kanban Board</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your tasks with drag and drop</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>
          <Button variant="outline" className="rounded-xl border-slate-200 dark:border-slate-700 bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-6 h-full min-w-max">
          {columns.map((column) => {
            const columnTasks = getTasksByStatus(column.id)
            return (
              <div key={column.id} className="flex-shrink-0 w-80">
                <div className={`${column.color} rounded-2xl p-4 h-full flex flex-col`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100">{column.title}</h3>
                      <Badge
                        variant="secondary"
                        className="bg-white/50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 rounded-lg"
                      >
                        {columnTasks.length}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-3 flex-1 overflow-y-auto">
                    {columnTasks.map((task) => (
                      <Card
                        key={task.id}
                        className="border-0 shadow-sm bg-white dark:bg-slate-800 rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer group"
                        onClick={() => onTaskClick(task)}
                      >
                        <CardHeader className="p-4 pb-2">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                              {task.title}
                            </h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreHorizontal className="w-3 h-3" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                            {task.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge className={`text-xs rounded-lg ${priorityColors[task.priority]}`}>
                                {task.priority}
                              </Badge>
                              {task.tags.slice(0, 2).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs rounded-lg border-slate-200 dark:border-slate-600"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-400 text-white text-xs">
                                {task.assignee[0]}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Floating Action Button */}
      <Button className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-200 hover:scale-110">
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  )
}
