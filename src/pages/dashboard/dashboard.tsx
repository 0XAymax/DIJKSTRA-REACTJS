import { Link, useNavigate } from "react-router-dom";
import { Book, BookOpen, Clock, Home, LayoutDashboard, LineChart, LogOut, Settings } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Logo from "@/components/ui/Logo";
import { useAuth } from "@/context/AuthContext";
import SkillServices from "@/api/skill.service";
import React, { useEffect, useState } from "react";
import { useCourse } from "@/context/CourseContext";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  
  interface Skill {
    id: string;
    name: string;
    progress: number;
    total: number;
  }

  const [skills, setSkills] = useState<Skill[]>([]);
  const navigate = useNavigate();
  const { courses } = useCourse();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleViewUnits = () => {
    navigate("/units");
  };

  useEffect(() => {
    const fetchSkills = async () => {
      if (currentUser?.id) {
        try {
          const data = await SkillServices.getUserSkill(currentUser.id);
          console.log("Skills data from API:", data);
          setSkills(data);
        } catch (error) {
          console.error("Erreur lors du chargement des skills :", error);
        }
      }
    };
    fetchSkills();
  }, [currentUser]);

  // Configuration du graph aléatoire
  const graphNodes = [
    { id: 1, cx: 40, cy: 60 },
    { id: 2, cx: 100, cy: 30 },
    { id: 3, cx: 160, cy: 60 },
    { id: 4, cx: 100, cy: 90 }
  ];

  const graphEdges = [
    { id: 1, x1: 40, y1: 60, x2: 100, y2: 30 },
    { id: 2, x1: 100, y1: 30, x2: 160, y2: 60 },
    { id: 3, x1: 160, y1: 60, x2: 100, y2: 90 },
    { id: 4, x1: 100, y1: 90, x2: 40, y2: 60 },
    { id: 5, x1: 40, y1: 60, x2: 160, y2: 60, dashed: true }
  ];

  return (
    <div className="min-h-screen w-full font-sans">
      <header className="border-b border-purple-700 bg-white shadow-sm">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2 ml-4">
            <Logo width={170} height={170} className="filter contrast-150 brightness-70" />
          </div>

          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link
                  to="#"
                  className="flex items-center gap-2 text-gray-600 hover:text-purple-700 transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="#" className="flex items-center gap-2 text-purple-700 border-b-2 border-purple-700 pb-1">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex items-center gap-2 text-gray-600 hover:text-purple-700 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-3 mr-4">
            <span className="hidden text-sm text-gray-600 md:block">{currentUser?.email}</span>
            <Avatar className="h-8 w-8 border border-dashed border-gray-300">
              <AvatarFallback className="bg-purple-50 text-purple-700">{getInitials(currentUser?.name || '')}</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:text-purple-700 cursor-pointer" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      
      <div className="w-full px-6 py-8 overflow-y-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1 space-y-8">
            <div className="rounded-lg border border-purple-700 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-lg font-bold text-gray-800">Your Progress</h2>

              <div className="space-y-5">
                {skills.length > 0 ? (
                  skills.map((skill) => {
                    const progress = Number(skill.progress) || 0;
                    const total = Number(skill.total) || 1;
                    const percentage = Math.min((progress / total) * 100, 100);

                    return (
                      <div key={skill.id}>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-xs font-medium text-purple-700">
                            {progress}/{total}
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2 sketch-progress" />
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500">No skills yet.</p>
                )}
              </div>

              <Separator className="my-6 border-dashed" />

              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-500 uppercase tracking-wider">Current Course</h3>
                <p className="mb-3 font-medium text-gray-800">Dijkstra's Algorithm</p>

                <div className="mb-4 flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-purple-400" />
                    <span className="text-xs text-gray-600">~3 hours left</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4 text-purple-400" />
                    <span className="text-xs text-gray-600">50% complete</span>
                  </div>
                </div>

                <Progress value={50} className="h-2 sketch-progress" />
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <section>
              <div className="flex items-center justify-between mb-14">
                <h2 className="text-2xl font-bold text-gray-800">Courses</h2>
                <Button 
                  variant="ghost" 
                  className="text-sm text-purple-700 hover:text-purple-800 hover:bg-purple-50"
                  onClick={handleViewUnits}
                >
                  View all units
                </Button>
              </div>
              
              {courses.map((course) => (
                <Card className="border border-purple-700 sketch-card overflow-hidden mb-6" key={course.id}>
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="bg-purple-50 p-6 md:col-span-1">
                      <div className="aspect-video w-full rounded-lg bg-white sketch-image flex items-center justify-center p-4">
                        <motion.svg 
                          width="100%" 
                          height="100%" 
                          viewBox="0 0 200 120"
                          initial="hidden"
                          animate="visible"
                        >
                          {graphEdges.map((edge) => (
                            <motion.line
                              key={edge.id}
                              x1={edge.x1}
                              y1={edge.y1}
                              x2={edge.x2}
                              y2={edge.y2}
                              stroke="#8b5cf6"
                              strokeWidth="2"
                              strokeDasharray={edge.dashed ? "4 2" : "0"}
                              variants={{
                                hidden: { opacity: 0, pathLength: 0 },
                                visible: { 
                                  opacity: 1, 
                                  pathLength: 1,
                                  transition: { 
                                    delay: edge.id * 0.2,
                                    duration: 0.8,
                                    ease: "easeInOut"
                                  }
                                }
                              }}
                            />
                          ))}
                          
                          {graphNodes.map((node) => (
                            <motion.circle
                              key={node.id}
                              cx={node.cx}
                              cy={node.cy}
                              r="10"
                              fill="#8b5cf6"
                              variants={{
                                hidden: { opacity: 0, scale: 0 },
                                visible: { 
                                  opacity: 1, 
                                  scale: 1,
                                  transition: { 
                                    delay: node.id * 0.1,
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 10
                                  }
                                }
                              }}
                            />
                          ))}
                        </motion.svg>
                      </div>
                    </div>

                    <div className="p-6 md:col-span-2">
                      <CardHeader className="p-0 pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl text-gray-800">{course.name}</CardTitle>
                        </div>
                        <CardDescription className="flex items-center gap-6 pt-3">
                          <div className="flex items-center gap-2">
                            <Book className="h-4 w-4 text-purple-500" />
                            <span className="text-gray-600">8 lessons</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <LineChart className="h-4 w-4 text-purple-500" />
                            <span className="text-gray-600">4 practice sessions</span>
                          </div>
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="p-0 pb-6">
                        <p className="text-gray-600 leading-relaxed">
                          {course.description}
                        </p>
                      </CardContent>

                      <CardFooter className="flex-col items-start gap-5 p-0">
                        <Link to="/learning">
                          <Button className="sketch-button px-6 bg-purple-700 hover:bg-purple-800 cursor-pointer">Continue Learning</Button>
                        </Link>
                        <div className="w-full">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs text-gray-500">Progress</span>
                            <span className="text-xs font-medium text-purple-700">50%</span>
                          </div>
                          <Progress value={50} className="h-2 sketch-progress" />
                        </div>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}