const mineflayer = require('mineflayer');

function createBot() {
    console.log('正在试图以【稳定伪装模式】登录服务器...');
    
    const bot = mineflayer.createBot({
        host: '163.5.201.12',
        port: 14106,
        username: 'Terrance',  
        version: '1.21.1',
        // 禁用物理引擎，防止自动发送移动包触发反作弊
        physicsEnabled: false
    });

    let activityIntervals = [];

    bot.on('spawn', () => {
        console.log('【成功】Terrance 已成功降临服务器！');

        // 等待 10 秒，让服务器完全完成玩家初始化
        setTimeout(() => {
            console.log('世界加载完毕，开始保活...');

            // 只发聊天，不做任何移动/视角操作
            const chatInterval = setInterval(() => {
                const msgs = [
                    "这服延迟还行",
                    "哈喽，有人吗？",
                    "稍微挂会机",
                    "emmm...",
                    "今天天气不错"
                ];
                const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
                bot.chat(randomMsg);
                console.log(`[心跳] 发送聊天: ${randomMsg}`);
            }, 50000 + Math.random() * 20000); // 50-70秒随机一次

            activityIntervals.push(chatInterval);
        }, 10000); // 等待10秒再开始行动
    });

    bot.on('end', (reason) => {
        console.log(`断开连接 (原因: ${reason})，正在清理定时器并准备重连...`);
        activityIntervals.forEach(clearInterval);
        activityIntervals = [];
        
        const reconnectTime = 15000 + Math.random() * 5000;
        console.log(`将在 ${Math.round(reconnectTime/1000)} 秒后重连...`);
        setTimeout(createBot, reconnectTime);
    });

    bot.on('error', (err) => {
        console.error('网络层发生错误:', err.message);
    });

    bot.on('kicked', (reason) => {
        console.log('被踢出，原因:', reason);
    });
}

createBot();
