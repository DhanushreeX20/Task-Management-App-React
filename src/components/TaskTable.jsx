import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(stored);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">All Tasks</h2>

        <Link
          to="/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm sm:text-base text-center"
        >
          + Add Task
        </Link>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left whitespace-nowrap">Title</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Description</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Category</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Status</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-b">
                <td className="py-3 px-4">{task.title}</td>
                <td className="py-3 px-4">{task.description}</td>
                <td className="py-3 px-4">{task.category}</td>
                <td className="py-3 px-4">{task.status}</td>
                <td className="py-3 px-4 flex gap-2 flex-wrap">

                  <Link
                    to={`/edit/${task.id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-xs sm:text-sm"
                  >
                    Edit
                  </Link>

                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded text-xs sm:text-sm"
                    onClick={() => {
                      const updated = tasks.filter((t) => t.id !== task.id);
                      localStorage.setItem("tasks", JSON.stringify(updated));
                      setTasks(updated);
                    }}
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}

            {tasks.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
