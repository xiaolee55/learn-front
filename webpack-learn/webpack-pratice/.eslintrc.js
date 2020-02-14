module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: "babel-eslint",
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  globals: {   //表示以下的全局变量只能读取（readonly）
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {  //自定义规则
  },
};
