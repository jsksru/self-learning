export const isAuth = () => {
  const name = localStorage.getItem('name');
  const isAuth = localStorage.getItem('auth');

  if (name && name.length > 0 && isAuth && isAuth === 'true') return true;
  return false;
}

export const logout = () => {
  localStorage.clear();
  window.location.reload();
}