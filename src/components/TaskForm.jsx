export default function TaskForm({ values, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-4">

      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={values.title}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Description"
        value={values.description}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      ></textarea>

      {/* ⭐ CATEGORY FIELD ADDED */}
      <select
        name="category"
        value={values.category}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      >
        <option value="">Select Category</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Shopping">Shopping</option>
        <option value="Study">Study</option>
        <option value="Health">Health</option>
      </select>

      {/* Status */}
      <select
        name="status"
        value={values.status}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      >
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      {/* Save Button */}
      <button className="px-4 py-2 bg-purple-600 text-white rounded w-full">
        Save Task
      </button>
    </form>
  );
}
