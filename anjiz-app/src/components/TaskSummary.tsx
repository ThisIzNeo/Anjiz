/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTaskStore } from "../store/useTaskStore";

export const TaskSummary = () => {
  const { tasks, loading  } = useTaskStore();
  const total = tasks.length || 1;

  const statuses = ["To do", "In progress", "Done"];
  const priorities = ["High", "Medium", "Low"];

  const statusColors: Record<string, string> = {
    "To do": "text-info",
    "In progress": "text-warning",
    "Done": "text-success",
  };

  const getPercentage = (count: number) => Math.round((count / total) * 100);

  const renderStatValue = (count: number) => {
    return loading ? (
      <span className="loading loading-spinner loading-md"></span>
    ) : (
      <span className="stat-value">{count}</span>
    );
  };

  const todoCount = tasks.filter((t) => t.status === "To do").length;
  const inProgressCount = tasks.filter(
    (t) => t.status === "In progress",
  ).length;
  const doneCount = tasks.filter((t) => t.status === "Done").length;

  return (
    <div className="flex flex-col gap-8 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card bg-base-100 shadow-sm p-6 border border-gray-200">
          <h3 className="font-bold mb-4">Task Status Distribution</h3>
          <div className="flex justify-around">
            {statuses.map((status) => {
              const count = tasks.filter((t) => t.status === status).length;
              const percentage = getPercentage(count);

              return (
                <div key={status} className="flex flex-col items-center gap-2">
                  <div
                    className={`radial-progress ${statusColors[status] || "text-info"}`}
                    style={{ "--value": percentage } as any}
                  >
                    {percentage}%
                  </div>
                  <span className="text-xs font-medium">{status}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm p-6 border border-gray-200">
          <h3 className="font-bold mb-4">Priority Distribution</h3>
          <div className="flex justify-around">
            {priorities.map((priority) => (
              <div key={priority} className="flex flex-col items-center gap-2">
                <div
                  className={`radial-progress ${priority === "High" ? "text-error" : priority === "Medium" ? "text-warning" : "text-info"}`}
                  style={
                    {
                      "--value": getPercentage(
                        tasks.filter((t) => t.priority === priority).length,
                      ),
                    } as any
                  }
                >
                  {getPercentage(
                    tasks.filter((t) => t.priority === priority).length,
                  )}
                  %
                </div>
                <span className="text-xs">{priority}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="card w-full bg-base-100 shadow-sm p-6">
          <div className="w-10 h-10 bg-linear-to-b from-cyan-500 to-transparent rounded-xl p-1.5">
            <img src="to-do-icon.png" alt="" />
          </div>
          <div className="stat-title">To do</div>
          <div className="stat-value text-primary">{todoCount}</div>
        </div>

        <div className="card w-full bg-base-100 shadow-sm p-6">
          <div className="w-10 h-10 bg-linear-to-b from-gray-300 to-transparent rounded-xl p-1.5">
            <img className=" grayscale-100" src="in-progress-icon.png" alt="" />
          </div>
          <div className="stat-title">In progress</div>
          <div className="stat-value text-warning">
            {renderStatValue(inProgressCount)}
          </div>
        </div>

        <div className="card w-full bg-base-100 shadow-sm p-6">
          <div className="w-10 h-10 bg-linear-to-b from-green-300 to-transparent rounded-xl p-1.5">
            <img src="completed-icon.png" alt="" />
          </div>
          <div className="stat-title">Done</div>
          <div className="stat-value text-success">
            {renderStatValue(doneCount)}
          </div>
        </div>
      </div>
    </div>
  );
};
