import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthContextProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
function App() {

  return (
    <div className="bg-black">
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  )
}

export default App
