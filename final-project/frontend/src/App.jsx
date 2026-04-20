import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/AppLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import RequestPage from "./pages/RequestPage.jsx";
import SubmissionsPage from "./pages/SubmissionsPage.jsx";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/submissions" element={<SubmissionsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
