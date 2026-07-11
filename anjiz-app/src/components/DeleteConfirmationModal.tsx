import { useTaskStore } from "../store/useTaskStore";

export const DeleteConfirmationModal = () => {
  const { taskToDelete, setTaskToDelete, deleteTask } = useTaskStore();

  const handleConfirm = async () => {
    if (taskToDelete) {
      await deleteTask(taskToDelete);
      setTaskToDelete(null);
      (document.getElementById("delete_confirm_modal") as HTMLDialogElement)?.close();
    }
  };

  return (
    <dialog id="delete_confirm_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirm Deletion</h3>
        <p className="py-4">Are you sure you want to delete this task? This action cannot be undone.</p>
        <div className="modal-action">
          <button className="btn" onClick={() => { setTaskToDelete(null); (document.getElementById("delete_confirm_modal") as HTMLDialogElement)?.close(); }}>Cancel</button>
          <button className="btn btn-error" onClick={handleConfirm}>Delete</button>
        </div>
      </div>
    </dialog>
  );
};