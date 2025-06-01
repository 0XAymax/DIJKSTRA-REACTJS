import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, StepForward, CheckCircle } from "lucide-react";
import type {
  DijkstraStep,
  GraphData,
  NodePosition,
  ProblemData,
} from "@/types/graph";

export interface InteractiveGraphProps {
  problemData?: ProblemData;
  question?: string;
  problemId?: string;
  isProblemCompleted: () => Promise<boolean | undefined>;
  handleProblemComplete: () => void;
}

function InteractiveGraph({
  problemData,
  question,
  problemId,
  isProblemCompleted,
  handleProblemComplete,
}: InteractiveGraphProps) {
  const [graphData, setGraphData] = useState<GraphData>({
    nodes: [],
    edges: [],
  });
  const [nodePositions, setNodePositions] = useState<
    Record<string, NodePosition>
  >({});
  const [selectedStart, setSelectedStart] = useState<string>("");
  const [selectedEnd, setSelectedEnd] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [steps, setSteps] = useState<DijkstraStep[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [finalPath, setFinalPath] = useState<string[]>([]);

  // Parse problem data on mount
  useEffect(() => {
    if (problemData?.graph) {
      setGraphData(problemData.graph);
      setSelectedStart(
        problemData.startNode || problemData.graph.nodes[0] || ""
      );
      setSelectedEnd(
        problemData.endNode ||
          problemData.graph.nodes[problemData.graph.nodes.length - 1] ||
          ""
      );
      generateNodePositions(problemData.graph.nodes);
    }
  }, [problemData]);

  const generateNodePositions = (nodes: string[]) => {
    const positions: Record<string, NodePosition> = {};
    const centerX = 400;
    const centerY = 200;
    const radius = 150;

    nodes.forEach((node, index) => {
      const angle = (index * 2 * Math.PI) / nodes.length;
      positions[node] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });

    setNodePositions(positions);
  };

  const dijkstraAlgorithm = useCallback(
    (start: string, end: string): DijkstraStep[] => {
      const distances: Record<string, number> = {};
      const previous: Record<string, string | null> = {};
      const visited = new Set<string>();
      const steps: DijkstraStep[] = [];

      // Initialize distances
      graphData.nodes.forEach((node) => {
        distances[node] = node === start ? 0 : Infinity;
        previous[node] = null;
      });

      while (visited.size < graphData.nodes.length) {
        // Find unvisited node with minimum distance
        let current = "";
        let minDistance = Infinity;

        for (const node of graphData.nodes) {
          if (!visited.has(node) && distances[node] < minDistance) {
            minDistance = distances[node];
            current = node;
          }
        }

        if (current === "" || distances[current] === Infinity) break;

        visited.add(current);

        // Update distances to neighbors
        graphData.edges.forEach(([from, to, weight]) => {
          const neighbor = from === current ? to : to === current ? from : null;
          if (neighbor && !visited.has(neighbor)) {
            const newDistance = distances[current] + weight;
            if (newDistance < distances[neighbor]) {
              distances[neighbor] = newDistance;
              previous[neighbor] = current;
            }
          }
        });

        steps.push({
          current,
          distances: { ...distances },
          visited: new Set(visited),
          previous: { ...previous },
        });

        if (current === end) break;
      }

      // Reconstruct path
      const path: string[] = [];
      let current = end;
      while (current !== null) {
        path.unshift(current);
        current = previous[current];
      }

      if (path[0] === start) {
        steps[steps.length - 1].path = path;
      }

      return steps;
    },
    [graphData]
  );

  const startAlgorithm = () => {
    if (!selectedStart || !selectedEnd) return;

    const algorithmSteps = dijkstraAlgorithm(selectedStart, selectedEnd);
    setSteps(algorithmSteps);
    setCurrentStep(-1);
    setIsRunning(true);
    setIsCompleted(false);
    setFinalPath([]);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);

      if (nextStepIndex === steps.length - 1) {
        setIsCompleted(true);
        setFinalPath(steps[nextStepIndex].path || []);
      }
    }
  };

  const reset = () => {
    setCurrentStep(-1);
    setSteps([]);
    setIsRunning(false);
    setIsCompleted(false);
    setFinalPath([]);
  };

  const autoRun = async () => {
    if (!isRunning) startAlgorithm();

    for (let i = currentStep + 1; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCurrentStep(i);

      if (i === steps.length - 1) {
        setIsCompleted(true);
        setFinalPath(steps[i].path || []);
      }
    }
  };

  const getCurrentStepData = (): DijkstraStep | null => {
    return currentStep >= 0 ? steps[currentStep] : null;
  };

  const isNodeInPath = (node: string): boolean => {
    return finalPath.includes(node);
  };

  const isEdgeInPath = (from: string, to: string): boolean => {
    if (finalPath.length < 2) return false;
    for (let i = 0; i < finalPath.length - 1; i++) {
      if (
        (finalPath[i] === from && finalPath[i + 1] === to) ||
        (finalPath[i] === to && finalPath[i + 1] === from)
      ) {
        return true;
      }
    }
    return false;
  };

  const stepData = getCurrentStepData();

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      {question && (
        <Card>
          <CardHeader>
            <CardTitle>Problem</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{question}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Graph Visualization */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Graph Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <svg width="800" height="400" className="border rounded">
              {/* Edges */}
              {graphData.edges.map(([from, to, weight], index) => {
                const fromPos = nodePositions[from];
                const toPos = nodePositions[to];
                if (!fromPos || !toPos) return null;

                const isInPath = isEdgeInPath(from, to);

                return (
                  <g key={index}>
                    <line
                      x1={fromPos.x}
                      y1={fromPos.y}
                      x2={toPos.x}
                      y2={toPos.y}
                      stroke={isInPath ? "#ef4444" : "#6b7280"}
                      strokeWidth={isInPath ? "3" : "2"}
                      className="transition-all duration-300"
                    />
                    <text
                      x={(fromPos.x + toPos.x) / 2}
                      y={(fromPos.y + toPos.y) / 2}
                      fill="#374151"
                      fontSize="12"
                      textAnchor="middle"
                      className="font-bold"
                    >
                      {weight}
                    </text>
                  </g>
                );
              })}

              {/* Nodes */}
              {graphData.nodes.map((node) => {
                const pos = nodePositions[node];
                if (!pos) return null;

                const isStart = node === selectedStart;
                const isEnd = node === selectedEnd;
                const isVisited = stepData?.visited.has(node) || false;
                const isCurrent = stepData?.current === node;
                const isInFinalPath = isNodeInPath(node);
                const distance = stepData?.distances[node];

                let nodeColor = "#e5e7eb";
                if (isInFinalPath) nodeColor = "#ef4444";
                else if (isCurrent) nodeColor = "#f59e0b";
                else if (isVisited) nodeColor = "#10b981";
                else if (isStart) nodeColor = "#3b82f6";
                else if (isEnd) nodeColor = "#8b5cf6";

                return (
                  <g key={node}>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="25"
                      fill={nodeColor}
                      stroke="#374151"
                      strokeWidth="2"
                      className="transition-all duration-300"
                    />
                    <text
                      x={pos.x}
                      y={pos.y + 5}
                      fill="white"
                      fontSize="14"
                      textAnchor="middle"
                      fontWeight="bold"
                    >
                      {node}
                    </text>
                    {distance !== undefined && distance !== Infinity && (
                      <text
                        x={pos.x}
                        y={pos.y - 35}
                        fill="#374151"
                        fontSize="12"
                        textAnchor="middle"
                        fontWeight="bold"
                      >
                        {distance}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </CardContent>
        </Card>

        {/* Controls and Information */}
        <div className="space-y-4">
          {/* Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Node:</label>
                <select
                  value={selectedStart}
                  onChange={(e) => setSelectedStart(e.target.value)}
                  className="w-full p-2 border rounded"
                  disabled={isRunning}
                >
                  {graphData.nodes.map((node) => (
                    <option key={node} value={node}>
                      {node}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">End Node:</label>
                <select
                  value={selectedEnd}
                  onChange={(e) => setSelectedEnd(e.target.value)}
                  className="w-full p-2 border rounded"
                  disabled={isRunning}
                >
                  {graphData.nodes.map((node) => (
                    <option key={node} value={node}>
                      {node}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <Button onClick={startAlgorithm} disabled={isRunning}>
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </Button>
                <Button onClick={autoRun} disabled={!isRunning || isCompleted}>
                  Auto Run
                </Button>
                <Button onClick={nextStep} disabled={!isRunning || isCompleted}>
                  <StepForward className="w-4 h-4 mr-2" />
                  Step
                </Button>
                <Button onClick={reset} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle>Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span className="text-sm">Start Node</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                <span className="text-sm">End Node</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                <span className="text-sm">Current Node</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-sm">Visited Node</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="text-sm">Shortest Path</span>
              </div>
            </CardContent>
          </Card>

          {/* Step Information */}
          {stepData && (
            <Card>
              <CardHeader>
                <CardTitle>Step {currentStep + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Current Node:</strong> {stepData.current}
                </p>
                <div>
                  <strong>Distances:</strong>
                  <div className="grid grid-cols-2 gap-1 mt-1">
                    {Object.entries(stepData.distances).map(([node, dist]) => (
                      <Badge key={node} variant="outline" className="text-xs">
                        {node}: {dist === Infinity ? "∞" : dist}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p>
                  <strong>Visited:</strong>{" "}
                  {Array.from(stepData.visited).join(", ")}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Result */}
          {isCompleted && finalPath.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Shortest Path:</strong> {finalPath.join(" → ")}
                </p>
                <p>
                  <strong>Total Distance:</strong>{" "}
                  {stepData?.distances[selectedEnd]}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default InteractiveGraph;
