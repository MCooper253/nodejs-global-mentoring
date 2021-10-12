const fs = require('fs');
const csv = require('csvtojson');

const file = 'sample-files/sample.csv';

const readable = fs.createReadStream(file);
const writeable = fs.createWriteStream('out.txt')
const transform = csv();

readable.pipe(transform)
  .on('data', chunk => console.log(`received ${chunk.length} bytes of data.`)) //This is the show how big the chunks that are getting steamed are.
  .on('error', err => console.log(err))
  .pipe(writeable)
  .on('error', err => console.log(err));

