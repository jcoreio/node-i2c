module.exports = api => ({
  plugins: api.env('coverage') ? ['babel-plugin-istanbul'] : [],
  presets: [
    ['@babel/preset-env', { targets: { node: '12' } }],
    '@babel/preset-typescript',
  ],
})
