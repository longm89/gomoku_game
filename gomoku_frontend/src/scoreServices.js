import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/scores';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  const data = response.data[0];
  const newScores = { humanScore: data.humanScore, computerScore: data.computerScore };
  return newScores;
};

const addHumanScore = async () => {
  const scoreToAdd = { score: 1 };
  const response = await axios.put(`${baseUrl}/humanScore`, scoreToAdd);
  return response.data;
};

const addComputerScore = async () => {
  const scoreToAdd = { score: 1 };
  const response = await axios.put(`${baseUrl}/computerScore`, scoreToAdd);
  return response.data;
};

export default {
  getAll, addHumanScore, addComputerScore
};