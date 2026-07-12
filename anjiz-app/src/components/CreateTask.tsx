/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useTaskStore } from "../store/useTaskStore";

const CreateTask = () => {
  const { addTask, users, fetchUsers } = useTaskStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.length < 2) {
      setError("Title must be at least 2 characters long.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    await addTask({
      title: title,
      description: description,
      status: "To do",
      priority: formData.get("priority") as any,
      date: new Date().toLocaleDateString(),
      assignedTo: formData.get("assignedTo") as string,
    });

    setTitle("");
    setDescription("");
    setError(null);
    (document.getElementById("task_modal") as HTMLDialogElement)?.close();
    e.currentTarget.reset();
  };

  return (
    <div>
      <button
        className="btn bg-teal-400 hover:bg-teal-500 text-white border-none px-8 rounded-full"
        onClick={() =>
          (
            document.getElementById("task_modal") as HTMLDialogElement
          )?.showModal()
        }
      >
        Create Task
      </button>

      <dialog id="task_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Create New Task</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <input
                name="title"
                type="text"
                placeholder="Task Title"
                className="input input-bordered w-full"
                value={title}
                maxLength={37}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <span
                className={`text-xs mt-1 ${title.length > 37 ? "text-error" : "text-gray-400"}`}
              >
                {title.length}/37 characters
              </span>
            </div>

            <div className="flex flex-col">
              <textarea
                name="description"
                placeholder="Description"
                className="textarea textarea-bordered w-full"
                value={description}
                maxLength={300}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <span className="text-xs text-gray-400 mt-1">
                {description.length}/300 characters
              </span>
            </div>

            <select name="priority" className="select select-bordered w-full">
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <select
              name="assignedTo"
              className="select select-bordered w-full"
              required
            >
              <option value="" disabled selected>
                Assign to...
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.username}>
                  {user.username}
                </option>
              ))}
            </select>

            {error && <p className="text-error text-sm">{error}</p>}

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Create
              </button>
              <button
                type="button"
                className="btn"
                onClick={() =>
                  (
                    document.getElementById("task_modal") as HTMLDialogElement
                  )?.close()
                }
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default CreateTask;
