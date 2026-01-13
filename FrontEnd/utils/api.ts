/**
 * API Service for Speed Rail Game Data
 * 
 * Handles all backend communication for characters, lightcones, relic sets
 * Uses NEXT_PUBLIC_API_URL from environment variables
 * 
 * Security: Never includes database credentials, only calls RESTful endpoints
 */

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://127.0.0.1:3000";

// ============= TYPE DEFINITIONS =============

export interface Path {
  id: number;
  name: string;
}

export interface Character {
  characterId: number;
  name: string;
  baseSpeed: string;
  path: {
    pathId: number;
    pathName: string;
  };
}

export interface Move {
  id: number;
  type: 'basic' | 'skill' | 'ult' | 'technique' | 'memo_action';
  name?: string;
  isEnhanced: boolean;
}

export interface Eidolon {
  id: number;
  rank: number;
}

export interface Trace {
  id: number;
  type: 'A2' | 'A4' | 'A6' | 'talent';
  description?: string;
}

export interface CharacterDetail extends Character {
  moves: Move[];
  eidolons: Eidolon[];
  traces: Trace[];
}

export interface Lightcone {
  lightconeId: number;
  name: string;
  path: string;
}

export interface RelicSet {
  relicId: number;
  name: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// ============= ERROR HANDLING =============

class ApiErrorClass extends Error implements ApiError {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

const handleApiError = async (response: Response): Promise<never> => {
  const contentType = response.headers.get('content-type');
  let message = response.statusText;

  try {
    if (contentType?.includes('application/json')) {
      const error = await response.json();
      message = error.message || error.error || message;
    } else {
      const text = await response.text();
      message = text || message;
    }
  } catch (e) {
    // Use default message if parsing fails
  }

  throw new ApiErrorClass(message, response.status);
};

const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeout: number = 10000
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
};

const apiCall = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetchWithTimeout(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      await handleApiError(response);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof ApiErrorClass) {
      throw error;
    }
    
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiErrorClass('Request timeout', 408);
    }

    throw new ApiErrorClass(
      error instanceof Error ? error.message : 'Unknown error',
      500
    );
  }
};

// ============= PATH ENDPOINTS =============

/**
 * GET /path
 * Fetch all available path (Destiny, Hunt, Erudition, etc.)
 */
export const getPaths = async (): Promise<Path[]> => {
  return apiCall<Path[]>('/path');
};

// ============= CHARACTER ENDPOINTS =============

/**
 * GET /characters
 * Fetch all characters with basic info (id, name, baseSpeed, path)
 * Used for populating character selection dropdowns
 */
export const getCharacters = async (): Promise<Character[]> => {
  return apiCall<Character[]>('/characters');
};

/**
 * GET /characters/:id
 * Fetch single character with full details
 * Includes moves, eidolons, traces relationships
 * 
 * @param id Character ID
 * @returns Character with all relationships populated
 */
export const getCharacter = async (id: number): Promise<CharacterDetail> => {
  return apiCall<CharacterDetail>(`/characters/${id}`);
};

// ============= LIGHTCONE ENDPOINTS =============

/**
 * GET /lightcones
 * Fetch all lightcones with path association
 * Used for lightcone selection in build configuration
 */
export const getLightcones = async (): Promise<Lightcone[]> => {
  return apiCall<Lightcone[]>('/lightcone');
};

/**
 * GET /lightcones/:id
 * Fetch single lightcone with full details
 * 
 * @param id Lightcone ID
 * @returns Lightcone with associated effects
 */
export const getLightcone = async (id: number): Promise<Lightcone> => {
  return apiCall<Lightcone>(`/lightcones/${id}`);
};

// ============= RELIC SET ENDPOINTS =============

/**
 * GET /relic-set
 * Fetch all available relic sets
 * Used for relic selection in build configuration
 */
export const getRelicSets = async (): Promise<RelicSet[]> => {
  return apiCall<RelicSet[]>('/relic-set');
};

/**
 * GET /relic-set/:id
 * Fetch single relic set
 * 
 * @param id Relic set ID
 * @returns Relic set details
 */
export const getRelicSet = async (id: number): Promise<RelicSet> => {
  return apiCall<RelicSet>(`/relic-set/${id}`);
};

// ============= TYPE GUARD HELPERS =============

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'message' in error
  );
};

export const getErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};
