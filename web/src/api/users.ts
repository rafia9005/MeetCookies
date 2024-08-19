import { JWT_TOKEN } from '../lib/token';
import { API_URL } from '../config/config';

async function get() {
  authCheck(JWT_TOKEN);
  try {
    const result = fetch(`${API_URL}/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    });
    return result;
  } catch (error) {
    return error;
  }
}

export { get };
