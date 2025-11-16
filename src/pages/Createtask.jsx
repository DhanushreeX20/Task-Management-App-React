import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";

export default function CreateTask() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    title: "",
    description: "",
    category: "General",
    status: "Pending",
  });

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = { ...values, id: Date.now() };
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];

    stored.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(stored));

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


