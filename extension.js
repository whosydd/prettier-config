const vscode = require("vscode");
const fs = require("fs");

const prettierrc = `module.exports = {
  printWidth: 100, // 代码宽度建议不超过100字符
  tabWidth: 2, // tab缩进2个空格
  semi: false, // 末尾分号
  singleQuote: true, // 单引号
  jsxSingleQuote: true, // jsx中使用单引号
  trailingComma: 'es5', // 尾随逗号
  arrowParens: 'avoid', // 箭头函数仅在必要时使用()
  htmlWhitespaceSensitivity: 'css', // html空格敏感度
}
`;

const ignore = `**/*.min.js
**/*.min.css

.vscode/
.idea/
node_modules/
test/
dist/
build/`;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "prettier-config",
    function (folder) {
      const workspace = folder._fsPath;
      if (
        !fs.existsSync(
          `${workspace}/.prettierrc.js` ||
            `${workspace}/.prettierrc` ||
            `${workspace}/.prettierrc.json`
        )
      ) {
        fs.writeFileSync(`${workspace}/.prettierrc.js`, prettierrc);
        fs.writeFileSync(`${workspace}/.prettierignore`, ignore);
      } else {
        vscode.window.showErrorMessage(
          "An .prettierrc file already exists in this workspace."
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
