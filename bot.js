const mineflayer = require('mineflayer');

function createBot() {
    console.log('正在连接服务器...');
    
    const bot = mineflayer.createBot({
        host: '163.5.201.12',
        port: 14106,
        username: 'Terrance',  
        version: '1.21.1',
        physicsEnabled: false,      // 禁用物理，不发移动包
        chatLengthLimit: 0          // 不限制聊天（但我们根本不发）
    });

    bot.on('spawn', () => {
        console.log('【成功】Terrance 已上线，静默保活中（不发任何聊天）...');
        // 什么都不做，只保持连接
        // 仅打印心跳日志，证明机器人还活着
        setInterval(() => {
            console.log(`[心跳] 机器人在线中，位置: ${Math.round(bot.entity.position.x)}, ${Math.round(bot.entity.position.y)}, ${Math.round(bot.entity.position.z)}`);
        }, 60000); // 每分钟打印一次日志
    });

    bot.on('end', (reason) => {
        console.log(`断开连接 (原因: ${reason})，准备重连...`);
        const reconnectTime = 15000 + Math.random() * 5000;
        console.log(`将在 ${Math.round(reconnectTime/1000)} 秒后重连...`);
        setTimeout(createBot, reconnectTime);
    });

    bot.on('error', (err) => {
        console.error('连接错误:', err.message);
    });

    bot.on('kicked', (reason) => {
        console.log('被踢出，原因:', JSON.stringify(reason));
    });
}

createBot();
