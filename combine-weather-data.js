const fs = require('fs');
const path = require('path');

function parseCSVLine(line) {
  const values = line.split(',');
  return values.map(val => val.trim() === '' ? null : val.trim());
}

function toCamelCase(str) {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase())
    .replace(/^[A-Z]/, match => match.toLowerCase())
    .replace(/^pkt$/i, 'date');
}

function readWeatherFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n').filter(line => line.trim());
    
    if (lines.length === 0) return [];
    
    const header = parseCSVLine(lines[0]);
    const camelCaseHeader = header.map(col => toCamelCase(col));
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      if (values.length === header.length && values.some(val => val !== null)) {
        const record = {};
        camelCaseHeader.forEach((col, index) => {
          record[col] = values[index];
        });
        data.push(record);
      }
    }
    
    return data;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return [];
  }
}

function combineAllWeatherData() {
  const currentDir = __dirname;
  const files = fs.readdirSync(currentDir)
    .filter(file => file.startsWith('Murree_weather_') && file.endsWith('.txt'))
    .sort();
  
  const allData = [];
  
  files.forEach(file => {
    const filePath = path.join(currentDir, file);
    const fileData = readWeatherFile(filePath);
    allData.push(...fileData);
  });
  
  return allData;
}

const weatherData = combineAllWeatherData();

const output = `const weatherData = ${JSON.stringify(weatherData, null, 2)};

module.exports = weatherData;
`;

fs.writeFileSync(path.join(__dirname, 'combined-weather-data.js'), output);
console.log(`Combined ${weatherData.length} weather records from all files`);