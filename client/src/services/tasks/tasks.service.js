export class TaskService {
  async createTask(task, token) {
    const res = await fetch('https://to-do-list-api-ddho.onrender.com/api/tasks', {
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
      'https://to-do-list-api-ddho.onrender.com/api/tasks',
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

  async updateTask(params) {}

  async deleteTask(params) {}
}
