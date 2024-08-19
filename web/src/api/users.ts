import { JWT_TOKEN } from '../lib/token';
import { API_URL } from '../config/config';

export const getProfile = async () =>  {
  authCheck(JWT_TOKEN);
  try {
    const result = await fetch(`${API_URL}/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    });
   return result.json();
  } catch (error) {
    return error;
  }
}

