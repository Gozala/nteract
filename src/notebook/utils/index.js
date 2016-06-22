import fs from 'fs';
import path from 'path';
import tmp from 'tmp';

export function copyNotebook(filename) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filename);
    readStream.on('error', reject);

    const base = path.basename(filename, '.ipynb');

    tmp.tmpName({ prefix: `${base}-Copy` , postfix: '.ipynb' }, (err, path) => {
      if (err) {
        reject(err);
      }

      const writeStream = fs.createWriteStream(path);
      writeStream.on('error', reject);

      readStream.pipe(writeStream);
      writeStream.on('close', resolve(path));
    });
  });
}
