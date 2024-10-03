const axios = require('axios');

// Replace with your candidate ID
const candidateId = '0d2f55e3-0005-4ecc-acdc-5d8039e46c93';
const goalMapUrl = `https://challenge.crossmint.io/api/map/${candidateId}/goal`;

const getGoalMap = async () => {
  try {
        const response = await axios.get(goalMapUrl);
        const goalMap = response.data.goal;  // This is the target map
        // console.log(goalMap);
        return goalMap;
  } catch (error) {
    console.error('Error fetching the goal map:', error);
  }
};

const createPolyanet = async (row, column) => {
    const polyanetUrl = 'https://challenge.crossmint.io/api/polyanets';
    try {
        await axios.post(polyanetUrl, {
            candidateId: candidateId,
            row: row,
            column: column
        });
        // console.log(`Polyanet created at (${row}, ${column})`);
    } 
    catch (error) {
        console.error(`Error creating Polyanet at (${row}, ${column})`, error);
    }
};

const createSoloon = async (row, column, color) => {
    const sooloonUrl = 'https://challenge.crossmint.io/api/soloons';
    try {
        await axios.post(sooloonUrl, {
            candidateId: candidateId,
            row: row,
            column: column,
            color: color
        });
        console.log(`Sooloon (${color}) created at (${row}, ${column})`);
    } 
    catch (error) {
        console.error(`Error creating Sooloon at (${row}, ${column})`, error);
    }
};

const createComETH = async (row, column, direction) => {
    const comethUrl = 'https://challenge.crossmint.io/api/comeths';
    try {
        await axios.post(comethUrl, {
            candidateId: candidateId,
            row: row,
            column: column,
            direction: direction
        });
        // console.log(`ComETH (${direction}) created at (${row}, ${column})`);
    } 
    catch (error) {
        console.error(`Error creating ComETH at (${row}, ${column})`, error);
    }
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const createEntitiesFromGoalMap = async (goalMap) => {
    for (let row = 0; row < goalMap.length; row++) {
        for (let column = 0; column < goalMap[row].length; column++) {
            const entity = goalMap[row][column];
            
            if (entity === 'POLYANET') {
                await createPolyanet(row, column);
            } 
            else if (entity.includes('SOLOON')) {
                const color = entity.split('_')[0].toLowerCase();
                await createSoloon(row, column, color);
            } 
            else if (entity.includes('COMETH')) {
                const direction = entity.split('_')[0].toLowerCase();
                await createComETH(row, column, direction);
            }

            await delay(300);
        }
    }
};
  
// Run the process to create the map
getGoalMap().then(goalMap => createEntitiesFromGoalMap(goalMap));
  
