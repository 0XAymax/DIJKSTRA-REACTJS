import { Link, useNavigate } from "react-router-dom"
import { Book, BookOpen, Clock,LayoutDashboard, LineChart, LogOut} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Logo from "@/components/ui/Logo"
import { useAuth } from "@/context/AuthContext"
import React, {useEffect, useState } from "react"
import { useCourse } from "@/context/CourseContext"
import type { Skill } from "@/types"
import SkillServices from "@/api/skill.service"
export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { courses } = useCourse();
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      if (!currentUser?.id) {
        console.log('No user ID found');
        return;
      };
      const prevSkill = skills;
      try {
        const response = await SkillServices.getUserSkill(currentUser?.id);
        setSkills(response.data);
      } catch (error) {
        setSkills(prevSkill);
        console.error('Error fetching skills:', error);
      }
    }
    fetchSkills();
  },[currentUser?.id, skills]);
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
                <Link to="#" className="flex items-center gap-2 text-purple-700 border-b-2 border-purple-700 pb-1">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
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
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Basics</span>
                    <span className="text-xs font-medium text-purple-700">426/800</span>
                  </div>
                  <Progress value={53} className="h-2 sketch-progress" />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Traversal</span>
                    <span className="text-xs font-medium text-purple-700">210/300</span>
                  </div>
                  <Progress value={70} className="h-2 sketch-progress" />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Paths</span>
                    <span className="text-xs font-medium text-purple-700">120/400</span>
                  </div>
                  <Progress value={30} className="h-2 sketch-progress" />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Skill 4</span>
                    <span className="text-xs font-medium text-purple-700">50/200</span>
                  </div>
                  <Progress value={25} className="h-2 sketch-progress" />
                </div>
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

            <div className="rounded-lg border border-purple-700 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-lg font-bold text-gray-800">Course Units</h2>
              <div className="space-y-4">
                {courses.map((course) => (
                  <React.Fragment key={course.id}>
                    {course.units.map((unit, index) => (
                      <div
                        key={unit.id}
                        className="flex items-center gap-4 rounded-lg border border-purple-100 bg-purple-50 p-3"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-purple-700">
                          {index + 1}
                        </div>
                        <span className="text-sm font-medium text-gray-800">{unit.name}</span>
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <section>
              <div className="flex items-center justify-between mb-14 ">
                <h2 className="text-2xl font-bold text-gray-800">Courses</h2>
                <Button variant="ghost" className="text-sm text-purple-700 hover:text-purple-800 hover:bg-purple-50">
                  View all courses
                </Button>
              </div>
              {courses.map((course) => (
                <Card className="border border-purple-700 sketch-card overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="bg-purple-50 p-6 md:col-span-1">
                      <div className="aspect-video w-full rounded-lg bg-white sketch-image flex items-center justify-center">
                        <div className="text-center">
                          <LineChart className="h-16 w-16 mx-auto text-purple-300 mb-2" />
                          <span className="text-sm text-purple-700 font-medium">Graph Algorithms</span>
                        </div>
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
                            <span className="text-gray-600">{course.units.length} lessons</span>
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
  )
}
