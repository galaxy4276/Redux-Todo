export const saveUser = (name) => {
  localStorage.setItem('username', name);
  return console.log('username Saved');
};

export const removeUser = () => {
  console.log('remove!');
  localStorage.removeItem('username')};

export const getUser = () => {
  const name = localStorage.getItem('username');
  return (name) ? name : null;
};