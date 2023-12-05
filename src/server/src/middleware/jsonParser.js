const bodyParser = require('body-parser'); 
const jsonParser = bodyParser.json(); // vrátí json parser
module.exports = jsonParser; // exportuje json parser