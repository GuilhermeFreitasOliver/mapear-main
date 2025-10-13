import { createContext, useContext, useState, type ReactNode } from 'react';

type UIContextValue = {
  authModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
};

const UIContext = createContext<UIContextValue | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);

  return (
    <UIContext.Provider value={{ authModalOpen, openAuthModal, closeAuthModal }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
}