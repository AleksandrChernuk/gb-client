import React, { createContext, useContext } from 'react';

type TicketDetailsContextType = {
  id: string;
};

const TicketDetailsContext = createContext<TicketDetailsContextType | undefined>(undefined);

export const useTicketDetailsContext = () => {
  const context = useContext(TicketDetailsContext);
  if (!context) {
    throw new Error('Error');
  }
  return context;
};

type TicketDetailsProviderProps = {
  id: string;
  children: React.ReactNode;
};

export const TicketDetailsProvider = ({ id, children }: TicketDetailsProviderProps) => {
  return <TicketDetailsContext.Provider value={{ id }}>{children}</TicketDetailsContext.Provider>;
};
