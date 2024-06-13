/* eslint-disable no-undef */
/**eslint 规则 0 ==> "off" , 1 ==> "warn" , 2 ==> "error"*/
module.exports = {
  /**环境配置 */
  env: {
    /**浏览器环境 */
    browser: true,
    /**es6语法环境 */
    es6: true,
  },
  /**插件配置 */
  plugins: [/**eslint-plugin-react插件 */ "react", /** eslint ts插件 */ "@typescript-eslint"],
  rules: {
    /**数组一些方法返回的必要性 */
    "array-callback-return": [
      1,
      {
        /**可任意返回 */
        allowImplicit: true,
        /**每个都要返回 */
        checkForEach: true,
        /**checkForEach 为 true 时 允许使用 void作为返回值 */
        allowVoid: true,
      },
    ],
    /**阻止无限循环 */
    "for-direction": 2,
    /**getter方法的返回值限制 */
    "getter-return": ["error", { allowImplicit: true }],
    /**在promise的函数中使用async函数 */
    "no-async-promise-executor": 0,
    /**在循环中使用wait */
    "no-await-in-loop": 1,
    /**在条件表达式中使用赋值运算符 */
    "no-cond-assign": 2,
    /**禁止const 声明的变量重新赋值 */
    "no-const-assign": 2,
    /**结果不变的表达式命名为变量 */
    "no-constant-binary-expression": 1,
    /**条件判断为常量 */
    "no-constant-condition": [1, {/**循环判断允许 */ checkLoops: false }],
    /**在正则表达式中使用非可见字符 */
    "no-control-regex": 1,
    /**使用debugger */
    "no-debugger": 1,
    /**函数定义中不允许重复参数 */
    "no-dupe-args": 2,
    /**不允许if-else-if链中的重复条件 */
    "no-dupe-else-if": 2,
    /**不允许重复使用case值 */
    "no-duplicate-case": 2,
    /**不允许重复，from 一个文件 */
    "no-duplicate-imports": 2,
    /**正则表达式空表达式 */
    "no-empty-character-class": 2,
    /**不允许空的解构模式 */
    "no-empty-pattern": 2,
    /**不允许在catch中二次分配异常 */
    "no-ex-assign": 2,
    /**不允许case语句（非最后一条）无控制语句如break和return */
    // "no-ex-assign": 1,
    /**允许函数名的重新分配值 */
    "no-func-assign": 0,
    /**在RegExp构造函数中不允许使用无效的正则表达式字符串 */
    "no-invalid-regexp": 1,
    /**不允许无效的空格 */
    "no-irregular-whitespace": 2,
    /**警告丢失精度的文字或数字 */
    "no-loss-of-precision": 1,
    /**不允许promise的执行函数返回函数 */
    "no-promise-executor-return": [1, {/**允许作为流程控制返回 */ allowVoid: true }],
    /**不允自己赋值自己 */
    "no-self-assign": [2, {/**自身属性可以 */ props: false }],
    /**不允许在双方完全相同的情况下进行比较 */
    "no-self-compare": 2,
    /**禁止使用未声明的变量，除非在全局定义 */
    "no-undef": 1,
    /**不允许混淆多行表达式 */
    "no-unexpected-multiline": 2,
    /**不允许在return、throw、continue和break语句之后出现无法访问的代码 */
    "no-unreachable": 1,
    /**不允许具有只允许一次迭代的实体的循环￼ */
    "no-unreachable-loop": 1,
    /**未使用的变量声明 */
    "no-unused-vars": 1,
    /**检查NaN时需要调用isNaN（） */
    "use-isnan": 1,
    /**强制将typeof表达式与有效字符串进行比较 */
    "valid-typeof": 2,
    /**要求或禁止命名函数表达式￼ */
    "func-names": [1, "as-needed"],

    /**箭头函数必须有大括号 */
    "arrow-body-style": [1, "always"],
    /**当变量在定义变量的块之外使用时，块范围的var规则会生成警告。 */
    "block-scoped-var": 1,
    /**驼峰命名 */
    camelcase: 1,
    /**为所有控制语句强制使用一致的大括号样式 */
    curly: 1,
    /**多行注释统一样式 */
    "multiline-comment-style": [1, /**块样式 */ "bare-block"],
    /**不允许使用嵌套三目运算符 */
    "no-nested-ternary": 1,
    /**不允许使用var关键字 */
    "no-var": 2,

    "@typescript-eslint/no-unused-vars": 1,
    /**---  一些react配置  ---*/
    /**禁用prop-types */
    "react/prop-types": 2,
    /**关闭旧模式校验 */
    "react/jsx-uses-react": "off",
    /**关闭旧模式校验 */
    "react/react-in-jsx-scope": "off",
    //typescript
    "@typescript-eslint/no-unsafe-call": 0,
    "@typescript-eslint/no-unsafe-assignment": 0,
    "@typescript-eslint/no-unsafe-member-access": 0,
    "@typescript-eslint/no-floating-promises": 0
  },
  extends: [
    /**eslint 默认配置 */
    "eslint:recommended",
    /**继承prettier 配置*/
    "prettier",
    /**ts配置 */
    "plugin:@typescript-eslint/recommended-type-checked",
    /**react 默认配置 */
    // "plugin:react/recommended",
    /**官方文档说使用React17需要继承的配置 */
    "plugin:react/jsx-runtime",
  ],
  parser: "@typescript-eslint/parser",
  // /**解析器配置 */
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
      files: ["./**/*.js"],
    },
  ],
};
