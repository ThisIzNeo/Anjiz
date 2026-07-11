/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useTaskStore } from "../store/useTaskStore";

export const TaskDetailModal = () => {
  const { selectedTask, updateTask, setTaskToDelete, users } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(selectedTask);

  if (!selectedTask) return null;

  const handleStatusChange = (newStatus: any) => {
    updateTask({ ...selectedTask, status: newStatus });
  };

  const handleSave = () => {
    if (editForm) {
      updateTask(editForm);
      setIsEditing(false);
    }
  };

  return (
    <dialog id="task_detail_modal" className="modal">
      <div className="modal-box">
        <div className="mb-4">
          <label className="text-xs font-bold text-gray-400 uppercase">
            Status
          </label>
          <select
            className="select select-bordered w-full mt-1"
            value={selectedTask.status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="To do">To do</option>
            <option value="In progress">In progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {isEditing ? (
          <div className="flex flex-col gap-4">
            <input
              className="input input-bordered w-full font-bold"
              value={editForm?.title}
              onChange={(e) =>
                setEditForm({ ...editForm!, title: e.target.value })
              }
            />
            <textarea
              className="textarea textarea-bordered w-full min-h-[150px]"
              value={editForm?.description}
              onChange={(e) =>
                setEditForm({ ...editForm!, description: e.target.value })
              }
            />
            <select
              className="select select-bordered w-full"
              value={editForm?.priority}
              onChange={(e) =>
                setEditForm({ ...editForm!, priority: e.target.value as any })
              }
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select
              className="select select-bordered w-full"
              value={editForm?.assignedTo}
              onChange={(e) =>
                setEditForm({ ...editForm!, assignedTo: e.target.value })
              }
            >
              {users.map((user) => (
                <option key={user.id} value={user.username}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <>
            <h3 className="font-bold text-lg">{selectedTask.title}</h3>
            {/* Added break-words to ensure long text wraps */}
            <p className="py-2 text-gray-700 break-words whitespace-pre-wrap">
              {selectedTask.description}
            </p>
            <div className="flex gap-2 mt-2">
              <span className="badge badge-outline">
                {selectedTask.priority}
              </span>
              <span className="badge badge-ghost text-xs">
                Assigned to: {selectedTask.assignedTo}
              </span>
            </div>
          </>
        )}

        <div className="modal-action">
          {isEditing ? (
            <button className="btn btn-primary" onClick={handleSave}>
              Save Changes
            </button>
          ) : (
            <>
              <button
                className="btn btn-info"
                onClick={() => {
                  setIsEditing(true);
                  setEditForm(selectedTask);
                }}
              >
                Edit Details
              </button>
              <button
                className="btn btn-error"
                onClick={() => {
                  setTaskToDelete(selectedTask.id);
                  (
                    document.getElementById(
                      "task_detail_modal",
                    ) as HTMLDialogElement
                  )?.close();
                  (
                    document.getElementById(
                      "delete_confirm_modal",
                    ) as HTMLDialogElement
                  )?.showModal();
                }}
              >
                Delete
              </button>
            </>
          )}
          <button
            className="btn"
            onClick={() => {
              setIsEditing(false);
              (
                document.getElementById(
                  "task_detail_modal",
                ) as HTMLDialogElement
              )?.close();
            }}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};
