const fs = require('fs');
const csv = require('csvtojson');
const { pipeline } = require('stream');

const file = 'sample-files/sample.csv';

const readable = fs.createReadStream(file);
const writeable = fs.createWriteStream('out.txt')
const transform = csv();

// readable.pipe(transform)
//   .on('data', chunk => console.log(`received ${chunk.length} bytes of data.`)) //This is the show how big the chunks that are getting steamed are.
//   .on('error', err => console.log(err))
//   .pipe(writeable)
//   .on('error', err => console.log(err));

pipeline(
  readable,
  transform,
  writeable,
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
);