const fs = require('fs');
const csv = require('csvtojson');

const file = 'sample-files/sample.csv';

const readable = fs.createReadStream(file);
const writeable = fs.createWriteStream('out.txt')

readable.pipe(csv(/*need some parsing options*/))
  .on('error', err => console.log(err))
  .pipe(writeable)
  .on('error', err => console.log(err));

