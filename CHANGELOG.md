# Change Log

All notable changes to the **PrettierConfig for VS Code** extension will be documented in this file.

## [1.5.0]

- 使用 typescript 重新构建
- 添加配置项：可以选择在每次安装 `prettier` 时选择包管理工具

## [1.4.2]

- 显示下载进度条

## [1.4.1]

- 修正 `.prettierrc` 文本格式

## [1.4.0]

- 修改生成文件为 `.prettierrc`
- 通过 `gist` 获取配置文件时，使用 `raw URL` 获取

## [1.3.0]

- add pnpm
- 添加配置项：现在需要在`settings`中配置默认包管理工具（首次使用会弹出选项框）

## [1.2.1]

- 修复 bug：使用命令时报错

## [1.2.0]

- 添加功能：工作区如果存在多个文件夹，提示可选文件夹

## [1.1.3]

- 添加支持`yarn add -D prettier`

## [1.1.2]

- updated README

## [1.1.1]

- 优化体验

## [1.1.0]

- 优化体验
  - 由于使用`WGET`时，如果修改文件会导致地址发生改变，需要重新配置；所以该版本直接通过发送`GET`请求的方式获取配置文件，只需配置一次即可，可以随意编辑配置文件

## [1.0.1]

- fixed bugs & updated README

## [1.0.0]

- 添加配置项
  - 配置 gist 地址后，将通过 wget 直接从 gist 下载配置文件
  - 可以通过配置`prettier-config.tip`选择是否显示`install prettier` 的提示

## [0.2.3]

- 修改 `.prettierignore`

## [0.2.2]

- 更换图床

## [0.2.1]

- 优化体验

## [0.2.0]

- 添加功能-生成配置文件后可选自动安装依赖包
- 添加对 prettier 的扩展依赖

## [0.1.7]

- 更新 vscode 版本支持为 1.57.0 以上

## [0.1.6]

- 优化代码

## [0.1.5]

- 工作区中存在多个文件夹时，右键点击文件夹生成配置文件

## [0.1.4]

- 重新调整了命令位置，如果已使用 [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

## [0.1.3]

- 仅在资源管理中空白处右键时，出现 `Generate .prettierrc` 选项

## [0.1.2]

- Add keywords

## [0.1.1]

- Add MIT license

## [0.1.0]

- Initial release
