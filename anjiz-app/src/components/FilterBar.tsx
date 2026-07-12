import { useTaskStore } from "../store/useTaskStore";
import CreateTask from "./CreateTask";

export const FilterBar = () => {
  const { setSearchQuery, setFilterStatus, setFilterPriority } = useTaskStore();

  return (
    <div className="flex flex-wrap gap-4 my-6 p-4 bg-base-100 border-b border-gray-300">
      <CreateTask />

      <input
        type="text"
        placeholder="Search tasks..."
        className="input input-bordered w-full md:w-auto"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select
        className="select select-bordered"
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="All">Status: All</option>
        <option value="To do">To do</option>
        <option value="In progress">In progress</option>
        <option value="Done">Done</option>
      </select>
      <select
        className="select select-bordered"
        onChange={(e) => setFilterPriority(e.target.value)}
      >
        <option value="All">Priority: All</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  );
};
