import React, { ReactNode } from "react";
import { useFetchClasses } from "../../../hooks/useFetchClasses";

interface ClassFetcherProps {
  children?: ReactNode;
}

const ClassFetcher: React.FC<ClassFetcherProps> = ({ children }) => {
  useFetchClasses(); // Fetch data at the root level

  return <>{children}</>; // Render children if they exist
};

export default ClassFetcher;
