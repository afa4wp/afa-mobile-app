import * as SecureStore from 'expo-secure-store';
import { LoggedData } from '../@types/AuthTypes';

export const addItem = async (key: string, item: LoggedData) => {
  // Retrieve the stored string representation
  const jsonString = await SecureStore.getItemAsync(key);

  if (jsonString) {
    // Convert the string back to an array
    const array = JSON.parse(jsonString);

    // Add the new item to the array
    array.push(item);

    // Convert the updated array to a string
    const updatedJsonString = JSON.stringify(array);

    // Store the updated array
    await SecureStore.setItemAsync(key, updatedJsonString);
  } else {
    // If the array does not exist, create a new array with the item
    const newArray = [item];

    // Convert the new array to a string
    const jsonString = JSON.stringify(newArray);

    // Store the new array
    await SecureStore.setItemAsync(key, jsonString);
  }
};

export const findItemById = async (key: string, id: string) => {
  // Retrieve the stored string representation
  const jsonString = await SecureStore.getItemAsync(key);

  if (jsonString) {
    // Convert the string back to an array
    const array = JSON.parse(jsonString);

    // Find the item by ID
    const item = array.find((obj: LoggedData) => obj.id === id);

    return item;
  }

  // Return null if the value is not found or has not been set
  return null;
};

export const deleteItemById = async (key: string, id: string) => {
  // Retrieve the stored string representation
  const jsonString = await SecureStore.getItemAsync(key);

  if (jsonString) {
    // Convert the string back to an array
    let array = JSON.parse(jsonString);

    // Find the index of the item by ID
    const index = array.findIndex((obj: LoggedData) => obj.id === id);

    if (index !== -1) {
      // Remove the item from the array
      array.splice(index, 1);

      // Convert the updated array to a string
      const updatedJsonString = JSON.stringify(array);

      // Store the updated array
      await SecureStore.setItemAsync(key, updatedJsonString);

      return true; // Item deleted successfully
    }
  }

  return false; // Item not found or storage value not set
};