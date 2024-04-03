/* eslint-disable react/prop-types */
import "./Task.css";

import { IconComplete, IconDelete, IconEdit } from "./Icons.jsx";
import { useState } from "react";

function Task({ task, deleteTask, completeTask, updateTask }) {
    const [isEdited, setIsEdited] = useState(false);

    return (
        <div className="TaskCard hover:button:w-[1.5rem] hover:button:visible flex max-w-lg w-screen p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {isEdited ? (
                <input
                    value={task.title}
                    onChange={(e) => updateTask(task.id, e.target.value)}
                    required
                    minLength={5}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            ) : (
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    <b>Info: </b>
                    {task.title}
                    <br /> <b>Status: </b>{" "}
                    {task.completed ? "completed" : "uncompleted"}
                </p>
            )}
            <div className="mx-auto"></div>
            <div className="Buttons">
                <button
                    className="bg-red-700"
                    onClick={() => deleteTask(task.id)}
                >
                    {<IconDelete />}
                </button>

                <button
                    className="bg-blue-500"
                    onClick={() => setIsEdited(!isEdited)}
                >
                    {isEdited ? <IconComplete /> : <IconEdit />}
                </button>

                {task.completed || (
                    <button
                        className="bg-green-600"
                        onClick={() => completeTask(task.id)}
                    >
                        {<IconComplete />}
                    </button>
                )}
            </div>
        </div>
    );
}
export default Task;
