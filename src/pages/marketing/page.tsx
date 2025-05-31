"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Brain, Code, Zap, X, MessageSquare, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Logo from "@/components/ui/Logo"
import { useAuth } from "@/context/AuthContext"

export default function Home() {
  const { isAuthenticated } = useAuth()

  // État pour les animations
  const [isVisible, setIsVisible] = useState({
    hero: false,
    vertex0: false,
    howItWorks: false,
    footer: false,
  })

  // État pour le composant Vertex0
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: "user",
      content: "Can you help me understand recursion in programming?",
    },
    {
      type: "ai",
      content:
        "Think of recursion like a Russian nesting doll - each doll contains a smaller version of itself! In programming, it's when a function calls itself to solve smaller instances of the same problem.",
      badges: ["Example", "Practice"],
    },
  ])
  const [showChat, setShowChat] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [hoverCard, setHoverCard] = useState<number | null>(null)

  // Questions suggérées pour l'interaction
  const suggestedQuestions = [
    "How do sorting algorithms work?",
    "Explain Big O notation simply",
    "What are data structures?",
    "Help me understand binary trees",
  ]

  // Réponses prédéfinies pour la démo
  const predefinedResponses = {
    "How do sorting algorithms work?": {
      content:
        "Sorting algorithms arrange elements in a specific order. Popular ones include Bubble Sort (simple but inefficient), Quick Sort (divide and conquer, very efficient), and Merge Sort (stable and reliable for large datasets).",
      badges: ["Visualize", "Compare"],
    },
    "Explain Big O notation simply": {
      content:
        "Big O notation describes how code performance scales as input size grows. O(1) is constant time (great!), O(n) scales linearly with input size, O(n²) is quadratic (avoid for large inputs), and O(log n) is logarithmic (efficient for large datasets).",
      badges: ["Examples", "Practice"],
    },
    "What are data structures?": {
      content:
        "Data structures are specialized formats for organizing and storing data. Common ones include arrays (sequential), linked lists (nodes with pointers), stacks (LIFO), queues (FIFO), trees (hierarchical), and hash tables (key-value pairs).",
      badges: ["Visualize", "Compare"],
    },
    "Help me understand binary trees": {
      content:
        "Binary trees are hierarchical structures where each node has at most two children (left and right). They're used for efficient searching, sorting, and representing hierarchical relationships. Binary search trees maintain a special ordering property for fast lookups.",
      badges: ["Example", "Practice"],
    },
  }

  // Fonction pour simuler l'envoi d'un message
  interface UserMessage {
    type: "user";
    content: string;
  }

  interface AiMessage {
    type: "ai";
    content: string;
    badges?: string[];
  }


  interface PredefinedResponse {
    content: string;
    badges: string[];
  }

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Ajouter le message de l'utilisateur
    const userMessage: UserMessage = { type: "user", content: inputValue };
    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simuler une réponse après un délai
    setTimeout(() => {
      const response: PredefinedResponse =
        inputValue in predefinedResponses
          ? predefinedResponses[inputValue as keyof typeof predefinedResponses]
          : {
              content: `For more information, create your account and start your learning journey! `,
              badges: ["Learn More"],
            };

      setMessages((prev) => [
        ...prev,
        {
          type: "ai" as const,
          content: response.content,
          badges: response.badges,
        } as AiMessage,
      ]);
      setIsTyping(false);
    }, 1500);
  };

  // Fonction pour utiliser une question suggérée
  const handleSuggestedQuestion = (question: keyof typeof predefinedResponses) => {
    setInputValue(question)
    const userMessage = { type: "user", content: question }
    setMessages([...messages, userMessage])
    setIsTyping(true)

    // Simuler une réponse après un délai
    setTimeout(() => {
      const response = predefinedResponses[question]
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: response.content,
          badges: response.badges,
        },
      ])
      setIsTyping(false)
    }, 1500)
  }

  // Animation pour les étapes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Animations d'apparition au scroll et au chargement
  useEffect(() => {
    // Animation d'apparition progressive au chargement
    const timeouts = [
      setTimeout(() => setIsVisible((prev) => ({ ...prev, hero: true })), 200),
      setTimeout(() => setIsVisible((prev) => ({ ...prev, vertex0: true })), 600),
      setTimeout(() => setIsVisible((prev) => ({ ...prev, howItWorks: true })), 1000),
      setTimeout(() => setIsVisible((prev) => ({ ...prev, footer: true })), 1400),
    ]

    // Observer pour les animations au scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target.getAttribute("data-section")
            if (section) {
              setIsVisible((prev) => ({ ...prev, [section]: true }))
            }
          }
        })
      },
      { threshold: 0.1 },
    )

    // Observer les sections
    const sections = document.querySelectorAll("[data-section]")
    sections.forEach((section) => observer.observe(section))

    return () => {
      timeouts.forEach(clearTimeout)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-white via-purple-50/10 to-cyan-50/10 relative overflow-hidden">
      {/* Éléments d'animation de fond */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-300/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-bl from-cyan-300/5 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-purple-200/3 to-cyan-200/3 rounded-full blur-2xl animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Particules flottantes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-300/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm animate-slideDown">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center ml-4 group">
            <Logo
              width={160}
              height={160}
              className="filter contrast-150 brightness-70 transition-all duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4 mr-4 flex-shrink-0">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button
                  variant="outline"
                  className="xs:flex text-xs sm:text-sm px-2 sm:px-4 cursor-pointer whitespace-nowrap"
                >
                  Log in
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button
                  variant="outline"
                  className="xs:flex text-xs sm:text-sm px-2 sm:px-4 cursor-pointer whitespace-nowrap"
                >
                  Log in
                </Button>
              </Link>
            )}
            <Link to="/sign-up">
              <Button className="bg-purple-600 hover:bg-purple-700 text-xs sm:text-sm px-2 sm:px-4 cursor-pointer whitespace-nowrap">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-25" data-section="hero">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div
                className={`flex flex-col justify-center space-y-6 transition-all duration-1000 ${isVisible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              >
                <div className="space-y-4">
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 px-3 py-1 text-sm animate-fadeInUp">
                    AI-Powered Learning
                  </Badge>
                  <h1
                    className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none animate-fadeInUp"
                    style={{ animationDelay: "0.2s" }}
                  >
                    Master Computer Science with Your Personal AI Tutor
                  </h1>
                  <p
                    className="max-w-[600px] text-gray-500 md:text-xl animate-fadeInUp"
                    style={{ animationDelay: "0.4s" }}
                  >
                    DijkstraVerse uses advanced AI to create personalized learning paths, explain complex concepts, and
                    help you excel in algorithms, data structures, and more.
                  </p>
                </div>
                <div 
                  className="flex flex-col gap-2 min-[400px]:flex-row justify-center animate-fadeInUp"
                  style={{ animationDelay: "0.6s" }}
                >
                  <Link to="/sign-up">
                    <Button className="bg-purple-600 hover:bg-purple-700 px-8 cursor-pointer">
                      Start Learning
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Composant Vertex0 avec nouveau background */}
              <div
                className={`mx-auto lg:mx-0 relative transition-all duration-1000 ${isVisible.vertex0 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
                data-section="vertex0"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-400/20 via-purple-500/15 to-fuchsia-400/20 rounded-3xl transform -rotate-1 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-violet-50/90 via-purple-50/80 to-fuchsia-50/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border-2 border-violet-200/50">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="relative cursor-pointer group" onClick={() => setIsExpanded(!isExpanded)}>
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-full animate-spin-slow opacity-75"></div>
                        <div className="relative bg-white rounded-full p-2">
                          <Brain className="h-6 w-6 text-violet-600 group-hover:text-fuchsia-600 transition-colors duration-300" />
                        </div>
                        <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                      <div>
                        <span className="font-bold text-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                          Vertex0
                        </span>
                        <div className="text-xs text-gray-500">Your AI Learning Companion</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 cursor-pointer hover:bg-violet-50 p-1 rounded-full transition-colors duration-300">
                        <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-green-600 font-medium">Online</span>
                      </div>
                      <button
                        onClick={() => setShowChat(!showChat)}
                        className="p-1 rounded-full hover:bg-violet-50 transition-colors duration-300"
                      >
                        {showChat ? (
                          <X className="h-4 w-4 text-gray-500" />
                        ) : (
                          <MessageSquare className="h-4 w-4 text-violet-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  {showChat && (
                    <>
                      {/* Messages */}
                      <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar">
                        {messages.map((message, index) => (
                          <div
                            key={index}
                            className={`${message.type === "user" ? "bg-gray-50 border border-gray-100" : "bg-gradient-to-r from-violet-50 to-fuchsia-50 border border-violet-100"} p-4 rounded-xl transition-all duration-300 hover:shadow-md animate-messageSlide`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            {message.type === "ai" && message.badges && (
                              <div className="mt-3 flex gap-2">
                                {message.badges.map((badge, i) => (
                                  <Badge
                                    key={i}
                                    className={`${i % 2 === 0 ? "bg-violet-100 text-violet-700 hover:bg-violet-200" : "bg-fuchsia-100 text-fuchsia-700 hover:bg-fuchsia-200"} cursor-pointer transition-all duration-300 hover:scale-105`}
                                  >
                                    {i % 2 === 0 ? <Code className="w-3 h-3 mr-1" /> : <Zap className="w-3 h-3 mr-1" />}
                                    {badge}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                        {isTyping && (
                          <div className="bg-gradient-to-r from-violet-50 to-fuchsia-50 p-4 rounded-xl border border-violet-100 animate-fadeIn">
                            <div className="flex gap-2">
                              <div className="h-2 w-2 bg-violet-400 rounded-full animate-bounce"></div>
                              <div
                                className="h-2 w-2 bg-violet-500 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                              <div
                                className="h-2 w-2 bg-violet-600 rounded-full animate-bounce"
                                style={{ animationDelay: "0.4s" }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Questions suggérées */}
                      {messages.length < 4 && (
                        <div className="mt-4 space-y-2 animate-fadeInUp" style={{ animationDelay: "0.8s" }}>
                          <p className="text-xs text-gray-500 font-medium">Suggested questions:</p>
                          <div className="flex flex-wrap gap-2">
                            {suggestedQuestions.map((question, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestedQuestion(question as keyof typeof predefinedResponses)}
                                className="text-xs bg-white border border-violet-100 text-violet-700 px-3 py-1 rounded-full hover:bg-violet-50 hover:border-violet-200 transition-all duration-300 flex items-center animate-fadeInScale"
                                style={{ animationDelay: `${index * 0.1}s` }}
                              >
                                <Lightbulb className="w-3 h-3 mr-1 text-amber-500" />
                                {question}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Input */}
                      <form
                        onSubmit={handleSendMessage}
                        className="mt-6 animate-fadeInUp"
                        style={{ animationDelay: "1s" }}
                      >
                        <div className="relative group">
                          <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="What would you like to learn?"
                            className="w-full px-4 py-3 text-sm border-2 border-violet-100 rounded-xl focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 pr-12 transition-all duration-300 group-hover:shadow-md"
                          />
                          <Button
                            type="submit"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 rounded-lg transition-all duration-300 hover:scale-105"
                          >
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16" data-section="howItWorks">
          <div className="container px-4 md:px-6">
            <div
              className={`flex flex-col items-center justify-center space-y-4 text-center transition-all duration-1000 ${isVisible.howItWorks ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="space-y-2">
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 px-3 py-1 text-sm animate-fadeInUp">
                  How It Works
                </Badge>
                <h2
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl animate-fadeInUp"
                  style={{ animationDelay: "0.2s" }}
                >
                  Learning Made Simple
                </h2>
                <p
                  className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-fadeInUp"
                  style={{ animationDelay: "0.4s" }}
                >
                  Get started with DijkstraVerse in just a few simple steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
              {[
                {
                  step: "01",
                  title: "Create an Account",
                  description: "Sign up for free and set up your profile with your learning goals and preferences.",
                },
                {
                  step: "02",
                  title: "Choose Your Path",
                  description: "Select from various CS topics or let our AI recommend a personalized learning path.",
                },
                {
                  step: "03",
                  title: "Learn & Practice",
                  description:
                    "Engage with interactive lessons, solve problems, and get instant feedback on your progress.",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center text-center p-6 rounded-xl transition-all duration-1000 cursor-pointer animate-fadeInUp ${hoverCard === index ? "bg-white shadow-xl scale-105" : "hover:bg-white hover:shadow-lg"}`}
                  style={{ animationDelay: `${0.6 + index * 0.2}s` }}
                  onMouseEnter={() => setHoverCard(index)}
                  onMouseLeave={() => setHoverCard(null)}
                >
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-900 font-bold text-xl transition-all duration-500 ${activeStep === index ? "scale-110 shadow-md animate-pulse" : ""}`}
                  >
                    {step.step}
                  </div>
                  <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-gray-500">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background" data-section="footer">
        <div
          className={`container px-4 py-12 md:px-6 transition-all duration-1000 ${isVisible.footer ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div></div>
            <div></div>
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center">
                <Logo width={150} height={150} className="filter contrast-150 brightness-70" />
              </div>
              <p className="text-sm text-gray-500">
                Making computer science education accessible, engaging, and effective through AI.
              </p>
              <div className="flex gap-4 mt-4">
                <Link to="#" className="text-gray-500 hover:text-purple-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link to="#" className="text-gray-500 hover:text-purple-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link to="#" className="text-gray-500 hover:text-purple-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-gray-500">
            <p className="text-sm text-gray-600 font-medium">
              © {new Date().getFullYear()} DijkstraVerse. All rights reserved. Made with 💜 for learners worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
