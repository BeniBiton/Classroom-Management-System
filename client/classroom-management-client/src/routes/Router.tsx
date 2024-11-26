import React from "react";
import Classes from "../pages/Classes/Classes";
import Students from "../pages/Students/Students";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateNewStudentsAndClasses from "../pages/CreateNewStudentsAndClasses/CreateNewStudentsAndClasses";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Classes />} />
        <Route path="/students" element={<Students />} />
        <Route path="/create" element={<CreateNewStudentsAndClasses />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
