import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import ColorblindFilters from '../components/accessibility/ColorblindFilters';

const AccessibilityContext = createContext(null);

const STORAGE_KEY = 'sante_a11y';

const DEFAULT_STATE = {
  fontStep: 0,
  highContrast: false,
  colorblindMode: 'none',
};

function loadSavedState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_STATE, ...parsed };
    }
  } catch {
    // ignorar
  }
  return DEFAULT_STATE;
}

function applyBodyClasses(state) {
  const body = document.body;

  // Remover clases a11y anteriores
  const toRemove = [];
  body.classList.forEach((cls) => {
    if (cls.startsWith('a11y-')) toRemove.push(cls);
  });
  toRemove.forEach((cls) => body.classList.remove(cls));

  // Tamano de fuente
  if (state.fontStep !== 0) {
    body.classList.add(`a11y-font-${state.fontStep}`);
  }

  // Alto contraste
  if (state.highContrast) {
    body.classList.add('a11y-high-contrast');
  }

  // Modo daltonismo
  if (state.colorblindMode !== 'none') {
    body.classList.add(`a11y-colorblind-${state.colorblindMode}`);
  }
}

export function AccessibilityProvider({ children }) {
  const [fontStep, setFontStepRaw] = useState(() => loadSavedState().fontStep);
  const [highContrast, setHighContrast] = useState(() => loadSavedState().highContrast);
  const [colorblindMode, setColorblindMode] = useState(() => loadSavedState().colorblindMode);

  // Aplicar clases y persistir cuando cambie el estado
  useEffect(() => {
    const state = { fontStep, highContrast, colorblindMode };
    applyBodyClasses(state);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [fontStep, highContrast, colorblindMode]);

  const setFontStep = useCallback((step) => {
    setFontStepRaw((prev) => {
      const next = typeof step === 'function' ? step(prev) : step;
      return Math.max(-1, Math.min(3, next));
    });
  }, []);

  const increaseFontSize = useCallback(() => {
    setFontStep((prev) => prev + 1);
  }, [setFontStep]);

  const decreaseFontSize = useCallback(() => {
    setFontStep((prev) => prev - 1);
  }, [setFontStep]);

  const resetFontSize = useCallback(() => {
    setFontStep(0);
  }, [setFontStep]);

  const toggleHighContrast = useCallback(() => {
    setHighContrast((prev) => !prev);
  }, []);

  const resetAll = useCallback(() => {
    setFontStepRaw(0);
    setHighContrast(false);
    setColorblindMode('none');
  }, []);

  const value = {
    fontStep,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    highContrast,
    toggleHighContrast,
    colorblindMode,
    setColorblindMode,
    resetAll,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      <ColorblindFilters />
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}

export default AccessibilityContext;
