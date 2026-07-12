/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { apiClient } from "../api/axiosInstance";
import { TaskSummary } from "../components/TaskSummary";
import NavBar from "../components/NavBar";
import { DashboardHeader } from "../components/DashboardHeader";
import { TaskDetailModal } from "../components/TaskDetailModal";
import TaskCard from "../components/TaskCard";
import { FilterBar } from "../components/FilterBar";
import { DeleteConfirmationModal } from "../components/DeleteConfirmationModal";
import { LoadingScreen } from "../components/LoadingScreen";

const DashboardPage = () => {
  const { fetchTasks, fetchUsers, setCurrentUser, loading } = useTaskStore();

  useEffect(() => {
    const init = async () => {
      await Promise.all([fetchTasks(), fetchUsers()]);
      
      try {
        const res = await apiClient.get("/users/1");
        setCurrentUser({ username: res.data.username, role: res.data.role });
      } catch (err) {
        console.error("User fetch failed");
      }
    };

    init();
  }, [fetchTasks, fetchUsers, setCurrentUser]);

  if (loading) {
    return <LoadingScreen />;
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
        <div>
          <TaskCard />
        </div>
        <TaskDetailModal />
        <DeleteConfirmationModal />
      </div>
    </>
  );
};

export default DashboardPage;
