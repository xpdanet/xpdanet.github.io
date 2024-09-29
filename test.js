import fs from 'node:fs';

function parseToolsData (responseData) {
  let data = [];
  let networkError = false;
  try {
    data = responseData.split('\n');
    data = data.filter(function (line) {
      return !line.trim().startsWith('//');
    }).join('\n');
    data = JSON.parse(data);
  } catch (err) {
    if (err) {
      networkError = true;
    }
  }
  return {
    tools: data,
    networkError: networkError
  };
}

const tools = String(fs.readFileSync('./_data/tools.json'));
const parsed = parseToolsData(tools);

if (parsed && parsed.tools && parsed.tools.length && Array.isArray(parsed.tools)) {
  console.log('tools.json was validated');
} else {
  throw 'tools.json is not valid';
}
