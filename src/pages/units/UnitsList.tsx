import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { BookOpen, ChevronRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import UnitServices from "@/api/unit.service";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

interface Unit {
  id: string;
  name: string;
  progress: number;
  lessons: Lesson[];
}

const UnitsList = ({ units }: { units: Unit[] }) => {
  return (
    <Card className="border border-purple-700 rounded-lg shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-800">Course Units</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {units.map((unit) => (
          <div key={unit.id} className="border border-purple-100 rounded-lg p-4 bg-purple-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-gray-800">{unit.name}</h3>
              <span className="text-sm text-purple-700">
                {unit.progress}% complete
              </span>
            </div>
            
            <Progress value={unit.progress} className="h-2 mb-4" />
            
            <div className="space-y-2">
              {unit.lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  to={`/lesson/${lesson.id}`}
                  className={`flex items-center justify-between p-2 rounded-md ${
                    lesson.completed ? 'bg-green-50' : 'bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className={`h-4 w-4 ${
                      lesson.completed ? 'text-green-500' : 'text-purple-500'
                    }`} />
                    <span className="text-sm">{lesson.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{lesson.duration}</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

// Composant principal qui gère la récupération des données
const UnitsPage = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Remplacez par l'ID de l'utilisateur actuel
  const userId = "your-user-id"; // À récupérer depuis votre contexte d'authentification

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Récupération des données utilisateur
        const userProgressData = await UnitServices.getUserProgress(userId);
        
        // Transformation des données selon votre structure
        // Adaptez cette partie selon la structure exacte de votre API
        interface UnitData {
          id: string;
          name?: string;
          title?: string;
          progress?: number;
          lessons?: Lesson[];
        }

        const formattedUnits: Unit[] = userProgressData.map((unitData: UnitData) => ({
          id: unitData.id,
          name: unitData.name || unitData.title || "Untitled Unit",
          progress: unitData.progress || 0,
          lessons: unitData.lessons || []
        }));
        
        setUnits(formattedUnits);
      } catch (err) {
        console.error('Erreur lors de la récupération des unités:', err);
        setError('Impossible de charger les unités du cours');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProgress();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        <span className="ml-2 text-gray-600">Chargement des unités...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border border-red-200 bg-red-50">
        <CardContent className="p-6 text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Réessayer
          </button>
        </CardContent>
      </Card>
    );
  }

  if (units.length === 0) {
    return (
      <Card className="border border-gray-200">
        <CardContent className="p-6 text-center">
          <p className="text-gray-600">Aucune unité de cours disponible</p>
        </CardContent>
      </Card>
    );
  }

  return <UnitsList units={units} />;
};

export default UnitsPage;