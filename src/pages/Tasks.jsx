import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Newest");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(stored);
  }, []);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const pending = tasks.filter((t) => t.status === "Pending").length;

  let filtered = tasks.filter((task) => {
    return (
      (statusFilter === "All" || task.status === statusFilter) &&
      (categoryFilter === "All" || task.category === categoryFilter) &&
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (sort === "Newest") filtered.sort((a, b) => b.id - a.id);
  else filtered.sort((a, b) => a.id - b.id);

  const indexOfLast = currentPage * tasksPerPage;
  const indexOfFirst = indexOfLast - tasksPerPage;
  const currentTasks = filtered.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filtered.length / tasksPerPage);

  const deleteTask = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Good to see you again !</h1>

      {/* BADGES - always visible */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <span className="px-4 py-2 bg-gray-200 rounded-lg">Total: {total}</span>
        <span className="px-4 py-2 bg-green-200 rounded-lg">
          Completed: {completed}
        </span>
        <span className="px-4 py-2 bg-yellow-200 rounded-lg">
          Pending: {pending}
        </span>
      </div>

      {/* SEARCH ONLY on mobile */}
      <div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="border px-4 py-2 rounded-lg w-full sm:w-60"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FILTERS - hidden on mobile */}
      <div className="hidden sm:flex gap-4 mb-6 flex-wrap">
        <select
          className="border px-4 py-2 rounded-lg"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="Newest">New → Old</option>
          <option value="Oldest">Old → New</option>
        </select>

        <select
          className="border px-4 py-2 rounded-lg"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          className="border px-4 py-2 rounded-lg"
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
          <option value="Study">Study</option>
        </select>
      </div>
</div>
      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full min-w-[700px] border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Description</th>

              {/* Hide CATEGORY COLUMN on mobile */}
              <th className="p-3 border hidden sm:table-cell">Category</th>

              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentTasks.map((task) => (
              <tr
                key={task.id}
                className="border hover:bg-gray-100 transition-all duration-200"
              >
                <td className="p-3 border">{task.title}</td>
                <td className="p-3 border">{task.description}</td>

                {/* CATEGORY hidden on mobile */}
                <td className="p-3 border hidden sm:table-cell">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {task.category || "—"}
                  </span>
                </td>

                <td className="p-3 border">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                      ${task.status === "Completed"
                        ? "bg-green-100 text-green-700 border border-green-300"
                        : "bg-yellow-100 text-yellow-700 border border-yellow-300"}
                    `}
                  >
                    {task.status}
                  </span>
                </td>

                <td className="p-3 flex gap-2">
                  <Link
                    to={`/edit/${task.id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {currentTasks.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg border ${
                currentPage === i + 1
                  ? "bg-purple-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
