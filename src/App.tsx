import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import MovieDetails from "./pages/MovieDetails";
import SoloWatch from "./pages/Watch/SoloWatch";
import GroupWatch from "./pages/Watch/GroupWatch";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </MainLayout>}>
        </Route>
        <Route path="/watch/:id/solo" element={<SoloWatch />} />
        <Route path="/watch/:id/group" element={<GroupWatch />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;