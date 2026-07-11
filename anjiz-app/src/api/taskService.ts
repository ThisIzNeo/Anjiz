import axios from 'axios';
import type { Task } from '../store/useTaskStore';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
});

export const taskService = {
  getTasks: () => apiClient.get<Task[]>('/tasks'),
  createTask: (task: Omit<Task, 'id'>) => apiClient.post('/tasks', task),
  updateTask: (id: number, task: Partial<Task>) => apiClient.patch(`/tasks/${id}`, task),
  deleteTask: (id: number) => apiClient.delete(`/tasks/${id}`),
};