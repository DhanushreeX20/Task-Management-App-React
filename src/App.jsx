import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import CreateTask from "./pages/Createtask";
import EditTask from "./pages/Edittask";

export default function App() {
  return (
    <Router>
      {/* NAVBAR */}
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-700">Task Manager</h1>

        <div className="space-x-4">
          <Link className="text-gray-600 hover:text-black" to="/">Home</Link>
          <Link className="text-gray-600 hover:text-black" to="/tasks">Tasks</Link>
          <Link className="text-blue-600 font-medium" to="/create">
            + Add Task
          </Link>
        </div>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/create" element={<CreateTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </Router>
  );
}
