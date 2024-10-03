const axios = require('axios');

const candidateId = '0d2f55e3-0005-4ecc-acdc-5d8039e46c93';
const goalMapUrl = `https://challenge.crossmint.io/api/map/${candidateId}/goal`;

const getGoalMap = async () => {
  try {
    const response = await axios.get(goalMapUrl);
    const goalMap = response.data.goal;
    console.log(goalMap);
    return goalMap;
  } catch (error) {
    console.error('Error fetching the goal map:', error);
  }
};

getGoalMap();
