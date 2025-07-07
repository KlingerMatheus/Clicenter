import { useState, useEffect } from 'react';

const SIDEBAR_EXPANDED_KEY = 'sidebar-expanded';

export const useSidebarState = () => {
  // Carregar estado inicial da sidebar do localStorage
  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(SIDEBAR_EXPANDED_KEY);
        return saved !== null ? JSON.parse(saved) : true;
      } catch (error) {
        console.warn('Erro ao carregar estado da sidebar:', error);
        return true;
      }
    }
    return true;
  });

  // Salvar estado da sidebar no localStorage sempre que mudar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(SIDEBAR_EXPANDED_KEY, JSON.stringify(isExpanded));
      } catch (error) {
        console.warn('Erro ao salvar estado da sidebar:', error);
      }
    }
  }, [isExpanded]);

  const toggleExpanded = () => setIsExpanded(!isExpanded);
  const setExpanded = (expanded: boolean) => setIsExpanded(expanded);

  return {
    isExpanded,
    toggleExpanded,
    setExpanded,
  };
}; 