import axios from 'axios';

const baseURL = 'http://localhost:3001/autos';

const getAll = () => {
  return axios.get(baseURL).then(response => response.data);
};

const create = (newObject) => {
  return axios.post(baseURL, newObject).then(response => response.data);
};

const update = (id, newObject) => {
  return axios.put(`${baseURL}/${id}`, newObject).then(response => response.data);
};

const remove = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

const autosService = {
  getAll,
  create,
  update,
  remove
};

export default autosService;