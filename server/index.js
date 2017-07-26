// eslint-disable-next-line import/no-extraneous-dependencies
require('babel-register')({
  "presets": ["stage-0", "es2015", "react"],
  "plugins": [
    [
      'babel-plugin-transform-require-ignore',
      {
        extensions: ['.scss', '.css']
      }
    ]
  ]
});
require('./server')
