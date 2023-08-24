import axios from "axios";

const API_BASE_URL = "https://www.pre-onboarding-selection-task.shop";

const createAuthHeader = (accessToken) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };
};

const sendRequest = async (method, url, data = null, accessToken) => {
  const config = {
    method,
    url: `${API_BASE_URL}${url}`,
    data,
    ...createAuthHeader(accessToken),
  };

  const response = await axios(config);
  return response.data;
};

export const createTodo = async (accessToken, todo) => {
  return sendRequest("post", "/todos", { todo }, accessToken);
};

export const getTodos = async (accessToken) => {
  return sendRequest("get", "/todos", null, accessToken);
};

export const updateTodo = async (accessToken, id, todoData) => {
  return sendRequest("put", `/todos/${id}`, todoData, accessToken);
};

export const deleteTodo = async (accessToken, id) => {
  return sendRequest("delete", `/todos/${id}`, { id }, accessToken);
};