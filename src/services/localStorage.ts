// Set item to local storage;  Get 2 arguments, 1- the storage name, 2- the value to store;
export const setItemToLocalStorage = (
  storageName: string,
  value: string | number
) => localStorage.setItem(`${storageName}`, JSON.stringify(value));

// Get item from local storage; Get 1 argument, 1- storage name;
export const getItemFromLocalStorage = (storageName: string) =>
  JSON.parse(localStorage.getItem(`${storageName}`) as string);
