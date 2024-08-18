const fs = require('fs');

export async function updateJsonFile(filePath, keyToUpdate, newValue) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    const jsonData = JSON.parse(data);

    if (!jsonData.runtimetestdata || !jsonData.runtimetestdata.hasOwnProperty(keyToUpdate)) {
      console.error('Key not found or object not present:', keyToUpdate);
      return;
    }

    jsonData.runtimetestdata[keyToUpdate] = newValue;

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('New value updated successfully.');
      }
    });
  });
}