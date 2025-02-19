export class AuthService {
  async createUser(user) {
    const res = await fetch(
      'https://to-do-list-api-ddho.onrender.com/api/users/signup',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    );
    const data = await res.json();
    return data;
  }

  async readUser(token) {}

  async updateUser(change, token, id) {}

  async deleteUser(token, userId) {
    const res = await fetch(
      `http://localhost:7000/api/users/deleteuser/${userId}`,
      {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    return data;
  }
}
