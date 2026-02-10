import type * as d3 from 'd3';

export interface GraphNode extends d3.SimulationNodeDatum {
  id: string;        // URI or generated key
  label: string;
  type: string;      // CreditClass, Person, Organization, etc.
  occurrenceCount: number;
  relationshipCount: number;
  importance: number; // 0-1 normalized score
  isCenter: boolean;
  depth: number;      // 0 = searched node, 1 = direct neighbor, 2+ = multi-hop
}

export interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
  predicate: string;
  direction: 'incoming' | 'outgoing';
  confidence?: number;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface GraphFilters {
  entityTypes: Set<string>;
  minImportance: number;
  searchQuery: string;
}

export const TYPE_COLORS: Record<string, { fill: string; stroke: string; text: string }> = {
  CreditClass: { fill: '#dcfce7', stroke: '#16a34a', text: '#15803d' },
  Person: { fill: '#dbeafe', stroke: '#2563eb', text: '#1d4ed8' },
  Organization: { fill: '#f3e8ff', stroke: '#9333ea', text: '#7e22ce' },
  Project: { fill: '#ffedd5', stroke: '#ea580c', text: '#c2410c' },
  Concept: { fill: '#f3f4f6', stroke: '#6b7280', text: '#374151' },
  Document: { fill: '#fef3c7', stroke: '#d97706', text: '#b45309' },
  Location: { fill: '#e0f2fe', stroke: '#0284c7', text: '#0369a1' },
};

export function getTypeColor(type?: string) {
  if (!type) return TYPE_COLORS.Concept;
  for (const [key, val] of Object.entries(TYPE_COLORS)) {
    if (type.toLowerCase().includes(key.toLowerCase())) return val;
  }
  return TYPE_COLORS.Concept;
}
