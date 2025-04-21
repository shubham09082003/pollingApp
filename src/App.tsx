import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthContextProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import CreatePoll from "./pages/CreatePoll";
import { ProtectedRoutes } from "./components/protectedRoutes";
import PollPage from "./pages/pollPage";
function App() {

  return (
    <div className="bg-gray-900 min-h-screen">
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
            <Route path="/create-poll" element={<ProtectedRoutes><CreatePoll /></ProtectedRoutes>} />
            <Route path="/poll/:id" element={<PollPage />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  )
}

export default App
