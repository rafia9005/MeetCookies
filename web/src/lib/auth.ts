function authCheck(token: any) {
  if (token) {
    return true;
  } else {
    window.location.href = '/login';
    return false;
  }
}
