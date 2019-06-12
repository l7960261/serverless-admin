const fs = require('fs'),
  path = require('path'),
  envFilePath = path.resolve(process.cwd(), 'src', 'environments', 'environment.prod.ts'),
  argList = Array.prototype.slice.call(process.argv).slice(2, 3);

return fs.readFile(envFilePath, 'utf8', (err, data) => {
  if (err) throw err;

  const configStr = argList.join('');
  const res = unescape(configStr);
  const overWrite = data.replace('{}', res);
  return fs.writeFile(envFilePath, overWrite, 'utf8', err => {
    if (err) throw err;

    console.log(envFilePath, ' has been changed.');
  });
})