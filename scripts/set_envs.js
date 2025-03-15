const { writeFileSync, mkdirSync } = require('fs');
require('dotenv').config();

const targetPath = `./src/environment/environment.ts`;

const envFileContent = `
  export const environment = {
    apiUrl: '${process.env['API_URL']}',
  };
`;

mkdirSync('src/environment');

writeFileSync(targetPath, envFileContent);
