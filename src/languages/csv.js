/*
Language: CSV
Description: Comma-separated values with cycling column colors.
Author: Anders Borum <palmin@gmail.com>
Category: data
*/

export default function(hljs) {
  const SLOTS = 5;

  // Each col matches a cell, then in `end` consumes the trailing comma (if any)
  // or hits a zero-width lookahead for newline/EOF. `endScope` wraps the
  // consumed comma in its own csv-delimiter span; zero-width end matches
  // produce no span because addKeyword skips empty text.
  //
  // `starts` chains col_N → col_(N+1). cols[SLOTS-1] has no `starts`, so after
  // the fifth cell the chain ends and the row's `contains: [cols[0]]` restarts
  // the cycle, giving us the wrap-to-col-1 we want.
  const cols = [];
  for (let i = 0; i < SLOTS; i++) {
    cols.push({
      className: 'csv-col-' + (i + 1),
      begin: /[^,\n]+/,
      end: /,/,
      endScope: 'csv-delimiter',
      endsWithParent: true
    });
  }
  for (let i = 0; i < SLOTS - 1; i++) {
    cols[i].starts = cols[i + 1];
  }

  const ROW = {
    begin: /(?=[^\n])/,
    end: /\n/,
    contains: [cols[0]]
  };

  return {
    name: 'CSV',
    aliases: ['csv'],
    contains: [ROW]
  };
}
