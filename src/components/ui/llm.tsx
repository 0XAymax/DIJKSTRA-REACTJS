"use client"

import type React from "react"

import { useState } from "react"
import { Send, Lightbulb } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage } from "@/components/ui/avatar"
import { AvatarFallback } from "@/components/ui/avatar"

// Définition des types
interface Message {
  role: "user" | "assistant"
  content: string
}

interface GraphoAssistantProps {
  className?: string
}

export default function GraphoAssistant({ className = "" }: GraphoAssistantProps) {
  const [chatInput, setChatInput] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm Grapho, your AI assistant for this Dijkstra's algorithm course. How can I help you today?",
    },
    {
      role: "user",
      content: "What's the difference between Dijkstra and A* algorithms?",
    },
    {
      role: "assistant",
      content: `Great question! The main differences are:

- Dijkstra's algorithm finds the shortest path to all nodes from a source, while A* focuses on finding the shortest path to a specific target node
- A* uses a heuristic function to guide the search toward the target, making it more efficient for single-target pathfinding
- Dijkstra's algorithm is a special case of A* where the heuristic is zero
- A* is generally faster for point-to-point pathfinding because it explores fewer nodes

You'll learn more about A* in Unit 6 when we cover algorithm variations!`,
    },
  ])

  const handleSendMessage = (): void => {
    if (chatInput.trim() === "") return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: chatInput }])

    // Simulate AI response (in a real app, you would call your AI service here)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Thanks for your question about "${chatInput}". This is a simulated response. In a real implementation, this would be connected to your AI backend.`,
        },
      ])
    }, 1000)

    setChatInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Suggestions pour l'assistant
  const suggestions: string[] = [
    "How does Dijkstra's algorithm work?",
    "What are priority queues used for?",
    "Explain the time complexity of Dijkstra",
    "When should I use A* instead of Dijkstra?",
  ]

  return (
    <div className={`w-80 border-l border-slate-700 flex flex-col ${className}`}>
      <div className="p-4 border-b border-slate-700">
        <h2 className="font-bold mb-1">Grapho</h2>
        <p className="text-sm text-slate-300">Your AI learning assistant</p>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex items-start mb-4 ${message.role === "user" ? "justify-end" : ""}`}>
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Grapho" />
                  <AvatarFallback className="bg-blue-600">G</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg p-3 text-sm max-w-[85%] ${
                  message.role === "user" ? "bg-blue-600" : "bg-[#1e293b]"
                }`}
              >
                <p className="whitespace-pre-line">{message.content}</p>
              </div>
              {message.role === "user" && (
                <Avatar className="h-8 w-8 ml-3">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center">
          <Input
            placeholder="Ask Grapho a question..."
            className="bg-[#1e293b] border-slate-600 text-white"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button size="icon" className="ml-2 bg-blue-600 hover:bg-blue-700" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Suggestions */}
        <div className="mt-3">
          <div className="flex items-center text-xs text-slate-400 mb-2">
            <Lightbulb className="h-3 w-3 mr-1" />
            <span>Suggested questions:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="text-xs bg-[#172136] hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-md transition-colors"
                onClick={() => {
                  setChatInput(suggestion)
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div className="flex mt-3 text-xs text-slate-400 justify-between">
          <span className="text-xs text-slate-500">Type / to see commands</span>
          <div className="flex items-center">
            <span className="mr-2">Grapho Energy</span>
            <div className="flex">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-0.5"></div>
              <div className="w-2 h-2 rounded-full bg-green-500 mr-0.5"></div>
              <div className="w-2 h-2 rounded-full bg-green-500 mr-0.5"></div>
              <div className="w-2 h-2 rounded-full bg-green-500 mr-0.5"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
