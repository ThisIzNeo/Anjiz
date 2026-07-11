/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTaskStore } from "../store/useTaskStore";

export const TaskDetailModal = () => {
  const { selectedTask, updateTask, deleteTask } = useTaskStore();

  if (!selectedTask) return null;

  return (
    <dialog id="task_detail_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{selectedTask.title}</h3>
        <p className="py-2">{selectedTask.description}</p>

        <select
          className="select select-bordered w-full my-4"
          value={selectedTask.status}
          onChange={(e) =>
            updateTask({ ...selectedTask, status: e.target.value as any })
          }
        >
          <option>To do</option>
          <option>In progress</option>
          <option>Done</option>
        </select>

        <div className="modal-action">
          <button
            className="btn btn-error"
            onClick={() => {
              deleteTask(selectedTask.id);
              (document.getElementById("task_detail_modal") as any).close();
            }}
          >
            Delete
          </button>
          <button
            className="btn"
            onClick={() =>
              (document.getElementById("task_detail_modal") as any).close()
            }
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};
