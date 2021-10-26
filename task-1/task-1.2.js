const fs = require('fs');
const csv = require('csvtojson');
const { pipeline } = require('stream');

const file = 'sample-files/sample.csv';

const readable = fs.createReadStream(file);
const writeable = fs.createWriteStream('out.txt')
const transform = csv();

const handleErr = (err) => {
  if (err) {
    console.error('Pipeline failed.', err);
  } else {
    console.log('Pipeline succeeded.');
  }
};

pipeline(
  readable,
  transform,
  writeable,
  handleErr
);