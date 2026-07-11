/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useTaskStore } from "../store/useTaskStore";

const TaskCard = () => {
  const { tasks, searchQuery, filterStatus, filterPriority, setSelectedTask } =
    useTaskStore();

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || task.status === filterStatus;
    const matchesPriority =
      filterPriority === "All" || task.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStatus, filterPriority]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTasks.length / tasksPerPage),
  );
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <div>
      {filteredTasks.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No tasks found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {currentTasks.map((task) => (
            <div
              key={task.id}
              className="card bg-base-100 shadow p-4 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => {
                setSelectedTask(task);
                setTimeout(() => {
                  (
                    document.getElementById(
                      "task_detail_modal",
                    ) as HTMLDialogElement
                  )?.showModal();
                }, 0);
              }}
            >
              <span
                className={`badge ${
                  task.priority === "High"
                    ? "badge-error"
                    : task.priority === "Medium"
                      ? "badge-warning"
                      : "badge-info"
                }`}
              >
                {task.priority}
              </span>
              <h3 className="font-bold mt-2">{task.title}</h3>
              <p className="text-xs text-gray-500">{task.date}</p>
            </div>
          ))}
        </div>
      )}

      {filteredTasks.length > tasksPerPage && (
        <div className="flex justify-center items-center mt-8 gap-4">
          <button
            className="btn btn-sm btn-outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>

          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn-sm btn-outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
