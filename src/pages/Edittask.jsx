import { useEffect, useState } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    title: "",
    description: "",
    status: "Pending",
    category: "",
  });

  // Load existing task data
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = stored.find((t) => t.id === Number(id));

    if (task) {
      setValues({
        title: task.title,
        description: task.description,
        status: task.status,
        category: task.category || "",
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    const oldTask = stored.find((t) => t.id === Number(id));

    const updated = stored.map((t) =>
      t.id === Number(id) ? { ...t, ...values } : t
    );

    localStorage.setItem("tasks", JSON.stringify(updated));

    // ⭐ SHOW POPUP ONLY WHEN STATUS CHANGES TO COMPLETED
    const prevStatus = oldTask?.status;
    const newStatus = values.status;

    if (prevStatus !== "Completed" && newStatus === "Completed") {
      localStorage.setItem("showCompletionPopup", "yes");
    }

    navigate("/tasks");
  };

  return (
    <TaskForm
      values={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
