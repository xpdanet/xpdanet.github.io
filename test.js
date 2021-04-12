global.window = {};
const fs = require('fs');
const helpers = require('./_scripts/helpers.js');

const tools = String(fs.readFileSync('./_data/tools.json'));
const parsed = helpers.parseToolsData(tools);

if (parsed && parsed.tools && parsed.tools.length && Array.isArray(parsed.tools)) {
  console.log('tools.json was validated');
} else {
  throw 'tools.json is not valid';
}
