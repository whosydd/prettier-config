# PrettierConfig for VS Code

## Dependencies

- prettier

## ExtensionDependencies

- [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Usage

![](https://raw.githubusercontent.com/whosydd/images-in-one/main/20210704000715.gif)

A new `.prettierrc.js` file and a new `.prettierignore` file can be created via the Explorer sidebar's context menu by right-clicking in the folder where you'd like it to be and selecting `Generate .prettierrc`.

## Configuration

### .prettierrc.js

```js
module.exports = {
  printWidth: 100, // 代码宽度建议不超过100字符
  tabWidth: 2, // tab缩进2个空格
  semi: false, // 末尾分号
  singleQuote: true, // 单引号
  jsxSingleQuote: true, // jsx中使用单引号
  trailingComma: "es5", // 尾随逗号
  arrowParens: "avoid", // 箭头函数仅在必要时使用()
  htmlWhitespaceSensitivity: "css", // html空格敏感度
};
```

### .prettierignore

```
**/*.min.js
**/*.min.css

.vscode/
.idea/
node_modules/
test/
dist/
build/
```
