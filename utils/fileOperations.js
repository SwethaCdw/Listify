const fs = require('fs').promises;

/**
 * Read from a file path
 * @param {*} filePath 
 * @returns 
 */
const readJsonFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file from disk: ${error}`);
    }
};


/**
 * Write to a file path
 * @param {*} filePath 
 * @returns 
 */
const writeJsonFile = async (filePath, data) => {
  try {
      await fs.writeFile(filePath, JSON.stringify(data), 'utf-8');
      console.log(`Data successfully written to ${filePath}`);
  } catch (error) {
      console.error(`Error writing file to disk: ${error}`);
  }
};

module.exports = {
    readJsonFile,
    writeJsonFile
};
