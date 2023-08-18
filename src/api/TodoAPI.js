import axios from "axios";

const API_BASE_URL = "https://www.pre-onboarding-selection-task.shop";

export const createTodo = async (accessToken, todo) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  const response = await axios.post(
    `${API_BASE_URL}/todos`,
    { todo: todo },
    { headers: headers },
  );
  return response.data;
};

export const getTodos = async (accessToken) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await axios.get(
    `${API_BASE_URL}/todos`,
    { headers: headers },
  );
  return response.data;
};

export const updateTodo = async (accessToken, id, todoData) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  const response = await axios.put(
    `${API_BASE_URL}/todos/${id}`,
    todoData,
    { headers: headers },
  );
  return response.data;
};

export const deleteTodo = async (accessToken, id) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await axios.delete(
    `${API_BASE_URL}/todos/${id}`,
    { headers: headers }
  );
  return response.data;
};