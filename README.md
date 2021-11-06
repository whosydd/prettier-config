# PrettierConfig for VS Code

## Dependencies

- prettier

## ExtensionDependencies

- [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Usage

![](https://raw.githubusercontent.com/whosydd/images-in-one/main/20210704000715.gif)

![prettier 72](https://raw.githubusercontent.com/whosydd/images-in-one/main/20210712140259.png)

## Configuration

### Sync from gist

```json
// settings.json:
"prettier-config.gist": {
    "configID": "88cdd14ce8d329da28fcaa94a0b5a57d",
    // 如果不想生成 .prettierignore 文件，请不要设置 ignoreUrl
    // If you do not want to generate a .prettierignore file, please do not set 'ignoreUrl'
    "ignoreID": "55645a46fe427b45334d20b2df5aaf50"
},
```

可以选择在[gist](https://gist.github.com/)上添加`.prettierrc.js`以及`.prettierignore`，将`gist_id`添加到配置项中，扩展会通过`ajax`请求获取相应配置文件

#### 获取`gist_id`:

![Capture](https://raw.githubusercontent.com/whosydd/images-in-one/main/20210719143245.PNG)

### tip

```json
// settings.json:
"prettier-config.tip": true //default
```

```bash
# You can choose to install prettier manually
npm i -D prettier
```

设置为`false`时，将不再提示`install prettier`

![Capture](https://raw.githubusercontent.com/whosydd/images-in-one/main/20210711234457.PNG)

### default

默认情况下，将直接从扩展的`template`目录复制以下配置文件

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
