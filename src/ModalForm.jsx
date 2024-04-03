/* eslint-disable react/prop-types */
import ReactModal from "react-modal";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ModalForm(props) {
    ReactModal.setAppElement("#root");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: { title: props.title },
        isCompleted: false,
    });
    const [data, setData] = useState("");

    return (
        <ReactModal
            isOpen={props.isCreateWindowOpen}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            onRequestClose={() => props.setIsCreateWindowOpen(false)}
            className="flex flex-col m-auto my-10 p-6 max-w-lg border border-gray-300 rounded-lg bg-gray-500 text-base text-gray-900 dark:text-white
                    dark:bg-gray-700 dark:border-gray-600 "
            style={{
                overlay: { backgroundColor: "rgba(100, 100, 100, 0.75)" },
            }}
        >
            <button
                className="self-start"
                onClick={() => props.setIsCreateWindowOpen(false)}
            >
                ╳
            </button>
            <form
                onSubmit={handleSubmit((data) => {
                    setData(JSON.stringify(data));
                    props.createTask({
                        title: data.title,
                        completed: data.isCompleted,
                        id: parseInt(Date.now() * Math.random()).toString(),
                    });
                    props.setIsCreateWindowOpen(false);
                    setData(null);
                    reset();
                })}
            >
                <input
                    {...register("title", { minLength: 5 })}
                    placeholder="Description"
                    required
                    className="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.title && <div>Description is too short</div>}

                <br />
                <div className="flex items-center mb-4 gap-2">
                    <label
                        htmlFor="iscompleted"
                        className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500"
                    >
                        Completed:
                    </label>
                    <input
                        id="iscompleted"
                        {...register("isCompleted")}
                        type="checkbox"
                        placeholder="Description"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>

                <p>{data}</p>
                <input
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                />
            </form>
        </ReactModal>
    );
}
