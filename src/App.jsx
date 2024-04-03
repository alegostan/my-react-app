import { useEffect, useState } from "react";
import Task from "./Task.jsx";
import ModalForm from "./ModalForm.jsx";

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [isCreateWindowOpen, setIsCreateWindowOpen] = useState(false); // State variable to manage modal visibility
    const [title, setTitle] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));

        if (storedTasks?.length === 0 || storedTasks === null) {
            getData();
        } else {
            setTasks(storedTasks);
        }
    }, []);

    const getData = async () => {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos/?_start=0&_end=5"
        );
        let tasks = await response.json();
        setTasks(tasks);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };
    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const completeTask = (taskId) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, completed: true } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };
    const createTask = (task) => {
        const updatedTasks = [...tasks];
        updatedTasks.push(task);
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };
    const updateTask = (taskId, updateText) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, title: updateText } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    return (
        <div className="flex flex-col items-center h-dvh overflow-scroll bg-gray-50 dark:bg-gray-700">
            <div className="flex flex-col items-center">
                {tasks.map(function (task) {
                    return (
                        <div key={task.id}>
                            <Task
                                task={task}
                                completeTask={completeTask}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                            />
                        </div>
                    );
                })}
            </div>
            <button
                onClick={() => setIsCreateWindowOpen(true)}
                className="fixed left-5 bottom-5 h-15 w-15 size-14 bg-slate-500 rounded-lg"
            >
                <h1>+</h1>
            </button>
            <ModalForm
                isCompleted={isCompleted}
                setIsCompleted={setIsCompleted}
                title={title}
                setTitle={setTitle}
                createTask={createTask}
                isCreateWindowOpen={isCreateWindowOpen}
                setIsCreateWindowOpen={setIsCreateWindowOpen}
            ></ModalForm>
        </div>
    );
}
