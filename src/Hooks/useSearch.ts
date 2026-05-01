import { useState, useMemo, useCallback } from 'react';
import { Tool } from '../types';

const calculateScore = (query: string, text: string): number => {
  const q = query.toLowerCase();
  const t = text.toLowerCase();

  if (t === q) return 1000;
  if (t.startsWith(q)) return 500;
  if (t.includes(q)) return 100;

  // Fuzzy matching
  let score = 0;
  let qIdx = 0;
  for (let i = 0; i < t.length && qIdx < q.length; i++) {
    if (t[i] === q[qIdx]) {
      score += 10;
      qIdx++;
    }
  }

  return qIdx === q.length ? score : 0;
};

export const useSearch = (tools: Tool[]) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const scored = tools.map(tool => {
      const labelScore = calculateScore(query, tool.label);
      const descScore = calculateScore(query, tool.secondary);
      const catScore = calculateScore(query, tool.category);
      const score = Math.max(labelScore, descScore, catScore);

      return { tool, score };
    });

    return scored
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ tool }) => tool);
  }, [query, tools]);

  const clearQuery = useCallback(() => {
    setQuery('');
  }, []);

  return {
    query,
    setQuery,
    results,
    clearQuery,
    hasResults: results.length > 0
  };
};
