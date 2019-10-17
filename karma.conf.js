const { DefinePlugin } = require('webpack');

module.exports = config => {
  const { env } = process;

  config.set({
    frameworks: ['mocha', 'sinon-chai'],

    files: ['test/index.js'],

    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                envName: 'test',
              },
            },
          },
        ],
      },
      plugins: [
        new DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test'),
        }),
      ],
      devtool: 'cheap-module-inline-source-map',
      stats: 'minimal',
    },

    webpackMiddleware: {
      noInfo: true,
    },

    reporters: ['mocha', 'coverage'],

    mochaReporter: {
      output: 'autowatch',
    },

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage',
    },

    browsers: env.BROWSER ? env.BROWSER.split(',') : ['Chrome_Without_Sandbox'],
    customLaunchers: {
      Chrome_Without_Sandbox: {
        base: 'Chrome',
        flags: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    },

    singleRun: env.CONTINUOUS_INTEGRATION === 'true',
  });
};
