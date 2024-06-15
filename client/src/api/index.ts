import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';

// axios instance
const API = axios.create({ baseURL: '/api/v1' });

// get items
const getItems = async <T>(
  url: string,
  setState: React.Dispatch<React.SetStateAction<T>>
): Promise<void> => {
  try {
    const response = await API.get(url);
    setState(response.data as T);
  } catch (error: any) {
    toast.error(error.response.data.msg);
  }
};

// delete item
const deleteItem = async (url: string, id: number): Promise<boolean> => {
  try {
    const { data } = await API.delete(`${url}/${id}`);

    toast.success(data.msg);
    return true;
  } catch (error: any) {
    toast.error(error.response.data.msg);
    return false;
  }
};

// get item
const getItem = async <T>(
  url: string,
  id: number,
  setState: React.Dispatch<React.SetStateAction<T>>
) => {
  try {
    const response = await API.get(`${url}/${id}`);
    setState(response.data as T);
  } catch (error: any) {
    toast.error(error.response.data.msg);
  }
};

// create item
const createItem = async <T>(
  e: React.FormEvent,
  url: string,
  data: T
): Promise<boolean> => {
  e.preventDefault();
  try {
    const response = await API.post(url, data);
    toast.success(response.data.msg);
    return true;
  } catch (error: any) {
    toast.error(error.response.data.msg);
    return false;
  }
};

// update item
const updateItem = async <T>(
  e: React.FormEvent,
  url: string,
  data: T
): Promise<boolean> => {
  e.preventDefault();
  try {
    await API.put(url, data);
    toast.success('Updated successfully');
    return true;
  } catch (error: any) {
    toast.error(error.response.data.msg);
    return false;
  }
};

export { getItems, deleteItem, getItem, createItem, updateItem };
