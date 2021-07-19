const vscode = require('vscode')
const fs = require('fs')
const axios = require('axios')
/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  // 通知
  vscode.window.showInformationMessage('PrettierConfig for VS Code 1.1.0 NEW!', {
    modal: true,
    detail: `由于改用ajax请求的方式获取gist上的配置文件，现在配置项需要gist_id，请参考扩展详情页！
    
    Please refer to the extension details page!`,
  })

  let prettier = vscode.commands.registerCommand('prettier-config', async function (folder) {
    // 获取配置项
    const flag = await vscode.workspace.getConfiguration('prettier-config').get('tip')
    const res = await vscode.workspace.getConfiguration('prettier-config').get('gist')
    const { configID, ignoreID } = res

    // 获取工作区路径
    let workspace
    if (!folder) workspace = vscode.workspace.workspaceFolders[0].uri.fsPath
    else workspace = folder.fsPath

    // default
    const defaultConfigFile = fs.readFileSync(`${__dirname}/src/.prettierrc.js`, 'utf-8')
    const defaultIgnoreFile = fs.readFileSync(`${__dirname}/src/.prettierignore`, 'utf-8')

    // handle
    function copyHandle() {
      // 判断配置项
      if (configID) {
        axios
          .get('https://api.github.com/gists/' + configID)
          .then(res => {
            const configFile = res.data.files['.prettierrc.js'].content
            fs.writeFileSync(`${workspace}/.prettierrc.js`, configFile)
            tip()
          })
          .catch(err => {
            vscode.window.showErrorMessage(err.message)
          })
        if (ignoreID) {
          axios
            .get('https://api.github.com/gists/' + ignoreID)
            .then(res => {
              const ignoreFile = res.data.files['.prettierignore'].content
              fs.writeFileSync(`${workspace}/.prettierignore`, ignoreFile)
              tip()
            })
            .catch(err => {
              vscode.window.showErrorMessage(err.message)
            })
        }
      } else {
        fs.writeFileSync(`${workspace}/.prettierrc.js`, defaultConfigFile)
        fs.writeFileSync(`${workspace}/.prettierignore`, defaultIgnoreFile)
        tip()
      }
    }

    // tip
    function tip() {
      if (!flag) return
      vscode.window
        .showInformationMessage('Do you need to install prettier?', 'Install', 'Already Done')
        .then(answer => {
          if (answer === 'Install') {
            const terminal = vscode.window.createTerminal({
              name: 'prettier',
            })
            terminal.show()
            try {
              terminal.sendText(`npm i -D prettier`)
            } catch (err) {
              vscode.window.showErrorMessage(`请手动安装依赖！"npm i -D prettier"`)
            }
          }
        })
    }

    // 判断工作区是否存在配置文件
    if (
      !fs.existsSync(
        `${workspace}/.prettierrc.js` ||
          `${workspace}/.prettierrc` ||
          `${workspace}/.prettierrc.json`
      )
    )
      copyHandle()
    else
      vscode.window
        .showWarningMessage(
          'An .prettierrc file already exists in this workspace.',
          'Replace',
          'OK'
        )
        .then(value => {
          value === 'Replace' ? copyHandle() : null
        })
  })

  context.subscriptions.push(prettier)
}
function deactivate() {}

module.exports = {
  activate,
  deactivate,
}
