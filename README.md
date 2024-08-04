# @ig3/dedent

A plain JavaScript CJS module remove excess indent from multi-line strings,
without dependencies.

When using template strings to create multi-line strings in an indented
code block, to maintain indent within the code block, the lines of the
string template might also be indented, but this produces a string with too
much indent.

`dedent(str)` can be used to remove such excess indent.

## install

```
$ npm install @ig3/dedent
```

## usage

```
const dedent = require('@ig3/dedent');

function getString () {
    return `
      This is a multi-line string.
      It should be indented by two spaces.
      But because the string template is in an indented code block,
      with each line indented by four spaces,
      to maintain indent within the code block,
      each line is indented by six spaces.
      Using dedent() removes the extra indentation.
    `;
}

console.log(dedent(getString()));
```

This produces:

```
  This is a multi-line string.
  It should be indented by two spaces.
  But because the string template is in an indented code block,
  with each line indented by four spaces,
  to maintain indent within the code block,
  each line is indented by six spaces.
  Using dedent() removes the extra indentation.
```

It handles a mix of tabs and spaces in the indent, as long as the indent is
consistent from line to line. If some lines use tabs and others use spaces
or the order of tabs and spaces is variable, then the result will be
incorrect.

Leading '\n' and trailing line empty except for the indent are removed.

If the last line is not empty except for the indent, a heuristic is used to
determine the indent: testing each line of the string to find the shortest
(number of characters) prefix of spaces and/or tabs, and this prefix is
removed. Scanning all lines of the string takes additional time and might
give unexpected results.

Single-line strings (i.e. without any '\n' character) are returned
unchanged.

Throws an exception if the passed value is not a string;
