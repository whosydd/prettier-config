import * as fs from 'fs'
import * as vscode from 'vscode'
import showWhatsNew, { Version } from './showWhatsNew'
import download = require('download')

interface Gist {
  configRaw: string
  ignoreRaw: string
}

export function activate(context: vscode.ExtensionContext) {
  // TEST: 清除保存的版本信息，每次都显示通知
  // context.globalState.update('whosydd.prettier-config', undefined)

  showWhatsNew(context, {
    extensionId: 'whosydd.prettier-config',
    title: 'PrettierConfig for VS Code 1.6.1 New!',
    detail: `- Auto-extract filename from Gist URL\n- Enhanced Gist configuration with IntelliSense support`,
    version: Version.minor,
  })

  let prettier = vscode.commands.registerCommand(
    'prettier-config',
    async function (folder: vscode.Uri) {
      // 获取配置项
      const flag = await vscode.workspace.getConfiguration('prettier-config').get<boolean>('tip')
      const gist = await vscode.workspace.getConfiguration('prettier-config').get<Gist>('gist')
      const createIgnoreFile = await vscode.workspace
        .getConfiguration('prettier-config')
        .get<boolean>('ignore')
      let tool = await vscode.workspace.getConfiguration('prettier-config').get<string>('tool')

      // 获取工作区路径
      let workspace: string
      if (folder && Object.keys(folder).length > 0) {
        // 使用菜单
        workspace = folder.fsPath
      } else {
        // 使用命令
        let rootPath = ''
        const tmp = vscode.workspace.workspaceFolders!
        if (tmp === undefined) {
          vscode.window.showErrorMessage('Please open a workspace!')
        }
        // 如果工作区中存在的多个文件夹，显示选择框
        if (tmp.length > 1) {
          const pick = await vscode.window.showWorkspaceFolderPick()
          if (!pick) {
            return
          }
          rootPath = pick.uri.fsPath
        } else {
          const pick = tmp[0]
          rootPath = pick.uri.fsPath
        }
        workspace = rootPath
      }

      // default
      const defaultConfigFile = fs.readFileSync(`${__dirname}/template/.prettierrc`, 'utf-8')
      const defaultIgnoreFile = fs.readFileSync(`${__dirname}/template/.prettierignore`, 'utf-8')

      // handle
      async function copyHandle() {
        if (gist && gist.configRaw) {
          vscode.window.withProgress(
            { location: vscode.ProgressLocation.Notification },
            async progress => {
              progress.report({ message: 'Downloading ...' })
              // 从 URL 中提取文件名
              const configFileName = gist.configRaw.split('/').pop()?.split('?')[0] || '.prettierrc'
              const configContent = await download(gist.configRaw)
              fs.writeFileSync(`${workspace}/${configFileName}`, configContent.toString())
              if (gist.ignoreRaw) {
                const ignoreFileName =
                  gist.ignoreRaw.split('/').pop()?.split('?')[0] || '.prettierignore'
                const ignoreContent = await download(gist.ignoreRaw)
                fs.writeFileSync(`${workspace}/${ignoreFileName}`, ignoreContent.toString())
              }
            }
          )
        } else {
          fs.writeFileSync(`${workspace}/.prettierrc`, defaultConfigFile)
          if (createIgnoreFile) {
            fs.writeFileSync(`${workspace}/.prettierignore`, defaultIgnoreFile)
          }
        }
      }

      // tip
      function tip() {
        if (!flag) {
          return
        }
        if (tool === 'manually') {
          vscode.window
            .showInformationMessage('Install prettier?', 'npm', 'yarn', 'pnpm', 'Already Done')
            .then(answer => {
              let command = ''
              // 确定参数
              switch (answer) {
                case 'npm':
                  command = 'npm i -D prettier'
                  break
                case 'yarn':
                  command = 'yarn add -D prettier'
                  break
                case 'pnpm':
                  command = 'pnpm add -D prettier'
                  break
                default:
                  return
              }

              // 安装依赖
              exec(command)
            })
        } else {
          vscode.window
            .showInformationMessage('Install prettier?', 'Install', 'Already Done')
            .then(answer => {
              if (answer === 'Install') {
                let command = ''
                // 确定参数
                switch (tool) {
                  case 'npm':
                    command = 'npm i -D prettier'
                    break
                  case 'yarn':
                    command = 'yarn add -D prettier'
                    break
                  case 'pnpm':
                    command = 'pnpm add -D prettier'
                    break
                  default:
                    return
                }

                // 安装依赖
                exec(command)
              }
            })
        }
      }

      // 判断工作区是否存在配置文件
      if (!fs.existsSync(`${workspace}/.prettierrc`)) {
        copyHandle()
        tip()
      } else {
        vscode.window
          .showWarningMessage(
            'An .prettierrc file already exists in this workspace.',
            'Replace',
            'OK'
          )
          .then(value => {
            if (value === 'Replace') {
              copyHandle()
            }
          })
      }
    }
  )

  context.subscriptions.push(prettier)
}

// This method is called when your extension is deactivated
export function deactivate() {}

function exec(command: string) {
  try {
    const terminal = vscode.window.createTerminal({
      name: 'prettier',
    })
    terminal.show()
    terminal.sendText(command)
  } catch (err) {
    vscode.window.showErrorMessage(`请手动安装依赖！prettier`)
  }
}
