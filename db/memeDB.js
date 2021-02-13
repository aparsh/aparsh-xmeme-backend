var db = require('node-localdb');
const Meme = db('./meme.json');
module.exports = Meme;