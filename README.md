# PrettierConfig for VS Code

## Dependencies

- prettier

## ExtensionDependencies

- [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Usage

![](https://raw.githubusercontent.com/whosydd/images-in-one/main/20210704000715.gif)

A new `.prettierrc.js` file and a new `.prettierignore` file can be created via the Explorer sidebar's context menu by right-clicking in the folder where you'd like it to be and selecting `Generate .prettierrc`.

## Configuration

### Sync from gist

可以选择在[gist](https://gist.github.com/)上添加`.prettierrc.js`以及`.prettierignore`，然后通过`wget`下载到本地

**注意：**如果你不想生成 `.prettierignore` 文件，请不要设置` ignoreUrl`

**Warning:** If you do not want to generate a `.prettierignore` file, please do not set `ignoreUrl`

##### 获取下载地址：

![Screenshot of PrettierConfig for VS Code](https://raw.githubusercontent.com/whosydd/images-in-one/main/20210711233331.png)

```json
// settings.json:
"prettier-config.gist": {
    "configUrl": "https://gist.githubusercontent.com/whosydd/88cdd14ce8d329da28fcaa94a0b5a57d/raw/3e2f31feee0c4dfcf86043f5dc1806dbbc6fc1d8/.prettierrc.js",
    // 如果不想生成 .prettierignore 文件，请不要设置 ignoreUrl
    // If you do not want to generate a .prettierignore file, please do not set 'ignoreUrl'
    "ignoreUrl": "https://gist.githubusercontent.com/whosydd/55645a46fe427b45334d20b2df5aaf50/raw/2b761c9ebc00a81300b8253a1dffe12c26d4f5d1/.prettierignore"
},
```

### tip

设置为`false`时，将不再提示`install prettier`

![Capture](https://raw.githubusercontent.com/whosydd/images-in-one/main/20210711234457.PNG)

```json
// settings.json:
"prettier-config.tip": true //default
```



### default

默认情况下，将直接从扩展的`src`目录复制以下配置文件

#### .prettierrc.js

```js
module.exports = {
  printWidth: 100, // 代码宽度建议不超过100字符
  tabWidth: 2, // tab缩进2个空格
  semi: false, // 末尾分号
  singleQuote: true, // 单引号
  jsxSingleQuote: true, // jsx中使用单引号
  trailingComma: 'es5', // 尾随逗号
  arrowParens: 'avoid', // 箭头函数仅在必要时使用()
  htmlWhitespaceSensitivity: 'css', // html空格敏感度
}
```

#### .prettierignore

```
**/*.min.js
**/*.min.css

.idea/
node_modules/
dist/
build/
```
