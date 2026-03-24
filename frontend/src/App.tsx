import "./App.css";
import { BrowserRouter, Routes, Route } from "react-dom/client"; // Wait, fixing import to react-router-dom!
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "./Components/Layout";
import { Section, LoginPage, SignupPage } from "./pages/section";
import { Problem } from "./pages/Allproblem";
import { Submission } from "./pages/Submission";
import { Contest } from "./pages/contest";
import { MySubmission } from "./pages/MySubmissions";
import { AddProblem } from "./pages/AddProblem";
import { AddTestCases } from "./pages/AddTestCases";

import { ProtectedRoute } from "./Components/ProtectedRoute";
import { UserProvider } from "./Components/UserProvider";
import { Routes as RRoutes, Route as RRoute } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <RRoutes>
          <RRoute path="/" element={<Layout />}>
            <RRoute index element={<Section />} />
            <RRoute element={<UserProvider />}>
              <RRoute element={<ProtectedRoute />}>
                <RRoute path="/problems" element={<Problem />} />
                <RRoute path="/submission/:problemId" element={<Submission />} />
                <RRoute path="/mySubmissions" element={<MySubmission />} />
                <RRoute path="/addProblem/" element={<AddProblem />} />
                <RRoute
                  path="/addTestcases/:newProblemId"
                  element={<AddTestCases />}
                />
                <RRoute path="/contest" element={<Contest />} />
              </RRoute>
              <RRoute path="/login" element={<LoginPage />} />
            </RRoute>

            <RRoute path="/signup" element={<SignupPage />} />
          </RRoute>
        </RRoutes>
      </Router>
    </>
  );
}

export default App;
