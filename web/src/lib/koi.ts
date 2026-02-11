import { fetchKoi, fetchLedger } from './api';
import type { GraphNode, GraphLink } from './graph-types';

// --- Response types ---

export interface KoiStats {
  total_documents: number;
  recent_7_days?: number;
  by_source?: Record<string, number>;
}

export interface KoiResult {
  rid?: string;
  title?: string;
  content?: string;
  score?: number;
  source?: string;
  metadata?: { rid?: string; source?: string; url?: string };
}

export interface KoiQueryResponse {
  data?: {
    results?: KoiResult[];
    total_results?: number;
    confidence?: number;
  };
  citations?: Array<{ rid?: string; url?: string; excerpt?: string }>;
  request_id?: string;
  errors?: string[];
  warnings?: string[];
}

export interface ResolvedEntity {
  uri?: string;
  label?: string;
  type?: string;
  confidence?: number;
  description?: string;
  aliases?: string[];
}

export interface EntityResolveResponse {
  matches?: ResolvedEntity[];
  best_match?: ResolvedEntity;
}

export interface EntityNeighbor {
  uri?: string;
  label?: string;
  type?: string;
  relationship?: string;
  direction?: 'incoming' | 'outgoing';
}

export interface NeighborhoodResponse {
  center?: ResolvedEntity;
  neighbors?: EntityNeighbor[];
  total_neighbors?: number;
}

export interface CreditClass {
  id?: string;
  admin?: string;
  metadata?: string;
  credit_type_abbrev?: string;
}

export interface CreditBatch {
  issuer?: string;
  project_id?: string;
  denom?: string;
  metadata?: string;
  start_date?: string;
  end_date?: string;
  issuance_date?: string;
  open?: boolean;
  class_id?: string;
}

export interface LedgerProject {
  id?: string;
  admin?: string;
  class_id?: string;
  jurisdiction?: string;
  metadata?: string;
  reference_id?: string;
}

export interface CreditType {
  abbreviation?: string;
  name?: string;
  unit?: string;
}

// --- Helpers ---

/** Normalize KOI entity types (CREDIT_CLASS, CONCEPT, etc.) to display format (CreditClass, Concept) */
function normalizeEntityType(raw?: string): string | undefined {
  if (!raw) return undefined;
  const map: Record<string, string> = {
    CREDIT_CLASS: 'CreditClass',
    CONCEPT: 'Concept',
    PERSON: 'Person',
    ORGANIZATION: 'Organization',
    PROJECT: 'Project',
    LOCATION: 'Location',
    DOCUMENT: 'Document',
    STANDARD: 'CreditClass', // Standards are methodology-related
    VALIDATOR: 'Organization',
    KEEPER: 'Concept',
    API_MESSAGE: 'Concept',
    PROCESS: 'Concept',
  };
  return map[raw] || 'Concept';
}

// --- API functions ---

export async function queryKoi(query: string, limit = 8): Promise<{ results: KoiResult[]; confidence?: number }> {
  const envelope = await fetchKoi<KoiQueryResponse>('/query', {
    method: 'POST',
    body: JSON.stringify({ query, limit }),
  });

  const items = envelope.data?.results || [];

  // Merge citation URLs into results by matching rid
  const citationMap = new Map(
    (envelope.citations || []).map(c => [c.rid, c.url]),
  );
  for (const item of items) {
    if (!item.metadata?.url && item.rid) {
      const url = citationMap.get(item.rid);
      if (url) item.metadata = { ...item.metadata, url };
    }
  }

  return { results: items, confidence: envelope.data?.confidence };
}

export async function getKoiStats(): Promise<KoiStats> {
  return fetchKoi<KoiStats>('/stats');
}

export async function resolveEntity(label: string): Promise<EntityResolveResponse> {
  // The KOI API returns { winner, alternatives } — transform to { best_match, matches }
  const raw = await fetchKoi<{
    winner?: { entity_text?: string; entity_type?: string; uri?: string; score?: number; aliases?: string[] };
    alternatives?: Array<{ entity_text?: string; entity_type?: string; uri?: string; score?: number }>;
  }>(`/entity/resolve?label=${encodeURIComponent(label)}`);

  const mapEntity = (e: { entity_text?: string; entity_type?: string; uri?: string; score?: number; aliases?: string[] }): ResolvedEntity => ({
    uri: e.uri,
    label: e.entity_text,
    type: normalizeEntityType(e.entity_type),
    confidence: e.score ? Math.min(e.score / 1000, 1) : undefined,
    aliases: e.aliases,
  });

  return {
    best_match: raw.winner ? mapEntity(raw.winner) : undefined,
    matches: (raw.alternatives || []).map(mapEntity),
  };
}

export async function getNeighborhood(label: string): Promise<NeighborhoodResponse> {
  // The KOI API returns { nodes[], edges[], resolved_entity_* } — transform to { center, neighbors[] }
  const raw = await fetchKoi<{
    resolved_uri?: string;
    resolved_entity_text?: string;
    resolved_entity_type?: string;
    nodes?: Array<{ uri?: string; text?: string; type?: string; occurrence_count?: number; relationship_count?: number }>;
    edges?: Array<{ predicate?: string; subject_uri?: string; object_uri?: string; direction?: string; confidence?: number }>;
    node_count?: number;
  }>(`/entity/neighborhood?label=${encodeURIComponent(label)}`);

  const center: ResolvedEntity = {
    uri: raw.resolved_uri,
    label: raw.resolved_entity_text,
    type: normalizeEntityType(raw.resolved_entity_type),
  };

  // Build a lookup from node URI to node data
  const nodeMap = new Map<string, { text?: string; type?: string }>();
  for (const n of raw.nodes || []) {
    if (n.uri) nodeMap.set(n.uri, n);
  }

  // Convert edges into neighbors by resolving the "other end" of each edge
  const seen = new Set<string>();
  const neighbors: EntityNeighbor[] = [];
  for (const edge of raw.edges || []) {
    // Determine the neighbor URI (the node that isn't the center)
    const neighborUri = edge.direction === 'out' ? edge.object_uri : edge.subject_uri;
    if (!neighborUri || neighborUri === raw.resolved_uri) continue;
    // Deduplicate by URI (keep first edge per neighbor)
    if (seen.has(neighborUri)) continue;
    seen.add(neighborUri);

    const node = nodeMap.get(neighborUri);
    neighbors.push({
      uri: neighborUri,
      label: node?.text,
      type: normalizeEntityType(node?.type),
      relationship: edge.predicate,
      direction: edge.direction === 'in' ? 'incoming' : 'outgoing',
    });
  }

  return { center, neighbors, total_neighbors: raw.node_count ? raw.node_count - 1 : neighbors.length };
}

export interface NeighborhoodGraphResponse {
  center: GraphNode;
  nodes: GraphNode[];
  links: GraphLink[];
  totalNeighbors: number;
}

export async function getNeighborhoodForGraph(label: string): Promise<NeighborhoodGraphResponse> {
  const raw = await fetchKoi<{
    resolved_uri?: string;
    resolved_entity_text?: string;
    resolved_entity_type?: string;
    nodes?: Array<{ uri?: string; text?: string; type?: string; occurrence_count?: number; relationship_count?: number }>;
    edges?: Array<{ predicate?: string; subject_uri?: string; object_uri?: string; direction?: string; confidence?: number }>;
    node_count?: number;
  }>(`/entity/neighborhood?label=${encodeURIComponent(label)}`);

  // Find max counts for normalization
  const rawNodes = raw.nodes || [];
  let maxOcc = 1;
  let maxRel = 1;
  for (const n of rawNodes) {
    if ((n.occurrence_count || 0) > maxOcc) maxOcc = n.occurrence_count!;
    if ((n.relationship_count || 0) > maxRel) maxRel = n.relationship_count!;
  }

  // Build center node
  const centerUri = raw.resolved_uri || `center-${label}`;
  const center: GraphNode = {
    id: centerUri,
    label: raw.resolved_entity_text || label,
    type: normalizeEntityType(raw.resolved_entity_type) || 'Concept',
    occurrenceCount: 0,
    relationshipCount: 0,
    importance: 1,
    isCenter: true,
    depth: 0,
  };

  // Find center node's counts from raw data
  const centerRaw = rawNodes.find(n => n.uri === raw.resolved_uri);
  if (centerRaw) {
    center.occurrenceCount = centerRaw.occurrence_count || 0;
    center.relationshipCount = centerRaw.relationship_count || 0;
  }

  // Build neighbor nodes and links
  const nodeMap = new Map<string, typeof rawNodes[0]>();
  for (const n of rawNodes) {
    if (n.uri) nodeMap.set(n.uri, n);
  }

  const seenNodes = new Set<string>([centerUri]);
  const nodes: GraphNode[] = [center];
  const links: GraphLink[] = [];

  for (const edge of raw.edges || []) {
    const neighborUri = edge.direction === 'out' ? edge.object_uri : edge.subject_uri;
    if (!neighborUri || neighborUri === centerUri) continue;

    // Add node if not already present
    if (!seenNodes.has(neighborUri)) {
      seenNodes.add(neighborUri);
      const n = nodeMap.get(neighborUri);
      const occ = n?.occurrence_count || 0;
      const rel = n?.relationship_count || 0;
      const importance = Math.min(1, 0.4 * (occ / maxOcc) + 0.6 * (rel / maxRel) + 0.1);

      nodes.push({
        id: neighborUri,
        label: n?.text || neighborUri.split('/').pop() || 'Unknown',
        type: normalizeEntityType(n?.type) || 'Concept',
        occurrenceCount: occ,
        relationshipCount: rel,
        importance,
        isCenter: false,
        depth: 1,
      });
    }

    // Add link
    links.push({
      source: edge.direction === 'out' ? centerUri : neighborUri,
      target: edge.direction === 'out' ? neighborUri : centerUri,
      predicate: edge.predicate || 'related_to',
      direction: edge.direction === 'in' ? 'incoming' : 'outgoing',
      confidence: edge.confidence,
    });
  }

  return { center, nodes, links, totalNeighbors: raw.node_count ? raw.node_count - 1 : nodes.length - 1 };
}

// --- Chat ---

export interface ChatSource {
  rid?: string;
  title?: string;
  excerpt?: string;
  score?: number;
  source?: string;
  url?: string;
}

export interface ChatResponse {
  answer: string;
  sources: ChatSource[];
  model: string;
}

export async function chatKoi(query: string, client?: string, limit = 5): Promise<ChatResponse> {
  return fetchKoi<ChatResponse>('/chat', {
    method: 'POST',
    body: JSON.stringify({ query, client, limit }),
  });
}

export async function getEntityDocuments(label: string, limit = 5): Promise<KoiResult[]> {
  const resp = await queryKoi(label, limit);
  return resp.results;
}

export async function getLedgerClasses(): Promise<CreditClass[]> {
  const data = await fetchLedger<{ classes?: CreditClass[] }>('/regen/ecocredit/v1/classes');
  return data.classes || [];
}

export async function getLedgerBatches(): Promise<CreditBatch[]> {
  type BatchPage = { batches?: CreditBatch[]; pagination?: { next_key?: string } };
  const allBatches: CreditBatch[] = [];
  let nextKey: string | null = null;
  do {
    const url: string = nextKey
      ? `/regen/ecocredit/v1/batches?pagination.key=${encodeURIComponent(nextKey)}`
      : '/regen/ecocredit/v1/batches';
    const data: BatchPage = await fetchLedger<BatchPage>(url);
    allBatches.push(...(data.batches || []));
    nextKey = data.pagination?.next_key || null;
  } while (nextKey);
  return allBatches;
}

export async function getLedgerProjects(): Promise<LedgerProject[]> {
  type ProjectPage = { projects?: LedgerProject[]; pagination?: { next_key?: string } };
  const allProjects: LedgerProject[] = [];
  let nextKey: string | null = null;
  do {
    const url: string = nextKey
      ? `/regen/ecocredit/v1/projects?pagination.key=${encodeURIComponent(nextKey)}`
      : '/regen/ecocredit/v1/projects';
    const data: ProjectPage = await fetchLedger<ProjectPage>(url);
    allProjects.push(...(data.projects || []));
    nextKey = data.pagination?.next_key || null;
  } while (nextKey);
  return allProjects;
}

export async function getLedgerCreditTypes(): Promise<CreditType[]> {
  const data = await fetchLedger<{ credit_types?: CreditType[] }>('/regen/ecocredit/v1/credit-types');
  return data.credit_types || [];
}

// --- Cached Ledger helpers (module-level, fetch once) ---

let batchCache: CreditBatch[] | null = null;
let batchPromise: Promise<CreditBatch[]> | null = null;

export async function getCachedBatches(): Promise<CreditBatch[]> {
  if (batchCache) return batchCache;
  if (!batchPromise) {
    batchPromise = getLedgerBatches().then(batches => {
      batchCache = batches;
      return batches;
    });
  }
  return batchPromise;
}

let projectCache: LedgerProject[] | null = null;
let projectPromise: Promise<LedgerProject[]> | null = null;

export async function getCachedProjects(): Promise<LedgerProject[]> {
  if (projectCache) return projectCache;
  if (!projectPromise) {
    projectPromise = getLedgerProjects().then(projects => {
      projectCache = projects;
      return projects;
    });
  }
  return projectPromise;
}

// --- Helpers ---

/** Extract a readable title from a KOI result */
export function displayTitle(r: KoiResult, fallbackIndex: number): string {
  let title = r.title || '';

  // KOI returns titles like "Document orn:web.page:forum.regen.network/abc123#chunk7" — strip the prefix
  const isDocPrefix = /^Document\s+(orn:|regen\.)/.test(title);
  if (isDocPrefix) title = '';

  // Strip Notion UUIDs (32-char hex, with or without dashes, at end of title)
  title = title.replace(/[-\s]+[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i, '').trim();

  // If title is bad (empty, just a number, very short generic word), prefer URL-derived title
  const isRawId = /^\d+$/.test(title);
  const isTooShort = title.length > 0 && title.length <= 5 && !/[A-Z]{2}\d{2}/.test(title);

  if ((isRawId || isTooShort || !title) && r.metadata?.url) {
    try {
      const u = new URL(r.metadata.url);
      const segments = u.pathname.split('/').filter(Boolean);

      // Notion URLs: extract slug before the UUID suffix
      if (u.hostname.includes('notion.so') && segments.length >= 1) {
        const last = segments[segments.length - 1] || '';
        const slug = last.replace(/-[0-9a-f]{32}$/i, '');
        return decodeURIComponent(slug.replace(/-/g, ' ')).slice(0, 80);
      }

      // Forum URLs: extract the slug (e.g., "feedback-request-desert-regreening-credit-class-proposal")
      if (u.hostname.includes('forum.regen.network') && segments.length >= 3) {
        const slug = segments[segments.length - 2] || segments[segments.length - 1];
        if (!/^\d+$/.test(slug)) {
          return decodeURIComponent(slug.replace(/-/g, ' ')).slice(0, 80);
        }
      }

      // GitHub URLs: extract filename without path noise
      if (u.hostname.includes('github.com') && segments.length >= 3) {
        const filename = segments[segments.length - 1] || '';
        return decodeURIComponent(filename.replace(/-/g, ' ').replace(/\.ya?ml$|\.json$|\.md$|\.tsx?$/, '')).slice(0, 80);
      }

      // Handbook / registry URLs: join path segments for a readable title
      if (u.hostname.includes('handbook.regen.network') || u.hostname.includes('registry.regen.network')) {
        const meaningful = segments.filter(s => s.length > 3);
        if (meaningful.length > 0) {
          return meaningful.map(s => decodeURIComponent(s.replace(/-/g, ' '))).join(' — ').slice(0, 80);
        }
      }

      // General: last meaningful segment
      const last = segments.pop() || '';
      return decodeURIComponent(last.replace(/-/g, ' ')).slice(0, 80) || u.hostname;
    } catch { /* fall through */ }
  }

  if (title) return title;
  return `Result ${fallbackIndex + 1}`;
}

/** Source badge color */
export function sourceColor(source?: string): string {
  if (!source) return 'bg-gray-100 text-gray-600';
  const s = source.toLowerCase();
  if (s.includes('discourse') || s.includes('forum')) return 'bg-blue-100 text-blue-700';
  if (s.includes('github')) return 'bg-purple-100 text-purple-700';
  if (s.includes('notion')) return 'bg-amber-100 text-amber-700';
  if (s.includes('google') || s.includes('drive')) return 'bg-red-100 text-red-700';
  return 'bg-gray-100 text-gray-600';
}
