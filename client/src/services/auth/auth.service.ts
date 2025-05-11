import { API_END_POINT } from '@/helpers/config';
import { OTP_SRC } from '@/helpers/types';

export class AuthService {
  async createUser(user: { name: string; email: string; password: string }) {
    const res = await fetch(`${API_END_POINT}api/users/signup`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return res;
  }

  // async readUser(token) {}

  async updateUserPassword(email: string, newPassword: string) {
    const res = await fetch(
      `${API_END_POINT}api/users/updatepassword/${email}`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(newPassword),
      }
    );
    return res;
  }

  async deleteUser(token: string, userId: string) {
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

  async loginUser(user: { email: string; password: string }) {
    const res = await fetch(`${API_END_POINT}api/users/signin`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return res;
  }

  async sendOTPMail(type: OTP_SRC, email: string) {
    const res = await fetch(
      `${API_END_POINT}api/mails/${type}/sendOTP/${email}`
    );
    const data = await res.json();
    return data;
  }
}
