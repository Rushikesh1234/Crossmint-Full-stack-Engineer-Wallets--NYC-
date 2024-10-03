const axios = require('axios');

const candidateId = '0d2f55e3-0005-4ecc-acdc-5d8039e46c93';

const apiUrl = 'https://challenge.crossmint.io/api/polyanets';

const positions = [
  { row: 2, column: 2 },
  { row: 2, column: 8 },
  { row: 3, column: 3 },
  { row: 3, column: 7 },
  { row: 4, column: 4 },
  { row: 4, column: 6 },
  { row: 5, column: 5 },
  { row: 6, column: 4 },
  { row: 6, column: 6 },
  { row: 7, column: 3 },
  { row: 7, column: 7 },
  { row: 8, column: 2 },
  { row: 8, column: 8 }
];

// Function to create a Polyanet at a given position
const createPolyanet = async (row, column) => {
  try {
      const response = await axios.post(apiUrl, {
        candidateId: candidateId,
        row: row,
        column: column
      });
      console.log(`Polyanet created at (${row}, ${column})`);
    } catch (error) {
      console.error(`Failed to create Polyanet at (${row}, ${column}): ${error}`);
    }
};

const createXPattern = async () => {
    for (const position of positions) {
        await createPolyanet(position.row, position.column);
    }
};

createXPattern();
