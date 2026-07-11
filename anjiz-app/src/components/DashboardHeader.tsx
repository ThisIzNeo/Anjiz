import CreateTask from "./CreateTask";

export const DashboardHeader = () => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, '0');
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  const monthName = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.getFullYear();

  return (
    <div className="flex gap-5">
      <div className="flex justify-center items-center gap-4 py-4 px-8 rounded-2xl shadow-sm border border-gray-100">
        <span className="text-[64px] font-light">{day}</span>
        <div className="border-l border-gray-300 h-18"></div>
        <div>
          <div className="text-2xl font-medium">{dayName}</div>
          <div className="text-2xl font-medium">
            {monthName} <span className="text-teal-400">{year}</span>
          </div>
        </div>
      </div>    
      <CreateTask />  
    </div>
  );
};