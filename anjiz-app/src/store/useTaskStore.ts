 
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
    try {
      const res = await apiClient.get("/users");
      set({ users: res.data });
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  },

  fetchTasks: async () => {
    set({ loading: true });
    try {
      const res = await apiClient.get("/tasks");
      set({ tasks: res.data });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      set({ loading: false });
    }
  },

  deleteTask: async (id) => {
    set({ loading: true });
    try {
      await apiClient.delete(`/tasks/${id}`);
      set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
    } finally {
      set({ loading: false });
    }
  },

  updateTask: async (updatedTask) => {
    set({ loading: true });
    try {
      await apiClient.put(`/tasks/${updatedTask.id}`, updatedTask);
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.id === updatedTask.id ? updatedTask : t,
        ),
      }));
    } finally {
      set({ loading: false });
    }
  },

  addTask: async (newTask) => {
    set({ loading: true });
    try {
      const res = await apiClient.post("/tasks", newTask);
      set((state) => ({ tasks: [...state.tasks, res.data] }));
    } finally {
      set({ loading: false });
    }
  },

  setSelectedTask: (task) => set({ selectedTask: task }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterStatus: (status) => set({ filterStatus: status }),
  setFilterPriority: (priority) => set({ filterPriority: priority }),
}));
