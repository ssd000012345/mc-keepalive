const mineflayer = require('mineflayer');

function createBot() {
    console.log('正在试图以【人类伪装模式】登录服务器...');
    
    const bot = mineflayer.createBot({
        host: '163.5.201.12', 
        port: 14106,                  
        username: 'Terrance',  // 💡 建议用一个看起来像真实玩家的英文名字
        version: '1.21.1'           
    });

    // 记录保活定时器，方便断开时清理
    let activityIntervals = [];

    bot.on('spawn', () => {
        console.log('【成功】伪装身体已降临服务器，开始执行人类行为模拟...');

        // 1. 模拟人类随机说话（心跳保活）- 引入随机时间
        const chatInterval = setInterval(() => {
            const msgs = [
                "这服延迟还行",
                "哈喽，有人吗？",
                "今天天气不错",
                "稍微挂会机",
                "有人一起组队吗",
                "emmm..."
            ];
            // 随机抽取一句话发送，避免每次都发一模一样的内容被抓包
            const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
            bot.chat(randomMsg);
        }, 45000 + Math.random() * 15000); // 45-60秒之间的随机时间发送，避免固定频率

        // 2. 模拟人类随机“扭头/看四周”
        const lookInterval = setInterval(() => {
            // 随机生成看天、看地、看左、看右的角度
            const yaw = (Math.random() * 360 - 180) * (Math.PI / 180);
            const pitch = (Math.random() * 60 - 30) * (Math.PI / 180);
            bot.look(yaw, pitch);
        }, 12000 + Math.random() * 5000); // 每12-17秒随机扭一次头

        // 3. 模拟人类微小的物理移动（破除纯原地站立检测）
        const moveInterval = setInterval(() => {
            const directions = ['forward', 'back', 'left', 'right'];
            const randomDir = directions[Math.floor(Math.random() * directions.length)];
            
            // 按下移动键
            bot.setControlState(randomDir, true);
            
            // 0.5秒后松开移动键，实现微小的挪动
            setTimeout(() => {
                bot.setControlState(randomDir, false);
            }, 500);
        }, 25000 + Math.random() * 10000); // 每25-35秒随机挪动一下

        // 将定时器存起来
        activityIntervals.push(chatInterval, lookInterval, moveInterval);
    });

    // 核心安全重连逻辑
    bot.on('end', (reason) => {
        console.log(`断开连接 (原因: ${reason})，正在清理行为定时器并准备重连...`);
        // 清理所有定时器，防止内存泄漏
        activityIntervals.forEach(clearInterval);
        activityIntervals = [];
        
        // 15秒后随机重连，避免秒连被防火墙当做DDOS拦截
        const reconnectTime = 10000 + Math.random() * 5000;
        setTimeout(createBot, reconnectTime);
    });

    bot.on('error', (err) => {
        console.error('网络层发生错误:', err);
    });
}

createBot();
