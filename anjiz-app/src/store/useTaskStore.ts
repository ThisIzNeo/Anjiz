/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { apiClient } from "../api/axiosInstance";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: "To do" | "In progress" | "Done";
  priority: "High" | "Medium" | "Low";
  date: string;
  assignedTo: string;
}

interface TaskState {
  tasks: Task[];
  users: { id: string; username: string }[];
  selectedTask: Task | null;
  loading: boolean;
  searchQuery: string;
  filterStatus: string;
  filterPriority: string;
  currentUser: { username: string; role: string } | null;
  taskToDelete: number | null; 
  setCurrentUser: (user: { username: string; role: string }) => void;
  setTaskToDelete: (id: number | null) => void; 
  fetchUsers: () => Promise<void>;
  fetchTasks: () => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  addTask: (task: Omit<Task, "id">) => Promise<void>;
  setSelectedTask: (task: Task | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterStatus: (status: string) => void;
  setFilterPriority: (priority: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  users: [],
  loading: false,
  selectedTask: null,
  searchQuery: "",
  filterStatus: "All",
  filterPriority: "All",
  currentUser: null,
  taskToDelete: null,

  setCurrentUser: (user) => set({ currentUser: user }),
  setTaskToDelete: (id) => set({ taskToDelete: id }),

  fetchUsers: async () => {
    const res = await apiClient.get("/users");
    set({ users: res.data });
  },

  fetchTasks: async () => {
    set({ loading: true });
    try {
      const res = await apiClient.get("/tasks");
      set({ tasks: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  deleteTask: async (id) => {
    await apiClient.delete(`/tasks/${id}`);
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
  },

  updateTask: async (updatedTask) => {
    await apiClient.put(`/tasks/${updatedTask.id}`, updatedTask);
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === updatedTask.id ? updatedTask : t,
      ),
    }));
  },

  addTask: async (newTask) => {
    const res = await apiClient.post("/tasks", newTask);
    set((state) => ({ tasks: [...state.tasks, res.data] }));
  },

  setSelectedTask: (task) => set({ selectedTask: task }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterStatus: (status) => set({ filterStatus: status }),
  setFilterPriority: (priority) => set({ filterPriority: priority }),
}));
