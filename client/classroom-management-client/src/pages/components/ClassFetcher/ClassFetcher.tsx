import React, { ReactNode } from "react";
import { useFetchClasses } from "../../../hooks/useFetchClasses";

interface ClassFetcherProps {
  children?: ReactNode;
}

const ClassFetcher: React.FC<ClassFetcherProps> = ({ children }) => {
  const { isLoading, error } = useFetchClasses();

  if (isLoading) {
    return <div>Loading classes...</div>; 
  }

  if (error) {
    return <div>Error fetching classes: {String(error)}</div>; 
  }

  return <>{children}</>; 
};

export default ClassFetcher;
