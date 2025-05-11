import { API_END_POINT } from '@/helpers/config';
import { ReadTasksResponse, TaskChanges } from '@/types/tasks';
import { Value as DateValue } from 'node_modules/react-calendar/dist/esm/shared/types';
export class TaskService {
  async createTask({
    task,
    token,
  }: {
    task: {
      user: string;
      taskName: string;
      taskDetail: string;
      deadline: DateValue;
      done: boolean;
    };
    token: string;
  }) {
    const res = await fetch(`${API_END_POINT}api/tasks`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    return data;
  }

  async readTask(token: string): Promise<ReadTasksResponse[]> {
    const res = await fetch(`${API_END_POINT}api/tasks`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  }

  async updateTask({
    change,
    token,
    id,
  }: {
    change: TaskChanges | { done: boolean };
    token: string;
    id: string;
  }) {
    const res = await fetch(`${API_END_POINT}api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(change),
    });
    const data = await res.json();
    return data;
  }

  async deleteTask({ token, id }: { token: string; id: string }) {
    const res = await fetch(`${API_END_POINT}api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  }
}
