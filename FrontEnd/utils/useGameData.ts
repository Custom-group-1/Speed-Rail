/**
 * useGameData Hook
 * 
 * Manages fetching and caching of game data (characters, lightcones, relics)
 * Handles loading states and errors gracefully
 * Provides utility functions for data lookups
 */

import { useCallback, useEffect, useState } from 'react';
import {
  Character,
  CharacterDetail,
  Lightcone,
  RelicSet,
  Path,
  getCharacters,
  getCharacter,
  getLightcones,
  getRelicSets,
  getPaths,
  isApiError,
  getErrorMessage,
} from './api';

interface GameDataState {
  characters: Character[];
  lightcones: Lightcone[];
  relicSets: RelicSet[];
  paths: Path[];
  loading: boolean;
  error: string | null;
}

interface UseGameDataReturn extends GameDataState {
  getCharacterById: (id: number) => Promise<CharacterDetail | null>;
  getCharacterByName: (name: string) => Character | undefined;
  refetch: () => Promise<void>;
}

export const useGameData = (): UseGameDataReturn => {
  const [state, setState] = useState<GameDataState>({
    characters: [],
    lightcones: [],
    relicSets: [],
    paths: [],
    loading: true,
    error: null,
  });

  const loadGameData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const [charsData, lightconesData, relicsData, pathsData] = await Promise.all([
        getCharacters(),
        getLightcones(),
        getRelicSets(),
        getPaths(),
      ]);

      setState({
        characters: charsData,
        lightcones: lightconesData,
        relicSets: relicsData,
        paths: pathsData,
        loading: false,
        error: null,
      });
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      console.error('Failed to load game data:', errorMessage, err);
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  }, []);

  const getCharacterById = useCallback(
    async (id: number): Promise<CharacterDetail | null> => {
      try {
        return await getCharacter(id);
      } catch (err) {
        console.warn(`Failed to fetch character ${id}:`, getErrorMessage(err));
        return null;
      }
    },
    []
  );

  const getCharacterByName = useCallback(
    (name: string): Character | undefined => {
      return state.characters.find(
        char => char.name.toLowerCase() === name.toLowerCase()
      );
    },
    [state.characters]
  );

  useEffect(() => {
    loadGameData();
  }, []);

  return {
    ...state,
    getCharacterById,
    getCharacterByName,
    refetch: loadGameData,
  };
};
