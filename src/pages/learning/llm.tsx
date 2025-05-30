import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, MessageCircle, X, Minimize2, Maximize2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLLMContext } from "@/context/LLMContext"

export function LLMComponent() {
  const { isOpen, setIsOpen, messages,isLoading,inputRef,inputValue,setInputValue,handleSendMessage } = useLLMContext();
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (!inputValue.trim() || isLoading) return
      handleSendMessage(inputValue.trim());
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleSending = () => {
    if (!inputValue.trim() || isLoading) return
    handleSendMessage(inputValue.trim());
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full p-2 shadow-lg bg-primary text-primary-foreground"
      >
        <MessageCircle className="h-6 w-6" />
        {messages.length > 1 && (
          <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full text-xs px-2 py-0.5">
            {messages.length}
          </div>
        )}
      </Button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className={`flex flex-col w-full max-w-4xl mx-auto rounded-lg shadow-lg bg-white border border-purple-700 ${
          isMinimized ? "h-auto" : "h-[80vh] min-h-[500px]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-2 p-4 border-b border-purple-700 bg-gray-50">
          <Bot className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">Vertex0</h2>
          <div className="ml-auto flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? (
                <Maximize2 className="h-4 w-4 text-gray-700" />
              ) : (
                <Minimize2 className="h-4 w-4 text-gray-700" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4 text-gray-700" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <ScrollArea className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4 max-w-full">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    } w-full`}
                  >
                    {message.sender === "ai" && (
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] rounded-lg p-3 break-words overflow-hidden ${
                        message.sender === "user"
                          ? "bg-purple-700 text-white"
                          : "bg-gray-100 text-gray-900 border border-purple-200"
                      }`}
                    >
                      <div className="overflow-x-auto">
                        <p className="text-sm whitespace-pre-wrap break-words">
                          {message.content}
                        </p>
                      </div>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "user"
                            ? "text-purple-200"
                            : "text-gray-500"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>

                    {message.sender === "user" && (
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-purple-700 flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 border border-purple-200">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-purple-700 bg-gray-50">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask your question about Dijkstra..."
                  disabled={isLoading}
                  className="flex-1 bg-white text-black border-purple-200 focus:border-purple-700"
                />
                <Button
                  onClick={handleSending}
                  disabled={!inputValue.trim() || isLoading}
                  size="icon"
                  className="bg-purple-700 hover:bg-purple-800 text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Press Enter to send</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LLMComponent