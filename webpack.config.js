

  const path = require('path');

let sassImplementation;
try {
  // tslint:disable-next-line:no-implicit-dependencies
  sassImplementation = require('node-sass');
} catch {
  sassImplementation = require('sass');
}

module.exports = {
  // Fix for: https://github.com/recharts/recharts/issues/1463
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
        {
            test: /\.scss$/,
            use: [
              'tyle-loader',
              'css-loader',
              {
                loader: 'ass-loader',
                options: {
                  includePaths: ['./node_modules']
                }
              }
            ]
          }
    ]
  }
};
