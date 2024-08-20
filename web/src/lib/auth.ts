import { accessToken } from '../config/config';

export const authCheck = async () => {
  if (!accessToken) {
    window.location.href = '/login';
    return false;
  } else {
    return true;
  }
};
