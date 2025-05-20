import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Logo from "@/components/ui/Logo";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center ml-4">
            <Logo width={160} height={160} className="filter contrast-150 brightness-70"/>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4 mr-4 flex-shrink-0">
            <Link to="/login">
              <Button variant="outline" className="xs:flex text-xs sm:text-sm px-2 sm:px-4 cursor-pointer whitespace-nowrap">
                Log in
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button className="bg-purple-600 hover:bg-purple-700 text-xs sm:text-sm px-2 sm:px-4 cursor-pointer whitespace-nowrap">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-25">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 px-3 py-1 text-sm">
                    AI-Powered Learning
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Master Computer Science with Your Personal AI Tutor
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    DijkstraVerse uses advanced AI to create personalized
                    learning paths, explain complex concepts, and help you excel
                    in algorithms, data structures, and more.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                  <Link to="/sign-up">
                      <Button className="bg-purple-600 hover:bg-purple-700 px-8 cursor-pointer">
                       Start Learning
                       <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-pink-100 rounded-3xl transform -rotate-1 animate-pulse"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-xl border-2 border-indigo-100">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Brain className="h-6 w-6 text-indigo-600 animate-bounce" />
                        <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full"></div>
                      </div>
                      <span className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        AI Assistant
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-600 font-medium">Online</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <p className="text-sm font-medium">
                        Can you help me understand recursion in programming?
                      </p>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                      <p className="text-sm leading-relaxed">
                        Think of recursion like a Russian nesting doll - each doll contains a smaller version of itself! In programming, it's when a function calls itself to solve smaller instances of the same problem.
                      </p>
                      <div className="mt-3 flex gap-2">
                        <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200">Example</Badge>
                        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">Practice</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="What would you like to learn?"
                        className="w-full px-4 py-3 text-sm border-2 border-indigo-100 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 pr-12"
                      />
                      <Button
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 px-3 py-1 text-sm">
                  How It Works
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Learning Made Simple
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get started with DijkstraVerse in just a few simple steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
              {[
                {
                  step: "01",
                  title: "Create an Account",
                  description:
                    "Sign up for free and set up your profile with your learning goals and preferences.",
                },
                {
                  step: "02",
                  title: "Choose Your Path",
                  description:
                    "Select from various CS topics or let our AI recommend a personalized learning path.",
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
                  className="flex flex-col items-center text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-900 font-bold text-xl">
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
      <footer className="border-t bg-background">
        <div className="container px-4 py-12 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center ">
                <Logo width={150} height={150} className="filter contrast-150 brightness-70"/>
              </div>
              <p className="text-sm text-gray-500">
                Making computer science education accessible, engaging, and
                effective through AI.
              </p>
              <div className="flex gap-4 mt-4">
                <Link to="#" className="text-gray-500 hover:text-purple-600">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link to="#" className="text-gray-500 hover:text-purple-600">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link to="#" className="text-gray-500 hover:text-purple-600">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium">Product</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li>
                  <Link to="#" className="hover:text-purple-600">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-purple-600">
                    Testimonials
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Resources</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li>
                  <Link to="#" className="hover:text-purple-600">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-purple-600">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-purple-600">
                    Community
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-purple-600">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li>
                  <Link to="#" className="hover:text-purple-600">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-purple-600">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-purple-600">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-purple-600">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} DijkstraVerse. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}