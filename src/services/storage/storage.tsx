// storage.js

// Função para adicionar um item ao LocalStorage
export function addItemToStorage(itemKey: string, itemValue: any) {
  const existingData = localStorage.getItem(itemKey);
  let data = [];

  if (existingData) {
    data = JSON.parse(existingData);
  }

  data.push(itemValue);
  localStorage.setItem(itemKey, JSON.stringify(data));
}

// Função para ler um item do LocalStorage
export function readItemFromStorage<T>(itemKey: string): T | null {
  const data = localStorage.getItem(itemKey);

  if (data) {
    return JSON.parse(data);
  }

  return null;
}

// Função para excluir um item do LocalStorage
export function deleteItemFromStorage(itemKey: string) {
  localStorage.removeItem(itemKey);
}
export function clearItemFromStorage() {
  localStorage.clear()
}