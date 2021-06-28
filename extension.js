const vscode = require("vscode");
const fs = require("fs");

const prettierrc = `module.exports = {
  printWidth: 100,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'es5',
  arrowParens: 'avoid',
  htmlWhitespaceSensitivity: 'css',
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
      const workspace = folder.fsPath;
      if (
        !fs.existsSync(
          `${workspace}/.prettierrc.js` ||
            `${workspace}/.prettierrc` ||
            `${workspace}/.prettierrc.json`
        )
      ) {
        fs.writeFileSync(`${workspace}/.prettierrc.js`, prettierrc);
        fs.writeFileSync(`${workspace}/.prettierignore`, ignore);
        vscode.window
          .showInformationMessage(
            "Do you need to install dependencies?",
            "Install",
            "Already Done"
          )
          .then((answer) => {
            if (answer === "Install") {
              const terminal = vscode.window.createTerminal({
                name: "prettier",
                // hideFromUser: true,
              });
              terminal.show();
              try {
                terminal.sendText(`npm i -D prettier`);
              } catch (err) {
                vscode.window.showErrorMessage(
                  `请手动安装依赖！"npm i -D prettier"`
                );
              }
            }
          });
      } else {
        vscode.window.showWarningMessage(
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
