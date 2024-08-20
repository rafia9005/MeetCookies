import { API_URL } from '../config/config';
import { authCheck } from '$lib/auth';

export const getProfile = async () => {
  authCheck();
  try {
    const result = await fetch(`${API_URL}/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer `,
      },
    });
    return result.json();
  } catch (error) {
    return error;
  }
};
