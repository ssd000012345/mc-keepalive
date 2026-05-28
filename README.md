
# 24H MC Bot KeepAlive
# cron触发关闭了，如需自动触发
一个使用 **Mineflayer** 实现的 Minecraft 机器人挂机项目，专为 **24 小时静默保活** 而设计。

## 项目简介

本项目通过 GitHub Actions + Mineflayer 实现了一个**零聊天、零移动**的纯保活机器人。机器人上线后不会发送任何聊天消息，也不会进行物理移动，仅保持与服务器的连接，防止因长时间挂机被服务器踢出。

机器人名称：**Terrance**

---

## 主要功能

- ✅ **静默保活**：不上线移动、不发聊天，仅维持连接
- ✅ **自动重连**：断开后自动重连（带随机延迟）
- ✅ **心跳日志**：每分钟打印一次机器人位置，方便监控状态
- ✅ **GitHub Actions 持续运行**：通过 Workflow 实现近 24 小时在线
- ✅ **物理禁用**：设置 `physicsEnabled: false`，减少不必要的数据包

---

## 文件结构

```
.
├── bot.js              # 主机器人逻辑
├── package.json        # 项目依赖
└── .github/workflows/
    └── main.yml        # GitHub Actions 工作流
```

---

## 快速部署

### 1. Fork 本仓库

点击右上角 **Fork** 到你的 GitHub 账号。

### 2. 修改服务器信息（可选）

编辑 `bot.js` 中的连接配置：

```js
const bot = mineflayer.createBot({
    host: '163.5.201.12',     // 修改为你的服务器 IP
    port: 14106,              // 修改为你的服务器端口
    username: 'Terrance',     // 机器人用户名
    version: '1.21.1',
    // ...
});
```

### 3. 启用 GitHub Actions

1. 进入你的仓库 → **Settings** → **Actions** → **General**
2. 在 "Workflow permissions" 中选择 **Read and write permissions**
3. 保存设置

### 4. 手动启动

前往 **Actions** 页面，点击左侧的 "24H MC Bot KeepAlive"，然后点击 **Run workflow** 按钮启动。

---

## 工作原理

- **Mineflayer 配置**：禁用物理引擎（`physicsEnabled: false`），避免发送移动数据包。
- **心跳机制**：每 60 秒打印一次当前位置日志。
- **重连机制**：断开连接后 15~20 秒自动尝试重连。
- **GitHub Actions**：设置 `timeout-minutes: 170`（约 2 小时 50 分钟），可结合定时任务实现全天候运行。

---

## 注意事项

- GitHub Actions 免费额度有使用限制，请合理使用。
- 部分服务器可能有严格的反挂机检测，本机器人仅用于合法的保活用途。
- 建议使用小号或专用账号运行机器人。
- 如需修改运行时长，可调整 `main.yml` 中的 `timeout-minutes`。

---

## 技术栈

- [Mineflayer](https://github.com/PrismarineJS/mineflayer)
- Node.js 18
- GitHub Actions

---

## License

MIT License

---

**Made with ❤️ for Minecraft players who need long-time AFK**
