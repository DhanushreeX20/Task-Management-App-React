import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto mt-20 px-4 sm:px-6 text-center">

      <h1 className="text-3xl sm:text-4xl font-bold mb-4 font-serif">Hello Buddy 👋 </h1>

      <p className="text-gray-600 mb-8 text-sm sm:text-base">
        Manage your tasks easily and stay organized.
      </p>

      <Link
        to="/create"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700 transition text-sm sm:text-base"
      >
        + Add Task
      </Link>
      <Link to="/tasks"className="px-6 py-3 ml-5 bg-green-500 text-white rounded-lg shadow hover:bg-green-700 transition"
> 
  View Tasks
</Link>

    </div>
    
  );
}
