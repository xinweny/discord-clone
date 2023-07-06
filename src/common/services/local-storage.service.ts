const get = (key: string) => {
  const item = localStorage.getItem(key);

  return item ? JSON.parse(item) : item;
};

const set = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value));

const remove = (key: string) => localStorage.removeItem(key);

export const localStorageService = {
  get,
  set,
  remove,
};
