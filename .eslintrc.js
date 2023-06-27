module.exports = {
  env: {
    node: true,
    commonjs: true
  },
  extends: [
    'standard-with-typescript'
  ],
  parserOptions: {
    project: './tsconfig.json'
  }
}
