import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import DataEntry from './DataEntry';
import Query from './Query';
import Evaluation from './Evaluation';
import Degree from './Degree';
import Course from './Course';
import Instructor from './Instructor';
import Section from './Section';
import Learning_Objective from './Learning_Objective';
import Degree_Course from './Degree_Course';
import Course_Objective from './Course_Objective';
import Degree_Query from './Degree_Query';
import Course_Query from './Course_Query';
import Instructor_Query from './Instructor_Query';
import Evaluation_Query from './Evaluation_Query';
import EditEvaluation from './EditEvaluation'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/DataEntry" element={<DataEntry />} />
        <Route path="/Query" element={<Query />} />
        <Route path="/Evaluation" element={<Evaluation />} />
        <Route path="/Degree" element={<Degree />} />
        <Route path="/Course" element={<Course />} />
        <Route path="/Instructor" element={<Instructor />} />
        <Route path="/Section" element={<Section />} />
        <Route path="/Learning_Objective" element={<Learning_Objective />} />
        <Route path="/Degree_Course" element={<Degree_Course />} />
        <Route path="/Course_Objective" element={<Course_Objective />} />
        <Route path="/Degree_Query" element={<Degree_Query />} />
        <Route path="/Course_Query" element={<Course_Query />} />
        <Route path="/Instructor_Query" element={<Instructor_Query />} />
        <Route path="/Evaluation_Query" element={<Evaluation_Query />} />
        <Route path="/edit-evaluation/:id" element={<EditEvaluation />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;