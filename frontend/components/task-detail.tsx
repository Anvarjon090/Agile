"use client"

import { ArrowLeft, Calendar, User, Tag, MessageCircle, Clock, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import type { Task } from "@/app/page"

interface TaskDetailProps {
  task: Task
  onBack: () => void
}

const priorityColors = {
  low: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
  medium: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  high: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  urgent: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
}

const statusColors = {
  todo: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
  "in-progress": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  review: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  done: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
}

export function TaskDetail({ task, onBack }: TaskDetailProps) {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="rounded-xl">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Board
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{task.title}</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">{task.project}</p>
        </div>
        <Button variant="outline" className="rounded-xl bg-transparent">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{task.description}</p>
            </CardContent>
          </Card>

          {/* Comments */}
          <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Comments ({task.comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {task.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-400 text-white text-sm">
                      {comment.author[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-slate-900 dark:text-slate-100">{comment.author}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{comment.createdAt}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">{comment.content}</p>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-400 text-white text-sm">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea
                    placeholder="Add a comment..."
                    className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 rounded-xl"
                  />
                  <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl">
                    Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Task Info */}
          <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">Task Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Assignee
                </span>
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-400 text-white text-xs">
                      {task.assignee[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-slate-900 dark:text-slate-100 font-medium">{task.assignee}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">Status</span>
                <Badge className={`rounded-lg ${statusColors[task.status]}`}>{task.status.replace("-", " ")}</Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">Priority</span>
                <Badge className={`rounded-lg ${priorityColors[task.priority]}`}>{task.priority}</Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Created
                </span>
                <span className="text-slate-900 dark:text-slate-100">{task.createdAt}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Updated
                </span>
                <span className="text-slate-900 dark:text-slate-100">{task.updatedAt}</span>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="rounded-lg border-slate-200 dark:border-slate-600">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
