const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// Sends new content to the destination file
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

  // Pulls out current contents of the destination file, pushes new content into it, rewrites file with total content
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

// Pulls out current contents of the destination file, deletes the selected note, rewrites file with total content
const readDeleteAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const notes = JSON.parse(data);
            const index = notes.findIndex(note => note.id === content);
            if (index !== -1) {
                notes.splice(index, 1);
                writeToFile(file, notes);
            } 
        }
    })
}

module.exports = { readFromFile, readAndAppend, readDeleteAndAppend };