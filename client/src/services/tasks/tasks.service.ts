import { API_END_POINT } from "@/helpers/config";

export class TaskService {
  async createTask(task, token) {
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

  async readTask(token) {
    const res = await fetch(
      `${API_END_POINT}api/tasks`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    return data;
  }

  async updateTask(change, token, id) {
    const res = await fetch(`${API_END_POINT}api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(change),
    })
    const data = await res.json();
    return data;
  }

  async deleteTask(token, id) {
    const res = await fetch(`${API_END_POINT}api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json();
    return data;
  }
}
