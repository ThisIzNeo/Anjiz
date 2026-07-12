/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTaskStore } from "../store/useTaskStore";
import { StatCard } from "./StatCard";

export const TaskSummary = () => {
  const { tasks, loading } = useTaskStore();
  const total = tasks.length || 1;

  const getPercentage = (count: number) => Math.round((count / total) * 100);

  const statuses = [
    { name: "To do", color: "text-info" },
    { name: "In progress", color: "text-warning" },
    { name: "Done", color: "text-success" },
  ];

  const priorities = [
    { name: "High", color: "text-error" },
    { name: "Medium", color: "text-warning" },
    { name: "Low", color: "text-info" },
  ];

  return (
    <div className="flex flex-col gap-8 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <StatCard title="Task Status Distribution">
          <div className="flex justify-around">
            {statuses.map(({ name, color }) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <div
                  className={`radial-progress ${color}`}
                  style={
                    {
                      "--value": getPercentage(
                        tasks.filter((t) => t.status === name).length,
                      ),
                    } as any
                  }
                >
                  {getPercentage(tasks.filter((t) => t.status === name).length)}
                  %
                </div>
                <span className="text-xs font-medium">{name}</span>
              </div>
            ))}
          </div>
        </StatCard>

        <StatCard title="Priority Distribution">
          <div className="flex justify-around">
            {priorities.map(({ name, color }) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <div
                  className={`radial-progress ${color}`}
                  style={
                    {
                      "--value": getPercentage(
                        tasks.filter((t) => t.priority === name).length,
                      ),
                    } as any
                  }
                >
                  {getPercentage(
                    tasks.filter((t) => t.priority === name).length,
                  )}
                  %
                </div>
                <span className="text-xs">{name}</span>
              </div>
            ))}
          </div>
        </StatCard>
      </div>

      <div className="flex gap-6">
        {statuses.map(({ name, color }) => (
          <StatCard key={name} title={name} className="w-full">
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <div className={`stat-value ${color}`}>
                {tasks.filter((t) => t.status === name).length}
              </div>
            )}
          </StatCard>
        ))}
      </div>
    </div>
  );
};
