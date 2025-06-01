import {
  BookOpen,
  Brain,
  GitBranch,
  Zap,
  CheckCircle,
  LogOut,
  Route,
  Code2,
  Timer,
  ListOrdered,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import type { Skill } from "@/types";
import SkillServices from "@/api/skill.service";
import { useCourse } from "@/context/CourseContext";
import React from "react";
import LessonServices from "@/api/lesson.service";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/ui/Logo";
import { ScrollArea } from "@/components/ui/scroll-area";
export default function Dashboard() {
    const { currentUser, logout } = useAuth();
    const [skills, setSkills] = useState<Skill[]>([]);
    const { courses } = useCourse();
    const navigate = useNavigate();
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);

    useEffect(() => {
      const fetchSkills = async () => {
        if (!currentUser?.id) {
          console.log("No user ID found");
          return;
        }
        const prevSkill = skills;
        try {
          const response = await SkillServices.getUserSkill(currentUser?.id);
          console.log("Fetched skills:", response);
          setSkills(response);
        } catch (error) {
          setSkills(prevSkill);
          console.error("Error fetching skills:", error);
        }
      };
      fetchSkills();
    }, [currentUser?.id, skills]);
    const getSkillIcon = (skillName: string) => {
      switch (skillName) {
        case "Mathematical Reasoning":
          return Brain;
        case "Graph Representation":
          return GitBranch;
        case "Pattern Recognition":
          return Zap;
        case "Shortest Path Reasoning":
          return Route;
        case "Algorithm Implementation":
          return Code2;
        case "Algorithm Complexity Analysis":
          return Timer;
        case "Priority Queue Usage":
          return ListOrdered;
        case "Shortest Path Algorithms":
          return Route;
        case "Algorithm Optimization":
          return TrendingUp;
        default:
          return Brain;
      }
    };
    useEffect(() => {
      const fetchCompletedLessons = async () => {
        if (!currentUser?.id) return;

        try {
          const response = await LessonServices.getUserCompletions(
            currentUser.id
          );
          if (response && response.lessons) {
            const ids = response.lessons.map((l) => l.lesson_id);
            setCompletedLessons(ids);
          }
        } catch (error) {
          console.error("Error fetching completed lessons:", error);
        }
      };

      fetchCompletedLessons();
    }, [currentUser?.id]);
      
    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase();
    };
    const handleLogout = () => {
      logout();
      navigate("/login");
    };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2 ml-4">
            <Logo
              width={170}
              height={170}
              className="filter contrast-150 brightness-70"
            />
          </div>
          <div className="flex items-center gap-3 mr-4">
            <span className="hidden text-sm text-gray-600 md:block">
              {currentUser?.email}
            </span>
            <Avatar className="h-8 w-8 border border-dashed border-gray-300">
              <AvatarFallback className="bg-purple-50 text-purple-700">
                {getInitials(currentUser?.name || "")}
              </AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-600 hover:text-purple-700 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Skills Overview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  Your Skills Overview
                </CardTitle>
                <CardDescription>
                  Track your progress across key learning areas
                </CardDescription>
              </CardHeader>
              <ScrollArea className="h-40 sm:h-41 pr-2 sm:pr-4">
                <CardContent className="space-y-6">
                  {skills.map((skill) => {
                    const Icon = getSkillIcon(skill.name);
                    const percentage = Math.round(skill.learning_level * 100);

                    return (
                      <div key={skill.name} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                              <Icon className="h-4 w-4 text-purple-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {skill.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {skill.description}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-purple-100 text-purple-700"
                          >
                            {percentage}%
                          </Badge>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </CardContent>
              </ScrollArea>
            </Card>
          </div>

          {/* Course Overview */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-900">
                  Dijkstra's Algorithm
                </CardTitle>
                <CardDescription>
                  Master the fundamental shortest path algorithm
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Learn how to find the shortest path between nodes in a
                  weighted graph. This course covers graph theory fundamentals,
                  algorithm implementation, and real-world applications of
                  Dijkstra's algorithm.
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <Link to={`/learning/${courses[0].units[0].lesson.id}`}>
                    <Button className="sketch-button px-6 bg-purple-700 hover:bg-purple-800 cursor-pointer">
                      Continue Learning
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Lessons List */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              Course Lessons
            </CardTitle>
            <CardDescription>
              Progress through these lessons to master Dijkstra's Algorithm
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {courses.map((course) => (
                <React.Fragment key={course.id}>
                  {course.units.map((unit, index) => (
                    <div
                      key={unit.id}
                      className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-medium text-purple-600">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {unit.lesson.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {completedLessons.includes(unit.lesson.id) ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                        )}
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
