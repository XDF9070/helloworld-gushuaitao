// ============================================
// HelloWorld 网站 - Node.js + Express
// 练习一：我的第一个AI开发的网站
// ============================================
const express = require('express');

const app = express();

// 页面上显示的名字（可通过环境变量 STUDENT_NAME 覆盖）
const STUDENT_NAME = process.env.STUDENT_NAME || '顾帅涛';

// 首页：浏览器访问时显示 Hello World + 服务器时间
app.get('/', (req, res) => {
  const serverTime = new Date().toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    hour12: false,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(`<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Hello World - 我的第一个AI开发的网站</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: "PingFang SC", "Microsoft YaHei", -apple-system, sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  .card {
    background: rgba(255, 255, 255, 0.95);
    padding: 60px 50px;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    text-align: center;
    max-width: 640px;
    margin: 20px;
  }
  h1 {
    font-size: 42px;
    color: #333;
    margin-bottom: 16px;
  }
  h1 .hello { color: #667eea; }
  .intro {
    font-size: 20px;
    color: #555;
    margin-bottom: 36px;
    line-height: 1.6;
  }
  .intro .name { color: #e74c3c; font-weight: bold; }
  .time-box {
    background: #f0f2ff;
    border-radius: 12px;
    padding: 24px;
    display: inline-block;
  }
  .time-label {
    font-size: 14px;
    color: #888;
    margin-bottom: 8px;
    letter-spacing: 2px;
  }
  #server-time {
    font-size: 28px;
    font-weight: bold;
    color: #333;
    font-variant-numeric: tabular-nums;
  }
  .footer {
    margin-top: 36px;
    font-size: 13px;
    color: #aaa;
  }
</style>
</head>
<body>
  <div class="card">
    <h1><span class="hello">Hello World!</span></h1>
    <p class="intro">我是<span class="name">${STUDENT_NAME}</span>，<br>我的第一个AI开发的网站</p>
    <div class="time-box">
      <div class="time-label">当前服务器时间</div>
      <div id="server-time">${serverTime}</div>
    </div>
    <div class="footer">🚀 由 AI 编写 · Node.js + Express 驱动</div>
  </div>
  <script>
    // 每秒向服务器请求最新时间，保证显示的是真实的服务器时间
    async function refreshTime() {
      try {
        const res = await fetch('/api/time');
        const data = await res.json();
        document.getElementById('server-time').textContent = data.time;
      } catch (e) {
        console.log('时间刷新失败，稍后重试');
      }
    }
    setInterval(refreshTime, 1000);
  </script>
</body>
</html>`);
});

// 时间接口：返回服务器当前时间（JSON）
app.get('/api/time', (req, res) => {
  res.json({
    time: new Date().toLocaleString('zh-CN', {
      timeZone: 'Asia/Shanghai',
      hour12: false,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    }),
    timezone: 'Asia/Shanghai (UTC+8)'
  });
});

// 本地运行：node server.js（Vercel 线上环境由平台托管，不会执行到这里）
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ HelloWorld 网站已启动： http://localhost:${PORT}`);
  });
}

// 导出 app 供 Vercel（@vercel/node）使用
module.exports = app;
