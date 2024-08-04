'use strict';

module.exports = function (str) {
  if (typeof str !== 'string') {
    throw new Error('Not a string: ' + typeof str);
  }
  const indexOfLastNewline = str.lastIndexOf('\n');
  if (indexOfLastNewline === -1) return str;
  let prefix = str.slice(indexOfLastNewline);
  if (/[^ \t\n]/.test(prefix)) {
    console.log('prefix: "' + prefix + '"');
    str.split('\n')
    .forEach(line => {
      const m = line.match(/^([ \t]+)/);
      if (m && m[1].length < prefix.length) prefix = m[1];
    });
    prefix = '\n' + prefix;
  }
  str = str.replaceAll(prefix, '\n');
  const start = (str[0] === '\n') ? 1 : 0;
  const end = (str[str.length - 1] === '\n') ? -1 : undefined;
  if (start || end) return str.slice(start, end);
  return str;
};
