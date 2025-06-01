export interface GraphData {
  nodes: string[];
  edges: [string, string, number][];
}

export interface ProblemData {
  graph: GraphData;
  startNode?: string;
  endNode?: string;
}

export interface NodePosition {
  x: number;
  y: number;
}

export interface DijkstraStep {
  current: string;
  distances: Record<string, number>;
  visited: Set<string>;
  previous: Record<string, string | null>;
  path?: string[];
}
