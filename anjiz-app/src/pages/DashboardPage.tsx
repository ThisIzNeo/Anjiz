import { useEffect, useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { apiClient } from "../api/axiosInstance"; 
import { TaskSummary } from "../components/TaskSummary";
import NavBar from "../components/NavBar";
import { DashboardHeader } from "../components/DashboardHeader";
import { TaskDetailModal } from "../components/TaskDetailModal";
import TaskCard from "../components/TaskCard";
import { FilterBar } from "../components/FilterBar";
import { DeleteConfirmationModal } from "../components/DeleteConfirmationModal";

const DashboardPage = () => {
  const { fetchTasks, fetchUsers, setCurrentUser, loading } = useTaskStore();
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    fetchTasks();
    fetchUsers();

    apiClient
      .get("/users/1")
      .then((res) => {
        setCurrentUser({
          username: res.data.username,
          role: res.data.role,
        });
      })
      .catch((err) => console.error("Failed to fetch user", err));

    const timer = setTimeout(() => setShowLogo(false), 1000);
    return () => clearTimeout(timer);
  }, [fetchTasks, fetchUsers, setCurrentUser]);

  if (showLogo) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-base-200">
        <img
          src="/Anjiz_Loading.gif"
          alt="Anjiz Logo"
          className="w-48 h-48 rounded-xl animate-pulse"
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-6 max-w-7xl">
        <DashboardHeader />
        <div className="my-8">
          <h1 className="text-2xl font-bold tracking-tight">Tasks Summary</h1>
          <h2 className="text-xl font-light text-gray-400">
            Last updates here
          </h2>
        </div>
        <TaskSummary />

        <h1 className="text-3xl font-bold mt-10">Tasks</h1>
        <FilterBar />
        <div className="h-80">
          <TaskCard />
        </div>
        <TaskDetailModal />
        <DeleteConfirmationModal />
      </div>
    </>
  );
};

export default DashboardPage;
