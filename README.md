24H MC Bot 静默保活机器人
这是一个基于 Mineflayer 的 Minecraft 机器人，它会自动连接指定服务器并保持在线，不发送任何聊天消息或移动数据包，仅维持连接状态，适用于需要角色长期在线挂机的场景。

项目利用 GitHub Actions 实现 24 小时不间断运行，通过定时任务自动接力重启，避免单次任务超时被强制终止。

🎯 功能特点
✅ 静默挂机：禁用物理引擎，不移动、不说话，仅保持 TCP 连接

✅ 自动重连：连接断开后会自动等待 15~20 秒重试

✅ 心跳日志：每分钟打印一次当前位置，方便确认机器人仍在运行

✅ 24 小时持续运行：通过 GitHub Actions 每 3 小时触发一次任务（实际运行约 2 小时 50 分钟，留有空隙防止重叠）

✅ 手动触发：支持在 Actions 页面手动启动机器人

📦 文件说明
文件	描述
bot.js	机器人主程序，包含连接逻辑、重连机制和心跳打印
package.json	Node.js 依赖声明（仅依赖 mineflayer）
.github/workflows/main.yml	GitHub Actions 工作流，定义自动运行计划和超时策略
🔧 配置与使用
1️⃣ 修改服务器地址与登录名
编辑 bot.js 中的 createBot 参数：

javascript
const bot = mineflayer.createBot({
    host: '163.5.201.12',    // 服务器 IP 或域名
    port: 14106,             // 端口号
    username: 'Terrance',    // 机器人用户名
    version: '1.21.1',       // 必须与服务器版本一致
    physicsEnabled: false,   // 不移动（静默保活关键）
    chatLengthLimit: 0
});
⚠️ 如果服务器需要正版验证，请确保该用户名已购买 Minecraft。
若为离线服务器，则任意非正版名均可。

2️⃣ 本地测试（可选）
在本地安装 Node.js（版本 ≥ 18），然后执行：

bash
npm install
node bot.js
控制台会输出连接日志和每分钟心跳。按 Ctrl+C 可停止。

3️⃣ 部署到 GitHub Actions
Fork 本仓库（或创建自己的仓库，将三个文件按目录结构放入）

进入仓库 → Settings → Actions → General → 确保 Allow all actions 或 Allow local action 已启用

进入 Actions 页面，左侧选择 24H MC Bot KeepAlive

点击 Run workflow 可手动启动一次

🔁 自动运行：工作流配置了 schedule（被注释），若需启用每 3 小时自动执行，请移除 main.yml 中 schedule 部分的注释符。
当前版本默认只允许手动触发，推荐手动启动一次后，任务会持续重连并运行。

⚙️ 工作流细节
触发条件：workflow_dispatch（手动）或 cron 表达式（被注释，需自行启用）

运行环境：ubuntu-latest

超时限制：timeout-minutes: 170（即 2 小时 50 分钟）

重连机制：机器人内置重连，即使工作流超时重启，机器人也会重新加入

💡 因为 GitHub Actions 单次任务最长 6 小时（免费版），我们设置 170 分钟超时，每 3 小时启动一次，避免超时断开且保证无缝接力。
实际连接会因为服务器断开或网络波动而重连，机器人自身会不断重试，无需担心。

📋 日志示例
text
正在连接服务器...
【成功】Terrance 已上线，静默保活中（不发任何聊天）...
[心跳] 机器人在线中，位置: 123, 64, -456
[心跳] 机器人在线中，位置: 123, 64, -456
...
断开连接 (原因: socket closed)，准备重连...
将在 17 秒后重连...
正在连接服务器...
【成功】Terrance 已上线，静默保活中...
❗ 注意事项
请确保目标服务器允许长期挂机，避免违反服务器规则。

该机器人完全静默（不发言、不移动），不会干扰正常游戏。

如果服务器要求发送 KeepAlive 数据包，Mineflayer 会自动处理，无需额外配置。

如果机器人被踢出，kicked 事件会打印原因，便于排查。

GitHub Actions 免费计划有一定额度限制（每月 2000 分钟私有仓库，公共仓库无限制）。本项目为公共仓库，可无限使用。

📄 许可
MIT（如果你未提供 LICENSE 文件，可自行补充）

🤝 贡献
欢迎提交 Issue 或 PR 改进代码、文档。如果你需要更复杂的机器人行为（例如自动钓鱼、挂机刷怪），可以参考 Mineflayer 文档 自行扩展。

Happy AFKing! 🎮
