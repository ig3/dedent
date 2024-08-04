'use strict';

const t = require('@ig3/test');
const dedent = require('../index.js');

t.test('dedent', t => {
  t.test('non-string', t => {
    try {
      dedent(10);
      t.fail('should not return');
    } catch (err) {
      t.pass('should throw');
      t.equal(err.message, 'Not a string: number', 'error message');
    }
    t.end();
  });
  t.test('non-indented string', t => {
    const s = 'a string';
    const r = dedent(s);
    t.equal(r, 'a string', 'should be unchanged');
    t.end();
  });
  t.test('indented single-line string', t => {
    const s = '  a string';
    const r = dedent(s);
    t.equal(r, '  a string', 'result');
    t.end();
  });
  t.test('multi-line indented string', t => {
    const s = `
    a string
    `;
    const r = dedent(s);
    t.equal(r, 'a string', 'result');
    t.end();
  });
  t.test('more indented string', t => {
    const s = `
      a string
    `;
    const r = dedent(s);
    t.equal(r, '  a string', 'result');
    t.end();
  });
  t.test('tab indented string', t => {
    const s = `
\ta string
\t`;
    const r = dedent(s);
    t.equal(r, 'a string', 'result');
    t.end();
  });
  t.test('tab/space indented string', t => {
    const s = `
\t  a string
\t  `;
    const r = dedent(s);
    t.equal(r, 'a string', 'result');
    t.end();
  });
  t.test('space/tab indented string', t => {
    const s = `
  \ta string
  \t`;
    const r = dedent(s);
    t.equal(r, 'a string', 'result');
    t.end();
  });
  t.test('no leading <CR>', t => {
    const s = `No leading indent.
    A second line.
    `;
    const r = dedent(s);
    t.equal(r, 'No leading indent.\nA second line.', 'result');
    t.end();
  });
  t.test('no trailing <CR>', t => {
    const s = `Line one.
    Line two.`;
    const r = dedent(s);
    t.equal(r, 'Line one.\nLine two.', 'result');
    t.end();
  });
  t.test('leading extra indent', t => {
    const s = `
      <tr><th>Header</th><td>data</td></tr>
    </table>
    `;
    const r = dedent(s);
    t.equal(r, '  <tr><th>Header</th><td>data</td></tr>\n</table>', 'result');
    t.end();
  });
  t.test('trailing extra indent', t => {
    const s = `
    <table>
      <tr><th>Header</th><td>data</td></tr>
    `;
    const r = dedent(s);
    t.equal(r, '<table>\n  <tr><th>Header</th><td>data</td></tr>', 'result');
    t.end();
  });
  t.test('all extra indent', t => {
    const s = `
      Several lines
      of indented
      text.
    `;
    const r = dedent(s);
    t.equal(r, '  Several lines\n  of indented\n  text.', 'result');
    t.end();
  });
  t.end();
});
