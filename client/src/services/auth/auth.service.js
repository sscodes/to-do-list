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

  // async readUser(token) {}

  async updateUserPassword(email, newpassword) {
    const res = await fetch(
      `https://to-do-list-api-ddho.onrender.com/api/users/updatepassword/${email}`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(newpassword),
      }
    );
    const data = await res.json();
    return data;
  }

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

  async loginUser(user) {
    const res = await fetch(
      'https://to-do-list-api-ddho.onrender.com/api/users/signin',
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

  async sendOTPMail(type, email) {
    const res = await fetch(
      `https://to-do-list-api-ddho.onrender.com/api/mails/${type}/sendOTaP/${email}`
    );
    const data = await res.json();
    return data;
  }
}
