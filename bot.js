const mineflayer = require('mineflayer');

function createBot() {
    console.log('正在试图以【稳定伪装模式】登录服务器...');
    
    const bot = mineflayer.createBot({
        host: '163.5.201.12', 
        port: 14106,                  
        username: 'Terrance',  
        version: '1.21.1'           
    });

    let activityIntervals = [];

    bot.on('spawn', () => {
        console.log('【成功】Terrance 已成功降临服务器！');

        // 延迟 5 秒后再启动人类行为模拟，给游戏世界留出充足的加载时间
        setTimeout(() => {
            console.log('世界加载完毕，开始执行安全的视线和聊天伪装...');

            // 1. 模拟人类随机说话（45-60秒无规律波动，避免被判定为固定机器人）
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
            }, 45000 + Math.random() * 15000);

            // 2. 模拟人类随机“转动视线/看四周”（每 12-17 秒无规律扭头，完美破解原地发呆检测）
            const lookInterval = setInterval(() => {
                const yaw = (Math.random() * 360 - 180) * (Math.PI / 180);
                const pitch = (Math.random() * 60 - 30) * (Math.PI / 180);
                bot.look(yaw, pitch);
            }, 12000 + Math.random() * 5000);

            activityIntervals.push(chatInterval, lookInterval);
        }, 5000); // 稳稳地等待 5 秒
    });

    // 核心安全重连逻辑
    bot.on('end', (reason) => {
        console.log(`断开连接 (原因: ${reason})，正在清理定时器并准备重连...`);
        activityIntervals.forEach(clearInterval);
        activityIntervals = [];
        
        // 15 秒左右随机重连，防止被服务器防火墙拦截
        const reconnectTime = 12000 + Math.random() * 5000;
        setTimeout(createBot, reconnectTime);
    });

    bot.on('error', (err) => {
        console.error('网络层发生错误:', err);
    });
}

createBot();
