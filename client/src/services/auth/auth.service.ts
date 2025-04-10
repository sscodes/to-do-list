import { API_END_POINT } from "@/helpers/config";

export class AuthService {
  async createUser(user) {
    const res = await fetch(
      `${API_END_POINT}api/users/signup`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    );
    return res;
  }

  // async readUser(token) {}

  async updateUserPassword(email, newpassword) {
    const res = await fetch(
      `${API_END_POINT}api/users/updatepassword/${email}`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(newpassword),
      }
    );
    return res;
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
    return res;
  }

  async loginUser(user) {
    const res = await fetch(
      `${API_END_POINT}api/users/signin`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    );
    return res;
  }

  async sendOTPMail(type, email) {
    const res = await fetch(
      `${API_END_POINT}api/mails/${type}/sendOTP/${email}`
    );
    const data = await res.json();
    return data;
  }
}
