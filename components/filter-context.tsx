// this is a helper component that lets you use state variables within the state this component
// is defined in. In our case its defined in the layout, so pretty much globally
// File: src/context/filter-context.tsx

"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ColumnFiltersState } from '@tanstack/react-table';

// Create the context type
type FilterContextType = {
  filterSidebar: ColumnFiltersState;
  setFilterSidebar: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
};

// Create the context
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Create a provider component
export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filterSidebar, setFilterSidebar] = useState<ColumnFiltersState>([
    { id: "category", value: "Food" } // Default initial value
  ]);

  const value = React.useMemo(() => ({ filterSidebar, setFilterSidebar }), [filterSidebar, setFilterSidebar]);

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook to use the filter context
export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
};