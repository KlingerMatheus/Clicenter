import { useState, useCallback } from 'react';
import { useSidebarState } from './useSidebarState';

export const useSidebarManager = () => {
  const { isExpanded, toggleExpanded, setExpanded } = useSidebarState();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const openMobile = useCallback(() => {
    setIsMobileOpen(true);
  }, []);

  return {
    // Estado
    isExpanded,
    isMobileOpen,

    // Ações
    toggleExpanded,
    toggleMobile,
    closeMobile,
    openMobile,
    setExpanded,
  };
};
