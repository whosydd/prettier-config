const vscode = require('vscode')
const fs = require('fs')

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  let prettier = vscode.commands.registerCommand('prettier-config', async function (folder) {
    // 获取配置项
    const flag = await vscode.workspace.getConfiguration('prettier-config').get('tip')
    const res = await vscode.workspace.getConfiguration('prettier-config').get('gist')
    const { configUrl, ignoreUrl } = res

    // 获取工作区路径
    let workspace
    if (!folder) workspace = vscode.workspace.workspaceFolders[0].uri.fsPath
    else workspace = folder.fsPath

    // 复制源文件
    function copyHandle() {
      fs.writeFileSync(
        `${workspace}/.prettierrc.js`,
        fs.readFileSync(`${__dirname}/src/.prettierrc.js`, 'utf-8')
      )
      fs.writeFileSync(
        `${workspace}/.prettierignore`,
        fs.readFileSync(`${__dirname}/src/.prettierignore`, 'utf-8')
      )
      if (!flag) return
      vscode.window
        .showInformationMessage('Do you need to install prettier?', 'Install', 'Already Done')
        .then(answer => {
          if (answer === 'Install') {
            const terminal = vscode.window.createTerminal({
              name: 'prettier',
            })
            terminal.show()
            tip(terminal)
          }
        })
    }
    // 从gist动态获取
    function wgetHandle(configUrl, ignoreUrl) {
      const terminal = vscode.window.createTerminal({
        name: 'prettier gist',
      })
      terminal.show()
      try {
        if (ignoreUrl) terminal.sendText(`wget ${ignoreUrl} -O .prettierignore`)
        terminal.sendText(`wget ${configUrl} -O .prettierrc.js`)
      } catch (error) {
        vscode.window.showWarningMessage(error)
      }
      if (!flag) return
      vscode.window
        .showInformationMessage('Do you need to install prettier?', 'Install', 'Already Done')
        .then(answer => {
          if (answer === 'Install') tip(terminal)
        })
    }

    // 安装依赖
    function tip(terminal) {
      try {
        terminal.sendText(`npm i -D prettier`)
      } catch (err) {
        vscode.window.showErrorMessage(`请手动安装依赖！"npm i -D prettier"`)
      }
    }

    // 判断工作区是否存在配置文件
    if (
      !fs.existsSync(
        `${workspace}/.prettierrc.js` ||
          `${workspace}/.prettierrc` ||
          `${workspace}/.prettierrc.json`
      )
    ) {
      // 判断配置项
      configUrl ? wgetHandle(configUrl, ignoreUrl) : copyHandle()
    } else
      vscode.window
        .showWarningMessage(
          'An .prettierrc file already exists in this workspace.',
          'Replace',
          'OK'
        )
        .then(value => {
          value === 'Replace' ? (configUrl ? wgetHandle(configUrl, ignoreUrl) : copyHandle()) : null
        })
  })

  context.subscriptions.push(prettier)
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
}
